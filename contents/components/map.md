<frontmatter>
  title: Map Component
  layout: default.md
  pageNav: 3
</frontmatter>

# Map Component

An interactive map component built with deck.gl and Mapbox GL that displays vessel locations and information.

**File Location**: `src/components/Map.tsx`

## Overview

The Map component provides a base map layer with an interactive vessel layer overlay. It supports features like vessel tracking, tooltips, vessel highlighting, and standard map interactions (zoom, pan, rotate).

## Props

| Prop               | Type     | Default                                                                     | Description                       |
| ------------------ | -------- | --------------------------------------------------------------------------- | --------------------------------- |
| `mapStyle`         | `string` | `"mapbox://styles/mapbox/light-v10"`                                        | Mapbox style URL for the base map |
| `initialViewState` | `object` | `{ longitude: 103.8198, latitude: 1.3521, zoom: 11, pitch: 0, bearing: 0 }` | Initial map view configuration    |

## Features

### Map Interactions

-   Zoom in/out
-   Pan
-   Rotate
-   Pitch adjustment

### Vessel Layer

-   Icon-based vessel markers
-   Vessel rotation based on heading
-   Color highlighting for selected vessels
-   Interactive tooltips on hover

### Vessel Information

-   MMSI number
-   Ship name
-   Speed
-   Heading direction

## Usage

```tsx
// Basic usage with default settings
<Map />

// Custom map style and initial view
<Map
  mapStyle="mapbox://styles/mapbox/dark-v10"
  initialViewState={initialViewState}
/>
```

## Implementation Details

### State Management

```typescript
const [viewState, setViewState] = useState(initialViewState);
const [vessels, setVessels] = useState<VesselData[]>([]);
const [tooltipInfo, setTooltipInfo] = useState<any>(null);
const [activeVessel, setActiveVessel] = useState<VesselData | null>(null);
```

### Vessel Layer Configuration

```typescript
const vesselLayer = new IconLayer({
    id: "vessels",
    data: vessels,
    pickable: true,
    iconAtlas: vesselMarker.src,
    iconMapping: {
        marker: { x: 0, y: 0, width: 512, height: 512, mask: true },
    },
    getIcon: (d) => "marker",
    sizeScale: 1,
    getPosition: (d) => [d.longitude, d.latitude],
    getSize: (d) => 300,
    getColor: (d) =>
        activeVessel?.mmsi === d.mmsi ? [128, 128, 0] : [52, 199, 89],
    getAngle: (d) => 360 - d.heading,
});
```

## Data Structures

### VesselData Interface

```typescript
interface VesselData {
    mmsi: string;
    shipname: string;
    shiptype: string;
    longitude: number;
    latitude: number;
    speed: number;
    heading: number;
    course: number;
}
```

## Dependencies

-   deck.gl for WebGL-based data visualization
-   react-map-gl for Mapbox GL integration
-   Mapbox GL JS for base map rendering
-   Custom vessel marker assets
-   Environment variables for Mapbox access token

## Environment Setup

Requires a Mapbox access token set in the environment variables:

```env
NEXT_PUBLIC_MAPBOX=your_mapbox_token
```

## Styling

The component uses:

-   Full width and height container
-   White background for tooltips
-   Shadow effects for tooltips
-   Pointer events disabled for tooltip overlays

```jsx
// Custom map style and initial view
<Map
    mapStyle="mapbox://styles/mapbox/dark-v10"
    initialViewState={initialViewState}
/>
```
