import React, { useState } from "react";
import { X, Info, ArrowUp, ArrowDown } from "lucide-react";
import VesselActivity from "@/types/VesselActivity";
import { ContainerVesselActivitySingle } from "@/resources/dashboard";
import Image from "next/image";

interface VesselActivityTableProps {
    data: VesselActivity[];
    onClose: () => void;
    onRowClick: (vessel: VesselActivity) => void;
}

type SortConfig = {
    key: keyof VesselActivity | null;
    direction: "asc" | "desc";
};

const tooltips = {
    LOA: "Length Overall, measuring vessel's length",
    ATA: "Actual time of arrival to Singapore port limit",
    ATB: "Actual time of berthing to a specific container terminal",
    ATU: "Actual time of unberthing",
    ATD: "Actual time of departure from Singapore port limit",
    "Pending Hours":
        "The time a vessel spends within port limit, either anchored or voyaging, before reaching terminal boundary to commence berthing operations (ATB-ATA)",
    "Waiting Hours in Anchorage":
        "The time a vessel spends in all anchorage areas",
    "Berthing Hours":
        "The time a vessel spends within terminal boundary (ATU-ATB)",
    "In Port Hours":
        "The time a vessel spends within Singapore port limit (ATD-ATA)",
};

const SortableHeader = ({
    label,
    tooltip,
    sortKey,
    currentSort,
    onSort,
}: {
    label: string;
    tooltip: string;
    sortKey: keyof VesselActivity;
    currentSort: SortConfig;
    onSort: (key: keyof VesselActivity) => void;
}) => {
    const isActive = currentSort.key === sortKey;
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => onSort(sortKey)}
        >
            <span>{label}</span>

            <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div className="cursor-help">
                    <Info
                        size={14}
                        className="text-gray-400 hover:text-gray-500"
                    />
                </div>

                {showTooltip && (
                    <div className="absolute bg-white text-gray-600 text-sm rounded-lg px-4 py-2 w-64 shadow-lg border border-gray-100 left-0 ml-6 -mt-2 pointer-events-none z-30">
                        <div className="absolute w-2 h-2 bg-white border-l border-t border-gray-100 transform -translate-x-1 translate-y-1 rotate-45 left-0"></div>
                        {tooltip}
                    </div>
                )}
            </div>

            <div className="ml-1">
                {isActive ? (
                    currentSort.direction === "asc" ? (
                        <ArrowUp size={14} className="text-blue-600" />
                    ) : (
                        <ArrowDown size={14} className="text-blue-600" />
                    )
                ) : (
                    <ArrowDown size={14} className="text-gray-300" />
                )}
            </div>
        </div>
    );
};

const VesselActivityTable: React.FC<VesselActivityTableProps> = ({
    data,
    onClose,
    onRowClick,
}) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: null,
        direction: "asc",
    });

    const handleSort = (key: keyof VesselActivity) => {
        setSortConfig((current) => ({
            key,
            direction:
                current.key === key && current.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    const getSortedData = () => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key!];
            const bValue = b[sortConfig.key!];

            // Handle different types of sorting based on the field
            if (
                sortConfig.key &&
                ["vesselName", "terminal"].includes(sortConfig.key)
            ) {
                // String sorting (A-Z or Z-A)
                const comparison = String(aValue ?? "").localeCompare(
                    String(bValue ?? "")
                );
                return sortConfig.direction === "asc"
                    ? comparison
                    : -comparison;
            } else if (
                sortConfig.key &&
                ["ata", "atb", "atu", "atd"].includes(sortConfig.key)
            ) {
                // Date sorting (oldest to newest or newest to oldest)
                const dateA = new Date(aValue as string).getTime();
                const dateB = new Date(bValue as string).getTime();
                return sortConfig.direction === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            } else {
                // Numeric sorting (smallest to largest or largest to smallest)
                const numA = Number(aValue ?? 0);
                const numB = Number(bValue ?? 0);
                return sortConfig.direction === "asc"
                    ? numA - numB
                    : numB - numA;
            }
        });
    };

    const sortedData = getSortedData();

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex-none flex justify-between items-center px-4 py-2 border-b bg-blue-500 h-[60px] rounded-t-lg">
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
            <div className="flex-1 overflow-auto">
                <table
                    className="border-collapse table-auto"
                    style={{ width: "max-content" }}
                >
                    <thead className="sticky top-0 z-10 bg-white">
                        <tr>
                            <th className="w-72 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="Vessel Name"
                                    tooltip="Name of the vessel"
                                    sortKey="vesselName"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-32 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="IMO"
                                    tooltip="International Maritime Organization number"
                                    sortKey="imoNumber"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            {/* Add more headers with sorting functionality */}
                            <th className="w-36 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="MMSI"
                                    tooltip="Maritime Mobile Service Identity"
                                    sortKey="mmsi"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-24 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="LOA"
                                    tooltip={tooltips.LOA}
                                    sortKey="loa"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-40 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="Terminal"
                                    tooltip="Container terminal location"
                                    sortKey="terminal"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-44 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="ATA"
                                    tooltip={tooltips.ATA}
                                    sortKey="ata"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-44 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="ATB"
                                    tooltip={tooltips.ATB}
                                    sortKey="atb"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-44 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="ATU"
                                    tooltip={tooltips.ATU}
                                    sortKey="atu"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-44 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="ATD"
                                    tooltip={tooltips.ATD}
                                    sortKey="atd"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-32 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="Pre Berthing Hours"
                                    tooltip={tooltips["Pending Hours"]}
                                    sortKey="waitingHoursAtBerth"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-36 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="Waiting Hours in Anchorage"
                                    tooltip={
                                        tooltips["Waiting Hours in Anchorage"]
                                    }
                                    sortKey="waitingHoursInAnchorage"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-32 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="Berthing Hours"
                                    tooltip={tooltips["Berthing Hours"]}
                                    sortKey="berthingHours"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                            <th className="w-32 px-6 py-3 text-left font-medium border-r border-b">
                                <SortableHeader
                                    label="In Port Hours"
                                    tooltip={tooltips["In Port Hours"]}
                                    sortKey="inPortHours"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((vessel, index) => (
                            <tr
                                key={vessel.imoNumber}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition-colors cursor-pointer`}
                                onClick={() => onRowClick?.(vessel)}
                            >
                                <td className="px-6 py-3 font-medium border-r border-b whitespace-normal">
                                    {vessel.vesselName}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.imoNumber}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.mmsi}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.loa}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.terminal}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {new Date(vessel.ata).toLocaleString()}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {new Date(vessel.atb).toLocaleString()}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {new Date(vessel.atu).toLocaleString()}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {new Date(vessel.atd).toLocaleString()}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.waitingHoursAtBerth.toFixed(2)}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.waitingHoursInAnchorage.toFixed(2)}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.berthingHours.toFixed(2)}
                                </td>
                                <td className="px-6 py-3 border-r border-b truncate">
                                    {vessel.inPortHours.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VesselActivityTable;
