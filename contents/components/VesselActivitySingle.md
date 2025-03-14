<frontmatter>
title: VesselActivitySingle Component
layout: default.md
pageNav: 3
</frontmatter>

# VesselActivitySingle Component

A component that displays detailed information about a single vessel's activity.

**File Location**: `src/components/VesselActivitySingle.tsx`

## Overview

The VesselActivitySingle component provides a detailed view of a single vessel's activity data, including identification information, timestamps, and duration metrics. Each piece of information is accompanied by a tooltip for additional context.

## Props

| Prop      | Type         | Required | Description                                        |
| --------- | ------------ | -------- | -------------------------------------------------- |
| `vessel`  | `any`        | Yes      | Object containing vessel details and activity data |
| `onClose` | `() => void` | Yes      | Callback function when close button is clicked     |

## Features

### Information Display

-   Vessel identification (Name, IMO, MMSI)
-   Physical characteristics (LOA)
-   Terminal information
-   Timestamps (ATA, ATB, ATU, ATD)
-   Duration metrics (Pending, Waiting, Berthing, In Port hours)
-   Tooltips for each field

### Visual Design

-   Clean, organized layout
-   Consistent styling
-   Responsive design
-   Interactive tooltips
-   Smooth transitions

## Implementation Details

### InfoRow Component

```typescript
interface InfoRowProps {
    label: string;
    value: string | number;
    tooltip: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, tooltip }) => (
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
```

### Date Formatting

```typescript
const formatDateTime = (dateString: string): string => {
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
```

### Component Structure

```tsx
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
            onClick={onClose}
            className="text-white hover:bg-indigo-700 p-1 rounded transition-colors"
        >
            <X className="h-4 w-4" />
        </button>
    </div>

    {/* Content */}
    <div className="flex-1 p-4 space-y-1">
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
        {/* ... more info rows */}
    </div>
</div>
```

## Usage

```tsx
import VesselActivitySingle from "@/components/VesselActivitySingle";

const MyComponent = () => {
    const vesselData = {
        vesselName: "MAERSK SINGAPORE",
        imoNumber: "9321483",
        mmsi: "563092300",
        loa: "366.5",
        terminal: "PPT 4",
        ata: "2024-01-15T08:30:00Z",
        atb: "2024-01-15T10:15:00Z",
        atu: "2024-01-16T14:45:00Z",
        atd: "2024-01-16T16:30:00Z",
        waitingHoursAtBerth: 1.75,
        waitingHoursInAnchorage: 0.5,
        berthingHours: 28.5,
        inPortHours: 32.0,
    };

    const handleClose = () => {
        // Handle closing the component
    };

    return <VesselActivitySingle vessel={vesselData} onClose={handleClose} />;
};
```

## Styling

The component uses Tailwind CSS with a custom design system:

### Colors

-   Primary: Indigo-600 (Header background)
-   Text: Gray-600 (Labels), Gray-900 (Values)
-   Background: White
-   Borders: Gray-100

### Layout

-   Fixed width: 20rem (w-80)
-   Full height with flex column
-   Rounded corners
-   Shadow for depth
-   Responsive padding and spacing

### Interactions

-   Hover effects on close button
-   Tooltip visibility on hover
-   Smooth transitions

## Dependencies

-   React
-   lucide-react for icons
-   next/image for vector images
-   Custom types and interfaces
-   Tailwind CSS for styling

## Performance Considerations

-   Memoized InfoRow component
-   Efficient date formatting
-   Optimized tooltip rendering
-   Responsive design optimizations
-   Smooth transitions
