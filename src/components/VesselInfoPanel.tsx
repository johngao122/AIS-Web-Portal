import React from "react";
import type VesselMarker from "@/types/VesselMarker";

interface VesselInfoPanelProps {
    vessels: VesselMarker[];
    onShowAllClick?: () => void;
    onVesselClick?: (vessel: VesselMarker) => void;
}

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
