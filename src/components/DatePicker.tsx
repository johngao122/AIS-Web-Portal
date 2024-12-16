import React, { useState } from "react";
import { ChevronLeft, Clock } from "lucide-react";

interface DateTimePickerProps {
    onSelect: (date: Date) => void;
    onClose: () => void;
    selectedDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    isStartDate?: boolean;
    startDateTime?: Date;
}

type ViewMode = "calendar" | "month" | "year";

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    onSelect,
    onClose,
    selectedDate,
    minDate,
    maxDate,
}) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
    const [viewMode, setViewMode] = useState<ViewMode>("calendar");
    const [hours, setHours] = useState(
        selectedDate?.getHours().toString().padStart(2, "0") || "00"
    );
    const [minutes, setMinutes] = useState(
        selectedDate?.getMinutes().toString().padStart(2, "0") || "00"
    );
    const [seconds, setSeconds] = useState(
        selectedDate?.getSeconds().toString().padStart(2, "0") || "00"
    );

    // Calendar logic
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array(firstDayOfMonth).fill(null);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const generateYearRange = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);
    };

    const isSameDay = (date1: Date, date2: Date): boolean => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const getTimeInSeconds = (date: Date): number => {
        return (
            date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
        );
    };

    const isDateValid = (date: Date): boolean => {
        if (minDate) {
            const isMinSameDay = isSameDay(date, minDate);
            if (isMinSameDay) {
                // On the same day, allow selection but validate time in handleApply
                return true;
            }
            if (date < minDate) return false;
        }

        if (maxDate) {
            const isMaxSameDay = isSameDay(date, maxDate);
            if (isMaxSameDay) {
                // On the same day, allow selection but validate time in handleApply
                return true;
            }
            if (date > maxDate) return false;
        }

        return true;
    };

    const isMonthValid = (month: number): boolean => {
        const testDate = new Date(currentDate.getFullYear(), month, 1);
        if (
            minDate &&
            testDate < new Date(minDate.getFullYear(), minDate.getMonth(), 1)
        )
            return false;
        if (
            maxDate &&
            testDate > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
        )
            return false;
        return true;
    };

    const isYearValid = (year: number): boolean => {
        if (minDate && year < minDate.getFullYear()) return false;
        if (maxDate && year > maxDate.getFullYear()) return false;
        return true;
    };

    const handleDateSelect = (day: number): void => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
            parseInt(hours),
            parseInt(minutes),
            parseInt(seconds)
        );

        if (!isDateValid(newDate)) return;

        // Update both currentDate and selectedDate
        setCurrentDate(newDate);
        setHours(newDate.getHours().toString().padStart(2, "0"));
        setMinutes(newDate.getMinutes().toString().padStart(2, "0"));
        setSeconds(newDate.getSeconds().toString().padStart(2, "0"));
        onSelect(newDate); // This updates the selectedDate in parent component
    };

    const handleMonthSelect = (monthIndex: number) => {
        if (!isMonthValid(monthIndex)) return;
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        setViewMode("calendar");
    };

    const handleYearSelect = (year: number) => {
        if (!isYearValid(year)) return;
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setViewMode("calendar");
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

    const handleTimeChange = (
        value: string,
        type: "hours" | "minutes" | "seconds"
    ) => {
        let num = parseInt(value);
        switch (type) {
            case "hours":
                if (num > 23) num = 23;
                if (num < 0) num = 0;
                setHours(num.toString().padStart(2, "0"));
                break;
            case "minutes":
            case "seconds":
                if (num > 59) num = 59;
                if (num < 0) num = 0;
                if (type === "minutes") {
                    setMinutes(num.toString().padStart(2, "0"));
                } else {
                    setSeconds(num.toString().padStart(2, "0"));
                }
                break;
        }
    };

    const handleApply = () => {
        const selected = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            parseInt(hours),
            parseInt(minutes),
            parseInt(seconds)
        );

        // Validate time with inclusive comparison for min date
        if (minDate && isSameDay(selected, minDate)) {
            const selectedTime = getTimeInSeconds(selected);
            const minTime = getTimeInSeconds(minDate);
            if (selectedTime <= minTime) {
                // Invalid time selection - same or earlier than min time
                return;
            }
        }

        // Validate time with inclusive comparison for max date
        if (maxDate && isSameDay(selected, maxDate)) {
            const selectedTime = getTimeInSeconds(selected);
            const maxTime = getTimeInSeconds(maxDate);
            if (selectedTime >= maxTime) {
                // Invalid time selection - same or later than max time
                return;
            }
        }

        onSelect(selected);
        onClose();
    };

    const renderCalendarView = () => (
        <>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
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
                    // Check against both selectedDate and currentDate
                    const isSelected =
                        (selectedDate &&
                            date.toDateString() ===
                                selectedDate.toDateString()) ||
                        date.toDateString() === currentDate.toDateString();
                    const isToday =
                        new Date().toDateString() === date.toDateString();
                    const isValid = isDateValid(date);

                    return (
                        <button
                            type="button"
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            className={`
                                p-1 rounded-full text-sm
                                ${isSelected ? "bg-blue-500 text-white" : ""}
                                ${!isSelected && isToday ? "bg-blue-100" : ""}
                                ${
                                    isValid
                                        ? "hover:bg-blue-50"
                                        : "text-gray-300 cursor-not-allowed"
                                }
                            `}
                            disabled={!isValid}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </>
    );

    const renderMonthView = () => (
        <div className="grid grid-cols-3 gap-2 p-4">
            {months.map((month, index) => {
                const isValid = isMonthValid(index);
                return (
                    <button
                        key={month}
                        onClick={() => handleMonthSelect(index)}
                        className={`
                            p-2 rounded-lg text-sm
                            ${
                                isValid
                                    ? "hover:bg-blue-50"
                                    : "text-gray-300 cursor-not-allowed"
                            }
                            ${
                                currentDate.getMonth() === index
                                    ? "bg-blue-500 text-white"
                                    : ""
                            }
                        `}
                        disabled={!isValid}
                    >
                        {month}
                    </button>
                );
            })}
        </div>
    );

    const renderYearView = () => (
        <div className="grid grid-cols-3 gap-2 p-4">
            {generateYearRange().map((year) => {
                const isValid = isYearValid(year);
                return (
                    <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`
                            p-2 rounded-lg text-sm
                            ${
                                isValid
                                    ? "hover:bg-blue-50"
                                    : "text-gray-300 cursor-not-allowed"
                            }
                            ${
                                currentDate.getFullYear() === year
                                    ? "bg-blue-500 text-white"
                                    : ""
                            }
                        `}
                        disabled={!isValid}
                    >
                        {year}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="absolute z-10 bg-white rounded-lg shadow-lg p-4 w-full mt-2">
            {/* Header */}
            <div className="bg-gray-100 -mx-4 -mt-4 px-4 py-2 rounded-t-lg mb-4">
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => navigateMonth("prev")}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                setViewMode(
                                    viewMode === "month" ? "calendar" : "month"
                                )
                            }
                            className="text-sm font-medium hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                        >
                            {months[currentDate.getMonth()]}
                        </button>
                        <button
                            onClick={() =>
                                setViewMode(
                                    viewMode === "year" ? "calendar" : "year"
                                )
                            }
                            className="text-sm font-medium hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                        >
                            {currentDate.getFullYear()}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigateMonth("next")}
                        className="p-1 hover:bg-gray-200 rounded-full rotate-180 transition-colors"
                        aria-label="Next"
                    >
                        <ChevronLeft size={16} />
                    </button>
                </div>
            </div>

            {/* View Modes */}
            {viewMode === "calendar" && renderCalendarView()}
            {viewMode === "month" && renderMonthView()}
            {viewMode === "year" && renderYearView()}

            {/* Time Selector */}
            {viewMode === "calendar" && (
                <div className="flex items-center justify-center gap-4 mb-4">
                    <Clock size={16} className="text-gray-500" />
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) =>
                                handleTimeChange(e.target.value, "hours")
                            }
                            className="w-12 p-1 text-center border rounded"
                            min="0"
                            max="23"
                        />
                        <span>:</span>
                        <input
                            type="number"
                            value={minutes}
                            onChange={(e) =>
                                handleTimeChange(e.target.value, "minutes")
                            }
                            className="w-12 p-1 text-center border rounded"
                            min="0"
                            max="59"
                        />
                        <span>:</span>
                        <input
                            type="number"
                            value={seconds}
                            onChange={(e) =>
                                handleTimeChange(e.target.value, "seconds")
                            }
                            className="w-12 p-1 text-center border rounded"
                            min="0"
                            max="59"
                        />
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            {viewMode === "calendar" && (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default DateTimePicker;
