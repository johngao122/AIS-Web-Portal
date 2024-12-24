import React from "react";
import { X } from "lucide-react";
import { Vector } from "@/resources/dashboard";
import Image from "next/image";

interface VesselActivitySingleProps {
    vessel: any;
    onClose: () => void;
}

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
    }: {
        label: string;
        value: string | number;
    }) => (
        <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-gray-600 text-sm">{label}</span>
            <span className="text-gray-900 text-sm font-medium">{value}</span>
        </div>
    );

    return (
        <div className="absolute right-8 w-80 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center bg-indigo-600 px-4 py-2 rounded-t-lg">
                <Image
                    src={Vector}
                    alt="Vector"
                    width={12}
                    height={12}
                    className="object-contain"
                />
                <h3 className="text-sm font-medium text-white">
                    Vessel Information (Past 30 Days)
                </h3>
                <button
                    onClick={onClose}
                    className="text-white hover:bg-indigo-700 p-1 rounded-full transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
                <InfoRow label="Vessel Name" value={vessel.vesselName} />
                <InfoRow label="IMO" value={vessel.imoNumber} />
                <InfoRow label="MMSI" value={vessel.mmsi} />
                <InfoRow label="LOA" value={vessel.loa} />
                <InfoRow label="Terminal" value={vessel.terminal} />
                <InfoRow label="ATA" value={formatDateTime(vessel.ata)} />
                <InfoRow label="ATB" value={formatDateTime(vessel.atb)} />
                <InfoRow label="ATU" value={formatDateTime(vessel.atu)} />
                <InfoRow label="ATD" value={formatDateTime(vessel.atd)} />
                <InfoRow
                    label="Pending Hours (B-A)"
                    value={vessel.waitingHoursAtBerth.toFixed(2)}
                />
                <InfoRow
                    label="Waiting Hours"
                    value={vessel.waitingHoursInAnchorage.toFixed(2)}
                />
                <InfoRow
                    label="Berthing Hours (U-B)"
                    value={vessel.berthingHours.toFixed(2)}
                />
                <InfoRow
                    label="In Port Hours (D-A)"
                    value={vessel.inPortHours.toFixed(2)}
                />
            </div>
        </div>
    );
};

export default VesselActivitySingle;
