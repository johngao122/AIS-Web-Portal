/* eslint-disable */

import React from "react";
import { X, ChevronLeft } from "lucide-react";
import { Vector } from "@/resources/dashboard";
import Image from "next/image";
import { Info } from "lucide-react";

interface VesselActivitySingleWithArrowProps {
    vessel: any;
    onClose: () => void;
    onUpArrowClick: () => void;
    dateRange: {
        startDate: Date;
        endDate: Date;
    };
}

const tooltips = {
    "Vessel Name": "Name of the vessel",
    IMO: "International Maritime Organization number - unique vessel identifier",
    MMSI: "Maritime Mobile Service Identity - unique number for vessel radio communications",
    LOA: "Length Overall, measuring vessel's total length",
    Manager: "Company or individual responsible for vessel operations",
    "Last Location": "Most recently recorded position of the vessel",
    Terminal: "Container terminal where vessel operations take place",
    ATA: "Actual Time of Arrival to Singapore port limit",
    ATB: "Actual Time of Berthing to a specific container terminal",
    ATU: "Actual Time of Unberthing from the terminal",
    ATD: "Actual Time of Departure from Singapore port limit",
    "Pending Hours":
        "Time spent within port limit before reaching terminal boundary (ATB-ATA)",
    "Waiting Hours": "Time spent in anchorage areas",
    "Berthing Hours": "Time spent within terminal boundary (ATU-ATB)",
    "In Port Hours": "Total time spent within Singapore port limit (ATD-ATA)",
};

/**
 * Component that displays detailed vessel information with an option to navigate back
 * to the table view. It includes various vessel attributes such as name, IMO, MMSI,
 * LOA, manager, last location, terminal, and time-related data points like ATA, ATB,
 * ATU, ATD, pending hours, waiting hours, berthing hours, and in-port hours. Each
 * attribute is accompanied by a tooltip for additional context.
 *
 * Props:
 * - vessel: Object containing vessel details.
 * - onClose: Function to handle the closing of the component.
 * - onUpArrowClick: Function to handle navigation back to the table view.
 * - dateRange: Object containing the start and end dates.
 */

const VesselActivitySingleWithArrow: React.FC<
    VesselActivitySingleWithArrowProps
> = ({ vessel, onClose, onUpArrowClick, dateRange }) => {
    const formatDateTime = (date: string) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const InfoRow = ({
        label,
        value,
        tooltip,
    }: {
        label: string;
        value: string | number;
        tooltip: string;
    }) => (
        <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <div className="flex items-center gap-1">
                <span className="text-gray-600 text-sm">{label}</span>
                <div className="relative group">
                    <Info size={14} className="text-gray-400 cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 invisible group-hover:visible z-50">
                        <div className="bg-white text-gray-600 text-sm rounded-lg px-4 py-2 shadow-lg border border-gray-100 w-64">
                            {tooltip}
                        </div>
                    </div>
                </div>
            </div>
            <span className="text-gray-900 text-sm font-medium">{value}</span>
        </div>
    );

    return (
        <div className="w-80 bg-white rounded-lg shadow-lg h-full flex flex-col">
            {/* Header */}
            <div className="flex-none flex items-center bg-indigo-600 px-3 py-2 rounded-t-lg">
                <Image
                    src={Vector}
                    alt="Vector"
                    width={12}
                    height={12}
                    className="mr-2"
                />
                <h3 className="text-sm font-medium text-white flex-1">
                    Vessel Information
                </h3>
                <button
                    onClick={onUpArrowClick}
                    className="text-white hover:bg-indigo-700 p-1 rounded transition-colors mr-2"
                    aria-label="Return to table view"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                    onClick={onClose}
                    className="text-white hover:bg-indigo-700 p-1 rounded transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                <InfoRow
                    label="Vessels Name"
                    value={vessel.vesselName}
                    tooltip={tooltips["Vessel Name"]}
                />
                <InfoRow
                    label="IMO"
                    value={vessel.imoNumber}
                    tooltip={tooltips["IMO"]}
                />
                <InfoRow
                    label="MMSI"
                    value={vessel.mmsi}
                    tooltip={tooltips["MMSI"]}
                />
                <InfoRow
                    label="LOA"
                    value={vessel.loa}
                    tooltip={tooltips["LOA"]}
                />
                <InfoRow
                    label="Manager"
                    value="Aleks"
                    tooltip={tooltips["Manager"]}
                />
                <InfoRow
                    label="Last Location"
                    value="Singapore"
                    tooltip={tooltips["Last Location"]}
                />
                <InfoRow
                    label="Terminal"
                    value={vessel.terminal}
                    tooltip={tooltips["Terminal"]}
                />
                <InfoRow
                    label="ATA"
                    value={formatDateTime(vessel.ata)}
                    tooltip={tooltips["ATA"]}
                />
                <InfoRow
                    label="ATB"
                    value={formatDateTime(vessel.atb)}
                    tooltip={tooltips["ATB"]}
                />
                <InfoRow
                    label="ATU"
                    value={formatDateTime(vessel.atu)}
                    tooltip={tooltips["ATU"]}
                />
                <InfoRow
                    label="ATD"
                    value={formatDateTime(vessel.atd)}
                    tooltip={tooltips["ATD"]}
                />
                <InfoRow
                    label="Pending Hours"
                    value={vessel.waitingHoursAtBerth.toFixed(1)}
                    tooltip={tooltips["Pending Hours"]}
                />
                <InfoRow
                    label="Waiting Hours in Anchorages"
                    value={vessel.waitingHoursInAnchorage.toFixed(1)}
                    tooltip={tooltips["Waiting Hours"]}
                />
                <InfoRow
                    label="Berthing Hours"
                    value={vessel.berthingHours.toFixed(1)}
                    tooltip={tooltips["Berthing Hours"]}
                />
                <InfoRow
                    label="In Port Hours"
                    value={vessel.inPortHours.toFixed(1)}
                    tooltip={tooltips["In Port Hours"]}
                />
            </div>
        </div>
    );
};

export default VesselActivitySingleWithArrow;
