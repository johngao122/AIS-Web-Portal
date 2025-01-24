/* eslint-disable */

import { NextResponse } from "next/server";
import vesselData from "@/data/vessel_activity_updated.json";

/**
 * Calculate the number of hours between two dates.
 * @param {Date | null} start The start date
 * @param {Date | null} end The end date
 * @returns {number | "unavailable"} The number of hours between the start and end dates, rounded to two decimal places, or "unavailable" if either the start or end date is null or invalid.
 */
function calculateHours(
    start: Date | null,
    end: Date | null
): number | "unavailable" {
    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "unavailable";
    }
    return Number(
        ((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(2)
    );
}

/**
 * Maps a terminal code to its full name.
 * @param {string} terminal The terminal code
 * @returns {string} The full name of the terminal
 */
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

/**
 * Handles a POST request to the /api/vessel-activity endpoint.
 *
 * This endpoint takes a JSON object with two properties: `startDate` and `endDate`.
 * The `startDate` and `endDate` properties must be in the format "YYYY-MM-DD HH:mm:ss".
 * The endpoint will return a JSON object with a `success` property set to `true`
 * and a `data` property containing an array of filtered records.
 *
 * The filtered records will be a subset of the records in the `vessel_activity_updated.json`
 * file, filtered by the start and end dates provided in the request.
 * The records will have the following additional properties:
 * - `terminal`: The full name of the terminal, mapped from the terminal code.
 * - `PreBerthingHours`: The number of hours between the arrival time and the berthing time.
 * - `AnchorageWaitingHours`: The number of hours between the arrival time and the berthing time.
 * - `BerthingHours`: The number of hours between the berthing time and the unberthing time.
 * - `InPortHours`: The number of hours between the arrival time and the departure time.
 *
 * If the request is invalid, the endpoint will return a JSON object with a `success` property set to `false`
 * and an appropriate error message.
 * If an unexpected error occurs, the endpoint will return a JSON object with a `success` property set to `false`
 * and an error message indicating an internal server error.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { startDate, endDate }: { startDate: string; endDate: string } =
            body;

        if (!startDate || !endDate) {
            return NextResponse.json(
                { message: "Start date and end date are required" },
                { status: 400 }
            );
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return NextResponse.json(
                { message: "Invalid date format" },
                { status: 400 }
            );
        }

        const filteredData = vesselData
            .map((record: any) => {
                const ata =
                    record.ata !== "unavailable" ? new Date(record.ata) : null;
                const atb =
                    record.atb !== "unavailable" ? new Date(record.atb) : null;
                const atu =
                    record.atu !== "unavailable" ? new Date(record.atu) : null;
                const atd =
                    record.atd !== "unavailable" ? new Date(record.atd) : null;

                const isWithinRange = [ata, atb, atu, atd].some(
                    (timestamp) =>
                        timestamp !== null &&
                        timestamp >= start &&
                        timestamp <= end
                );

                if (!isWithinRange) return null;

                const preBerthingHours = calculateHours(ata, atb);
                const anchorageWaitingHours = calculateHours(ata, atb);
                const berthingHours = calculateHours(atb, atu);
                const inPortHours = calculateHours(ata, atd);

                return {
                    ...record,
                    terminal: mapTerminalName(record.terminal), // Map terminal name to full name
                    PreBerthingHours: preBerthingHours,
                    AnchorageWaitingHours: anchorageWaitingHours,
                    BerthingHours: berthingHours,
                    InPortHours: inPortHours,
                };
            })
            .filter((record) => record !== null);

        return NextResponse.json({
            success: true,
            data: filteredData,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
