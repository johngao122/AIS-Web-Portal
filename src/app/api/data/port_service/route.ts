/* eslint-disable */

import { NextResponse } from "next/server";

type RecordType = {
    terminal: string;
    atb: string | "unavailable";
    atu: string | "unavailable";
    vessellength: number;
};

type VesselRecord = {
    vesselname: string;
    imo: string;
    mmsi: string;
    vesseltype: string;
    vessellength: number;
    terminal: string;
    ata: string | "unavailable";
    atb: string | "unavailable";
    atu: string | "unavailable";
    atd: string | "unavailable";
};

// Helper functions to calculate median, average, and filter by categories
function calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return Number(
        (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
    );
}

/**
 * Calculate the median of a given array of numbers.
 * If the array has an even number of elements, the median is the average of the two middle elements.
 * If the array has an odd number of elements, the median is the middle element.
 * If the array is empty, the median is 0.
 * @param values An array of numbers
 * @returns The median of the given array of numbers
 */
function calculateMedian(values: number[]): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2))
        : Number(sorted[mid].toFixed(2));
}

function filterByCategory(
    data: any[],
    minLOA: number,
    maxLOA: number,
    terminal?: string
) {
    return data.filter(
        (vessel) =>
            vessel.vessellength !== "unavailable" &&
            vessel.vessellength >= minLOA &&
            vessel.vessellength < maxLOA &&
            (!terminal || vessel.terminal === terminal)
    );
}

/**
 * Calculate the waiting hours from given vessel record.
 * @param record Vessel record with "ata" and "atb" properties
 * @returns The waiting hours in hours if the properties are valid, otherwise null
 */
function calculateWaitingHours(record: any): number | null {
    const ata = record.ata !== "unavailable" ? new Date(record.ata) : null;
    const atb = record.atb !== "unavailable" ? new Date(record.atb) : null;
    if (
        !ata ||
        !atb ||
        isNaN(ata.getTime()) ||
        isNaN(atb.getTime()) ||
        atb < ata
    )
        return null;
    return (atb.getTime() - ata.getTime()) / (1000 * 60 * 60); // hours
}

/**
 * Calculate the berthing hours from given vessel record.
 * @param record Vessel record with "atb" and "atu" properties
 * @returns The berthing hours in hours if the properties are valid, otherwise null
 */
function calculateBerthingHours(record: any): number | null {
    const atb = record.atb !== "unavailable" ? new Date(record.atb) : null;
    const atu = record.atu !== "unavailable" ? new Date(record.atu) : null;
    if (!atb || !atu || isNaN(atb.getTime()) || isNaN(atu.getTime()))
        return null;
    return (atu.getTime() - atb.getTime()) / (1000 * 60 * 60); // hours
}

/**
 * Calculate the in-port hours from given vessel record.
 * @param record Vessel record with "ata" and "atd" properties
 * @returns The in-port hours in hours if the properties are valid, otherwise null
 */
function calculateInPortHours(record: any): number | null {
    const ata = record.ata !== "unavailable" ? new Date(record.ata) : null;
    const atd = record.atd !== "unavailable" ? new Date(record.atd) : null;
    if (!ata || !atd || isNaN(ata.getTime()) || isNaN(atd.getTime()))
        return null;
    return (atd.getTime() - ata.getTime()) / (1000 * 60 * 60); // hours
}

type CategoryResults = {
    [key: string]: {
        TotalBerthed: number;
        JIT: number;
        WaitingHours: {
            average: number;
            median: number;
        };
        BerthingHours: {
            average: number;
            median: number;
        };
        InPortHours: {
            average: number;
            median: number;
        };
        WharfUtilizationRate: {
            PasirPanjang: number;
            Tuas: number;
            BraniKeppel: number;
        };
    };
};

