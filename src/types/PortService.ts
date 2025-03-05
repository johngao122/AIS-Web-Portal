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

interface WharfUtilizationRate {
    allterminals?: number;
    PasirPanjang: number;
    Tuas: number;
    BraniKeppel: number;
}

export interface PeriodDetail {
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
        WharfUtilizationRate: WharfUtilizationRate;
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
        WharfUtilizationRate: WharfUtilizationRate;
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
        WharfUtilizationRate: WharfUtilizationRate;
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
        WharfUtilizationRate: WharfUtilizationRate;
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
        WharfUtilizationRate: WharfUtilizationRate;
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

export interface PortServicePeriod {
    [key: string]: PeriodDetail;
}

export type PortServiceData = Array<{ [key: string]: PeriodDetail }>;

export type { PortServiceCategory, CategoryResults };
