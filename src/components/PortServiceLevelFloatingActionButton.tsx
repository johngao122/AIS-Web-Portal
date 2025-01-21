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
import type { PortServiceData } from "@/types/PortService";
import { ScrollArea } from "./ui/scroll-area";

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

const filterOptions = [
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
];

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

    useEffect(() => {
        if (initialTimeRanges) {
            setTimeRanges(initialTimeRanges);
        }
    }, [initialTimeRanges]);

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
        return end.getTime() > start.getTime();
    };

    const handleDateSelect = (date: Date, isStart: boolean) => {
        if (isStart) {
            setCurrentStartDate(date);
        } else {
            setCurrentEndDate(date);
        }

        const start = isStart ? date : currentStartDate;
        const end = isStart ? currentEndDate : date;

        if (start && end && !validateDates(start, end)) {
            setDateError("End date/time must be later than start date/time");
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
        if (timeRanges.length === 0) return;

        setIsLoading(true);
        try {
            const response = await import(
                "@/data/example/PortServiceLevel.json"
            );
            onPortServiceDataUpdate(response.default, {
                isExpanded: true,
                timeRanges,
                selectedFilters,
            });
        } catch (error) {
            console.error("Error loading port service data:", error);
            onPortServiceDataUpdate(null);
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
                <Ship className="h-6 w-6 text-white" />
            </Button>
        );
    }

    return (
        <Card className="h-full flex flex-col max-w-md max-h-[calc(100vh-8rem)]">
            <CardHeader className="bg-blue-500 text-white rounded-t-lg space-y-0 flex flex-row items-center justify-between h-14">
                <div className="flex items-center gap-2">
                    <Ship className="h-6 w-6" />
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
                                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
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
                                    !!dateError
                                }
                                onClick={handleAddTimeRange}
                            >
                                Add Time Period
                            </Button>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            <h3 className="font-medium">Parameter Filters</h3>
                        </div>

                        <div className="space-y-2">
                            {filterOptions.map((filter) => (
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
                                            handleFilterToggle(filter.id)
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
                                                    <p>{filter.tooltip}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </ScrollArea>

            <CardFooter className="flex-none p-4 bg-white border-t">
                <Button
                    className="w-full"
                    disabled={timeRanges.length === 0 || isLoading}
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
