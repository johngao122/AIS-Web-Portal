<frontmatter>
title: VesselInfoPanel Component
layout: default.md
pageNav: 3
</frontmatter>

# VesselInfoPanel Component

A comprehensive panel component for displaying detailed vessel information with interactive features.

**File Location**: `src/components/VesselInfoPanel.tsx`

## Overview

The VesselInfoPanel component provides a detailed view of vessel information, including identification details, physical characteristics, and operational data. It features an expandable/collapsible interface with interactive elements for data exploration.

## Props

| Prop             | Type         | Required | Description                                 |
| ---------------- | ------------ | -------- | ------------------------------------------- |
| `vessel`         | `VesselInfo` | Yes      | Object containing vessel details            |
| `onClose`        | `() => void` | Yes      | Callback function when panel is closed      |
| `onShowAllClick` | `() => void` | Yes      | Callback for "Show all vessels info" button |

## Features

### Information Display

-   Vessel name and identification numbers
-   Physical characteristics (LOA, beam, draft)
-   Current status and location
-   Manager and operator details
-   Interactive data points
-   Expandable sections

### Interactive Elements

-   Close button
-   "Show all vessels info" button
-   Collapsible sections
-   Hover effects on interactive elements
-   Smooth transitions

### Visual Design

-   Clean, organized layout
-   Clear typography hierarchy
-   Visual separation between sections
-   Responsive design
-   Consistent spacing

## Implementation Details

### Component Structure

```tsx
<div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg overflow-y-auto">
    <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Vessel Information</h2>
        <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full"
        >
            <X className="h-5 w-5" />
        </button>
    </div>

    <div className="p-4 space-y-6">
        <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
                Identification
            </h3>
            <div className="space-y-2">
                <InfoRow label="Vessel Name" value={vessel.name} />
                <InfoRow label="IMO Number" value={vessel.imoNumber} />
                <InfoRow label="MMSI" value={vessel.mmsi} />
            </div>
        </section>

        <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
                Physical Characteristics
            </h3>
            <div className="space-y-2">
                <InfoRow label="LOA" value={`${vessel.loa}m`} />
                <InfoRow label="Beam" value={`${vessel.beam}m`} />
                <InfoRow label="Draft" value={`${vessel.draft}m`} />
            </div>
        </section>

        <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
            <div className="space-y-2">
                <InfoRow
                    label="Current Location"
                    value={vessel.currentLocation}
                />
                <InfoRow label="Status" value={vessel.status} />
                <InfoRow
                    label="Last Updated"
                    value={formatDateTime(vessel.lastUpdated)}
                />
            </div>
        </section>

        <button
            onClick={onShowAllClick}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            Show all vessels info
        </button>
    </div>
</div>
```

### InfoRow Component

```tsx
interface InfoRowProps {
    label: string;
    value: string | number;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium">{value}</span>
    </div>
);
```

## Usage

```tsx
import VesselInfoPanel from "@/components/VesselInfoPanel";

const MyComponent = () => {
    const vesselData = {
        name: "MAERSK SINGAPORE",
        imoNumber: "9321483",
        mmsi: "563092300",
        loa: 366.5,
        beam: 48.2,
        draft: 15.5,
        currentLocation: "Singapore Strait",
        status: "Underway",
        lastUpdated: "2024-01-16T16:30:00Z",
    };

    const handleClose = () => {
        // Handle closing the panel
    };

    const handleShowAll = () => {
        // Handle showing all vessels
    };

    return (
        <VesselInfoPanel
            vessel={vesselData}
            onClose={handleClose}
            onShowAllClick={handleShowAll}
        />
    );
};
```

## Styling

The component uses Tailwind CSS for styling:

### Colors

-   Primary: Blue-600 (buttons)
-   Text: Gray-600 (labels), Gray-900 (values)
-   Background: White
-   Borders: Gray-200

### Layout

-   Fixed position on right side
-   Full height
-   384px width (w-96)
-   Scrollable content
-   Responsive padding

### Typography

-   Font sizes: text-sm for content, text-lg for headers
-   Font weights: medium for labels, semibold for headers
-   Color hierarchy for readability

### Spacing

-   Consistent padding (p-4)
-   Vertical spacing between sections (space-y-6)
-   Compact spacing within sections (space-y-2)

## Dependencies

-   React
-   lucide-react for icons
-   date-fns for date formatting
-   Tailwind CSS for styling
-   Custom types for vessel data

## Performance Considerations

-   Memoized components for optimal re-rendering
-   Efficient scroll handling
-   Optimized layout calculations
-   Lazy loading of sections
-   Smooth transitions and animations
