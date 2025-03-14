<frontmatter>
title: MapControls Component
layout: default.md
pageNav: 3
</frontmatter>

# MapControls Component

A control panel component that provides zoom controls and layer visibility toggles for the map interface.

**File Location**: `src/components/MapControls.tsx`

## Overview

The MapControls component offers a user-friendly interface for controlling map interactions and layer visibility. It includes zoom controls and a collapsible panel for managing different map layers like anchorages, fairways, separation schemes, and terminals.

## Props

| Prop              | Type       | Required | Description                                                |
| ----------------- | ---------- | -------- | ---------------------------------------------------------- |
| `className`       | `string`   | No       | Optional CSS class name for additional styling             |
| `activeLayers`    | `object`   | Yes      | Object containing visibility state of each map layer       |
| `setActiveLayers` | `function` | Yes      | State setter function for updating layer visibility        |
| `onZoomIn`        | `function` | Yes      | Callback function for zoom in button click                 |
| `onZoomOut`       | `function` | Yes      | Callback function for zoom out button click                |
| `isOpen`          | `boolean`  | Yes      | Whether the layer control panel is open                    |
| `setIsOpen`       | `function` | Yes      | State setter function for toggling the layer control panel |

### ActiveLayers Object Structure

```typescript
{
    anchorages: boolean;
    fairways: boolean;
    separation: boolean;
    terminals: boolean;
}
```

## Features

### Zoom Controls

-   Zoom in button with + icon
-   Zoom out button with - icon
-   Smooth hover transitions
-   Accessible button labels

### Layer Control Panel

-   Collapsible panel interface
-   Layer visibility toggles with checkboxes
-   Visual icons for each layer type
-   Tooltip when panel is collapsed
-   Close button for dismissing panel

## Usage

```tsx
<MapControls
    activeLayers={activeLayers}
    setActiveLayers={setActiveLayers}
    onZoomIn={() => handleZoomIn()}
    onZoomOut={() => handleZoomOut()}
    isOpen={isLayerPanelOpen}
    setIsOpen={setLayerPanelOpen}
/>
```

## Implementation Details

### Layer Configuration

```

```
