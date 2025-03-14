/**
 * API Utility Module
 *
 * This module provides a comprehensive set of functions for interacting with the backend API.
 * It handles authentication, data fetching, and error handling for all API endpoints.
 *
 * @module api
 */

/*eslint-disable*/

import { getUserToken } from "./auth";
import VesselActivity from "@/types/VesselActivity";
import type { PortServiceData, PeriodDetail } from "@/types/PortService";

const API_URL = process.env.NEXT_PUBLIC_API;

export interface VesselActivityRequest {
    startDate: string;
    endDate: string;
}

export interface PortServiceRequest {
    name: string;
    startDate: string;
    endDate: string;
}

export interface PortInfoRequest {
    name: string;
    startDate: string;
    endDate: string;
}

export interface PortInfoData {
    [period: string]: {
        startDate: string;
        endDate: string;
        terminals: TerminalResults;
    };
}

export interface PortServicePeriod {
    [period: string]: PeriodDetail;
}

interface WharfUtilizationRate {
    allterminals: number;
    PasirPanjang: number;
    Tuas: number;
    BraniKeppel: number;
}

/**
 * Fetches vessel activity data from the API
 * Retrieves vessel movements, port calls, and related metrics for the specified date range
 *
 * @param {VesselActivityRequest} params - Request parameters including start and end dates
 * @returns {Promise<VesselActivity[]>} Promise resolving to an array of vessel activity records
 * @throws {Error} If the API request fails
 */
export const fetchVesselActivity = async (
    params: VesselActivityRequest
): Promise<VesselActivity[]> => {
    const token = getUserToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    const { startDate, endDate } = params;
    const formattedStartDate = new Date(startDate)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
    const formattedEndDate = new Date(endDate)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

    const response = await fetch(`${API_URL}/get_container_vessel_activity`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            start_date: formattedStartDate,
            end_date: formattedEndDate,
        }),
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return processVesselActivityData(
        data["Container Vessel Activity Records"],
        startDate,
        endDate
    );
};

/**
 * Fetches port service level data from the API
 * Retrieves performance metrics, utilization rates, and service statistics
 *
 * @param {PortServiceRequest[]} params - Array of request parameters including port name and date ranges
 * @returns {Promise<PortServiceData>} Promise resolving to port service data
 * @throws {Error} If the API request fails
 */
