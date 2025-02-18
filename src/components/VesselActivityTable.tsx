import React, { useState } from "react";
import { X, Info, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ContainerVesselActivitySingle } from "@/resources/dashboard";
import type VesselActivity from "@/types/VesselActivity";

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

/**
 * A component that renders a table header with a label, tooltip, and an
 * optional sorting icon.
 *
 * @param {string} label - The label to display in the header.
 * @param {string} tooltip - The tooltip to display when the user hovers over
 * the header.
 * @param {keyof VesselActivity} sortKey - The key to sort the table by.
 * @param {SortConfig} currentSort - The current sorting configuration.
 * @param {(key: keyof VesselActivity) => void} onSort - The function to call
 * when the user clicks the header to sort the table.
 * @returns {JSX.Element} The table header component.
 */
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

/**
 * A table component that renders a list of container vessel activities.
 *
 * @param {VesselActivity[]} data - The data to be rendered in the table.
 * @param {() => void} onClose - The function to call when the user clicks the
 * close button.
 * @param {(vessel: VesselActivity) => void} onRowClick - The function to call
 * when the user clicks a row in the table.
 *
 * @returns {JSX.Element} The table component.
 */
const VesselActivityTable: React.FC<VesselActivityTableProps> = ({
    data,
    onClose,
    onRowClick,
}) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: null,
        direction: "asc",
    });

    const dataLength = data.length;

    /**
     * Updates the sort configuration and sorts the table by the given key.
     *
     * If the given key is already the current sort key, the direction is toggled.
     * Otherwise, the direction is set to ascending.
     *
     * @param {keyof VesselActivity} key - The key to sort the table by.
     */
    const handleSort = (key: keyof VesselActivity) => {
        setSortConfig((current) => ({
            key,
            direction:
                current.key === key && current.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    /**
     * Sorts the data in the table according to the sort configuration.
     *
     * If the sort configuration's key is null, the data is returned unsorted.
     *
     * Otherwise, the data is sorted by the key according to the following rules:
     *
     * 1. String-based fields (vesselName, terminal) are sorted lexicographically.
     * 2. Date fields (ata, atb, atu, atd) are sorted by the date in ascending order.
     * 3. Numeric fields are sorted numerically.
     *
     * The sort direction is determined by the sort configuration's direction.
     *
     * @returns {VesselActivity[]} The sorted data.
     */
    const getSortedData = () => {
        console.log(data);
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key!];
            const bValue = b[sortConfig.key!];

            // Handle string-based fields (vesselName, terminal)
            if (
                sortConfig.key &&
                ["vesselName", "terminal"].includes(sortConfig.key)
            ) {
                const aStr = String(aValue ?? "");
                const bStr = String(bValue ?? "");
                return sortConfig.direction === "asc"
                    ? aStr.localeCompare(bStr)
                    : bStr.localeCompare(aStr);
            }

            // Handle date fields
            if (
                sortConfig.key &&
                ["ata", "atb", "atu", "atd"].includes(sortConfig.key)
            ) {
                const dateA =
                    aValue === "unavailable"
                        ? -1
                        : new Date(aValue as string).getTime();
                const dateB =
                    bValue === "unavailable"
                        ? -1
                        : new Date(bValue as string).getTime();
                return sortConfig.direction === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            }

            // Handle numeric fields
            const numA = aValue === "unavailable" ? -1 : Number(aValue ?? 0);
            const numB = bValue === "unavailable" ? -1 : Number(bValue ?? 0);
            return sortConfig.direction === "asc" ? numA - numB : numB - numA;
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
                        Container Vessel Activity ({dataLength} entries)
                    </span>
                </div>
                <button onClick={onClose}>
                    <X className="h-4 w-4 text-white" />
                </button>
            </div>

            {/* Table Container */}

            {sortedData.length > 0 ? (
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-white">
                        <TableRow>
                            <TableHead className="w-72 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="Vessel Name"
                                    tooltip="Name of the vessel"
                                    sortKey="vesselName"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-32 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="IMO"
                                    tooltip="International Maritime Organization number"
                                    sortKey="imoNumber"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-36 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="MMSI"
                                    tooltip="Maritime Mobile Service Identity"
                                    sortKey="mmsi"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-24 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="LOA"
                                    tooltip={tooltips.LOA}
                                    sortKey="loa"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-40 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="Terminal"
                                    tooltip="Container terminal location"
                                    sortKey="terminal"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-44 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="ATA"
                                    tooltip={tooltips.ATA}
                                    sortKey="ata"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-44 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="ATB"
                                    tooltip={tooltips.ATB}
                                    sortKey="atb"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-44 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="ATU"
                                    tooltip={tooltips.ATU}
                                    sortKey="atu"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-44 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="ATD"
                                    tooltip={tooltips.ATD}
                                    sortKey="atd"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-32 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="Pre Berthing Hours"
                                    tooltip={tooltips["Pending Hours"]}
                                    sortKey="waitingHoursAtBerth"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-36 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="Waiting Hours in Anchorage"
                                    tooltip={
                                        tooltips["Waiting Hours in Anchorage"]
                                    }
                                    sortKey="waitingHoursInAnchorage"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-32 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="Berthing Hours"
                                    tooltip={tooltips["Berthing Hours"]}
                                    sortKey="berthingHours"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="w-32 border-r border-gray-200 px-6 py-3">
                                <SortableHeader
                                    label="In Port Hours"
                                    tooltip={tooltips["In Port Hours"]}
                                    sortKey="inPortHours"
                                    currentSort={sortConfig}
                                    onSort={handleSort}
                                />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.map((vessel, index) => (
                            <TableRow
                                key={`${vessel.imoNumber}-${index}`}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition-colors cursor-pointer`}
                                onClick={() => onRowClick?.(vessel)}
                            >
                                <TableCell className="font-medium whitespace-normal border-r border-gray-200 px-6 py-3">
                                    {vessel.vesselName}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.imoNumber}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.mmsi}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.loa}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.terminal}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.ata === "unavailable"
                                        ? "Unavailable"
                                        : new Date(vessel.ata).toLocaleString()}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.atb === "unavailable"
                                        ? "Unavailable"
                                        : new Date(vessel.atb).toLocaleString()}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.atu === "unavailable"
                                        ? "Unavailable"
                                        : new Date(vessel.atu).toLocaleString()}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {vessel.atd === "unavailable"
                                        ? "Unavailable"
                                        : new Date(vessel.atd).toLocaleString()}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {typeof vessel.waitingHoursAtBerth ===
                                    "number"
                                        ? vessel.waitingHoursAtBerth.toFixed(2)
                                        : "Unavailable"}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {typeof vessel.waitingHoursInAnchorage ===
                                    "number"
                                        ? vessel.waitingHoursInAnchorage.toFixed(
                                              2
                                          )
                                        : "Unavailable"}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {typeof vessel.berthingHours === "number"
                                        ? vessel.berthingHours.toFixed(2)
                                        : "Unavailable"}
                                </TableCell>
                                <TableCell className="truncate border-r border-gray-200 px-6 py-3">
                                    {typeof vessel.inPortHours === "number"
                                        ? vessel.inPortHours.toFixed(2)
                                        : "Unavailable"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 text-lg">No data available</p>
                </div>
            )}
        </div>
    );
};

export default VesselActivityTable;
