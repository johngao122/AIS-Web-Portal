import { NextResponse } from "next/server";

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

type TerminalMetrics = {
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
};

type TerminalResults = {
    [terminal: string]: TerminalMetrics;
};

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

function calculateWaitingHours(record: VesselRecord): number | null {
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

function calculateBerthingHours(record: VesselRecord): number | null {
    const atb = record.atb !== "unavailable" ? new Date(record.atb) : null;
    const atu = record.atu !== "unavailable" ? new Date(record.atu) : null;
    if (
        !atb ||
        !atu ||
        isNaN(atb.getTime()) ||
        isNaN(atu.getTime()) ||
        atu < atb
    )
        return null;
    return (atu.getTime() - atb.getTime()) / (1000 * 60 * 60);
}

function calculateInPortHours(record: VesselRecord): number | null {
    const ata = record.ata !== "unavailable" ? new Date(record.ata) : null;
    const atd = record.atd !== "unavailable" ? new Date(record.atd) : null;
    if (
        !ata ||
        !atd ||
        isNaN(ata.getTime()) ||
        isNaN(atd.getTime()) ||
        atd < ata
    )
        return null;
    return (atd.getTime() - ata.getTime()) / (1000 * 60 * 60);
}

function calculateUtilization(
    vessels: VesselRecord[],
    terminal: string,
    startDate: string,
    endDate: string
): number {
    const terminalWharfLengths: { [key: string]: number } = {
        PP: 13447,
        F2: 3000,
        Brani: 2325,
        Keppel: 3164,
    };

    const totalTime =
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60); // in hours

    if (!terminalWharfLengths[terminal] || totalTime <= 0) {
        return 0;
    }

    const safetyDistance = 30;

    // Calculate numerator: Σ(LOA + safety_distance) × BerthingHours
    const numerator = vessels.reduce<number>((sum, record) => {
        const atb = record.atb !== "unavailable" ? new Date(record.atb) : null;
        const atu = record.atu !== "unavailable" ? new Date(record.atu) : null;

        if (
            !atb ||
            !atu ||
            isNaN(atb.getTime()) ||
            isNaN(atu.getTime()) ||
            atu < atb
        ) {
            return sum;
        }

        const berthingHours =
            (atu.getTime() - atb.getTime()) / (1000 * 60 * 60);
        return sum + berthingHours * (record.vessellength + safetyDistance);
    }, 0);

    // Calculate denominator: WharfLength × totaltime
    const denominator = terminalWharfLengths[terminal] * totalTime;

    return Number(((numerator / denominator) * 100).toFixed(2));
}

async function fetchVesselData(
    period: string,
    startDate: string,
    endDate: string,
    authToken: string
) {
    try {
        const API = process.env.NEXT_PUBLIC_API;

        const formatDate = (dateStr: string) => {
            const date = new Date(dateStr);
            return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
                2,
                "0"
            )}${String(date.getDate()).padStart(2, "0")}`;
        };

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
                    start_date: formatDate(startDate),
                    end_date: formatDate(endDate),
                }),
            }
        );

        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        return data["Container Vessel Activity Records"].map(
            (record: any[]): VesselRecord => ({
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
                    [name]: { message: "Start date and end date are required" },
                });
                continue;
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                response.push({ [name]: { message: "Invalid date format" } });
                continue;
            }

            const periodNumber = name.match(/\d+/)?.[0] || "1";
            const vesselData = await fetchVesselData(
                `Period ${periodNumber}`,
                startDate,
                endDate,
                authHeader
            );

            // Filter data within date range
            const filteredData = vesselData.filter((record: VesselRecord) => {
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
                const terminalVessels = filteredData.filter(
                    (record: VesselRecord) => record.terminal === terminal
                );

                const waitingHours = terminalVessels
                    .map((record: VesselRecord) =>
                        calculateWaitingHours(record)
                    )
                    .filter(
                        (hours: number | null): hours is number =>
                            hours !== null
                    );

                const berthingHours = terminalVessels
                    .map((record: VesselRecord) =>
                        calculateBerthingHours(record)
                    )
                    .filter(
                        (hours: number | null): hours is number =>
                            hours !== null
                    );

                const inPortHours = terminalVessels
                    .map((record: VesselRecord) => calculateInPortHours(record))
                    .filter(
                        (hours: number | null): hours is number =>
                            hours !== null
                    );

                const validBerthingVessels = terminalVessels.filter(
                    (record: VesselRecord) => {
                        const waitingTime = calculateWaitingHours(record);
                        return waitingTime !== null; // Only count vessels with valid ATA and ATB
                    }
                );

                const jitCount = validBerthingVessels.filter(
                    (record: VesselRecord) => {
                        const waitingTime = calculateWaitingHours(record);
                        return waitingTime !== null && waitingTime < 2;
                    }
                ).length;

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

            response.push({
                [name]: {
                    startDate,
                    endDate,
                    terminals: terminalResults,
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
