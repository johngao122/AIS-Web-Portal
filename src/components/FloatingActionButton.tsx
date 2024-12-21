/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Calendar, Filter, ChevronLeft, AlertCircle } from "lucide-react";
import { FAB } from "@/resources/dashboard";
import Image from "next/image";
import DateTimePicker from "./DatePicker";
import VesselActivity from "@/types/VesselActivity";

interface FilterOption {
    id: string;
    label: string;
}

interface FloatingActionButtonProps {
    onVesselDataUpdate: (data: VesselActivity[] | null, fabData?: any) => void;
    initialStartDate?: Date;
    initialEndDate?: Date;
    initialFilters?: string[];
    isItExpanded?: boolean;
}

const filterOptions: FilterOption[] = [
    { id: "imoNumber", label: "IMO Number" },
    { id: "mmsi", label: "MMSI" },
    { id: "vesselName", label: "Vessel Name" },
    { id: "loa", label: "LOA" },
    { id: "terminal", label: "Terminal" },
    { id: "ata", label: "ATA" },
    { id: "atb", label: "ATB" },
    { id: "atu", label: "ATU" },
    { id: "atd", label: "ATD" },
    { id: "waitingHoursAtBerth", label: "Waiting Hours at Berth" },
    { id: "waitingHoursAtAnchorage", label: "Waiting Hours at Anchorage" },
    { id: "berthingHours", label: "Berthing Hours" },
    { id: "inPortHours", label: "In Port Hours" },
];

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    onVesselDataUpdate,
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
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
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
        setSelectedFilters(initialFilters || []);
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

    const getActiveFilters = () => {
        // If no filters are selected, return all filter IDs
        if (selectedFilters.length === 0) {
            return filterOptions.map((option) => option.id);
        }
        return selectedFilters;
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

    const handleFilterChange = (filterId: string) => {
        setSelectedFilters((prev) => {
            if (prev.includes(filterId)) {
                return prev.filter((id) => id !== filterId);
            } else {
                return [...prev, filterId];
            }
        });
    };

    const handleClearDates = () => {
        setStartDate(undefined);
        setEndDate(undefined);
        setDateError("");
    };

    const handleClearFilters = () => {
        setSelectedFilters([]);
    };

    const handleShowVesselActivity = async () => {
        setIsLoading(true);
        try {
            const response = await import("@/data/example/VesselActivity.json");
            onVesselDataUpdate(response.default, {
                isExpanded: true,
                startDate,
                endDate,
                selectedFilters: selectedFilters,
            });
        } catch (error) {
            console.error("Error loading vessel data:", error);
            onVesselDataUpdate(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed left-4 top-32 z-50">
            <div
                className={`
                overflow-hidden
                transition-all duration-300 ease-in-out
                ${
                    isExpanded
                        ? "w-auto  bg-white rounded-lg shadow-lg"
                        : "w-12 h-12"
                }
            `}
            >
                {isExpanded ? (
                    <div className="w-full relative">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-emerald-500 text-white rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={FAB}
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

                        {/* Content */}
                        <div className="p-4 space-y-6">
                            {/* Date Range Section */}
                            <div className="space-y-3">
                                {/* Header */}
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

                                {/* Date Select */}
                                <div className="flex flex-col space-y-2">
                                    {/* Start Date */}
                                    <div className="relative w-full">
                                        <div className="flex items-stretch w-full">
                                            <div className="px-4 py-2 bg-green-500 text-white rounded-l-md flex items-center">
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
                                                    setShowEndDatePicker(false);
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
                                            <div className="absolute top-full left-0 mt-1 w-full z-50 bg-white shadow-lg rounded-md">
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
                                            <div className="px-4 py-2 bg-green-500 text-white rounded-l-md flex items-center">
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
                                            <div className="absolute top-full left-0 mt-1 w-full z-50 bg-white shadow-lg rounded-md">
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
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Filter size={20} />
                                        <span className="font-medium">
                                            Select Parameter Filters
                                            {selectedFilters.length === 0 && (
                                                <span className="text-sm text-gray-500 ml-2">
                                                    (all selected)
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    {selectedFilters.length > 0 && (
                                        <button
                                            onClick={() =>
                                                setSelectedFilters([])
                                            }
                                            className="text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            Select all
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-2 h-64 overflow-y-auto">
                                    {filterOptions.map((option) => {
                                        const isActive =
                                            selectedFilters.length === 0 ||
                                            selectedFilters.includes(option.id);
                                        return (
                                            <label
                                                key={option.id}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isActive}
                                                    onChange={() =>
                                                        handleFilterChange(
                                                            option.id
                                                        )
                                                    }
                                                    className="w-4 h-4 text-green-500 rounded"
                                                />
                                                <span>{option.label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="space-y-2 pt-4">
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
                                        dateError !== ""
                                    }
                                >
                                    Analyze port service levels
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setExpanded(true)}
                        className="w-full h-full bg-emerald-500 rounded-full shadow-lg hover:bg-emerald-600 flex items-center justify-center"
                    >
                        <Image
                            src={FAB}
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
