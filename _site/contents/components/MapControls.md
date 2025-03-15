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

```typescript
// Layer type definitions
interface LayerConfigItem {
    key: keyof typeof activeLayers;
    label: string;
    icon: LayerIcon;
}

type LayerIcon =
    | { type: "image"; icon: any } // For Next.js Image icons
    | { type: "lucide"; icon: React.ComponentType<any> }; // For Lucide icons

// Layer configuration array
const layerConfig: LayerConfigItem[] = [
    {
        key: "anchorages",
        label: "Anchorages",
        icon: { type: "image", icon: Anchorage },
    },
    {
        key: "fairways",
        label: "Fairways",
        icon: { type: "image", icon: Fairway },
    },
    {
        key: "separation",
        label: "Separation Schemes",
        icon: { type: "image", icon: Separation },
    },
    {
        key: "terminals",
        label: "Terminals",
        icon: { type: "lucide", icon: Terminal },
    },
];
```

### Event Handlers

```typescript
// Toggle layer visibility
const handleLayerToggle = (key: string) => {
    setActiveLayers((prev: any) => ({
        ...prev,
        [key]: !prev[key as keyof typeof activeLayers],
    }));
};
```

### Component Structure

```tsx
<div className="flex flex-col gap-2">
    {/* Zoom Controls */}
    <button onClick={onZoomIn} className={buttonStyles} aria-label="Zoom in">
        <Plus className={iconStyles} />
    </button>

    <button onClick={onZoomOut} className={buttonStyles} aria-label="Zoom out">
        <Minus className={iconStyles} />
    </button>

    {/* Layer Control */}
    <div className="relative">
        <button
            className={buttonStyles}
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Layers className={iconStyles} />
        </button>

        {/* Tooltip */}
        {showTooltip && !isOpen && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap">
                Layers
            </div>
        )}

        {/* Dropdown Menu */}
        {isOpen && (
            <div className="absolute bottom-0 right-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                {/* Layer toggle checkboxes */}
            </div>
        )}
    </div>
</div>
```

## Styling

The component uses Tailwind CSS for styling:

### Button Styles

```typescript
const buttonStyles =
    "p-2 bg-gray-600 rounded-full shadow-md hover:bg-gray-700 transition-colors";
const iconStyles = "w-5 h-5 text-white";
```

### Color Scheme

-   Background: Gray-600 (buttons), White (panel)
-   Text: White (button icons), Gray-700 (layer labels)
-   Hover: Gray-700 (buttons), Gray-100 (panel elements)
-   Border: Gray-200 (panel)

### Layout

-   Vertical column of buttons
-   Absolute positioning for dropdown panel
-   Right-aligned tooltip
-   Rounded corners for all elements
-   Shadow effects for depth

## Dependencies

-   React for component structure
-   Lucide React for icons (Plus, Minus, Layers, X, Terminal)
-   Next.js Image for custom layer icons
-   Custom layer icon imports from resources

## Accessibility

-   ARIA labels for zoom buttons
-   Keyboard navigable checkboxes
-   Sufficient color contrast
-   Hover states for interactive elements
-   Tooltip for collapsed state

## State Management

```typescript
// Local state for tooltip visibility
const [showTooltip, setShowTooltip] = useState(false);

// External state passed as props
// - activeLayers: Controls which layers are visible
// - isOpen: Controls whether the layer panel is expanded
```
