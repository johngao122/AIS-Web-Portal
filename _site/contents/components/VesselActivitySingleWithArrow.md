<frontmatter>
title: VesselActivitySingleWithArrow Component
layout: default.md
pageNav: 3
</frontmatter>

# VesselActivitySingleWithArrow Component

A detailed vessel information panel with navigation controls for returning to a table view.

**File Location**: `src/components/VesselActivitySingleWithArrow.tsx`

## Overview

The VesselActivitySingleWithArrow component extends the functionality of VesselActivitySingle by adding a back arrow navigation control. It displays comprehensive vessel information with tooltips and allows users to navigate back to a table view.

## Props

| Prop             | Type                                 | Required | Description                                        |
| ---------------- | ------------------------------------ | -------- | -------------------------------------------------- |
| `vessel`         | `object`                             | Yes      | Object containing vessel details and activity data |
| `onClose`        | `() => void`                         | Yes      | Callback function when close button is clicked     |
| `onUpArrowClick` | `() => void`                         | Yes      | Callback function to return to table view          |
| `dateRange`      | `{ startDate: Date; endDate: Date }` | Yes      | Date range for the vessel data                     |

## Features

### Information Display

-   Vessel identification (Name, IMO, MMSI)
-   Physical characteristics (LOA)
-   Management information
-   Location data
-   Terminal information
-   Timestamps (ATA, ATB, ATU, ATD)
-   Duration metrics (Pending, Waiting, Berthing, In Port hours)

### Navigation Controls

-   Back arrow to return to table view
-   Close button
-   Smooth transitions
-   Clear visual feedback

### User Interface

-   Clean, organized layout
-   Tooltips for each field
-   Scrollable content area
-   Responsive design
-   Consistent styling

## Usage

```tsx
<VesselActivitySingleWithArrow
    vessel={vesselData}
    onClose={() => handleClose()}
    onUpArrowClick={() => handleBackToTable()}
    dateRange={dateRange}
/>
```

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

### Helper Functions

```typescript
const formatDateTime = (date: string): string => {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};
```

### Tooltips Configuration

```typescript
const tooltips = {
    "Vessel Name": "Name of the vessel",
    IMO: "International Maritime Organization number - unique vessel identifier",
    MMSI: "Maritime Mobile Service Identity - unique number for vessel radio communications",
    LOA: "Length Overall, measuring vessel's total length",
    // ... other tooltips
};
```

## Styling

The component uses:

-   Tailwind CSS for styling
-   Indigo color scheme for header
-   White background for content
-   Shadow effects for depth
-   Border separators for rows
-   Hover effects for tooltips and buttons
-   Responsive layout

## Dependencies

-   React
-   lucide-react for icons (X, ChevronLeft, Info)
-   next/image for vector images
-   Tailwind CSS for styling
-   Custom vector icon from resources

## Performance Considerations

-   Memoized helper functions
-   Efficient tooltip rendering
-   Optimized scroll handling
-   Responsive height calculations
-   Lazy tooltip loading
-   Smooth transitions
