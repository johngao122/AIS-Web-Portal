/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Calendar, Filter, ChevronLeft, AlertCircle } from "lucide-react";
import { VesselIcon } from "@/resources/dashboard";
import Image from "next/image";
import DateTimePicker from "./DatePicker";
import VesselActivity from "@/types/VesselActivity";
import type { FilterOption, FilterState } from "@/types/Filters";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
const TERMINALS = [
    "Brani and Keppel Terminal",
    "Tuas Terminal",
    "Pasir Panjang Terminal",
];

interface FloatingActionButtonProps {
    onVesselDataUpdate: (data: VesselActivity[] | null, fabData?: any) => void;
    initialStartDate?: Date;
    initialEndDate?: Date;
    initialFilters?: FilterState;
    isItExpanded: boolean;
    onClose: () => void;
}

const filterOptions: FilterOption[] = [
    {
        id: "vesselName",
        label: "Vessel Name",
        type: "text",
        logic: "include",
        placeholder: "Type vessel name to include",
    },
    {
        id: "imoNumber",
        label: "IMO",
        type: "text",
        logic: "is",
        placeholder: "Enter IMO number",
    },
    {
        id: "mmsi",
        label: "MMSI",
        type: "text",
        logic: "is",
        placeholder: "Enter MMSI number",
    },
    {
        id: "loa",
        label: "LOA",
        type: "range",
        logic: "within",
        placeholder: "Enter LOA range",
    },
    {
        id: "terminal",
        label: "Terminal",
        type: "select",
        options: TERMINALS,
        placeholder: "Select terminals",
        multiple: false,
    },
    {
        id: "multipleRecords",
        label: "Multiple records of a vessel",
        type: "number",
        logic: "larger",
        placeholder: "Min number of records",
    },
    {
        id: "ata",
        label: "ATA",
        type: "select",
        logic: "notBlank",
        placeholder: "Has ATA",
    },
    {
        id: "atu",
        label: "ATU",
        type: "select",
        logic: "notBlank",
        placeholder: "Has ATU",
    },
    {
        id: "atd",
        label: "ATD",
        type: "select",
        logic: "notBlank",
        placeholder: "Has ATD",
    },
    {
        id: "preBerthingHours",
        label: "Pre-berthing Hours",
        type: "range",
        logic: "larger",
        placeholder: "Enter hours range",
    },
    {
        id: "anchorageWaitingHours",
        label: "Anchorage waiting hours",
        type: "range",
        logic: "larger",
        placeholder: "Enter hours range",
    },
    {
        id: "berthingHours",
        label: "Berthing Hours",
        type: "range",
        logic: "larger",
        placeholder: "Enter hours range",
    },
    {
        id: "inPortHours",
        label: "In Port Hours",
        type: "range",
        logic: "larger",
        placeholder: "Enter hours range",
    },
];

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    onVesselDataUpdate,
    initialStartDate,
    initialEndDate,
    initialFilters,
    isItExpanded,
    onClose,
}) => {
    const [showStartDatePicker, setShowStartDatePicker] =
        useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [filterValues, setFilterValues] = useState<FilterState>({});
    const [dateError, setDateError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rangeValues, setRangeValues] = useState<
        Record<string, { min: string; max: string }>
    >({});
    const [rangeValidationErrors, setRangeValidationErrors] = useState<
        Record<string, string>
    >({});

    useEffect(() => {
        setStartDate(initialStartDate);
    }, [initialStartDate]);

    useEffect(() => {
        setEndDate(initialEndDate);
    }, [initialEndDate]);

    useEffect(() => {
        if (initialFilters) {
            setFilterValues(initialFilters);
        }
    }, [initialFilters]);

    useEffect(() => {
        if (initialEndDate || initialStartDate) {
            const endDateTime = initialEndDate
                ? new Date(initialEndDate)
                : new Date();

            const startDateTime = initialStartDate
                ? new Date(initialStartDate)
                : new Date(endDateTime);
            startDateTime.setMonth(startDateTime.getMonth());

            setStartDate(startDateTime);
            setEndDate(endDateTime);
        }

        if (initialFilters) {
            setFilterValues(initialFilters);
        }
    }, [isItExpanded, initialStartDate, initialEndDate, initialFilters]);

    useEffect(() => {
        if (initialFilters) {
            const initialRangeValues: Record<
                string,
                { min: string; max: string }
            > = {};
            Object.entries(initialFilters).forEach(([key, value]) => {
                if (value.additionalValue !== undefined) {
                    initialRangeValues[key] = {
                        min: value.value?.toString() || "",
                        max: value.additionalValue?.toString() || "",
                    };
                }
            });
            setRangeValues(initialRangeValues);
        }
    }, [initialFilters]);

    const formatDateTime = (date: Date): string => {
        return `${date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })} ${date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        })}`;
    };

    const validateDates = (start: Date | undefined, end: Date | undefined) => {
        if (!start || !end) return true;

        // Get date-only components
        const startDateOnly = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate()
        );
        const endDateOnly = new Date(
            end.getFullYear(),
            end.getMonth(),
            end.getDate()
        );

        // If dates are different, just check the date
        if (startDateOnly.getTime() !== endDateOnly.getTime()) {
            return end.getTime() >= start.getTime();
        }

        // If same date, compare times
        const startTime =
            start.getHours() * 3600 +
            start.getMinutes() * 60 +
            start.getSeconds();
        const endTime =
            end.getHours() * 3600 + end.getMinutes() * 60 + end.getSeconds();

        return endTime > startTime;
    };

    const validateRangeValues = (
        min: string | number,
        max: string | number
    ): boolean => {
        const minVal = Number(min);
        const maxVal = Number(max);

        return minVal >= 0 && maxVal >= 0 && maxVal >= minVal;
    };

    useEffect(() => {
        if (startDate && endDate) {
            if (!validateDates(startDate, endDate)) {
                if (isSameDay(startDate, endDate)) {
                    setDateError("End time must be later than start time");
                } else {
                    setDateError("End date cannot be earlier than start date");
                }
            } else {
                setDateError("");
            }
        } else {
            setDateError("");
        }
    }, [startDate, endDate]);

    const isSameDay = (date1: Date, date2: Date): boolean => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const handleClearFilters = () => {
        const emptyFilters: FilterState = {};
        filterOptions.forEach((filter) => {
            if (filter.type === "range") {
                emptyFilters[filter.id] = { value: "", additionalValue: "" };
            } else {
                emptyFilters[filter.id] = { value: "" };
            }
        });
        setFilterValues(emptyFilters);

        const emptyRangeValues: Record<string, { min: string; max: string }> =
            {};
        filterOptions.forEach((filter) => {
            if (filter.type === "range") {
                emptyRangeValues[filter.id] = { min: "", max: "" };
            }
        });
        setRangeValues(emptyRangeValues);
        setRangeValidationErrors({}); // Clear validation errors
    };

    const handleDateSelect = (date: Date, isStart: boolean): void => {
        if (isStart) {
            setStartDate(date);
            if (endDate && !validateDates(date, endDate)) {
                if (isSameDay(date, endDate)) {
                    setDateError("End time must be later than start time");
                } else {
                    setDateError("End date cannot be earlier than start date");
                }
            } else {
                setDateError("");
            }
        } else {
            setEndDate(date);
            if (startDate && !validateDates(startDate, date)) {
                if (isSameDay(startDate, date)) {
                    setDateError("End time must be later than start time");
                } else {
                    setDateError("End date cannot be earlier than start date");
                }
            } else {
                setDateError("");
            }
        }
    };

    const handleExpandClick = () => {
        onVesselDataUpdate(null, {
            isExpanded: true,
            startDate,
            endDate,
            filterValues,
        });
    };

    const handleFilterChange = (
        id: string,
        value: string | number | string[],
        additionalValue?: string | number
    ) => {
        setFilterValues((prev) => ({
            ...prev,
            [id]: { value, additionalValue },
        }));
    };

    const handleRangeFilterChange = (
        id: string,
        value: string,
        isMin: boolean
    ) => {
        let numValue =
            value === "" ? "" : Math.max(0, Number(value)).toString();

        setRangeValues((prev) => {
            const currentRange = prev[id] || { min: "", max: "" };
            const newRange = isMin
                ? { ...currentRange, min: numValue }
                : { ...currentRange, max: numValue };

            const min = isMin ? numValue : currentRange.min;
            const max = !isMin ? numValue : currentRange.max;

            if (min !== "" && max !== "") {
                if (Number(min) > Number(max)) {
                    setRangeValidationErrors((prev) => ({
                        ...prev,
                        [id]: "Min value cannot be greater than max value",
                    }));
                } else {
                    setRangeValidationErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors[id];
                        return newErrors;
                    });
                }
            } else {
                setRangeValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[id];
                    return newErrors;
                });
            }

            return {
                ...prev,
                [id]: newRange,
            };
        });

        setFilterValues((prev) => ({
            ...prev,
            [id]: {
                value: isMin ? numValue : prev[id]?.value || "",
                additionalValue: !isMin
                    ? numValue
                    : prev[id]?.additionalValue || "",
            },
        }));
    };

    const renderFilterInput = (filter: FilterOption) => {
        const currentValue = filterValues[filter.id]?.value || "";
        const additionalValue = filterValues[filter.id]?.additionalValue;

        switch (filter.type) {
            case "text":
                return (
                    <input
                        type="text"
                        value={currentValue as string}
                        onChange={(e) =>
                            handleFilterChange(filter.id, e.target.value)
                        }
                        placeholder={filter.placeholder}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                );
            case "range": {
                const rangeValue = rangeValues[filter.id] || {
                    min: "",
                    max: "",
                };
                const error = rangeValidationErrors[filter.id];
                return (
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={rangeValue.min}
                                onChange={(e) =>
                                    handleRangeFilterChange(
                                        filter.id,
                                        e.target.value,
                                        true
                                    )
                                }
                                placeholder="Min"
                                min="0"
                                className={`w-1/2 px-3 py-2 border rounded-md ${
                                    error ? "border-red-500" : ""
                                }`}
                            />
                            <input
                                type="number"
                                value={rangeValue.max}
                                onChange={(e) =>
                                    handleRangeFilterChange(
                                        filter.id,
                                        e.target.value,
                                        false
                                    )
                                }
                                placeholder="Max"
                                min="0"
                                className={`w-1/2 px-3 py-2 border rounded-md ${
                                    error ? "border-red-500" : ""
                                }`}
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                    </div>
                );
            }
            case "select":
                if (filter.logic === "notBlank") {
                    return (
                        <select
                            value={currentValue as string}
                            onChange={(e) =>
                                handleFilterChange(filter.id, e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="">Any</option>
                            <option value="true">Has value</option>
                            <option value="false">No value</option>
                        </select>
                    );
                }
                if (!filter.multiple) {
                    return (
                        <select
                            value={currentValue as string}
                            onChange={(e) =>
                                handleFilterChange(filter.id, e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="">Select {filter.label}</option>
                            {filter.options?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    );
                }
                return (
                    <select
                        multiple
                        value={Array.isArray(currentValue) ? currentValue : []}
                        onChange={(e) =>
                            handleFilterChange(
                                filter.id,
                                Array.from(
                                    e.target.selectedOptions,
                                    (option) => option.value
                                )
                            )
                        }
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        {filter.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case "number":
                return (
                    <input
                        type="number"
                        value={currentValue as number}
                        onChange={(e) =>
                            handleFilterChange(filter.id, e.target.value)
                        }
                        placeholder={filter.placeholder}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                );
            default:
                return null;
        }
    };

    const handleClearDates = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setDateError("");
    };

    const handleShowVesselActivity = async () => {
        setIsLoading(true);
        try {
            const response = await import("@/data/example/VesselActivity.json");
            onVesselDataUpdate(response.default, {
                isExpanded: true,
                startDate,
                endDate,
                filterValues: filterValues,
            });
        } catch (error) {
            console.error("Error loading vessel data:", error);
            onVesselDataUpdate(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full w-full">
            {isItExpanded ? (
                <Card className="h-full flex flex-col">
                    <CardHeader className="flex-none flex-row items-center justify-between space-y-0 bg-emerald-500 text-white rounded-t-lg h-14">
                        <div className="flex items-center gap-2">
                            <Image
                                src={VesselIcon}
                                alt="Vessel Info"
                                width={24}
                                height={24}
                            />
                            <CardTitle className="text-lg text-white">
                                Vessel Information
                            </CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-white hover:bg-emerald-600 hover:text-white"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </CardHeader>

                    {/* Fixed Date Range Section */}
                    <div className="flex-none p-4 space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <span className="font-medium">
                                        Select Date Range
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearDates}
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Clear
                                </Button>
                            </div>

                            {dateError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {dateError}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Date Select Fields */}
                            <div className="space-y-2">
                                {/* Start Date Picker */}
                                <div className="relative">
                                    <div className="flex items-stretch h-16">
                                        <div className="px-4 py-2 bg-green-500 text-white rounded-l-md flex w-[97px] items-center">
                                            <span className="font-medium">
                                                Start date
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center justify-between w-full px-4 py-2 bg-white border border-green-500 rounded-r-md cursor-pointer"
                                            onClick={() => {
                                                setShowStartDatePicker(
                                                    !showStartDatePicker
                                                );
                                                setShowEndDatePicker(false);
                                            }}
                                        >
                                            <span className="text-gray-500 select-none">
                                                {startDate
                                                    ? formatDateTime(startDate)
                                                    : "DD MM. YYYY 00:00:00"}
                                            </span>
                                            <span
                                                className={`transition-transform duration-200 ${
                                                    showStartDatePicker
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                ▼
                                            </span>
                                        </div>
                                    </div>
                                    {showStartDatePicker && (
                                        <div className="absolute top-full left-0 mt-1 w-full z-50">
                                            <DateTimePicker
                                                onSelect={(date) =>
                                                    handleDateSelect(date, true)
                                                }
                                                onClose={() =>
                                                    setShowStartDatePicker(
                                                        false
                                                    )
                                                }
                                                selectedDate={startDate}
                                                maxDate={endDate}
                                                isStartDate={true}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* End Date Picker */}
                                <div className="relative">
                                    <div className="flex items-stretch h-16">
                                        <div className="px-4 py-2 bg-green-500 text-white rounded-l-md flex w-[97px] items-center">
                                            <span className="font-medium">
                                                End date
                                            </span>
                                        </div>
                                        <div
                                            className={`flex items-center justify-between w-full px-4 py-2 bg-white border ${
                                                dateError
                                                    ? "border-red-500"
                                                    : "border-green-500"
                                            } rounded-r-md cursor-pointer`}
                                            onClick={() => {
                                                setShowEndDatePicker(
                                                    !showEndDatePicker
                                                );
                                                setShowStartDatePicker(false);
                                            }}
                                        >
                                            <span
                                                className={
                                                    dateError
                                                        ? "text-red-600"
                                                        : "text-gray-500"
                                                }
                                            >
                                                {endDate
                                                    ? formatDateTime(endDate)
                                                    : "DD MM. YYYY 00:00:00"}
                                            </span>
                                            <span
                                                className={`transition-transform duration-200 ${
                                                    showEndDatePicker
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            >
                                                ▼
                                            </span>
                                        </div>
                                    </div>
                                    {showEndDatePicker && (
                                        <div className="absolute top-full left-0 mt-1 w-full z-50">
                                            <DateTimePicker
                                                onSelect={(date) =>
                                                    handleDateSelect(
                                                        date,
                                                        false
                                                    )
                                                }
                                                onClose={() =>
                                                    setShowEndDatePicker(false)
                                                }
                                                selectedDate={endDate}
                                                minDate={startDate}
                                                isStartDate={false}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Filters Section */}
                    <div className="flex-1 min-h-0">
                        <ScrollArea className="h-full px-4">
                            <div className="space-y-2 pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-5 w-5" />
                                        <span className="font-medium">
                                            Parameter Filters
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearFilters}
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                    >
                                        Clear all
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {filterOptions.map((filter) => (
                                        <div
                                            key={filter.id}
                                            className="space-y-1.5"
                                        >
                                            <Label>{filter.label}</Label>
                                            {filter.type === "text" && (
                                                <div className="relative p-[1px]">
                                                    <Input
                                                        value={
                                                            filterValues[
                                                                filter.id
                                                            ]?.value || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleFilterChange(
                                                                filter.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={
                                                            filter.placeholder
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {filter.type === "range" && (
                                                <div className="space-y-2">
                                                    <div className="relative p-[1px]">
                                                        <div className="flex gap-2">
                                                            <Input
                                                                type="number"
                                                                value={
                                                                    rangeValues[
                                                                        filter
                                                                            .id
                                                                    ]?.min || ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleRangeFilterChange(
                                                                        filter.id,
                                                                        e.target
                                                                            .value,
                                                                        true
                                                                    )
                                                                }
                                                                placeholder="Min"
                                                                min="0"
                                                                className={
                                                                    rangeValidationErrors[
                                                                        filter
                                                                            .id
                                                                    ]
                                                                        ? "border-red-500"
                                                                        : ""
                                                                }
                                                            />
                                                            <Input
                                                                type="number"
                                                                value={
                                                                    rangeValues[
                                                                        filter
                                                                            .id
                                                                    ]?.max || ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleRangeFilterChange(
                                                                        filter.id,
                                                                        e.target
                                                                            .value,
                                                                        false
                                                                    )
                                                                }
                                                                placeholder="Max"
                                                                min="0"
                                                                className={
                                                                    rangeValidationErrors[
                                                                        filter
                                                                            .id
                                                                    ]
                                                                        ? "border-red-500"
                                                                        : ""
                                                                }
                                                            />
                                                        </div>
                                                        {rangeValidationErrors[
                                                            filter.id
                                                        ] && (
                                                            <p className="text-red-500 text-sm">
                                                                {
                                                                    rangeValidationErrors[
                                                                        filter
                                                                            .id
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {filter.type === "select" && (
                                                <Select
                                                    value={
                                                        filterValues[
                                                            filter.id
                                                        ]?.value?.toString() ||
                                                        "_none"
                                                    }
                                                    onValueChange={(value) =>
                                                        handleFilterChange(
                                                            filter.id,
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                filter.placeholder
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {filter.logic ===
                                                        "notBlank" ? (
                                                            <>
                                                                <SelectItem value="_any">
                                                                    Any
                                                                </SelectItem>
                                                                <SelectItem value="true">
                                                                    Has value
                                                                </SelectItem>
                                                                <SelectItem value="false">
                                                                    No value
                                                                </SelectItem>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <SelectItem value="_none">
                                                                    Select{" "}
                                                                    {
                                                                        filter.label
                                                                    }
                                                                </SelectItem>
                                                                {filter.options?.map(
                                                                    (
                                                                        option
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                option
                                                                            }
                                                                            value={
                                                                                option
                                                                            }
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            {filter.type === "number" && (
                                                <Input
                                                    type="number"
                                                    value={
                                                        filterValues[filter.id]
                                                            ?.value || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleFilterChange(
                                                            filter.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={
                                                        filter.placeholder
                                                    }
                                                    min="0"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                    </div>

                    <CardFooter className="flex-none p-4 bg-white border-t">
                        <Button
                            className="w-full"
                            disabled={
                                !startDate ||
                                !endDate ||
                                dateError !== "" ||
                                isLoading ||
                                Object.keys(rangeValidationErrors).length > 0
                            }
                            onClick={handleShowVesselActivity}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                "Show container vessel activity"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    onClick={handleExpandClick}
                    className="w-12 h-12 p-0 rounded-full bg-emerald-500 hover:bg-emerald-600"
                >
                    <Image
                        src={VesselIcon}
                        alt="Vessel Info"
                        width={24}
                        height={24}
                        className="brightness-0 invert"
                    />
                </Button>
            )}
        </div>
    );
};

export default FloatingActionButton;
