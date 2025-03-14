<frontmatter>
title: Vessel Layer
layout: default.md
pageNav: 3
</frontmatter>

# VesselLayer Component

A map layer component for rendering and managing vessel markers with interactive features.

**File Location**: `src/components/VesselLayer.tsx`

## Overview

The VesselLayer component is responsible for rendering vessel markers on a map layer, managing their interactions, and handling vessel data updates. It provides real-time vessel positions, movement animations, and interactive features for vessel selection and information display.

## Props

| Prop             | Type                             | Required | Description                        |
| ---------------- | -------------------------------- | -------- | ---------------------------------- |
| `map`            | `Map`                            | Yes      | Mapbox GL JS map instance          |
| `vessels`        | `VesselMarker[]`                 | Yes      | Array of vessel markers to display |
| `selectedVessel` | `VesselMarker \| null`           | No       | Currently selected vessel          |
| `onVesselClick`  | `(vessel: VesselMarker) => void` | Yes      | Callback when a vessel is clicked  |
| `dateRange`      | `DateRange`                      | Yes      | Current date range for vessel data |

## Features

### Map Integration

-   Custom vessel markers
-   Real-time position updates
-   Smooth movement animations
-   Heading rotation
-   Vessel clustering for dense areas

### Interaction Handling

-   Click events for vessel selection
-   Hover effects for vessel markers
-   Popup information display
-   Zoom-based marker scaling
-   Cluster interaction

### Data Management

-   Efficient vessel data updates
-   Position interpolation
-   Historical track rendering
-   Performance optimizations
-   Error handling

## Implementation Details

### Component Structure

```tsx
const VesselLayer: React.FC<VesselLayerProps> = ({
    map,
    vessels,
    selectedVessel,
    onVesselClick,
    dateRange,
}) => {
    const markersRef = useRef<{ [key: string]: Marker }>({});
    const [hoveredVessel, setHoveredVessel] = useState<string | null>(null);

    useEffect(() => {
        if (!map) return;

        // Initialize vessel markers
        vessels.forEach((vessel) => {
            if (!markersRef.current[vessel.imoNumber]) {
                const marker = createVesselMarker(vessel);
                marker
                    .setLngLat([vessel.longitude, vessel.latitude])
                    .setRotation(vessel.heading || 0)
                    .addTo(map);

                markersRef.current[vessel.imoNumber] = marker;
            }
        });

        // Cleanup removed vessels
        Object.keys(markersRef.current).forEach((imoNumber) => {
            if (!vessels.find((v) => v.imoNumber === imoNumber)) {
                markersRef.current[imoNumber].remove();
                delete markersRef.current[imoNumber];
            }
        });

        // Update existing markers
        vessels.forEach((vessel) => {
            const marker = markersRef.current[vessel.imoNumber];
            if (marker) {
                marker.setLngLat([vessel.longitude, vessel.latitude]);
                marker.setRotation(vessel.heading || 0);
                updateMarkerStyle(
                    marker,
                    vessel,
                    selectedVessel,
                    hoveredVessel
                );
            }
        });

        return () => {
            Object.values(markersRef.current).forEach((marker) =>
                marker.remove()
            );
        };
    }, [map, vessels, selectedVessel, hoveredVessel]);

    return null;
};

const createVesselMarker = (vessel: VesselMarker): Marker => {
    const el = document.createElement("div");
    el.className = "vessel-marker";

    const marker = new Marker({
        element: el,
        anchor: "center",
        rotationAlignment: "map",
    });

    marker.getElement().addEventListener("click", () => {
        onVesselClick(vessel);
    });

    marker.getElement().addEventListener("mouseenter", () => {
        setHoveredVessel(vessel.imoNumber);
    });

    marker.getElement().addEventListener("mouseleave", () => {
        setHoveredVessel(null);
    });

    return marker;
};
```

### Marker Styling

```css
.vessel-marker {
    width: 24px;
    height: 24px;
    background-color: #4f46e5;
    border: 2px solid white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
}

.vessel-marker:hover {
    transform: scale(1.2);
    background-color: #4338ca;
}

.vessel-marker.selected {
    background-color: #dc2626;
    transform: scale(1.2);
    box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.4);
}
```

## Usage

```tsx
import VesselLayer from "@/components/VesselLayer";
import { Map } from "mapbox-gl";

const MapComponent = () => {
    const [map, setMap] = useState<Map | null>(null);
    const [selectedVessel, setSelectedVessel] = useState<VesselMarker | null>(
        null
    );
    const [vessels, setVessels] = useState<VesselMarker[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>({
        start: new Date(),
        end: new Date(),
    });

    const handleVesselClick = (vessel: VesselMarker) => {
        setSelectedVessel(vessel);
    };

    return (
        <div className="w-full h-full">
            {map && (
                <VesselLayer
                    map={map}
                    vessels={vessels}
                    selectedVessel={selectedVessel}
                    onVesselClick={handleVesselClick}
                    dateRange={dateRange}
                />
            )}
        </div>
    );
};
```

## Styling

The component uses a combination of Mapbox GL JS styles and custom CSS:

### Marker Styles

-   Base size: 24x24 pixels
-   Primary color: Indigo-600
-   Selected color: Red-600
-   White border for contrast
-   Scale animations on hover/select

### Map Layer Styles

-   Custom vessel icons
-   Dynamic size based on zoom
-   Heading indicator
-   Selection highlight
-   Hover effects

### Animations

-   Smooth position transitions
-   Rotation interpolation
-   Scale transitions
-   Opacity changes

## Dependencies

-   React
-   Mapbox GL JS
-   date-fns for time calculations
-   Custom types for vessel data
-   Tailwind CSS for styling

## Performance Considerations

-   Marker pooling for efficient updates
-   Throttled position updates
-   Clustered rendering for dense areas
-   Efficient marker cleanup
-   Memoized callback handlers
-   Optimized re-renders
-   WebGL acceleration
-   Event delegation for markers
