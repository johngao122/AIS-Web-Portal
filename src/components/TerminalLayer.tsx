/*eslint-disable*/

import { IconLayer } from "@deck.gl/layers";

const terminalIconUrl = `data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22lucide%20lucide-anchor%22%3E%3Cpath%20d%3D%22M12%2022V8%22/%3E%3Cpath%20d%3D%22M5%2012H2a10%2010%200%200%200%2020%200h-3%22/%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%225%22%20r%3D%223%22/%3E%3C/svg%3E`;

export interface TerminalStats {
    totalVessels: number;
    jitPercentage: number;
    avgWaitingHours: number;
    avgBerthingHours: number;
    utilization: number;
}

export interface Terminal {
    name: string;
    position: [number, number];
    stats: TerminalStats;
}

const transformTerminalData = (data: any[]): Terminal[] => {
    if (!data || !data[0] || !data[0]["Period 1"]) {
        return [];
    }

    const periodData = data[0]["Period 1"];
    const allVesselsData = periodData["All vessels"];

    if (!allVesselsData) {
        return [];
    }

    return [
        {
            name: "Pasir Panjang Terminal",
            position: [103.77, 1.28],
            stats: {
                totalVessels: Math.round(allVesselsData.TotalBerthed * 0.4),
                jitPercentage: allVesselsData.JIT,
                avgWaitingHours: allVesselsData.WaitingHours.average,
                avgBerthingHours: allVesselsData.BerthingHours.average,
                utilization: allVesselsData.WharfUtilizationRate.PasirPanjang,
            },
        },
        {
            name: "Tuas Terminal",
            position: [103.65, 1.32],
            stats: {
                totalVessels: Math.round(allVesselsData.TotalBerthed * 0.3),
                jitPercentage: allVesselsData.JIT,
                avgWaitingHours: allVesselsData.WaitingHours.average,
                avgBerthingHours: allVesselsData.BerthingHours.average,
                utilization: allVesselsData.WharfUtilizationRate.Tuas,
            },
        },
        {
            name: "Brani Terminal",
            position: [103.83333, 1.255998976],
            stats: {
                totalVessels: Math.round(allVesselsData.TotalBerthed * 0.15),
                jitPercentage: allVesselsData.JIT,
                avgWaitingHours: allVesselsData.WaitingHours.average,
                avgBerthingHours: allVesselsData.BerthingHours.average,
                utilization:
                    allVesselsData.WharfUtilizationRate.BraniKeppel / 2,
            },
        },
        {
            name: "Keppel Terminal",
            position: [103.8475, 1.2647],
            stats: {
                totalVessels: Math.round(allVesselsData.TotalBerthed * 0.15),
                jitPercentage: allVesselsData.JIT,
                avgWaitingHours: allVesselsData.WaitingHours.average,
                avgBerthingHours: allVesselsData.BerthingHours.average,
                utilization:
                    allVesselsData.WharfUtilizationRate.BraniKeppel / 2,
            },
        },
    ];
};

export const fetchTerminalData = async (): Promise<Terminal[]> => {
    try {
        const response = await fetch("/api/data/port_service", {
            //NOTE:CHANGE WHEN ACTUAL API IS UP
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([
                {
                    name: "Period 1",
                    startDate: "2024-10-01T00:00:00",
                    endDate: "2024-10-03T23:59:59",
                },
            ]),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch terminal data");
        }

        const data = await response.json();
        return transformTerminalData(data);
    } catch (err) {
        console.error("Error fetching terminal data:", err);
        return [];
    }
};

export const createTerminalLayer = ({
    data,
    onHover,
    visible = true,
}: {
    data: Terminal[];
    onHover: (info: any) => void;
    visible?: boolean;
}) => {
    return new IconLayer({
        id: "terminals",
        data,
        pickable: true,
        iconAtlas: terminalIconUrl,
        iconMapping: {
            terminal: { x: 0, y: 0, width: 48, height: 48, mask: true },
        },
        getIcon: () => "terminal",
        sizeScale: 2,
        getPosition: (d) => d.position,
        getSize: () => 24,
        getColor: () => [48, 128, 255],
        visible,
        onHover,
        parameters: {
            depthTest: false,
        },
    });
};
