/* eslint-disable */

import { NextResponse } from "next/server";
import vesselData from "@/data/vessel_activity_updated.json";

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
