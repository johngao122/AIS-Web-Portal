import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { ContainerVesselActivitySingle } from "@/resources/dashboard";

interface VesselActivitySingleProps {
    vessel: any;
    onClose: () => void;
}

const VesselActivitySingle: React.FC<VesselActivitySingleProps> = ({
    vessel,
    onClose,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl bg-white rounded-lg shadow-lg z-[9999] transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header */}
            <div className="flex justify-between items-center bg-[#4F46E5] p-4 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded">
                        <Image
                            src={ContainerVesselActivitySingle}
                            alt="Icon"
                            width={24}
                            height={24}
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                        Vessel Information (Past 30 Days)
                    </h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-white hover:bg-[#6366F1] p-2 rounded-full transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#F9FAFB] border-b">
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[120px] whitespace-nowrap">
                                <div>vesselName</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px] whitespace-nowrap">
                                <div>imo</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px] whitespace-nowrap">
                                <div>MMSI</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[80px] whitespace-nowrap">
                                <div>LOA</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px] whitespace-nowrap">
                                <div>terminal</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px] whitespace-nowrap">
                                <div>ATA</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px] whitespace-nowrap">
                                <div>ATB</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px] whitespace-nowrap">
                                <div>ATU</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px] whitespace-nowrap">
                                <div>ATD</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[200px] whitespace-nowrap">
                                <div>Pending Hours (B-A)</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[200px] whitespace-nowrap">
                                <div>Waiting Hours in anchorages</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[200px] whitespace-nowrap">
                                <div>Berthing Hours (U-B)</div>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[200px] whitespace-nowrap">
                                <div>In Port Hours (D-A)</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.vesselName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.imoNumber}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.mmsi}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.loa}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.terminal}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {new Date(vessel.ata).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "numeric",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                                <br />
                                {new Date(vessel.ata).toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: false,
                                    }
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {new Date(vessel.atb).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "numeric",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                                <br />
                                {new Date(vessel.atb).toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: false,
                                    }
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {new Date(vessel.atu).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "numeric",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                                <br />
                                {new Date(vessel.atu).toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: false,
                                    }
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {new Date(vessel.atd).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "numeric",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                                <br />
                                {new Date(vessel.atd).toLocaleTimeString(
                                    "en-US",
                                    {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: false,
                                    }
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.waitingHoursAtBerth.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.waitingHoursInAnchorage.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.berthingHours.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {vessel.inPortHours.toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VesselActivitySingle;
