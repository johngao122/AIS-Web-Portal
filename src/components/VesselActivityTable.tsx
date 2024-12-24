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
                    <table className="w-full border-collapse ">
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th className="bg-white w-32 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        Vessel Name
                                    </div>
                                </th>
                                <th className="bg-white w-24 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        IMO
                                    </div>
                                </th>
                                <th className="bg-white w-24 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        MMSI
                                    </div>
                                </th>
                                <th className="bg-white w-20 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        LOA
                                    </div>
                                </th>
                                <th className="bg-white w-28 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        Terminal
                                    </div>
                                </th>
                                <th className="bg-white w-36 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        ATA
                                    </div>
                                </th>
                                <th className="bg-white w-36 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        ATB
                                    </div>
                                </th>
                                <th className="bg-white w-36 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        ATU
                                    </div>
                                </th>
                                <th className="bg-white w-36 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        ATD
                                    </div>
                                </th>
                                <th className="bg-white w-32 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        Pending Hours (B-A)
                                    </div>
                                </th>
                                <th className="bg-white w-40 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        Waiting Hours in Anchorage
                                    </div>
                                </th>
                                <th className="bg-white w-36 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        Berthing Hours (U-B)
                                    </div>
                                </th>
                                <th className="bg-white w-36 px-4 py-3 text-left font-medium border-r border-b">
                                    <div className="min-h-[40px] flex items-center">
                                        In Port Hours (D-A)
                                    </div>
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
                                    } hover:bg-gray-100 transition-colors cursor-pointer`}
                                    onClick={() => onRowClick?.(vessel)}
                                >
                                    <td className="px-4 py-3 font-medium border-r border-b">
                                        <div className="min-h-[40px] flex items-center whitespace-normal">
                                            {vessel.vesselName}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.imoNumber}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.mmsi}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.loa}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.terminal}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {new Date(
                                                vessel.ata
                                            ).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {new Date(
                                                vessel.atb
                                            ).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {new Date(
                                                vessel.atu
                                            ).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {new Date(
                                                vessel.atd
                                            ).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.waitingHoursAtBerth.toFixed(
                                                2
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.waitingHoursInAnchorage.toFixed(
                                                2
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.berthingHours.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center border-r border-b">
                                        <div className="min-h-[40px] flex items-center justify-center whitespace-normal">
                                            {vessel.inPortHours.toFixed(2)}
                                        </div>
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
