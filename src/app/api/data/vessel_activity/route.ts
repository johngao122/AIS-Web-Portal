/* eslint-disable */

import { NextResponse } from "next/server";

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
    // Ensure we're calculating from earlier date to later date
    const earlierDate = start.getTime() < end.getTime() ? start : end;
    const laterDate = start.getTime() < end.getTime() ? end : start;

    return Number(
        (
            (laterDate.getTime() - earlierDate.getTime()) /
            (1000 * 60 * 60)
        ).toFixed(2)
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

type VesselRecord = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string | null
];

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json(
                { message: "Authorization header is required" },
                { status: 401 }
            );
        }

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

        // Format dates for API request
        const formattedStartDate = start
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "");
        const formattedEndDate = end
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "");

        // Fetch data from API
        const API = process.env.NEXT_PUBLIC_API;

        const apiResponse = await fetch(
            `${API}/get_container_vessel_activity`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
                body: JSON.stringify({
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                }),
            }
        );

        if (!apiResponse.ok) {
            throw new Error(
                `API request failed with status ${apiResponse.status}`
            );
        }

        const apiData = await apiResponse.json();

        const vesselRecords: VesselRecord[] =
            apiData["Container Vessel Activity Records"];

        const processedData = vesselRecords.map((record) => {
            const [
                vesselName,
                imoNumber,
                mmsiNumber,
                vesselType,
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

            // Log warning if dates are in unexpected order
            if (ataDate && atbDate && atbDate < ataDate) {
                console.warn(
                    `Warning: ATB (${atb}) is before ATA (${ata}) for vessel ${vesselName}`
                );
            }
            if (atbDate && atuDate && atuDate < atbDate) {
                console.warn(
                    `Warning: ATU (${atu}) is before ATB (${atb}) for vessel ${vesselName}`
                );
            }
            if (ataDate && atdDate && atdDate < ataDate) {
                console.warn(
                    `Warning: ATD (${atd}) is before ATA (${ata}) for vessel ${vesselName}`
                );
            }

            return {
                vesselName,
                imoNumber,
                mmsiNumber,
                vesselType,
                length: Number(length),
                terminal: mapTerminalName(terminal),
                ata,
                atb,
                atu,
                atd,
                PreBerthingHours: calculateHours(ataDate, atbDate),
                AnchorageWaitingHours: calculateHours(ataDate, atbDate),
                BerthingHours: calculateHours(atbDate, atuDate),
                InPortHours: calculateHours(ataDate, atdDate),
            };
        });

        return NextResponse.json({
            success: true,
            data: processedData,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
