import React, { useRef } from "react";
import { X } from "lucide-react";
import VesselActivity from "@/types/VesselActivity";
import { ContainerVesselActivitySingle } from "@/resources/dashboard";
import Image from "next/image";

interface VesselActivityTableProps {
    data: VesselActivity[];
    onClose: () => void;
    onRowClick: (vessel: VesselActivity) => void;
}

const VesselActivityTable: React.FC<VesselActivityTableProps> = ({
    data,
    onClose,
    onRowClick,
}) => {
    const tableRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col w-full h-full">
            {/* Header */}
            <div className="flex-none flex justify-between items-center px-4 py-2 border-b bg-blue-500 h-[60px]">
                <div className="flex items-center gap-2">
                    <Image
                        src={ContainerVesselActivitySingle}
                        alt="Vessel Icon"
                        className="h-6 w-6"
                    />
                    <span className="text-base text-white">
                        Container Vessel Activity
                    </span>
                </div>
                <button onClick={onClose}>
                    <X className="h-4 w-4 text-white" />
                </button>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-hidden">
                <div ref={tableRef} className="h-full overflow-y-auto">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    Vessel Name
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    IMO
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    MMSI
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    LOA
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    Terminal
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    ATA
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    ATB
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    ATU
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    ATD
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    Pending Hours (B-A)
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    Waiting Hours in Anchorage
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    Berthing Hours (U-B)
                                </th>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    In Port Hours (D-A)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((vessel, index) => (
                                <tr
                                    key={vessel.imoNumber}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    } h-[50px] hover:bg-gray-100 transition-colors cursor-pointer`}
                                    onClick={() => onRowClick?.(vessel)}
                                >
                                    <td className="px-4 py-2 font-medium border-r border-b">
                                        {vessel.vesselName}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.imoNumber}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.mmsi}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.loa}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.terminal}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {new Date(vessel.ata).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {new Date(vessel.atb).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {new Date(vessel.atu).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {new Date(vessel.atd).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.waitingHoursAtBerth.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.waitingHoursInAnchorage.toFixed(
                                            2
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.berthingHours.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {vessel.inPortHours.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VesselActivityTable;
