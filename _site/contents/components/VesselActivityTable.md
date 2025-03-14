<frontmatter>
title: VesselActivityTable Component
layout: default.md
pageNav: 3
</frontmatter>

# VesselActivityTable Component

A comprehensive data table component for displaying and managing vessel activity information with sorting capabilities.

**File Location**: `src/components/VesselActivityTable.tsx`

## Overview

The VesselActivityTable component provides a feature-rich interface for displaying vessel activity data. It includes sortable columns, tooltips for information, and interactive row selection.

## Props

| Prop         | Type                               | Required | Description                              |
| ------------ | ---------------------------------- | -------- | ---------------------------------------- |
| `data`       | `VesselActivity[]`                 | Yes      | Array of vessel activity data to display |
| `onClose`    | `() => void`                       | Yes      | Callback function when table is closed   |
| `onRowClick` | `(vessel: VesselActivity) => void` | Yes      | Callback function when a row is clicked  |

## Features

### Table Functionality

-   Sortable columns for all metrics
-   Interactive row selection
-   Column tooltips
-   Dynamic data sorting
-   Responsive layout

### Data Display

-   Vessel identification
-   Timing information (ATA, ATB, ATU, ATD)
-   Duration metrics
-   Terminal information
-   Status indicators

### Sorting Capabilities

-   Multi-field sorting
-   Direction toggle
-   Visual sort indicators
-   Type-specific sorting logic

## Implementation Details

### SortableHeader Component

```typescript
interface SortableHeaderProps {
    label: string;
    tooltip?: string;
    sortKey: keyof VesselActivity;
    currentSort: SortConfig;
    onSort: (key: keyof VesselActivity) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
    label,
    tooltip,
    sortKey,
    currentSort,
    onSort,
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
```

### Table Structure

```tsx
<div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Vessel Activity</h2>
        <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full"
        >
            <X className="h-5 w-5" />
        </button>
    </div>
    <div className="overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <SortableHeader
                            label="Vessel Name"
                            sortKey="vesselName"
                            currentSort={sortConfig}
                            onSort={handleSort}
                            tooltip="Name of the vessel"
                        />
                    </TableHead>
                    {/* ... more headers */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedData.map((vessel) => (
                    <TableRow
                        key={vessel.imoNumber}
                        onClick={() => onRowClick(vessel)}
                        className="cursor-pointer hover:bg-gray-50"
                    >
                        <TableCell>{vessel.vesselName}</TableCell>
                        {/* ... more cells */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
</div>
```

## Usage

```tsx
import VesselActivityTable from "@/components/VesselActivityTable";

const MyComponent = () => {
    const vesselData = [
        {
            vesselName: "MAERSK SINGAPORE",
            imoNumber: "9321483",
            mmsi: "563092300",
            terminal: "PPT 4",
            ata: "2024-01-15T08:30:00Z",
            atb: "2024-01-15T10:15:00Z",
            atu: "2024-01-16T14:45:00Z",
            atd: "2024-01-16T16:30:00Z",
            waitingHoursAtBerth: 1.75,
            waitingHoursInAnchorage: 0.5,
            berthingHours: 28.5,
            inPortHours: 32.0,
        },
        // ... more vessel records
    ];

    const handleClose = () => {
        // Handle closing the table
    };

    const handleRowClick = (vessel: VesselActivity) => {
        // Handle row click
    };

    return (
        <VesselActivityTable
            data={vesselData}
            onClose={handleClose}
            onRowClick={handleRowClick}
        />
    );
};
```

## Styling

The component uses shadcn/ui components with Tailwind CSS:

### Colors

-   Primary: Blue-600 (Sort indicators)
-   Text: Gray-600 (Headers), Gray-900 (Content)
-   Background: White
-   Hover: Gray-50

### Layout

-   Full width and height
-   Rounded corners
-   Shadow for depth
-   Responsive table layout
-   Sticky headers

### Interactions

-   Hover effects on rows
-   Sort direction indicators
-   Tooltip visibility
-   Smooth transitions

## Dependencies

-   React
-   lucide-react for icons
-   shadcn/ui table components
-   Custom types for vessel data
-   Tailwind CSS for styling

## Performance Considerations

-   Memoized sorting functions
-   Efficient tooltip rendering
-   Optimized row rendering
-   Type-specific sort handling
-   Responsive design optimizations
