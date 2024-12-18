import React, { useState, useEffect, ChangeEvent } from "react";
import { Play } from "lucide-react";

interface TimeSliderProps {
    startTime: Date;
    endTime: Date;
    onTimeChange?: (currenTime: Date) => void;
}

const TimeSlider: React.FC<TimeSliderProps> = ({
    startTime,
    endTime,
    onTimeChange,
}) => {
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const getTimeFromValue = (value: number): Date => {
        const totalMs: number = endTime.getTime() - startTime.getTime();
        const currentMs: number = (value / 100) * totalMs;
        return new Date(startTime.getTime() + currentMs);
    };

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

    const handleSliderChange = (value: number) => {
        setCurrentValue(value);
        const currentTime = getTimeFromValue(value);
        onTimeChange?.(currentTime);
    };

    const generateTimeMarkers = (): Date[] => {
        const markers: Date[] = [];
        const totalMinutes: number =
            (endTime.getTime() - startTime.getTime()) / (1000 * 60);
        const intervalMinutes: number = totalMinutes / 4;

        for (let i = 0; i <= 4; i++) {
            markers.push(
                new Date(startTime.getTime() + i * intervalMinutes * 60 * 1000)
            );
        }
        return markers;
    };

    const timeMarkers: Date[] = generateTimeMarkers();
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentValue((prevValue) => {
                    if (prevValue >= 100) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return 100;
                    } else {
                        const newValue = prevValue + 1;
                        handleSliderChange(newValue);
                        return newValue;
                    }
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        handleSliderChange(Number(event.target.value));
    };

    const currentTime = getTimeFromValue(currentValue);

    return (
        <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    <Play size={24} />
                </button>

                <div className="flex-1 relative">
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500" />

                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={currentValue}
                        onChange={handleInputChange}
                        className="w-full appearance-none bg-transparent h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg relative z-10"
                    />
                </div>

                <div className="text-right">
                    <div className="font-semibold">
                        {formatDate(currentTime)}
                    </div>
                    <div className="text-gray-600">
                        {formatTime(currentTime)} UTC
                    </div>
                </div>
            </div>

            <div className="flex justify-between px-2 text-sm text-gray-600">
                {timeMarkers.map((time, index) => (
                    <div key={index}>{formatTime(time)}</div>
                ))}
            </div>
        </div>
    );
};

export default TimeSlider;
