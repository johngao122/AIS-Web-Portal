import React from "react";
import type VesselMarker from "@/types/VesselMarker";

/**
 * Props for the VesselInfoPanel component
 * @interface VesselInfoPanelProps
 */
interface VesselInfoPanelProps {
    /** Array of vessel markers to display information for */
    vessels: VesselMarker[];
    /** Optional callback function when "Show all vessels info" button is clicked */
    onShowAllClick?: () => void;
    /** Optional callback function when an individual vessel entry is clicked */
    onVesselClick?: (vessel: VesselMarker) => void;
}

/**
 * VesselInfoPanel Component
 *
 * A panel that displays information about vessels found in search results.
 * Shows a list of vessels with their key details and provides interaction options.
 *
 * Features:
 * - Displays vessel name, IMO number, MMSI, and other key information
 * - Clickable vessel entries for detailed information
 * - Option to show all vessels in the system
 * - Scrollable design for handling multiple vessels
 * - Hover effects for better user interaction
 *
 * @component
 * @param {VesselInfoPanelProps} props - Component props
 * @param {VesselMarker[]} props.vessels - Array of vessel objects to display
 * @param {() => void} [props.onShowAllClick] - Optional callback when "Show all vessels info" button is clicked
 * @param {(vessel: VesselMarker) => void} [props.onVesselClick] - Optional callback when a vessel entry is clicked
 * @returns {React.ReactElement|null} The rendered VesselInfoPanel or null if no vessels
 */
const VesselInfoPanel: React.FC<VesselInfoPanelProps> = ({
    vessels,
    onShowAllClick,
    onVesselClick,
}) => {
    if (!vessels || vessels.length === 0) return null;

    return (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#4F46E5] text-white p-3 flex items-center">
                <div className="flex-1">
                    <h2 className="text-base font-medium">
                        Vessel Information
                    </h2>
                </div>
            </div>

            {/* Vessel List */}
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto divide-y divide-gray-200">
                {vessels.map((vessel, index) => (
                    <div
                        key={`${vessel.imoNumber}-${index}`}
                        className="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-l-4 border-l-transparent hover:border-l-[#4F46E5]"
                        onClick={() => onVesselClick?.(vessel)}
                    >
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[#4F46E5]">
                                    • Vessels Name
                                </span>
                                <span className="text-black">
                                    {vessel.vesselName}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#4F46E5]">• IMO</span>
                                <span className="text-black">
                                    {vessel.imoNumber}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#4F46E5]">• MMSI</span>
                                <span className="text-black">
                                    {vessel.mmsi}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#4F46E5]">• LOA</span>
                                <span className="text-black">{vessel.loa}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#4F46E5]">
                                    • Manager
                                </span>
                                <span className="text-black">Aleks</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#4F46E5]">
                                    • Last Location
                                </span>
                                <span className="text-black">
                                    {vessel.lastLocation}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show All Button */}
            {vessels.length > 0 && (
                <div className="p-3 bg-white border-t border-gray-200">
                    <button
                        onClick={onShowAllClick}
                        className="w-full py-2 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition-colors duration-200 text-sm"
                    >
                        Show all vessels info in table
                    </button>
                </div>
            )}
        </div>
    );
};

export default VesselInfoPanel;
