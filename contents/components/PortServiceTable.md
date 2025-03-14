<frontmatter>
title: PortServiceTable Component
layout: default.md
pageNav: 3
</frontmatter>

# PortServiceTable Component

A comprehensive table component for displaying and analyzing port service metrics and performance indicators.

**File Location**: `src/components/PortServiceTable.tsx`

## Overview

The PortServiceTable component provides a detailed view of port service data, including vessel statistics, service metrics, and terminal utilization rates. It features sortable columns, category-based filtering, and performance indicators.

## Props

| Prop      | Type         | Required | Description                                           |
| --------- | ------------ | -------- | ----------------------------------------------------- |
| `data`    | `any[]`      | Yes      | Array of port service data for different time periods |
| `onClose` | `() => void` | Yes      | Callback function when the table is closed            |

## Features

### Data Display

-   Sortable columns for metrics
-   Category-based vessel filtering
-   Time period comparison
-   Performance metric visualization
-   Terminal utilization rates

### Metrics Tracked

-   Total berthed vessels
-   JIT percentage
-   Waiting hours in anchorages
-   Berthing hours
-   In-port hours
-   Wharf utilization rates

### Vessel Categories

-   All vessels
-   Category 1 (LOA ≤ 147m)
-   Category 2 (147m < LOA ≤ 209m)
-   Category 3 (209m < LOA ≤ 285m)
-   Category 4 (285m < LOA ≤ 400m)

## Usage

```tsx
<PortServiceTable
    data={[
        {
            "2024-01": {
                "All vessels": {
                    TotalBerthed: 150,
                    JIT: 85,
                    WaitingHours: {
                        average: 1.5,
                        median: 1.2,
                    },
                    // ... other metrics
                },
                // ... other vessel categories
            },
        },
        // ... other time periods
    ]}
    onClose={() => handleTableClose()}
/>
```

## Implementation Details

### Data Structure

```typescript
interface PortServiceMetric {
    TotalBerthed: number;
    JIT: number;
    WaitingHours: {
        average: number;
        median: number;
    };
    BerthingHours: {
        average: number;
        median: number;
    };
    InPortHours: {
        average: number;
        median: number;
    };
    WharfUtilizationRate: {
        allterminals: number;
        PasirPanjang: number;
        Tuas: number;
        BraniKeppel: number;
    };
}
```

### Metric Configuration

```typescript
const metrics = [
    {
        key: "TotalBerthed",
        label: "Total number of berthed vessels",
        render: (periodData, category) =>
            periodData?.[category]?.TotalBerthed || "-",
    },
    {
        key: "JIT",
        label: "JIT % (Pre-berthing hours <2h)",
        render: (periodData, category) =>
            `${periodData?.[category]?.JIT || "0"}%`,
    },
    // ... other metrics
];
```

### Helper Functions

```typescript
const formatNumber = (value: number): string => {
    return value?.toFixed(2) || "0.00";
};

const hasMetric = (metricKey: string): boolean => {
    // Check if metric exists in data
};

const hasMetricWithProps = (metricKey: string, subProps: string[]): boolean => {
    // Check if metric with sub-properties exists
};
```

## Styling

The component uses:

-   Tailwind CSS for styling
-   Responsive table layout
-   Fixed header during scroll
-   Custom icons for visual indicators
-   Color-coded performance metrics
-   Hover effects for interactive elements

## Dependencies

-   React
-   lucide-react for icons
-   next/image for icons
-   shadcn/ui table components
-   Custom table icon from resources
-   Tailwind CSS for styling

## Performance Considerations

-   Row count memoization
-   Conditional metric rendering
-   Efficient data filtering
-   Optimized scroll handling
-   Responsive height calculations
