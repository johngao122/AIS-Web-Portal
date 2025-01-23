/* eslint-disable */

import { NextResponse } from "next/server";
import vesselData from "@/data/vessel_activity_updated.json";

type RecordType = {
    terminal: string;
    atb: string | "unavailable";
    atu: string | "unavailable";
    vessellength: number;
};

// Helper functions to calculate median, average, and filter by categories
function calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return Number(
        (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
    );
}

function calculateMedian(values: number[]): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2))
        : Number(sorted[mid].toFixed(2));
}

function filterByCategory(data: any[], minLOA: number, maxLOA: number) {
    return data.filter(
        (vessel) =>
            vessel.vessellength !== "unavailable" &&
            vessel.vessellength >= minLOA &&
            vessel.vessellength < maxLOA
    );
}

function calculateWaitingHours(record: any): number | null {
    const ata = record.ata !== "unavailable" ? new Date(record.ata) : null;
    const atb = record.atb !== "unavailable" ? new Date(record.atb) : null;
    if (!ata || !atb || isNaN(ata.getTime()) || isNaN(atb.getTime()))
        return null;
    return (atb.getTime() - ata.getTime()) / (1000 * 60 * 60); // hours
}

function calculateBerthingHours(record: any): number | null {
    const atb = record.atb !== "unavailable" ? new Date(record.atb) : null;
    const atu = record.atu !== "unavailable" ? new Date(record.atu) : null;
    if (!atb || !atu || isNaN(atb.getTime()) || isNaN(atu.getTime()))
        return null;
    return (atu.getTime() - atb.getTime()) / (1000 * 60 * 60); // hours
}

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

export async function POST(req: Request) {
    try {
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

            const filteredData = vesselData.filter((record: any) => {
                const ata =
                    record.ata !== "unavailable" ? new Date(record.ata) : null;
                const atd =
                    record.atd !== "unavailable" ? new Date(record.atd) : null;
                return ata && atd && ata >= start && atd <= end;
            });
            console.log(filteredData);

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

                const totalBerthed = categoryData.filter((record: any) => {
                    const atb = record.atb !== "unavailable";
                    const atuAtdValid =
                        record.atu !== "unavailable" &&
                        record.atd !== "unavailable" &&
                        new Date(record.atu) < new Date(record.atd);
                    return atb || atuAtdValid;
                }).length;

                const jitCount = categoryData.filter((record: any) => {
                    const waitingHours = calculateWaitingHours(record);
                    return waitingHours !== null && waitingHours < 2;
                }).length;

                const jitPercentage =
                    totalBerthed > 0
                        ? Number(((jitCount / totalBerthed) * 100).toFixed(2))
                        : 0;

                const waitingHours = categoryData
                    .map((record) => calculateWaitingHours(record))
                    .filter((val) => val !== null);

                const berthingHours = categoryData
                    .map((record) => calculateBerthingHours(record))
                    .filter((val) => val !== null);

                const inPortHours = categoryData
                    .map((record) => calculateInPortHours(record))
                    .filter((val) => val !== null);

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

                // Weighted average for all terminals
                const terminalWharfLengths = {
                    PP: 13447,
                    F2: 3000,
                    Brani: 2325,
                    Keppel: 3164,
                };

                const totalTime =
                    (new Date(endDate).getTime() -
                        new Date(startDate).getTime()) /
                    (1000 * 60 * 60); // hours

                const totalCapacity =
                    terminalWharfLengths.PP * totalTime +
                    terminalWharfLengths.F2 * totalTime +
                    terminalWharfLengths.Brani * totalTime +
                    terminalWharfLengths.Keppel * totalTime;

                const totalWeightedUtilization =
                    (pasirrUtil / 100) * terminalWharfLengths.PP * totalTime +
                    (tuasUtil / 100) * terminalWharfLengths.F2 * totalTime +
                    (braniUtil / 100) * terminalWharfLengths.Brani * totalTime +
                    (keppelUtil / 100) *
                        terminalWharfLengths.Keppel *
                        totalTime;

                const allTerminalsUtilization =
                    totalCapacity > 0
                        ? Number(
                              (
                                  (totalWeightedUtilization / totalCapacity) *
                                  100
                              ).toFixed(2)
                          )
                        : 0;

                const combinedBraniKeppel = Number(
                    ((braniUtil + keppelUtil) / 2).toFixed(2)
                );

                const wharfUtilization = {
                    PasirPanjang: pasirrUtil,
                    Tuas: tuasUtil,
                    BraniKeppel: combinedBraniKeppel,
                    AllTerminals: allTerminalsUtilization, // Add all terminals utilization
                };

                categoryResults[category.name] = {
                    TotalBerthed: totalBerthed,
                    JIT: jitPercentage,
                    WaitingHours: {
                        average: calculateAverage(waitingHours),
                        median: calculateMedian(waitingHours),
                    },
                    BerthingHours: {
                        average: calculateAverage(berthingHours),
                        median: calculateMedian(berthingHours),
                    },
                    InPortHours: {
                        average: calculateAverage(inPortHours),
                        median: calculateMedian(inPortHours),
                    },
                    WharfUtilizationRate: wharfUtilization,
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