export const fetchPortService = async (
    params: PortServiceRequest[]
): Promise<PortServiceData> => {
    const token = getUserToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    // Process each period separately
    const results = await Promise.all(
        params.map(async (period) => {
            try {
                const response = await fetch(
                    `${API_URL}/get_container_vessel_activity_with_period`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            period: period.name,
                            start_date: formatDate(period.startDate),
                            end_date: formatDate(period.endDate),
                        }),
                    }
                );

                if (!response.ok) {
                    console.error(
                        `API request failed for period ${period.name} with status ${response.status}`
                    );
                    const errorText = await response.text();
                    console.error("Error details:", errorText);
                    throw new Error(
                        `API request failed with status ${response.status}`
                    );
                }

                const data = await response.json();
                if (!data || typeof data !== "object") {
                    console.error(
                        `Invalid response data for period ${period.name}:`,
                        data
                    );
                    throw new Error("Invalid response data format");
                }

                const processedData = processPortServiceData(data);
                return { [period.name]: processedData };
            } catch (error) {
                console.error(`Error processing period ${period.name}:`, error);
                // Return empty data structure for this period
                return {
                    [period.name]: {
                        startDate: period.startDate,
                        endDate: period.endDate,
                        "All vessels": {
                            TotalBerthed: 0,
                            JIT: 0,
                            WaitingHours: { average: 0, median: 0 },
                            BerthingHours: { average: 0, median: 0 },
                            InPortHours: { average: 0, median: 0 },
                            WharfUtilizationRate: {
                                PasirPanjang: 0,
                                Tuas: 0,
                                BraniKeppel: 0,
                            },
                        },
                        "Category 1 vessels": {
                            TotalBerthed: 0,
                            JIT: 0,
                            WaitingHours: { average: 0, median: 0 },
                            BerthingHours: { average: 0, median: 0 },
                            InPortHours: { average: 0, median: 0 },
                            WharfUtilizationRate: {
                                PasirPanjang: 0,
                                Tuas: 0,
                                BraniKeppel: 0,
                            },
                        },
                        "Category 2 vessels": {
                            TotalBerthed: 0,
                            JIT: 0,
                            WaitingHours: { average: 0, median: 0 },
                            BerthingHours: { average: 0, median: 0 },
                            InPortHours: { average: 0, median: 0 },
                            WharfUtilizationRate: {
                                PasirPanjang: 0,
                                Tuas: 0,
                                BraniKeppel: 0,
                            },
                        },
                        "Category 3 vessels": {
                            TotalBerthed: 0,
                            JIT: 0,
                            WaitingHours: { average: 0, median: 0 },
                            BerthingHours: { average: 0, median: 0 },
                            InPortHours: { average: 0, median: 0 },
                            WharfUtilizationRate: {
                                PasirPanjang: 0,
                                Tuas: 0,
                                BraniKeppel: 0,
                            },
                        },
                        "Category 4 vessels": {
                            TotalBerthed: 0,
                            JIT: 0,
                            WaitingHours: { average: 0, median: 0 },
                            BerthingHours: { average: 0, median: 0 },
                            InPortHours: { average: 0, median: 0 },
                            WharfUtilizationRate: {
                                PasirPanjang: 0,
                                Tuas: 0,
                                BraniKeppel: 0,
                            },
                        },
                    },
                };
            }
        })
    );

    return results;
};

/**
 * Fetches detailed port information from the API
 * Retrieves terminal-specific data, vessel counts, and operational metrics
 *
 * @param {PortInfoRequest[]} params - Array of request parameters including port name and date ranges
 * @returns {Promise<PortInfoData>} Promise resolving to port information data
 * @throws {Error} If the API request fails
 */
export const fetchPortInfo = async (
    params: PortInfoRequest[]
): Promise<PortInfoData> => {
    const token = getUserToken();
    if (!token) {
        throw new Error("No authentication token found");
    }

    // Process each request separately
    const periodData = await Promise.all(
        params.map(async (period) => {
            const response = await fetch(
                `${API_URL}/get_container_vessel_activity`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        start_date: formatDate(period.startDate),
                        end_date: formatDate(period.endDate),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                );
            }

            const data = await response.json();
            const processedData = processPortInfoData(
                data,
                period.startDate,
                period.endDate
            );
            if (!processedData) {
                throw new Error("Failed to process port info data");
            }
            return {
                period: period.name,
                data: processedData,
            };
        })
    );

    // Convert array of period data to an object with period names as keys
    return periodData.reduce((acc, curr) => {
        acc[curr.period] = curr.data;
        return acc;
    }, {} as PortInfoData);
};

// Helper functions
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 10).replace(/-/g, "");
}

/**
 * Processes raw vessel activity data from the API
 * Calculates derived metrics like waiting hours and berthing hours
 * Formats dates and ensures consistent data structure
 *
 * @param {any[]} records - Raw vessel activity records from the API
 * @param {string} [startDate] - Optional start date for filtering
 * @param {string} [endDate] - Optional end date for filtering
 * @returns {VesselActivity[]} Processed vessel activity data
 */
