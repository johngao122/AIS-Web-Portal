import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface DatePickerProps {
    onSelect: (date: Date) => void;
    onClose: () => void;
    selectedDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    isStartDate?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
    onSelect,
    onClose,
    selectedDate,
    minDate,
    maxDate,
    isStartDate = false,
}) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

    // Get first day of the month to calculate offset
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    // Calculate days in current month
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    // Create array for days with empty slots for proper alignment
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array(firstDayOfMonth).fill(null);

    const handleDateSelect = (day: number): void => {
        const selected = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        if (minDate && selected < minDate) return;
        if (maxDate && selected > maxDate) return;

        onSelect(selected);
        onClose();
    };

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            if (direction === "prev") {
                newDate.setMonth(prevDate.getMonth() - 1);
            } else {
                newDate.setMonth(prevDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    const formatMonth = (date: Date): string => {
        return date.toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="absolute z-10 bg-white rounded-lg shadow-lg p-4 w-full mt-2">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        {formatMonth(currentDate)}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => navigateMonth("prev")}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        aria-label="Previous month"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => navigateMonth("next")}
                        className="p-1 hover:bg-gray-100 rounded-full rotate-180"
                        aria-label="Next month"
                    >
                        <ChevronLeft size={16} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                        <div key={day} className="p-1 text-gray-500 text-xs">
                            {day}
                        </div>
                    )
                )}
                {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="p-1" />
                ))}
                {days.map((day) => {
                    const date = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day
                    );
                    const isSelected =
                        selectedDate &&
                        date.toDateString() === selectedDate.toDateString();
                    const isToday =
                        new Date().toDateString() === date.toDateString();

                    return (
                        <button
                            type="button"
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            className={`
                                p-1 rounded-full text-sm
                                ${
                                    isSelected
                                        ? isStartDate
                                            ? "bg-green-500 text-white"
                                            : "bg-green-500 text-white"
                                        : ""
                                }
                                ${!isSelected && isToday ? "bg-green-100" : ""}
                                hover:bg-green-50
                                ${
                                    minDate && date < minDate
                                        ? "text-gray-300 cursor-not-allowed"
                                        : ""
                                }
                                ${
                                    maxDate && date > maxDate
                                        ? "text-gray-300 cursor-not-allowed"
                                        : ""
                                }
                            `}
                            disabled={
                                (minDate && date < minDate) ||
                                (maxDate && date > maxDate)
                            }
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DatePicker;
