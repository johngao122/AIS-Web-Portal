/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Calendar, Filter, ChevronLeft, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import DateTimePicker from "./DatePicker";
import type { PortServiceData, PortServicePeriod } from "@/types/PortService";
import { ScrollArea } from "./ui/scroll-area";
import { PortServiceFABIcon } from "@/resources/dashboard";
import Image from "next/image";
import { fetchPortService } from "@/utils/api";

export interface TimeRange {
    startDate: Date;
    endDate: Date;
    label: string;
}

interface PortServiceFABProps {
    onPortServiceDataUpdate: (
        data: PortServiceData | null,
        fabData?: {
            isExpanded: boolean;
            timeRanges?: TimeRange[];
            selectedFilters?: string[];
        }
    ) => void;
    initialTimeRanges?: TimeRange[];
    isItExpanded: boolean;
    onClose: () => void;
}

export interface FilteredPortServiceData {
    period: string;
    startDate: string;
    endDate: string;
    vesselData: {
        category: string;
        metrics: {
            [key: string]: number | { [key: string]: number };
        };
    }[];
}

/**
 * Filter port service data by selected filters.
 *
 * @param rawData Raw port service data.
 * @param selectedFilters Array of selected filter IDs.
 *
 * @returns Filtered port service data.
 */
const filterPortServiceData = (
    rawData: PortServiceData,
    selectedFilters: string[]
): PortServiceData => {
    if (!selectedFilters.length) return rawData;

    return rawData.map((periodData) => {
        const periodKey = Object.keys(periodData)[0];
        const periodValue = periodData[periodKey];

        const filteredPeriod = {
            [periodKey]: {
                startDate: periodValue.startDate,
                endDate: periodValue.endDate,
            },
        } as PortServicePeriod;

        // Determine which vessel categories to include
        const includeAllVessels = selectedFilters.includes("all_vessels");
        const categories = new Set<string>();

        if (includeAllVessels) {
            categories.add("All vessels");
        }

        ["category_1", "category_2", "category_3", "category_4"].forEach(
            (cat, index) => {
                if (selectedFilters.includes(cat)) {
                    categories.add(`Category ${index + 1} vessels`);
                }
            }
        );

        // Filter metrics for each selected category
        categories.forEach((category) => {
            const categoryData =
                periodValue[category as keyof PortServicePeriod[string]];
            if (!categoryData) return;

            const filteredCategory: any = {};

            // Map filter IDs to their corresponding data properties
            const metricMappings = {
                berthed_vessels: "TotalBerthed",
                jit_percentage: "JIT",
                anchorage_hours: "WaitingHours",
                berthing_hours: "BerthingHours",
                port_hours: "InPortHours",
                wharf_utilization: "WharfUtilizationRate",
            };

            // Include only selected metrics
            Object.entries(metricMappings).forEach(([filterId, metricKey]) => {
                if (
                    selectedFilters.includes(filterId) &&
                    categoryData[metricKey as keyof typeof categoryData] !==
                        undefined
                ) {
                    filteredCategory[metricKey] =
                        categoryData[metricKey as keyof typeof categoryData];
                }
            });

            // Only include category if it has filtered metrics
            if (Object.keys(filteredCategory).length > 0) {
                (filteredPeriod[periodKey] as any)[category] = filteredCategory;
            }
        });

        return filteredPeriod as PortServiceData[0];
    });
};

/**
 * Determines if the selected filters include at least one vessel category
 * and one parameter.
 *
 * @param {string[]} selectedFilters - The list of selected filter identifiers.
 * @returns {boolean} - Returns true if both a vessel category and a parameter
 *                      are selected, otherwise false.
 */

const hasValidFilters = (selectedFilters: string[]) => {
    // Check if at least one vessel category is selected
    const hasVesselCategory = selectedFilters.some((filter) =>
        [
            "all_vessels",
            "category_1",
            "category_2",
            "category_3",
            "category_4",
        ].includes(filter)
    );

    // Check if at least one parameter is selected
    const hasParameter = selectedFilters.some((filter) =>
        [
            "berthed_vessels",
            "jit_percentage",
            "anchorage_hours",
            "berthing_hours",
            "port_hours",
            "wharf_utilization",
        ].includes(filter)
    );

    return hasVesselCategory && hasParameter;
};

