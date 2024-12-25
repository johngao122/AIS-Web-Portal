interface FilterOption {
    id: string;
    label: string;
    type: "text" | "range" | "select" | "number";
    logic?: "include" | "is" | "within" | "larger" | "smaller" | "notBlank";
    options?: string[];
    placeholder?: string;
    multiple?: boolean;
}
interface FilterValue {
    value: string | number | string[];
    additionalValue?: string | number; // For range values
}
interface FilterState {
    [key: string]: FilterValue;
}

export type { FilterOption, FilterValue, FilterState };