export const processVesselActivityData = (
    records: any[],
    startDate?: string,
    endDate?: string
): VesselActivity[] => {
    // Convert start and end dates to Date objects if provided
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return records
        .map((record) => {
            const [
                vesselName,
                imoNumber,
                mmsi,
                _vesselType,
                length,
                terminal,
                ata,
                atb,
                atu,
                atd,
            ] = record;

            const ataDate = ata ? new Date(ata) : null;
            const atbDate = atb ? new Date(atb) : null;
            const atuDate = atu ? new Date(atu) : null;
            const atdDate = atd ? new Date(atd) : null;

            const waitingHoursAtBerth = calculateHours(ataDate, atbDate);
            const waitingHoursInAnchorage = calculateHours(ataDate, atbDate);
            const berthingHours = calculateHours(atbDate, atuDate);
            const inPortHours = calculateHours(ataDate, atdDate);

            return {
                vesselName,
                imoNumber,
                mmsi,
                loa: length.toString(),
                terminal: mapTerminalName(terminal),
                ata: ata || "",
                atb: atb || "",
                atu: atu || "",
                atd: atd || "",
                waitingHoursAtBerth:
                    waitingHoursAtBerth === "unavailable"
                        ? 0
                        : waitingHoursAtBerth,
                waitingHoursInAnchorage:
                    waitingHoursInAnchorage === "unavailable"
                        ? 0
                        : waitingHoursInAnchorage,
                berthingHours:
                    berthingHours === "unavailable" ? 0 : berthingHours,
                inPortHours: inPortHours === "unavailable" ? 0 : inPortHours,
            };
        })
        .filter((vessel) => {
            // If no date range is provided, include all records
            if (!start || !end) return true;

            const ata = vessel.ata ? new Date(vessel.ata) : null;
            const atd = vessel.atd ? new Date(vessel.atd) : null;

            // If we have both dates, ensure they're within range
            if (ata && atd) {
                return ata <= end && atd >= start;
            }
            // If we only have arrival date, check it's not after end date
            else if (ata) {
                return ata <= end;
            }
            // If we only have departure date, check it's not before start date
            else if (atd) {
                return atd >= start;
            }
            // If no dates available, include the record
            return true;
        });
};

// Helper functions for port service processing
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
    return (atb.getTime() - ata.getTime()) / (1000 * 60 * 60);
}

function calculateBerthingHours(record: any): number | null {
    const atb = record.atb !== "unavailable" ? new Date(record.atb) : null;
    const atu = record.atu !== "unavailable" ? new Date(record.atu) : null;
    if (!atb || !atu || isNaN(atb.getTime()) || isNaN(atu.getTime()))
        return null;
    return (atu.getTime() - atb.getTime()) / (1000 * 60 * 60);
}

function calculateInPortHours(record: any): number | null {
    const ata = record.ata !== "unavailable" ? new Date(record.ata) : null;
    const atd = record.atd !== "unavailable" ? new Date(record.atd) : null;
    if (!ata || !atd || isNaN(ata.getTime()) || isNaN(atd.getTime()))
        return null;
    return (atd.getTime() - ata.getTime()) / (1000 * 60 * 60);
}

