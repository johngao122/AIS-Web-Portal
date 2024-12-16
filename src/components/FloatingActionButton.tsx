/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import { Calendar, Filter, ChevronLeft, AlertCircle } from "lucide-react";
import { FAB } from "@/resources/dashboard";
import Image from "next/image";
import DatePicker from "./DatePicker";

interface FilterOption {
    id: string;
    label: string;
}

const filterOptions: FilterOption[] = Array(6)
    .fill(null)
    .map((_, index) => ({
        id: `filter-${index}`,
        label: "Names",
    }));

const FloatingActionButton: React.FC = () => {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [showStartDatePicker, setShowStartDatePicker] =
        useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [dateError, setDateError] = useState<string>("");

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const validateDates = (start: string, end: string) => {
        if (!start || !end) return true;

        const startDateTime = new Date(start).getTime();
        const endDateTime = new Date(end).getTime();

        return endDateTime >= startDateTime;
    };

    useEffect(() => {
        if (startDate && endDate) {
            if (!validateDates(startDate, endDate)) {
                setDateError("End date cannot be earlier than start date");
            } else {
                setDateError("");
            }
        } else {
            setDateError("");
        }
    }, [startDate, endDate]);

    const handleDateSelect = (date: Date, isStart: boolean): void => {
        const formattedDate = formatDate(date);
        if (isStart) {
            setStartDate(formattedDate);
            if (endDate && !validateDates(formattedDate, endDate)) {
                setDateError("End date cannot be earlier than start date");
            } else {
                setDateError("");
            }
        } else {
            setEndDate(formattedDate);
            if (startDate && !validateDates(startDate, formattedDate)) {
                setDateError("End date cannot be earlier than start date");
            } else {
                setDateError("");
            }
        }
    };

    const handleExpand = (e: React.MouseEvent) => {
        if (!isExpanded) {
            setExpanded(true);
        }
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

    return (
        <div className="fixed left-4 top-32 z-50">
            <div
                className={`
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${
                        isExpanded
                            ? "w-80 h-[80vh] origin-top-left"
                            : "w-12 h-12 cursor-pointer origin-bottom-right"
                    }
                `}
            >
                {isExpanded ? (
                    <div className="w-full h-full bg-white rounded-lg shadow-xl">
                        <div className="flex items-center justify-between p-4 bg-green-500 text-white rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={FAB}
                                    alt="AIS Logo"
                                    width={40}
                                    height={40}
                                />
                                <span className="text-lg font-medium">
                                    Vessel Information
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setExpanded(false)}
                                className="p-1 hover:bg-green-600 rounded-full"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        </div>

                        <div
                            className="p-4 space-y-6 overflow-y-auto"
                            style={{ height: "calc(80vh - 4rem)" }}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={20} />
                                    <span className="font-medium">
                                        Select Source Date
                                    </span>
                                </div>

                                {dateError && (
                                    <div className="flex items-center gap-2 p-2 bg-red-50 text-red-600 rounded-md">
                                        <AlertCircle size={16} />
                                        <span className="text-sm">
                                            {dateError}
                                        </span>
                                    </div>
                                )}

                                <div className="space-y-2 relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowStartDatePicker(
                                                !showStartDatePicker
                                            );
                                            setShowEndDatePicker(false);
                                        }}
                                        className="w-full p-2 text-left bg-green-500 text-white rounded-full flex items-center"
                                    >
                                        <span className="bg-green-600 px-4 py-1 rounded-full mr-2">
                                            start date
                                        </span>
                                        <span className="text-gray-100">
                                            {startDate || "select start date"}
                                        </span>
                                        <span
                                            className={`ml-auto transition-transform duration-200 ${
                                                showStartDatePicker
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </button>
                                    {showStartDatePicker && (
                                        <DatePicker
                                            onSelect={(date) =>
                                                handleDateSelect(date, true)
                                            }
                                            onClose={() =>
                                                setShowStartDatePicker(false)
                                            }
                                            maxDate={
                                                endDate
                                                    ? new Date(endDate)
                                                    : undefined
                                            }
                                        />
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEndDatePicker(
                                                !showEndDatePicker
                                            );
                                            setShowStartDatePicker(false);
                                        }}
                                        className={`w-full p-2 text-left rounded-full flex items-center ${
                                            dateError
                                                ? "bg-red-50 border border-red-200"
                                                : "bg-green-100"
                                        }`}
                                    >
                                        <span className="bg-green-500 text-white px-4 py-1 rounded-full mr-2">
                                            end date
                                        </span>
                                        <span
                                            className={
                                                dateError
                                                    ? "text-red-600"
                                                    : "text-gray-500"
                                            }
                                        >
                                            {endDate || "select end date"}
                                        </span>
                                        <span
                                            className={`ml-auto transition-transform duration-200 ${
                                                showEndDatePicker
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </button>
                                    {showEndDatePicker && (
                                        <DatePicker
                                            onSelect={(date) =>
                                                handleDateSelect(date, false)
                                            }
                                            onClose={() =>
                                                setShowEndDatePicker(false)
                                            }
                                            minDate={
                                                startDate
                                                    ? new Date(startDate)
                                                    : undefined
                                            }
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Filter size={20} />
                                        <span className="font-medium">
                                            Select Parameter Filters
                                        </span>
                                    </div>
                                    {selectedFilters.length > 0 && (
                                        <button
                                            onClick={() =>
                                                setSelectedFilters([])
                                            }
                                            className="text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {filterOptions.map((option) => (
                                        <label
                                            key={option.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.includes(
                                                    option.id
                                                )}
                                                onChange={() =>
                                                    handleFilterChange(
                                                        option.id
                                                    )
                                                }
                                                className="w-4 h-4 text-green-500 rounded"
                                            />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <button
                                    type="button"
                                    className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        !!dateError ||
                                        !startDate ||
                                        !endDate ||
                                        selectedFilters.length === 0
                                    }
                                >
                                    Show container vessel activity
                                </button>
                                <button
                                    type="button"
                                    className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        !!dateError ||
                                        !startDate ||
                                        !endDate ||
                                        selectedFilters.length === 0
                                    }
                                >
                                    Analyze port service levels
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleExpand}
                        className="w-full h-full bg-green-500 rounded-full shadow-lg hover:bg-green-500/90 flex items-center justify-center"
                    >
                        <Image
                            src={FAB}
                            alt="AIS Logo"
                            width={28}
                            height={28}
                            className="brightness-0 invert"
                            style={{ objectFit: "contain" }}
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FloatingActionButton;
