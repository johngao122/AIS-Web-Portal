import React, { useRef } from "react";
import { X, ArrowUp } from "lucide-react";
import VesselActivity from "@/types/VesselActivity";

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

    const scrollToTop = () => {
        if (tableRef.current) {
            tableRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center px-3 py-4 border-b">
                <h2 className="text-xl font-semibold">
                    Container Vessel Activity
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="flex-1 relative">
                <div
                    ref={tableRef}
                    className="max-h-[600px] overflow-y-auto w-full"
                >
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10 first:rounded-tl-lg">
                                    Vessel Name
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    IMO
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    MMSI
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    LOA
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    Terminal
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    ATA
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    ATB
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    ATU
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    ATD
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    Pending Hours (B-A)
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    Waiting Hours in Anchorage
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10">
                                    Berthing Hours (U-B)
                                </th>
                                <th className="bg-emerald-500 text-white px-4 py-4 text-left whitespace-nowrap sticky top-0 z-10 last:rounded-tr-lg">
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
                                    } hover:bg-gray-100 transition-colors cursor-pointer`}
                                    onClick={() => onRowClick?.(vessel)}
                                >
                                    <td className="px-4 py-4 border-b">
                                        {vessel.vesselName}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.imoNumber}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.mmsi}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.loa}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.terminal}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {new Date(vessel.ata).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {new Date(vessel.atb).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {new Date(vessel.atu).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {new Date(vessel.atd).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.waitingHoursAtBerth.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.waitingHoursInAnchorage.toFixed(
                                            2
                                        )}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.berthingHours.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-4 border-b">
                                        {vessel.inPortHours.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={scrollToTop}
                    className="absolute bottom-6 right-6 bg-emerald-500 text-white p-2 rounded-full shadow hover:bg-emerald-600 transition-colors"
                >
                    <ArrowUp className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default VesselActivityTable;
