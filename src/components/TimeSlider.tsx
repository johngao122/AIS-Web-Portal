import React, { useState, useCallback, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface TimeSliderProps {
    startTime: Date;
    endTime: Date;
    onTimeChange?: (currentTime: Date, isDragging: boolean) => void;
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    currentTime: Date | null;
}

/**
 * A time slider component that allows users to select a time range.
 *
 * @prop {Date} startTime The start time of the time range.
 * @prop {Date} endTime The end time of the time range.
 * @prop {function} onTimeChange A callback function that is called when the user selects a new time.
 * @prop {boolean} isPlaying Whether the user is currently playing a video or not.
 * @prop {function} setIsPlaying A callback function that is called when the user starts or stops playing a video.
 * @prop {Date | null} currentTime The current time of the video, or null if the user is not playing a video.
 *
 * @example
 * <TimeSlider
 *     startTime={new Date("2022-01-01T00:00:00.000Z")}
 *     endTime={new Date("2022-01-01T01:00:00.000Z")}
 *     onTimeChange={(currentTime, isDragging) => {
 *         console.log("Current time:", currentTime, "Is dragging?", isDragging);
 *     }}
 *     isPlaying={true}
 *     setIsPlaying={(playing) => console.log("Is playing?", playing)}
 *     currentTime={new Date("2022-01-01T00:30:00.000Z")}
 * />
 */
const TimeSlider: React.FC<TimeSliderProps> = ({
    startTime,
    endTime,
    onTimeChange,
    isPlaying,
    setIsPlaying,
    currentTime,
}) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [toolTipPosition, setTooltipPosition] = useState<number>(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const totalSeconds = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
    );

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const getTimeFromValue = useCallback(
        (value: number): Date => {
            const currentSeconds = Math.floor((value / 1000) * totalSeconds);
            return new Date(startTime.getTime() + currentSeconds * 1000);
        },
        [startTime, totalSeconds]
    );

    const getValueFromTime = useCallback(
        (time: Date): number => {
            const currentSeconds = Math.floor(
                (time.getTime() - startTime.getTime()) / 1000
            );
            return Math.floor((currentSeconds / totalSeconds) * 1000);
        },
        [startTime, totalSeconds]
    );

    const formatTime = (date: Date): string => {
        return date.toTimeString().split(" ")[0];
    };

    const formatDate = (date: Date): string => {
        return date
            .toLocaleDateString("en-GB", {
                month: "2-digit",
                day: "numeric",
                year: "numeric",
            })
            .toUpperCase();
    };

    const handleSliderChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const value = Number(event.target.value);
        const newTime = getTimeFromValue(value);
        onTimeChange?.(newTime, isDragging);

        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            const position = (value / 1000) * rect.width;
            setTooltipPosition(position);
        }
    };

    const currentValue = currentTime ? getValueFromTime(currentTime) : 0;

    return (
        <div
            className="w-full max-w-6xl transition-opacity duration-300"
            style={{ opacity: isHovering ? 1 : 0.5 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    <div className="flex-1 relative" ref={sliderRef}>
                        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500" />

                        {isDragging && currentTime && (
                            <div
                                className="absolute -top-16 bg-white px-3 py-2 rounded shadow-lg transform -translate-x-1/2 text-sm font-medium z-50 flex flex-col items-center w-40"
                                style={{ left: `${toolTipPosition}px` }}
                            >
                                <div className="text-center">
                                    {formatDate(currentTime)}
                                </div>
                                <div className="text-center">
                                    {formatTime(currentTime)} UTC
                                </div>
                            </div>
                        )}

                        <input
                            type="range"
                            min={0}
                            max={1000}
                            step={1}
                            value={currentValue}
                            onChange={handleSliderChange}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onTouchStart={handleMouseDown}
                            onTouchEnd={handleMouseUp}
                            className="w-full appearance-none bg-transparent h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg relative z-10"
                        />
                    </div>

                    <div className="text-right">
                        <div className="font-semibold">
                            {currentTime ? formatDate(currentTime) : "--"}
                        </div>
                        <div className="text-gray-600">
                            {currentTime
                                ? `${formatTime(currentTime)} UTC`
                                : "--"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeSlider;
