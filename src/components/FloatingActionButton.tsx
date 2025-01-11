/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Calendar, Filter, ChevronLeft, AlertCircle } from "lucide-react";
import { VesselIcon } from "@/resources/dashboard";
import Image from "next/image";
import DateTimePicker from "./DatePicker";
import VesselActivity from "@/types/VesselActivity";
import type { PortServiceData } from "@/types/PortService";
import type { FilterOption, FilterState, FilterValue } from "@/types/Filters";

const TERMINALS = [
    "Brani Terminal",
    "Keppel Terminal",
    "Tuas Terminal",
    "Pasir Panjang Terminal",
];

interface FloatingActionButtonProps {
    onVesselDataUpdate: (data: VesselActivity[] | null, fabData?: any) => void;
    onPortServiceDataUpdate: (
        data: PortServiceData | null,
        fabData?: {
            isExpanded: boolean;
            startDate?: Date;
            endDate?: Date;
            selectedFilters?: FilterState;
        }
    ) => void;
    initialStartDate?: Date;
    initialEndDate?: Date;
    initialFilters?: FilterState;
    isItExpanded?: boolean;
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
        id: "atb",
        label: "ATB",
        type: "select",
        logic: "notBlank",
        placeholder: "Has ATB",
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
    onPortServiceDataUpdate,
    initialStartDate,
    initialEndDate,
    initialFilters,
    isItExpanded,
}) => {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [showStartDatePicker, setShowStartDatePicker] =
        useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [filterValues, setFilterValues] = useState<FilterState>({});
    const [dateError, setDateError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setExpanded(!!isItExpanded);
    }, [isItExpanded]);

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
        if (isItExpanded !== undefined) {
            setExpanded(!!isItExpanded);
        }

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
    };

    const handleAnalyzePortService = async () => {
        setIsLoading(true);
        try {
            const response = await import(
                "@/data/example/PortServiceLevel.json"
            );
            onPortServiceDataUpdate(response.default, {
                isExpanded: true,
                startDate,
                endDate,
                selectedFilters: filterValues,
            });
        } catch (error) {
            console.error("Error loading port service data:", error);
            onPortServiceDataUpdate(null);
        } finally {
            setIsLoading(false);
        }
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

    const handleExpand = (expanded: boolean, data?: any) => {
        setExpanded(expanded);
        onVesselDataUpdate(data, { isExpanded: expanded });
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
            case "range":
                return (
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={
                                currentValue === "" ||
                                currentValue === undefined
                                    ? ""
                                    : currentValue
                            }
                            onChange={(e) => {
                                const newValue = e.target.value;
                                handleFilterChange(
                                    filter.id,
                                    newValue === "" ? "" : Number(newValue),
                                    additionalValue
                                );
                            }}
                            placeholder="Min"
                            className="w-1/2 px-3 py-2 border rounded-md"
                        />
                        <input
                            type="number"
                            value={
                                additionalValue === "" ||
                                additionalValue === undefined
                                    ? ""
                                    : additionalValue
                            }
                            onChange={(e) => {
                                const newValue = e.target.value;
                                handleFilterChange(
                                    filter.id,
                                    currentValue,
                                    newValue === "" ? "" : Number(newValue)
                                );
                            }}
                            placeholder="Max"
                            className="w-1/2 px-3 py-2 border rounded-md"
                        />
                    </div>
                );
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
            <div
                className={`
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${
                        isExpanded
                            ? "w-auto max-w-md bg-white rounded-lg shadow-lg h-full flex flex-col"
                            : "w-12 h-12"
                    }
                `}
            >
                {isExpanded ? (
                    <div className="w-full relative flex flex-col h-full">
                        {/* Header - Fixed */}
                        <div className="flex-none flex items-center justify-between p-4 bg-emerald-500 text-white rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={VesselIcon}
                                    alt="Vessel Info"
                                    width={24}
                                    height={24}
                                />
                                <span className="text-lg">
                                    Vessel Information
                                </span>
                            </div>
                            <button
                                onClick={() => setExpanded(false)}
                                className="p-1 hover:bg-emerald-600 rounded-full"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 space-y-4">
                                {/* Date Range Section */}
                                <div className="space-y-2">
                                    {/* Date Range Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={20} />
                                            <span className="font-medium">
                                                Select Date Range
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleClearDates}
                                            className="text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Clear
                                        </button>
                                    </div>

                                    {/* Error Message */}
                                    {dateError && (
                                        <div className="flex items-center gap-2 p-2 bg-red-50 text-red-600 rounded-md">
                                            <AlertCircle size={16} />
                                            <span className="text-sm">
                                                {dateError}
                                            </span>
                                        </div>
                                    )}

                                    {/* Date Select Fields */}
                                    <div className="flex flex-col space-y-2">
                                        {/* Start Date */}
                                        <div className="relative w-full">
                                            <div className="flex items-stretch w-full">
                                                <div className="px-4 py-2 bg-green-500 text-white rounded-l-md flex w-[100px] items-center">
                                                    <span className="font-medium whitespace-nowrap">
                                                        start date
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex items-center justify-between w-full px-4 py-2 bg-white border border-green-500 rounded-r-md cursor-pointer"
                                                    onClick={() => {
                                                        setShowStartDatePicker(
                                                            !showStartDatePicker
                                                        );
                                                        setShowEndDatePicker(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <span className="text-gray-500 select-none">
                                                        {startDate
                                                            ? formatDateTime(
                                                                  startDate
                                                              )
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
                                                            handleDateSelect(
                                                                date,
                                                                true
                                                            )
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

                                        {/* End Date */}
                                        <div className="relative w-full">
                                            <div className="flex items-stretch w-full">
                                                <div className="px-4 py-2 bg-green-500 text-white rounded-l-md flex w-[100px] items-center">
                                                    <span className="font-medium whitespace-nowrap">
                                                        end date
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
                                                        setShowStartDatePicker(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <span
                                                        className={`${
                                                            dateError
                                                                ? "text-red-600"
                                                                : "text-gray-500"
                                                        } select-none`}
                                                    >
                                                        {endDate
                                                            ? formatDateTime(
                                                                  endDate
                                                              )
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
                                                            setShowEndDatePicker(
                                                                false
                                                            )
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

                                {/* Filter Section */}
                                <div className="space-y-2 w-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Filter size={20} />
                                            <span className="font-medium">
                                                Parameter Filters
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleClearFilters()}
                                            className="text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                    {/* Filter list with dynamic height */}
                                    <div
                                        className="space-y-3 overflow-y-auto"
                                        style={{
                                            maxHeight: "calc(100vh - 580px)",
                                        }}
                                    >
                                        {filterOptions.map((filter) => (
                                            <div
                                                key={filter.id}
                                                className="space-y-1"
                                            >
                                                <label className="block text-sm font-medium text-gray-700">
                                                    {filter.label}
                                                </label>
                                                {renderFilterInput(filter)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Fixed at bottom */}
                        <div className="flex-none p-4 space-y-2 bg-white border-t">
                            <button
                                className="w-full py-3 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 relative"
                                disabled={
                                    !startDate ||
                                    !endDate ||
                                    dateError !== "" ||
                                    isLoading
                                }
                                onClick={handleShowVesselActivity}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    "Show container vessel activity"
                                )}
                            </button>
                            <button
                                className="w-full py-3 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                disabled={
                                    !startDate ||
                                    !endDate ||
                                    dateError !== "" ||
                                    isLoading
                                }
                                onClick={handleAnalyzePortService}
                            >
                                Analyze port service levels
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setExpanded(true)}
                        className="w-full h-full bg-emerald-500 rounded-full shadow-lg hover:bg-emerald-600 flex items-center justify-center"
                    >
                        <Image
                            src={VesselIcon}
                            alt="Vessel Info"
                            width={24}
                            height={24}
                            className="brightness-0 invert"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FloatingActionButton;