const filterGroups = {
    vesselCategories: {
        title: "Vessel Categories",
        options: [
            {
                id: "all_vessels",
                label: "All Vessels",
                tooltip: "Include data for vessels of all sizes",
            },
            {
                id: "category_1",
                label: "Category 1 Vessels",
                tooltip: "Vessels with LOA in range (0,147]",
            },
            {
                id: "category_2",
                label: "Category 2 Vessels",
                tooltip: "Vessels with LOA in range (147,209]",
            },
            {
                id: "category_3",
                label: "Category 3 Vessels",
                tooltip: "Vessels with LOA in range (209,285]",
            },
            {
                id: "category_4",
                label: "Category 4 Vessels",
                tooltip: "Vessels with LOA in range (285,400]",
            },
        ],
    },
    parameters: {
        title: "Parameters",
        options: [
            {
                id: "berthed_vessels",
                label: "Total Berthed Vessels",
                tooltip:
                    "Total number of vessels that have completed berthing operations",
            },
            {
                id: "jit_percentage",
                label: "JIT %",
                tooltip:
                    "Percentage of vessels with pre-berthing hours less than 2 hours",
            },
            {
                id: "anchorage_hours",
                label: "Waiting Hours in Anchorages",
                tooltip: "Time spent by vessels in anchorage areas",
            },
            {
                id: "berthing_hours",
                label: "Berthing Hours",
                tooltip: "Duration of vessel berthing operations",
            },
            {
                id: "port_hours",
                label: "In Port Hours",
                tooltip: "Total time spent by vessels within port limits",
            },
            {
                id: "wharf_utilization",
                label: "Wharf Utilization Rate",
                tooltip: "Percentage of time berths are occupied by vessels",
            },
        ],
    },
};

/**
 * PortServiceFAB is a floating action button component for managing and analyzing
 * port service data. It allows users to select time periods, apply filters, and
 * analyze port service levels through an API call.
 *
 * Props:
 * - onPortServiceDataUpdate: Callback function to update port service data
 *   and the FAB state.
 * - initialTimeRanges: Initial time ranges to be set in the component.
 * - isItExpanded: Boolean flag indicating if the FAB is expanded.
 * - onClose: Callback function to handle the FAB close action.
 *
 * State:
 * - timeRanges: List of selected time periods.
 * - selectedFilters: List of filter identifiers selected by the user.
 * - dateError: Error message related to date selections.
 * - isLoading: Boolean indicating if data is being analyzed.
 * - showStartDatePicker: Boolean to toggle visibility of start date picker.
 * - showEndDatePicker: Boolean to toggle visibility of end date picker.
 * - currentStartDate: Currently selected start date.
 * - currentEndDate: Currently selected end date.
 *
 * Methods:
 * - formatDateTime: Formats a Date object into a human-readable string.
 * - validateDates: Validates if a start date is earlier than an end date.
 * - handleDateSelect: Updates the start or end date based on user selection.
 * - handleExpand: Expands the FAB and resets data.
 * - handleClose: Calls the onClose callback to close the FAB.
 * - handleAddTimeRange: Adds a new time range to the list.
 * - handleRemoveTimeRange: Removes a time range from the list by index.
 * - handleFilterToggle: Toggles a filter's selection state.
 * - handleAnalyze: Sends a request to analyze port service data based on selected
 *   time ranges and filters.
 *
 * UI Components:
 * - Renders a button or card based on the isItExpanded state.
 * - Displays date pickers for start and end date selection.
 * - Shows alerts for date errors.
 * - Provides filter options with checkboxes and tooltips.
 * - A button to trigger data analysis.
 */

