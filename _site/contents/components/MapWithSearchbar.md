<frontmatter>
title: MapWithSearchbar Component
layout: default.md
pageNav: 3
</frontmatter>

# MapWithSearchbar Component

A comprehensive interactive map component that integrates vessel tracking, port services, and geospatial visualization with search functionality.

**File Location**: `src/components/MapWithSearchbar.tsx`

## Overview

The MapWithSearchbar component serves as the main visualization interface for the maritime traffic monitoring system. It combines a map view with search capabilities, vessel tracking, port services information, and interactive controls.

## Props

| Prop               | Type     | Default                                                                     | Description                    |
| ------------------ | -------- | --------------------------------------------------------------------------- | ------------------------------ |
| `mapStyle`         | `string` | `"mapbox://styles/mapbox/light-v10"`                                        | Custom map style URL           |
| `initialViewState` | `object` | `{ longitude: 103.8198, latitude: 1.3521, zoom: 11, pitch: 0, bearing: 0 }` | Initial map view configuration |

## Features

### Map Visualization

-   Interactive map with WebGL-based rendering using deck.gl
-   Multiple layer support (vessels, terminals, fairways, separation zones)
-   Custom vessel markers with heading indicators
-   Smooth animations for vessel movements
-   Zoom and pan controls

### Search Functionality

-   Real-time vessel search by name, IMO, or MMSI
-   Search results highlighting
-   Result count display
-   Auto-focus on selected vessels

### Vessel Tracking

-   Real-time vessel position updates
-   Vessel path visualization
-   Historical trajectory playback
-   Heading and bearing calculations
-   Vessel information tooltips

### Port Services

-   Port service level monitoring
-   Terminal data visualization
-   Service performance metrics
-   Time-based analysis

### Time Controls

-   Time slider for historical data
-   Animation controls for vessel movements
-   Date range selection
-   Real-time updates

## Usage

```tsx
<MapWithSearchbar
    mapStyle="mapbox://styles/mapbox/dark-v10"
    initialViewState={initialViewState}
/>
```

## Implementation Details

### State Management

The component uses React's useState and useEffect hooks to manage a complex state system:

```tsx
// Map and view state
const [viewState, setViewState] = useState(initialViewState);
const [activeLayers, setActiveLayers] = useState({
    anchorages: true,
    fairways: true,
    separation: true,
    terminals: true,
});
const [layerMenuOpen, setLayerMenuOpen] = useState(false);

// Vessel data state
const [vessels, setVessels] = useState<VesselMarker[]>([]);
const [activeVessel, setActiveVessel] = useState<VesselData | null>(null);
const [focusVessel, setFocusVessel] = useState<VesselMarker | null>(null);
const [vesselData, setVesselData] = useState<VesselActivity[] | null>(null);
const [selectedVessel, setSelectedVessel] = useState<VesselActivity | null>(
    null
);
const [vesselPath, setVesselPath] = useState<any[]>([]);
const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(
    null
);
const [currentHeading, setCurrentHeading] = useState<number>(0);
const [vesselInfoSource, setVesselInfoSource] = useState<
    "fab" | "direct" | null
>(null);

// Search state
const [searchQuery, setSearchQuery] = useState<string>("");

// UI state
const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
const [showVesselTable, setShowVesselTable] = useState(false);
const [showPortServiceTable, setShowPortServiceTable] = useState(false);
const [showVesselInfo, setShowVesselInfo] = useState(false);
const [errorMessage, setErrorMessage] = useState<string | null>(null);

// Port service state
const [portServiceData, setPortServiceData] = useState<PortServiceData | null>(
    null
);
const [terminalData, setTerminalData] = useState<Terminal[]>([]);

// Time control state
const [timelineData, setTimelineData] = useState<any[]>([]);
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState<Date | null>(null);
const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
} | null>(null);

// Floating action button states
const [fabStates, setFabStates] = useState({
    vesselInfo: {
        isExpanded: false,
        startDate: undefined as Date | undefined,
        endDate: undefined as Date | undefined,
        selectedFilters: {} as FilterState,
    },
    portService: {
        isExpanded: false,
        timeRanges: [] as TimeRange[],
        selectedFilters: [] as string[],
    },
});
```