function calculateUtilization(
    data: any[],
    terminalType: string,
    startDate: string,
    endDate: string
): number {
    const terminalWharfLengths = {
        PP: 13447,
        F2: 3000,
        Brani: 2325,
        Keppel: 3164,
    };

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const totalTime =
        (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

    if (totalTime <= 0) return 0;

    const safetyDistance = 30;

    // For ALL terminals, we need to calculate the sum of all terminals that have records
    if (terminalType === "ALL") {
        let totalNumerator = 0;
        let totalDenominator = 0;

        // Calculate for each terminal that has records
        for (const terminal of Object.keys(terminalWharfLengths)) {
            const terminalData = data.filter(
                (record) => record.terminal === terminal
            );
            if (terminalData.length === 0) continue; // Skip terminals with no records

            let terminalNumerator = 0;
            const wharfLength =
                terminalWharfLengths[
                    terminal as keyof typeof terminalWharfLengths
                ];

            for (const record of terminalData) {
                const atb =
                    record.atb !== "unavailable"
                        ? new Date(record.atb)
                        : startDateTime;
                const atu =
                    record.atu !== "unavailable"
                        ? new Date(record.atu)
                        : endDateTime;

                // Calculate actual berthing hours within the period
                const effectiveStart = new Date(
                    Math.max(atb.getTime(), startDateTime.getTime())
                );
                const effectiveEnd = new Date(
                    Math.min(atu.getTime(), endDateTime.getTime())
                );

                if (effectiveEnd > effectiveStart) {
                    const berthingHours =
                        (effectiveEnd.getTime() - effectiveStart.getTime()) /
                        (1000 * 60 * 60);
                    terminalNumerator +=
                        (record.vessellength + safetyDistance) * berthingHours;
                }
            }

            totalNumerator += terminalNumerator;
            totalDenominator += wharfLength * totalTime;
        }

        return totalDenominator > 0
            ? Number(((totalNumerator / totalDenominator) * 100).toFixed(3))
            : 0;
    }

    // For individual terminals
    const filteredData = data.filter(
        (record) => record.terminal === terminalType
    );
    if (filteredData.length === 0) return 0;

    const wharfLength =
        terminalWharfLengths[terminalType as keyof typeof terminalWharfLengths];
    let totalUtilization = 0;

    for (const record of filteredData) {
        const atb =
            record.atb !== "unavailable" ? new Date(record.atb) : startDateTime;
        const atu =
            record.atu !== "unavailable" ? new Date(record.atu) : endDateTime;

        // Calculate actual berthing hours within the period
        const effectiveStart = new Date(
            Math.max(atb.getTime(), startDateTime.getTime())
        );
        const effectiveEnd = new Date(
            Math.min(atu.getTime(), endDateTime.getTime())
        );

        if (effectiveEnd > effectiveStart) {
            const berthingHours =
                (effectiveEnd.getTime() - effectiveStart.getTime()) /
                (1000 * 60 * 60);
            totalUtilization +=
                (record.vessellength + safetyDistance) * berthingHours;
        }
    }

    return Number(
        ((totalUtilization / (wharfLength * totalTime)) * 100).toFixed(3)
    );
}

function processPortServiceData(data: any): PeriodDetail {
    if (
        !data ||
        !data["Container Vessel Activity Records"] ||
        !Array.isArray(data["Container Vessel Activity Records"])
    ) {
        console.error("Invalid or empty data received from API:", data);
        return {
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            "All vessels": {
                TotalBerthed: 0,
                JIT: 0,
                WaitingHours: { average: 0, median: 0 },
                BerthingHours: { average: 0, median: 0 },
                InPortHours: { average: 0, median: 0 },
                WharfUtilizationRate: {
                    PasirPanjang: 0,
                    Tuas: 0,
                    BraniKeppel: 0,
                },
            },
            "Category 1 vessels": {
                TotalBerthed: 0,
                JIT: 0,
                WaitingHours: { average: 0, median: 0 },
                BerthingHours: { average: 0, median: 0 },
                InPortHours: { average: 0, median: 0 },
                WharfUtilizationRate: {
                    PasirPanjang: 0,
                    Tuas: 0,
                    BraniKeppel: 0,
                },
            },
            "Category 2 vessels": {
                TotalBerthed: 0,
                JIT: 0,
                WaitingHours: { average: 0, median: 0 },
                BerthingHours: { average: 0, median: 0 },
                InPortHours: { average: 0, median: 0 },
                WharfUtilizationRate: {
                    PasirPanjang: 0,
                    Tuas: 0,
                    BraniKeppel: 0,
                },
            },
            "Category 3 vessels": {
                TotalBerthed: 0,
                JIT: 0,
                WaitingHours: { average: 0, median: 0 },
                BerthingHours: { average: 0, median: 0 },
                InPortHours: { average: 0, median: 0 },
                WharfUtilizationRate: {
                    PasirPanjang: 0,
                    Tuas: 0,
                    BraniKeppel: 0,
                },
            },
            "Category 4 vessels": {
                TotalBerthed: 0,
                JIT: 0,
                WaitingHours: { average: 0, median: 0 },
                BerthingHours: { average: 0, median: 0 },
                InPortHours: { average: 0, median: 0 },
                WharfUtilizationRate: {
                    PasirPanjang: 0,
                    Tuas: 0,
                    BraniKeppel: 0,
                },
            },
        };
    }

    const vesselData = data["Container Vessel Activity Records"]
        .map((record: any[]) => {
            if (!Array.isArray(record) || record.length < 10) {
                console.error("Invalid record format:", record);
                return null;
            }
            return {
                vesselname: record[0] || "unavailable",
                imo: record[1] || "unavailable",
                mmsi: record[2] || "unavailable",
                vesseltype: record[3] || "unavailable",
                vessellength: record[4] || 0,
                terminal: record[5] || "unavailable",
                ata: record[6] || "unavailable",
                atb: record[7] || "unavailable",
                atu: record[8] || "unavailable",
                atd: record[9] || "unavailable",
            };
        })
        .filter((record) => record !== null);

    const categories = [
        { name: "All vessels" as const, minLOA: 0, maxLOA: Infinity },
        { name: "Category 1 vessels" as const, minLOA: 0, maxLOA: 147 },
        { name: "Category 2 vessels" as const, minLOA: 147, maxLOA: 209 },
        { name: "Category 3 vessels" as const, minLOA: 209, maxLOA: 285 },
        { name: "Category 4 vessels" as const, minLOA: 285, maxLOA: 400 },
    ];

    const categoryResults: PeriodDetail = {
        startDate: "",
        endDate: "",
        "All vessels": {
            TotalBerthed: 0,
            JIT: 0,
            WaitingHours: { average: 0, median: 0 },
            BerthingHours: { average: 0, median: 0 },
            InPortHours: { average: 0, median: 0 },
            WharfUtilizationRate: { PasirPanjang: 0, Tuas: 0, BraniKeppel: 0 },
        },
        "Category 1 vessels": {
            TotalBerthed: 0,
            JIT: 0,
            WaitingHours: { average: 0, median: 0 },
            BerthingHours: { average: 0, median: 0 },
            InPortHours: { average: 0, median: 0 },
            WharfUtilizationRate: { PasirPanjang: 0, Tuas: 0, BraniKeppel: 0 },
        },
        "Category 2 vessels": {
            TotalBerthed: 0,
            JIT: 0,
            WaitingHours: { average: 0, median: 0 },
            BerthingHours: { average: 0, median: 0 },
            InPortHours: { average: 0, median: 0 },
            WharfUtilizationRate: { PasirPanjang: 0, Tuas: 0, BraniKeppel: 0 },
        },
        "Category 3 vessels": {
            TotalBerthed: 0,
            JIT: 0,
            WaitingHours: { average: 0, median: 0 },
            BerthingHours: { average: 0, median: 0 },
            InPortHours: { average: 0, median: 0 },
            WharfUtilizationRate: { PasirPanjang: 0, Tuas: 0, BraniKeppel: 0 },
        },
        "Category 4 vessels": {
            TotalBerthed: 0,
            JIT: 0,
            WaitingHours: { average: 0, median: 0 },
            BerthingHours: { average: 0, median: 0 },
            InPortHours: { average: 0, median: 0 },
            WharfUtilizationRate: { PasirPanjang: 0, Tuas: 0, BraniKeppel: 0 },
        },
    };

    // Calculate utilization rates - Fix the date calculation
    const validDates = vesselData
        .map((v: any) => ({
            ata: v.ata !== "unavailable" ? new Date(v.ata) : null,
            atb: v.atb !== "unavailable" ? new Date(v.atb) : null,
            atu: v.atu !== "unavailable" ? new Date(v.atu) : null,
            atd: v.atd !== "unavailable" ? new Date(v.atd) : null,
        }))
        .filter((dates) => {
            const validDates = [
                dates.ata,
                dates.atb,
                dates.atu,
                dates.atd,
            ].filter((date) => date && !isNaN(date.getTime()));
            return validDates.length > 0; // At least one valid date exists
        });

    if (validDates.length === 0) {
        console.warn("No valid dates found in vessel data");
        const now = new Date().toISOString();
        return {
            startDate: now,
            endDate: now,
            "All vessels": categoryResults["All vessels"],
            "Category 1 vessels": categoryResults["Category 1 vessels"],
            "Category 2 vessels": categoryResults["Category 2 vessels"],
            "Category 3 vessels": categoryResults["Category 3 vessels"],
            "Category 4 vessels": categoryResults["Category 4 vessels"],
        };
    }

    const startDate = new Date(
        Math.min(
            ...validDates.flatMap((d) =>
                [d.ata, d.atb, d.atu, d.atd]
                    .filter(
                        (date): date is Date =>
                            date !== null && !isNaN(date.getTime())
                    )
                    .map((date) => date.getTime())
            )
        )
    ).toISOString();

    const endDate = new Date(
        Math.max(
            ...validDates.flatMap((d) =>
                [d.ata, d.atb, d.atu, d.atd]
                    .filter(
                        (date): date is Date =>
                            date !== null && !isNaN(date.getTime())
                    )
                    .map((date) => date.getTime())
            )
        )
    ).toISOString();

    categoryResults.startDate = startDate;
    categoryResults.endDate = endDate;

    for (const category of categories) {
        const categoryData =
            category.name === "All vessels"
                ? vesselData
                : filterByCategory(
                      vesselData,
                      category.minLOA,
                      category.maxLOA
                  );

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
                    ? Number(((jitCount / totalBerthed) * 100).toFixed(2))
                    : 0;

            const waitingHours = terminalData
                .map((record) => calculateWaitingHours(record))
                .filter((val): val is number => val !== null);

            const berthingHours = terminalData
                .map((record) => calculateBerthingHours(record))
                .filter((val): val is number => val !== null);

            const inPortHours = terminalData
                .map((record) => calculateInPortHours(record))
                .filter((val): val is number => val !== null);

            return {
                terminal,
                totalBerthed,
                jitPercentage,
                waitingHours,
                berthingHours,
                inPortHours,
            };
        });

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
        const allInPortHours = terminalMetrics.flatMap((tm) => tm.inPortHours);

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

        // Calculate allterminals utilization for all categories
        const totalWharfLength = 18247; // ALL terminals length
        let totalUtilization = 0;

        for (const record of categoryData) {
            const atb =
                record.atb !== "unavailable"
                    ? new Date(record.atb)
                    : new Date(startDate);
            const atu =
                record.atu !== "unavailable"
                    ? new Date(record.atu)
                    : new Date(endDate);

            const effectiveStart = new Date(
                Math.max(atb.getTime(), new Date(startDate).getTime())
            );
            const effectiveEnd = new Date(
                Math.min(atu.getTime(), new Date(endDate).getTime())
            );

            if (effectiveEnd > effectiveStart) {
                const berthingHours =
                    (effectiveEnd.getTime() - effectiveStart.getTime()) /
                    (1000 * 60 * 60);
                totalUtilization += (record.vessellength + 30) * berthingHours;
            }
        }

        const totalTime =
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60);
        const allTerminalsUtil = Number(
            ((totalUtilization / (totalWharfLength * totalTime)) * 100).toFixed(
                3
            )
        );

        const wharfUtilizationRates = {
            allterminals: allTerminalsUtil,
            PasirPanjang: pasirrUtil,
            Tuas: tuasUtil,
            BraniKeppel: combinedBraniKeppel,
        };

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
            WharfUtilizationRate: wharfUtilizationRates,
        };
    }

    return categoryResults;
}

