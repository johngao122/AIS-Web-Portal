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

interface PeriodDetail {
    startDate: string;
    endDate: string;
    "All vessels": {
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
    "Category 1 vessels": {
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
    "Category 2 vessels": {
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
    "Category 3 vessels": {
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
    "Category 4 vessels": {
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

interface PortServicePeriod {
    [key: string]: PeriodDetail; // e.g., "Period 1", "Period 2"
}

type PortServiceData = PortServicePeriod[];

export type { PortServiceCategory, PortServiceData, CategoryResults };
