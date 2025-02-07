/* eslint-disable */

import React, { useState } from "react";
import { Layers, Plus, Minus, X, TerminalIcon, Terminal } from "lucide-react";
import Image from "next/image";
import {
    Anchorage,
    Fairway,
    Separation,
    Vessel,
} from "@/resources/layerSelect";

interface MapControlsProps {
    className?: string;
    activeLayers: {
        anchorages: boolean;
        fairways: boolean;
        separation: boolean;
        terminals: boolean;
    };
    setActiveLayers: React.Dispatch<
        React.SetStateAction<{
            anchorages: boolean;
            fairways: boolean;
            separation: boolean;
            terminals: boolean;
        }>
    >;
    onZoomIn: () => void;
    onZoomOut: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

/**
 * MapControls
 *
 * A component that displays a zoom control and a layer control.
 *
 * The zoom control consists of two buttons: one for zooming in and one for zooming out.
 *
 * The layer control displays a dropdown menu with checkboxes for each layer.
 * The user can toggle the visibility of each layer by checking or unchecking the corresponding checkbox.
 *
 * The component also displays a tooltip when the user hovers over the layer control button.
 * The tooltip displays the text "Layers".
 *
 * @param {MapControlsProps} props The props for the component.
 *
 * @returns {JSX.Element} The component.
 */
const MapControls = ({
    activeLayers,
    setActiveLayers,
    onZoomIn,
    onZoomOut,
    isOpen,
    setIsOpen,
}: MapControlsProps) => {
    const [showTooltip, setShowTooltip] = useState(false);

    interface LayerConfigItem {
        key: keyof typeof activeLayers;
        label: string;
        icon: LayerIcon;
    }

    type LayerIcon =
        | { type: "image"; icon: any } // For Next.js Image icons
        | { type: "lucide"; icon: React.ComponentType<any> }; // For Lucide icons

    const layerConfig: LayerConfigItem[] = [
        {
            key: "anchorages",
            label: "Anchorages",
            icon: { type: "image", icon: Anchorage },
        },
        {
            key: "fairways",
            label: "Fairways",
            icon: { type: "image", icon: Fairway },
        },
        {
            key: "separation",
            label: "Separation Schemes",
            icon: { type: "image", icon: Separation },
        },
        {
            key: "terminals",
            label: "Terminals",
            icon: { type: "lucide", icon: Terminal },
        },
    ];

    const handleLayerToggle = (key: string) => {
        setActiveLayers((prev: any) => ({
            ...prev,
            [key]: !prev[key as keyof typeof activeLayers],
        }));
    };

    const buttonStyles =
        "p-2 bg-gray-600 rounded-full shadow-md hover:bg-gray-700 transition-colors";
    const iconStyles = "w-5 h-5 text-white";

    return (
        <div className="flex flex-col gap-2">
            {/* Zoom Controls */}
            <button
                onClick={onZoomIn}
                className={buttonStyles}
                aria-label="Zoom in"
            >
                <Plus className={iconStyles} />
            </button>

            <button
                onClick={onZoomOut}
                className={buttonStyles}
                aria-label="Zoom out"
            >
                <Minus className={iconStyles} />
            </button>

            {/* Layer Control */}
            <div className="relative">
                <button
                    className={buttonStyles}
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <Layers className={iconStyles} />
                </button>

                {/* Tooltip */}
                {showTooltip && !isOpen && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap">
                        Layers
                    </div>
                )}

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute bottom-0 right-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-900">
                                    Layers
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {layerConfig.map(({ key, label, icon }) => (
                                    <label
                                        key={key}
                                        className="flex items-center space-x-3 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                activeLayers[
                                                    key as keyof typeof activeLayers
                                                ]
                                            }
                                            onChange={() =>
                                                handleLayerToggle(key)
                                            }
                                            className="rounded border-gray-300 cursor-pointer"
                                        />
                                        <div className="flex items-center space-x-2">
                                            {icon.type === "image" ? (
                                                <Image
                                                    src={icon.icon}
                                                    alt={label}
                                                    className="w-5 h-5"
                                                />
                                            ) : (
                                                <div className="w-5 h-5">
                                                    {React.createElement(
                                                        icon.icon,
                                                        {
                                                            className:
                                                                "w-5 h-5 text-gray-700",
                                                        }
                                                    )}
                                                </div>
                                            )}
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
        </div>
    );
};

export default MapControls;
