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

```

```