const PortServiceFAB: React.FC<PortServiceFABProps> = ({
    onPortServiceDataUpdate,
    initialTimeRanges,
    isItExpanded,
    onClose,
}) => {
    const [timeRanges, setTimeRanges] = useState<TimeRange[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [dateError, setDateError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showStartDatePicker, setShowStartDatePicker] =
        useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [currentStartDate, setCurrentStartDate] = useState<Date>();
    const [currentEndDate, setCurrentEndDate] = useState<Date>();
    const MAX_TIME_PERIODS = 5;

    useEffect(() => {
        if (initialTimeRanges) {
            setTimeRanges(initialTimeRanges);
        }
    }, [initialTimeRanges]);

    const formatDateTime = (date: Date): string => {
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const validateDates = (start: Date | undefined, end: Date | undefined) => {
        if (!start || !end) return true;
        return end.getTime() > start.getTime();
    };

    const handleDateSelect = (date: Date, isStart: boolean) => {
        if (isStart) {
            setCurrentStartDate(date);
        } else {
            // Set end date time to 23:59:59
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            setCurrentEndDate(endOfDay);
            date = endOfDay; // Update date reference for validation
        }

        const start = isStart ? date : currentStartDate;
        const end = isStart ? currentEndDate : date;

        if (start && end && !validateDates(start, end)) {
            setDateError("End date must be earlier than start date");
        } else {
            setDateError("");
        }
    };

    const handleExpand = () => {
        onPortServiceDataUpdate(null, {
            isExpanded: true,
            timeRanges: [],
            selectedFilters: [],
        });
    };

    const handleClose = () => {
        onClose?.();
    };

    const handleAddTimeRange = () => {
        if (!currentStartDate || !currentEndDate || dateError) return;
        if (timeRanges.length >= MAX_TIME_PERIODS) return;

        const label = `Period ${timeRanges.length + 1}`;
        const newRange = {
            startDate: currentStartDate,
            endDate: currentEndDate,
            label,
        };

        setTimeRanges([...timeRanges, newRange]);
        setCurrentStartDate(undefined);
        setCurrentEndDate(undefined);
    };

    const handleRemoveTimeRange = (index: number) => {
        setTimeRanges(timeRanges.filter((_, i) => i !== index));
    };

    const handleFilterToggle = (filterId: string) => {
        setSelectedFilters((prev) => {
            if (prev.includes(filterId)) {
                return prev.filter((id) => id !== filterId);
            } else {
                return [...prev, filterId];
            }
        });
    };

    const handleAnalyze = async () => {
        setIsLoading(true);
        try {
            // Format the time ranges for the API request
            const requestBody = timeRanges.map((range, index) => ({
                name: `Period ${index + 1}`,
                startDate: range.startDate.toISOString(),
                endDate: range.endDate.toISOString(),
            }));

            const data = await fetchPortService(requestBody);

            // Filter the data if filters are selected
            const processedData =
                selectedFilters.length > 0
                    ? filterPortServiceData(data, selectedFilters)
                    : data;

            onPortServiceDataUpdate(processedData, {
                isExpanded: true,
                timeRanges,
                selectedFilters,
            });
        } catch (error) {
            console.error("Error fetching port service data:", error);
            setDateError(
                error instanceof Error ? error.message : "An error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!isItExpanded) {
        return (
            <Button
                variant="default"
                size="icon"
                className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600"
                onClick={handleExpand}
            >
                <Image
                    src={PortServiceFABIcon}
                    className="h-6 w-6"
                    alt="Port Service Icon"
                />
            </Button>
        );
    }

    return (
        <Card className="h-full flex flex-col max-w-md max-h-[calc(100vh-8rem)]">
            <CardHeader className="bg-blue-500 text-white rounded-t-lg space-y-0 flex flex-row items-center justify-between h-14">
                <div className="flex items-center gap-2">
                    <Image
                        src={PortServiceFABIcon}
                        className="h-4 w-4"
                        alt="Port Service Icon"
                    />
                    <CardTitle>Port Service Analysis</CardTitle>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-blue-600 rounded-full"
                    onClick={handleClose}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            </CardHeader>

            <ScrollArea className="flex-1 overflow-hidden">
                <CardContent className="p-4 space-y-4">
                    {/* Time Periods Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <h3 className="font-medium">Time Periods</h3>
                        </div>

                        {/* Existing Time Ranges */}
                        {timeRanges.length > 0 && (
                            <div className="space-y-2">
                                {timeRanges.map((range, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg"
                                    >
                                        <span className="flex-1 text-sm font-medium">
                                            {range.label}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {formatDateTime(range.startDate)} -{" "}
                                            {formatDateTime(range.endDate)}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                                            onClick={() =>
                                                handleRemoveTimeRange(index)
                                            }
                                        >
                                            ×
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Date Error Alert */}
                        {dateError && (
                            <Alert variant="destructive">
                                <AlertDescription>{dateError}</AlertDescription>
                            </Alert>
                        )}

                        {/* Date Pickers */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                    onClick={() => {
                                        setShowStartDatePicker(
                                            !showStartDatePicker
                                        );
                                        setShowEndDatePicker(false);
                                    }}
                                >
                                    <span>
                                        {currentStartDate
                                            ? formatDateTime(currentStartDate)
                                            : "Select start date"}
                                    </span>
                                    <span>▼</span>
                                </Button>
                                {showStartDatePicker && (
                                    <div className="absolute top-full left-0 mt-1 w-full z-50">
                                        <DateTimePicker
                                            onSelect={(date) =>
                                                handleDateSelect(date, true)
                                            }
                                            onClose={() =>
                                                setShowStartDatePicker(false)
                                            }
                                            selectedDate={currentStartDate}
                                            maxDate={currentEndDate}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                    onClick={() => {
                                        setShowEndDatePicker(
                                            !showEndDatePicker
                                        );
                                        setShowStartDatePicker(false);
                                    }}
                                >
                                    <span>
                                        {currentEndDate
                                            ? formatDateTime(currentEndDate)
                                            : "Select end date"}
                                    </span>
                                    <span>▼</span>
                                </Button>
                                {showEndDatePicker && (
                                    <div className="absolute top-full left-0 mt-1 w-full z-50">
                                        <DateTimePicker
                                            onSelect={(date) =>
                                                handleDateSelect(date, false)
                                            }
                                            onClose={() =>
                                                setShowEndDatePicker(false)
                                            }
                                            selectedDate={currentEndDate}
                                            minDate={currentStartDate}
                                        />
                                    </div>
                                )}
                            </div>

                            <Button
                                className="w-full"
                                disabled={
                                    !currentStartDate ||
                                    !currentEndDate ||
                                    !!dateError ||
                                    timeRanges.length >= MAX_TIME_PERIODS
                                }
                                onClick={handleAddTimeRange}
                            >
                                {timeRanges.length >= MAX_TIME_PERIODS
                                    ? "Maximum periods reached (5)"
                                    : "Add Time Period"}
                            </Button>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            <h3 className="font-medium">Parameter Filters</h3>
                        </div>

                        <div className="space-y-6">
                            {Object.entries(filterGroups).map(
                                ([groupKey, group]) => (
                                    <div key={groupKey} className="space-y-2">
                                        <h4 className="text-sm font-medium text-gray-700">
                                            {group.title}
                                        </h4>
                                        <div className="space-y-2 pl-2">
                                            {group.options.map((filter) => (
                                                <div
                                                    key={filter.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Checkbox
                                                        id={filter.id}
                                                        checked={selectedFilters.includes(
                                                            filter.id
                                                        )}
                                                        onCheckedChange={() =>
                                                            handleFilterToggle(
                                                                filter.id
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={filter.id}
                                                        className="text-sm flex items-center gap-2"
                                                    >
                                                        {filter.label}
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <div className="text-gray-400">
                                                                        ⓘ
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
                                                                        {
                                                                            filter.tooltip
                                                                        }
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </CardContent>
            </ScrollArea>

            <CardFooter className="flex-none p-4 bg-white border-t">
                <Button
                    className="w-full"
                    disabled={
                        timeRanges.length === 0 ||
                        isLoading ||
                        !hasValidFilters(selectedFilters)
                    }
                    onClick={handleAnalyze}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Analyzing...</span>
                        </div>
                    ) : (
                        "Analyze Port Service Levels"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PortServiceFAB;
