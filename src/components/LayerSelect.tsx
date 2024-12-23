/* eslint-disable */

import React, { useState } from "react";
import { Layers, X } from "lucide-react";
import {
    Anchorage,
    Fairway,
    PortLimit,
    Separation,
    Vessel,
} from "@/resources/layerSelect";
import Image from "next/image";

interface LayerSelectProps {
    activeLayers: {
        anchorages: boolean;
        fairways: boolean;
        separation: boolean;
        vessels: boolean;
    };
    setActiveLayers: React.Dispatch<
        React.SetStateAction<{
            anchorages: boolean;
            fairways: boolean;
            separation: boolean;
            vessels: boolean;
        }>
    >;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const LayerSelect: React.FC<LayerSelectProps> = ({
    activeLayers,
    setActiveLayers,
    isOpen,
    setIsOpen,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const layerConfig = [
        { key: "vessels", label: "Vessels", icon: Vessel },
        { key: "anchorages", label: "Anchorages", icon: Anchorage },
        { key: "fairways", label: "Fairways", icon: Fairway },
        { key: "separation", label: "Separation Schemes", icon: Separation },
    ];

    const handleLayerToggle = (key: string) => {
        setActiveLayers((prev: any) => ({
            ...prev,
            [key]: !prev[key as keyof typeof activeLayers],
        }));
    };

    return (
        <div className="relative">
            {/* Icon Button with Tooltip */}
            <button
                className="p-2 bg-white rounded-md shadow-md hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <Layers className="w-5 h-5 text-gray-600" />
            </button>

            {/* Tooltip */}
            {showTooltip && !isOpen && (
                <div className="absolute right-0 mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap z-50">
                    Layers
                </div>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-40 border border-gray-200"
                    onClick={(e) => e.stopPropagation()} // Prevent clicks from propagating
                >
                    <div className="p-4">
                        {/* Header with close button */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">Layers</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        {/* Layer options */}
                        <div className="space-y-3">
                            {layerConfig.map(({ key, label, icon: Icon }) => (
                                <label
                                    key={key}
                                    className="flex items-center space-x-3 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            activeLayers[
                                                key as keyof typeof activeLayers
                                            ]
                                        }
                                        onChange={(e) => handleLayerToggle(key)}
                                        className="rounded border-gray-300 cursor-pointer"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <Image
                                            src={Icon}
                                            alt={label}
                                            className="w-5 h-5"
                                        />
                                        <span className="text-gray-700">
                                            {label}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LayerSelect;
