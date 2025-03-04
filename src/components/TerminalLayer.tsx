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
    const terminals = periodData.terminals;

    if (!terminals) {
        return [];
    }

    return [
        {
            name: "Pasir Panjang Terminal",
            position: [103.77, 1.28],
            stats: {
                totalVessels: terminals.PP.totalVessels,
                jitPercentage: terminals.PP.jitPercentage,
                avgWaitingHours: terminals.PP.waitingHours.average,
                avgBerthingHours: terminals.PP.berthingHours.average,
                utilization: terminals.PP.utilization || 0,
            },
        },
        {
            name: "Tuas Terminal",
            position: [103.65, 1.32],
            stats: {
                totalVessels: terminals.F2.totalVessels,
                jitPercentage: terminals.F2.jitPercentage,
                avgWaitingHours: terminals.F2.waitingHours.average,
                avgBerthingHours: terminals.F2.berthingHours.average,
                utilization: terminals.F2.utilization || 0,
            },
        },
        {
            name: "Brani Terminal",
            position: [103.83333, 1.255998976],
            stats: {
                totalVessels: terminals.Brani.totalVessels,
                jitPercentage: terminals.Brani.jitPercentage,
                avgWaitingHours: terminals.Brani.waitingHours.average,
                avgBerthingHours: terminals.Brani.berthingHours.average,
                utilization: terminals.Brani.utilization || 0,
            },
        },
        {
            name: "Keppel Terminal",
            position: [103.8475, 1.2647],
            stats: {
                totalVessels: terminals.Keppel.totalVessels,
                jitPercentage: terminals.Keppel.jitPercentage,
                avgWaitingHours: terminals.Keppel.waitingHours.average,
                avgBerthingHours: terminals.Keppel.berthingHours.average,
                utilization: terminals.Keppel.utilization || 0,
            },
        },
    ];
};

const fallbackTerminalData: Terminal[] = [
    {
        name: "Pasir Panjang Terminal",
        position: [103.77, 1.28],
        stats: {
            totalVessels: 150,
            jitPercentage: 85,
            avgWaitingHours: 4.5,
            avgBerthingHours: 24,
            utilization: 75,
        },
    },
    {
        name: "Tuas Terminal",
        position: [103.65, 1.32],
        stats: {
            totalVessels: 120,
            jitPercentage: 82,
            avgWaitingHours: 5.2,
            avgBerthingHours: 28,
            utilization: 70,
        },
    },
    {
        name: "Brani and Keppel Terminal",
        position: [103.84, 1.27],
        stats: {
            totalVessels: 100,
            jitPercentage: 80,
            avgWaitingHours: 6.0,
            avgBerthingHours: 26,
            utilization: 65,
        },
    },
];

export const fetchTerminalData = async (): Promise<Terminal[]> => {
    try {
        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const userStr =
            localStorage.getItem("User") || sessionStorage.getItem("User");
        if (!userStr) {
            console.error("No user token found for terminal data fetch");
            return fallbackTerminalData;
        }

        const userData = JSON.parse(userStr);
        if (!userData.token) {
            console.error("No token found in user data");
            return fallbackTerminalData;
        }

        const response = await fetch("/api/data/port_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify([
                {
                    name: "Period 1",
                    startDate: formatDate(oneMonthAgo),
                    endDate: formatDate(today),
                },
            ]),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(
                `Failed to fetch terminal data: ${response.status} ${response.statusText}`,
                errorText
            );
            return fallbackTerminalData;
        }

        const data = await response.json();
        if (!data || !Array.isArray(data)) {
            console.error("Invalid terminal data format received:", data);
            return fallbackTerminalData;
        }

        const transformedData = transformTerminalData(data);
        if (transformedData.length === 0) {
            console.warn(
                "No terminal data after transformation, using fallback data"
            );
            return fallbackTerminalData;
        }
        return transformedData;
    } catch (err) {
        console.error("Error fetching terminal data:", err);
        return fallbackTerminalData;
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