export { processPortServiceData };

function processPortInfoData(data: any, startDate: string, endDate: string) {
    if (
        !data ||
        !data["Container Vessel Activity Records"] ||
        !Array.isArray(data["Container Vessel Activity Records"])
    ) {
        console.error("Invalid or empty data received from API:", data);
        return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Convert raw records to VesselRecord type
    const vesselData = data["Container Vessel Activity Records"]
        .map(
            (record: any[]): VesselRecord => ({
                vesselname: record[0] || "unavailable",
                imo: record[1] || "unavailable",
                mmsi: record[2] || "unavailable",
                vesseltype: record[3] || "unavailable",
                vessellength: record[4] || 0,
                terminal: record[5] || "unavailable",
                ata: record[6] || "unavailable",
                atb: record[7] || "unavailable",
                atu: record[8] || "unavailable",
                atd: record[9] || "unavailable",
            })
        )
        .filter((record) => {
            const ata =
                record.ata !== "unavailable" ? new Date(record.ata) : null;
            const atd =
                record.atd !== "unavailable" ? new Date(record.atd) : null;
            return ata && atd && ata >= start && atd <= end;
        });

    // Group by terminal
    const terminalResults: TerminalResults = {};
    const terminals = ["PP", "F2", "Brani", "Keppel"];

    for (const terminal of terminals) {
        const terminalVessels = vesselData.filter(
            (record) => record.terminal === terminal
        );

        const waitingHours = terminalVessels
            .map((record) => calculateWaitingHours(record))
            .filter((hours): hours is number => hours !== null);

        const berthingHours = terminalVessels
            .map((record) => calculateBerthingHours(record))
            .filter((hours): hours is number => hours !== null);

        const inPortHours = terminalVessels
            .map((record) => calculateInPortHours(record))
            .filter((hours): hours is number => hours !== null);

        const validBerthingVessels = terminalVessels.filter((record) => {
            const waitingTime = calculateWaitingHours(record);
            return waitingTime !== null;
        });

        const jitCount = validBerthingVessels.filter((record) => {
            const waitingTime = calculateWaitingHours(record);
            return waitingTime !== null && waitingTime < 2;
        }).length;

        const utilization = calculateUtilization(
            terminalVessels,
            terminal,
            startDate,
            endDate
        );

        terminalResults[terminal] = {
            totalVessels: terminalVessels.length,
            jitPercentage:
                validBerthingVessels.length > 0
                    ? Number(
                          (
                              (jitCount / validBerthingVessels.length) *
                              100
                          ).toFixed(2)
                      )
                    : 0,
            waitingHours: {
                average: calculateAverage(waitingHours),
                median: calculateMedian(waitingHours),
            },
            berthingHours: {
                average: calculateAverage(berthingHours),
                median: calculateMedian(berthingHours),
            },
            inPortHours: {
                average: calculateAverage(inPortHours),
                median: calculateMedian(inPortHours),
            },
            utilization,
            vessels: terminalVessels,
        };
    }

    return {
        startDate,
        endDate,
        terminals: terminalResults,
    };
}

interface VesselRecord {
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
}

interface TerminalMetrics {
    totalVessels: number;
    jitPercentage: number;
    waitingHours: {
        average: number;
        median: number;
    };
    berthingHours: {
        average: number;
        median: number;
    };
    inPortHours: {
        average: number;
        median: number;
    };
    utilization: number;
    vessels: VesselRecord[];
}

interface TerminalResults {
    [terminal: string]: TerminalMetrics;
}

function calculateHours(
    start: Date | null,
    end: Date | null
): number | "unavailable" {
    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "unavailable";
    }
    const earlierDate = start.getTime() < end.getTime() ? start : end;
    const laterDate = start.getTime() < end.getTime() ? end : start;
    return Number(
        (
            (laterDate.getTime() - earlierDate.getTime()) /
            (1000 * 60 * 60)
        ).toFixed(2)
    );
}

function mapTerminalName(terminal: string): string {
    switch (terminal) {
        case "PP":
            return "Pasir Panjang Terminal";
        case "F2":
            return "Tuas Terminal";
        case "Brani":
            return "Brani and Keppel Terminal";
        case "Keppel":
            return "Brani and Keppel Terminal";
        default:
            return "Unknown Terminal";
    }
}
