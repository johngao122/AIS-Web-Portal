import React from "react";
import { X, ChevronLeft } from "lucide-react";
import { Vector } from "@/resources/dashboard";
import Image from "next/image";

interface VesselActivitySingleWithArrowProps {
    vessel: any;
    onClose: () => void;
    onUpArrowClick: () => void;
    dateRange: {
        startDate: Date;
        endDate: Date;
    };
}

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
    }: {
        label: string;
        value: string | number;
    }) => (
        <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-xs text-gray-600">{label}</span>
            <span className="text-xs font-medium text-gray-900">{value}</span>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-lg w-80">
            {/* Header */}
            <div className="flex items-center bg-indigo-600 px-3 py-2 rounded-t-lg">
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

            {/* Content */}
            <div className="p-4 space-y-2">
                <InfoRow label="Vessels Name" value={vessel.vesselName} />
                <InfoRow label="IMO" value={vessel.imoNumber} />
                <InfoRow label="MMSI" value={vessel.mmsi} />
                <InfoRow label="LOA" value={vessel.loa} />
                <InfoRow label="Manager" value="Aleks" />
                <InfoRow label="Last Location" value="Singapore" />
                <InfoRow label="Terminal" value={vessel.terminal} />
                <InfoRow label="ATA" value={formatDateTime(vessel.ata)} />
                <InfoRow label="ATB" value={formatDateTime(vessel.atb)} />
                <InfoRow label="ATU" value={formatDateTime(vessel.atu)} />
                <InfoRow label="ATD" value={formatDateTime(vessel.atd)} />
                <InfoRow
                    label="Pending Hours (B-A)"
                    value={vessel.waitingHoursAtBerth.toFixed(1)}
                />
                <InfoRow
                    label="Waiting Hours in Anchorages"
                    value={vessel.waitingHoursInAnchorage.toFixed(1)}
                />
                <InfoRow
                    label="Berthing Hours (U-B)"
                    value={vessel.berthingHours.toFixed(1)}
                />
                <InfoRow
                    label="In Port Hours (D-A)"
                    value={vessel.inPortHours.toFixed(1)}
                />
            </div>
        </div>
    );
};

export default VesselActivitySingleWithArrow;