The component also implements several key state management functions:

1. **View State Management**

    - `onViewStateChange`: Updates the map view state (zoom, pan, etc.)
    - `handleZoomIn` and `handleZoomOut`: Control map zoom level

2. **Vessel Data Management**

    - `handleVesselDataUpdate`: Updates vessel data and related UI state
    - `applyFilters`: Filters vessel data based on user-selected criteria
    - `handleVesselClick`: Handles vessel selection and focus
    - `updateVesselPosition`: Updates vessel position during animation

3. **Search Management**

    - `handleSearch`: Processes search queries and filters vessels
    - `matchesVesselSearch`: Determines if a vessel matches search criteria

4. **UI State Management**

    - `handleVesselInfoFabToggle`: Controls vessel information panel expansion
    - `handlePortServiceFabToggle`: Controls port service panel expansion
    - `handleTableRowClick`: Handles vessel selection from the data table
    - `handleCloseVesselInfo`: Closes vessel information panel

5. **Animation Control**
    - Animation logic in useEffect hook for vessel movement playback
    - `calculateHeading`: Calculates vessel heading based on position changes

### Component Architecture

The MapWithSearchbar component is structured in layers:

```tsx
// Main container
<div className="relative w-full h-full">
    {/* Map Layer */}
    <div className="absolute inset-0">
        <DeckGL>
            <StaticMap />
            {/* Tooltips */}
        </DeckGL>
    </div>

    {/* UI Layer */}
    <div className="absolute inset-0 pointer-events-none z-10">
        {/* Search Bar */}
        {/* Map Controls */}
    </div>

    {/* FAB Layer */}
    <div className="absolute top-32 left-4 pointer-events-auto z-30">
        {/* Vessel Info FAB */}
        {/* Port Service FAB */}
    </div>

    {/* Table Layer */}
    <div className="absolute top-32 left-[calc(25vw+1rem+1rem)] right-4 pointer-events-auto z-20">
        {/* Vessel Activity Table */}
        {/* Port Service Table */}
    </div>

    {/* Vessel Info Panel Layer */}
    {/* Time Slider */}
    {/* Toast Layer */}
</div>
```

This layered approach allows for complex UI interactions while maintaining separation of concerns.

### Key Event Handlers

```tsx
// Map interaction handlers
const handleVesselClick = (info: PickingInfo) => {
    // Handle vessel selection on map click
};

const handleSearch = (query: string) => {
    // Process search queries and filter vessels
};

const handleTableRowClick = (vessel: VesselActivity) => {
    // Handle selection from data table
};

const updateVesselPosition = (time: Date, isDragging: boolean = false) => {
    // Update vessel position during animation
};

const handleZoomIn = () => {
    // Increase map zoom level
};

const handleZoomOut = () => {
    // Decrease map zoom level
};
```

### Dependencies

The component relies on several key libraries:

-   **deck.gl**: For WebGL-based geospatial visualization
-   **react-map-gl**: For the base map layer (Mapbox integration)
-   **d3-ease**: For smooth animations and transitions
-   **lodash**: For utility functions

### Performance Considerations

The component implements several optimizations:

1. **Memoization**: Uses React's useMemo for expensive calculations
2. **Layer Filtering**: Only renders active layers to reduce GPU load
3. **Animation Frame Management**: Properly manages requestAnimationFrame for smooth animations
4. **Conditional Rendering**: Only renders UI elements when needed

### Accessibility

The component includes accessibility features:

1. **Keyboard Navigation**: Support for keyboard controls
2. **Screen Reader Support**: Appropriate ARIA labels
3. **Color Contrast**: Sufficient contrast for visibility
4. **Responsive Design**: Adapts to different screen sizes

```

```
