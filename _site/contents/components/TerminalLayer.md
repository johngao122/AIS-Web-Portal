<frontmatter>
title: TerminalLayer Component
layout: default.md
pageNav: 3
</frontmatter>

# TerminalLayer Component

A deck.gl layer component for visualizing port terminals with interactive features and real-time statistics.

**File Location**: `src/components/TerminalLayer.tsx`

## Overview

The TerminalLayer component creates an interactive visualization layer for port terminals using deck.gl's IconLayer. It displays terminal locations with icons and provides hover interactions to show terminal statistics.

## Data Structures

### TerminalStats Interface

```typescript
interface TerminalStats {
    totalVessels: number;
    jitPercentage: number;
    avgWaitingHours: number;
    avgBerthingHours: number;
    utilization: number;
}
```

### Terminal Interface

```typescript
interface Terminal {
    name: string;
    position: [number, number];
    stats: TerminalStats;
}
```

## Features

### Terminal Visualization

-   Icon-based terminal markers
-   Interactive hover effects
-   Real-time statistics display
-   Configurable visibility
-   Depth testing disabled for better overlay

### Terminal Statistics

-   Total vessel count
-   JIT arrival percentage
-   Average waiting hours
-   Average berthing hours
-   Terminal utilization rate

### Data Handling

-   Real-time data fetching
-   Fallback data support
-   Error handling
-   Data transformation
-   Date range management

## Usage

```typescript
import { createTerminalLayer, fetchTerminalData } from "./TerminalLayer";

// Fetch terminal data
const terminals = await fetchTerminalData();

// Create terminal layer
const layer = createTerminalLayer({
    data: terminals,
    onHover: (info) => handleHover(info),
    visible: true,
});
```

## Implementation Details

### Terminal Data Transformation

```typescript
const transformTerminalData = (data: PortInfoData): Terminal[] => {
    if (!data || !data["Period 1"]) return [];

    const periodData = data["Period 1"];
    const terminals = periodData.terminals;

    if (!terminals) return [];

    return [
        {
            name: "Pasir Panjang Terminal",
            position: [103.77, 1.28],
            stats: {
                totalVessels: terminals.PP.totalVessels,
                jitPercentage: terminals.PP.jitPercentage,
                avgWaitingHours: terminals.PP.waitingHours.average,
                avgBerthingHours: terminals.PP.berthingHours.average,
                utilization: terminals.PP.utilization || 0,
            },
        },
        // ... other terminals
    ];
};
```

### Layer Configuration

```typescript
const createTerminalLayer = ({
    data,
    onHover,
    visible = true,
}: {
    data: Terminal[];
    onHover: (info: any) => void;
    visible?: boolean;
}) => {
    return new IconLayer({
        id: "terminals",
        data,
        pickable: true,
        iconAtlas: terminalIconUrl,
        iconMapping: {
            terminal: { x: 0, y: 0, width: 48, height: 48, mask: true },
        },
        getIcon: () => "terminal",
        sizeScale: 2,
        getPosition: (d) => d.position,
        getSize: () => 24,
        getColor: () => [48, 128, 255],
        visible,
        onHover,
        parameters: {
            depthTest: false,
        },
    });
};
```

### Data Fetching

```typescript
export const fetchTerminalData = async (): Promise<Terminal[]> => {
    try {
        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const data = await fetchPortInfo([
            {
                name: "Period 1",
                startDate: formatDate(oneMonthAgo),
                endDate: formatDate(today),
            },
        ]);

        const transformedData = transformTerminalData(data);
        return transformedData.length > 0
            ? transformedData
            : fallbackTerminalData;
    } catch (err) {
        console.error("Error fetching terminal data:", err);
        return fallbackTerminalData;
    }
};
```

## Terminal Locations

| Terminal      | Position                 |
| ------------- | ------------------------ |
| Pasir Panjang | [103.77, 1.28]           |
| Tuas          | [103.65, 1.32]           |
| Brani         | [103.83333, 1.255998976] |
| Keppel        | [103.8475, 1.2647]       |

## Dependencies

-   deck.gl for layer rendering
-   Custom API utilities for data fetching
-   SVG icon for terminal markers
-   Custom types for port information

## Error Handling

-   Fallback data for API failures
-   Data validation checks
-   Console error logging
-   Graceful degradation
-   Type checking
