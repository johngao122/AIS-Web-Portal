/* eslint-disable */

import React from "react";
import { X } from "lucide-react";
import { Vector } from "@/resources/dashboard";
import Image from "next/image";
import { Info } from "lucide-react";

interface VesselActivitySingleProps {
    vessel: any;
    onClose: () => void;
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
 * VesselActivitySingle is a React functional component that displays detailed
 * information about a single vessel's activity. It presents data such as the
 * vessel's name, IMO, MMSI, length overall (LOA), terminal, and various timestamps
 * related to the vessel's berthing and departure activities. The component also
 * shows calculated hours spent in different stages, such as pending, waiting,
 * berthing, and in-port hours.
 *
 * Props:
 * - vessel: An object containing detailed information about the vessel, including
 *   its name, identifier numbers, and activity timestamps.
 * - onClose: A function to be called when the close button is clicked.
 *
 * The component uses an inner InfoRow component to render each piece of
 * information with a corresponding tooltip for additional context. The formatDateTime
 * helper function is utilized to format date strings into a human-readable format.
 */

const VesselActivitySingle: React.FC<VesselActivitySingleProps> = ({
    vessel,
    onClose,
}) => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
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
        <div className="absolute right-8 w-80 bg-white rounded-lg shadow-lg max-h-[83vh] flex flex-col">
            {/* Header */}
            <div className="flex-none flex justify-between items-center bg-indigo-600 px-4 py-2 rounded-t-lg">
                <Image
                    src={Vector}
                    alt="Vector"
                    width={12}
                    height={12}
                    className="object-contain"
                />
                <h3 className="text-sm font-medium text-white">
                    Vessel Latest Berthing Record
                </h3>
                <button
                    onClick={onClose}
                    className="text-white hover:bg-indigo-700 p-1 rounded-full transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-4 space-y-1 ">
                <InfoRow
                    label="Vessel Name"
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
                    value={vessel.waitingHoursAtBerth.toFixed(2)}
                    tooltip={tooltips["Pending Hours"]}
                />
                <InfoRow
                    label="Waiting Hours"
                    value={vessel.waitingHoursInAnchorage.toFixed(2)}
                    tooltip={tooltips["Waiting Hours"]}
                />
                <InfoRow
                    label="Berthing Hours"
                    value={vessel.berthingHours.toFixed(2)}
                    tooltip={tooltips["Berthing Hours"]}
                />
                <InfoRow
                    label="In Port Hours"
                    value={vessel.inPortHours.toFixed(2)}
                    tooltip={tooltips["In Port Hours"]}
                />
            </div>
        </div>
    );
};

export default VesselActivitySingle;