async function fetchVesselData(
    period: string,
    startDate: string,
    endDate: string,
    authToken: string
) {
    try {
        const API = process.env.NEXT_PUBLIC_API;

        // Format dates to YYYYMMDD format (8 digits only)
        const formatDate = (dateStr: string) => {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}${month}${day}`;
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        const response = await fetch(
            `${API}/get_container_vessel_activity_with_period`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken,
                },
                body: JSON.stringify({
                    period,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error Response:", errorText);
            throw new Error(
                `API request failed with status ${response.status}: ${errorText}`
            );
        }

        const data = await response.json();

        // Transform the data to match our expected format
        return data["Container Vessel Activity Records"].map(
            (record: any[]) => ({
                vesselname: record[0],
                imo: record[1],
                mmsi: record[2],
                vesseltype: record[3],
                vessellength: record[4],
                terminal: record[5],
                ata: record[6] || "unavailable",
                atb: record[7] || "unavailable",
                atu: record[8] || "unavailable",
                atd: record[9] || "unavailable",
            })
        );
    } catch (error) {
        console.error("Error fetching vessel data:", error);
        throw error;
    }
}

/**
 * Handles POST requests to process vessel activity data for specified date ranges.
 *
 * The request body should be an array of objects with the following properties:
 * - name: A string representing the name of the date range.
 * - startDate: A string representing the start date of the range.
 * - endDate: A string representing the end date of the range.
 *
 * The function validates the request body and processes each date range to filter
 * vessel data within the specified dates. It calculates various metrics such as:
 * - Total berthed vessels
 * - Just-In-Time (JIT) percentage
 * - Average and median waiting hours
 * - Average and median berthing hours
 * - Average and median in-port hours
 * - Wharf utilization rates for different terminals and all terminals combined
 *
 * Returns a JSON response with the calculated metrics for each date range. If the
 * request body is invalid or an error occurs, an appropriate error message is returned.
 *
 * @param req - The HTTP request object.
 * @returns A JSON response with calculated metrics or an error message.
 */

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json(
                { message: "Authorization header is required" },
                { status: 401 }
            );
        }

        const dateRanges: {
            name: string;
            startDate: string;
            endDate: string;
        }[] = await req.json();

        if (!Array.isArray(dateRanges) || dateRanges.length === 0) {
            return NextResponse.json(
                { message: "Request body must be an array of date ranges" },
                { status: 400 }
            );
        }

        const response = [];

        for (const range of dateRanges) {
            const { name, startDate, endDate } = range;

            if (!startDate || !endDate) {
                response.push({
                    [name]: {
                        message: "Start date and end date are required",
                    },
                });
                continue;
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                response.push({
                    [name]: {
                        message: "Invalid date format",
                    },
                });
                continue;
            }

            // Extract period number from the name (e.g., "Period 1" -> "1")
            const periodNumber = name.match(/\d+/)?.[0] || "1";
            const vesselData = await fetchVesselData(
                `Period ${periodNumber}`,
                startDate,
                endDate,
                authHeader
            );

            const filteredData = vesselData.filter((record: any) => {
                const ata =
                    record.ata !== "unavailable" ? new Date(record.ata) : null;
                const atd =
                    record.atd !== "unavailable" ? new Date(record.atd) : null;
                return ata && atd && ata >= start && atd <= end;
            });

            const categories = [
                { name: "All vessels", minLOA: 0, maxLOA: Infinity },
                { name: "Category 1 vessels", minLOA: 0, maxLOA: 147 },
                { name: "Category 2 vessels", minLOA: 147, maxLOA: 209 },
                { name: "Category 3 vessels", minLOA: 209, maxLOA: 285 },
                { name: "Category 4 vessels", minLOA: 285, maxLOA: 400 },
            ];

            const categoryResults: CategoryResults = {};

            for (const category of categories) {
                const categoryData =
                    category.name === "All vessels"
                        ? filteredData
                        : filterByCategory(
                              filteredData,
                              category.minLOA,
                              category.maxLOA
                          );

                // Calculate metrics per terminal
                const terminals = ["PP", "F2", "Brani", "Keppel"];
                const terminalMetrics = terminals.map((terminal) => {
                    const terminalData = filterByCategory(
                        categoryData,
                        category.minLOA,
                        category.maxLOA,
                        terminal
                    );

                    const totalBerthed = terminalData.filter((record: any) => {
                        const atb = record.atb !== "unavailable";
                        const atuAtdValid =
                            record.atu !== "unavailable" &&
                            record.atd !== "unavailable" &&
                            new Date(record.atu) < new Date(record.atd);
                        return atb || atuAtdValid;
                    }).length;

                    const jitCount = terminalData.filter((record: any) => {
                        const waitingHours = calculateWaitingHours(record);
                        return waitingHours !== null && waitingHours < 2;
                    }).length;

                    const jitPercentage =
                        totalBerthed > 0
                            ? Number(
                                  ((jitCount / totalBerthed) * 100).toFixed(2)
                              )
                            : 0;

                    const waitingHours = terminalData
                        .map((record: VesselRecord) =>
                            calculateWaitingHours(record)
                        )
                        .filter((val: number | null) => val !== null);

                    const berthingHours = terminalData
                        .map((record: VesselRecord) =>
                            calculateBerthingHours(record)
                        )
                        .filter((val: number | null) => val !== null);

                    const inPortHours = terminalData
                        .map((record: VesselRecord) =>
                            calculateInPortHours(record)
                        )
                        .filter((val: number | null) => val !== null);

                    return {
                        terminal,
                        totalBerthed,
                        jitPercentage,
                        waitingHours,
                        berthingHours,
                        inPortHours,
                    };
                });

                // Aggregate metrics across terminals
                const totalBerthed = terminalMetrics.reduce(
                    (sum, tm) => sum + tm.totalBerthed,
                    0
                );
                const weightedJIT =
                    terminalMetrics.reduce(
                        (sum, tm) => sum + tm.jitPercentage * tm.totalBerthed,
                        0
                    ) / (totalBerthed || 1);

                const allWaitingHours = terminalMetrics.flatMap(
                    (tm) => tm.waitingHours
                );
                const allBerthingHours = terminalMetrics.flatMap(
                    (tm) => tm.berthingHours
                );
                const allInPortHours = terminalMetrics.flatMap(
                    (tm) => tm.inPortHours
                );

                // Individual terminal utilization rates
                const pasirrUtil = calculateUtilization(
                    categoryData,
                    "PP",
                    startDate,
                    endDate
                );
                const tuasUtil = calculateUtilization(
                    categoryData,
                    "F2",
                    startDate,
                    endDate
                );
                const braniUtil = calculateUtilization(
                    categoryData,
                    "Brani",
                    startDate,
                    endDate
                );
                const keppelUtil = calculateUtilization(
                    categoryData,
                    "Keppel",
                    startDate,
                    endDate
                );

                const combinedBraniKeppel = Number(
                    ((braniUtil + keppelUtil) / 2).toFixed(2)
                );

                categoryResults[category.name] = {
                    TotalBerthed: totalBerthed,
                    JIT: Number(weightedJIT.toFixed(2)),
                    WaitingHours: {
                        average: calculateAverage(allWaitingHours),
                        median: calculateMedian(allWaitingHours),
                    },
                    BerthingHours: {
                        average: calculateAverage(allBerthingHours),
                        median: calculateMedian(allBerthingHours),
                    },
                    InPortHours: {
                        average: calculateAverage(allInPortHours),
                        median: calculateMedian(allInPortHours),
                    },
                    WharfUtilizationRate: {
                        PasirPanjang: pasirrUtil,
                        Tuas: tuasUtil,
                        BraniKeppel: combinedBraniKeppel,
                    },
                };
            }

            response.push({
                [name]: {
                    startDate,
                    endDate,
                    ...categoryResults,
                },
            });
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// Function to calculate utilization for specific terminals
function calculateUtilization(
    data: RecordType[],
    terminalType: "PP" | "F2" | "Brani" | "Keppel",
    startDate: string,
    endDate: string
): number {
    const terminalWharfLengths: {
        [key in "PP" | "F2" | "Brani" | "Keppel"]: number;
    } = {
        PP: 13447,
        F2: 3000,
        Brani: 2325,
        Keppel: 3164,
    };

    const totalTime =
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60); // in hours

    if (!terminalWharfLengths[terminalType] || totalTime <= 0) {
        return 0;
    }

    const safetyDistance = 30;

    const filteredData = data.filter(
        (record) => record.terminal === terminalType
    );

    const berthingUtilization = filteredData.reduce<number>((sum, record) => {
        const atb =
            record.atb !== "unavailable"
                ? new Date(record.atb)
                : new Date(startDate);
        const atu =
            record.atu !== "unavailable"
                ? new Date(record.atu)
                : new Date(endDate);

        if (isNaN(atb.getTime()) || isNaN(atu.getTime()) || atb >= atu) {
            return sum;
        }

        const berthingHours =
            (atu.getTime() - atb.getTime()) / (1000 * 60 * 60); // in hours
        return sum + berthingHours * (record.vessellength + safetyDistance);
    }, 0);

    const wharfLength = terminalWharfLengths[terminalType];

    return Number(
        ((berthingUtilization / (wharfLength * totalTime)) * 100).toFixed(2)
    ); // percentage
}
