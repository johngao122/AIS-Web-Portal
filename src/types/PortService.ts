interface PortServiceCategory {
    totalVessels: number;
    entered: number;
    berthed: number;
    jitPercentage: number;
    avgWaiting: number;
    medianWaiting: number;
    avgBerthing: number;
    medianBerthing: number;
    avgPortStay: number;
    medianPortStay: number;
    wharfUtilization: number;
}

interface PortServiceData {
    "Port Service Levels Analysis": {
        "Key KPIs": Array<{
            name: string;
            Aggregated: number;
            "Category 1 (LOA ∈ (0,147])": number;
            "Category 2 (LOA ∈ (147, 209])": number;
            "Category 3 (LOA ∈ (209, 285])": number;
            "Category 4 (LOA ∈ (285, 400])": number;
        }>;
    };
}

export type { PortServiceCategory, PortServiceData };
