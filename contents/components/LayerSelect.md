<frontmatter>
title: LayerSelect Component
layout: default.md
pageNav: 3
</frontmatter>

# LayerSelect Component

A dropdown menu component for toggling map layer visibility, providing an intuitive interface for controlling which layers are displayed on the map.

**File Location**: `src/components/LayerSelect.tsx`

## Overview

The LayerSelect component provides a button that toggles a dropdown menu containing checkboxes for each available map layer. Users can select which layers to display on the map, with visual feedback through icons and tooltips.

## Props

| Prop              | Type                                                                                 | Default  | Description                                          |
| ----------------- | ------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------- |
| `activeLayers`    | `{ anchorages: boolean; fairways: boolean; separation: boolean; vessels: boolean; }` | Required | Object indicating which layers are currently visible |
| `setActiveLayers` | `React.Dispatch<React.SetStateAction<...>>`                                          | Required | Function to update the active layers state           |
| `isOpen`          | `boolean`                                                                            | Required | Whether the dropdown menu is currently open          |
| `setIsOpen`       | `(isOpen: boolean) => void`                                                          | Required | Function to toggle the dropdown menu                 |

## Features

### Available Layers

-   Vessels
-   Anchorages
-   Fairways
-   Separation Schemes

### UI Elements

-   Toggle button with tooltip
-   Dropdown menu with checkboxes
-   Layer icons for visual identification
-   Close button for the dropdown

## Usage

```tsx
const [activeLayers, setActiveLayers] = useState({
    anchorages: true,
    fairways: true,
    separation: true,
    vessels: true,
});
const [isOpen, setIsOpen] = useState(false);

<LayerSelect
    activeLayers={activeLayers}
    setActiveLayers={setActiveLayers}
    isOpen={isOpen}
    setIsOpen={setIsOpen}
/>;
```

## Implementation Details

### Layer Configuration

```typescript
const layerConfig = [
    { key: "vessels", label: "Vessels", icon: Vessel },
    { key: "anchorages", label: "Anchorages", icon: Anchorage },
    { key: "fairways", label: "Fairways", icon: Fairway },
    { key: "separation", label: "Separation Schemes", icon: Separation },
];
```

### Layer Toggle Handler

```typescript
const handleLayerToggle = (key: string) => {
    setActiveLayers((prev: any) => ({
        ...prev,
        [key]: !prev[key as keyof typeof activeLayers],
    }));
};
```

## Styling

The component uses Tailwind CSS for styling and includes:

-   Responsive dropdown menu
-   Hover effects on buttons and checkboxes
-   Shadow effects for depth
-   Clean, modern interface design
-   Proper spacing and alignment

## Dependencies

-   React for component structure
-   Lucide React for icons
-   Next.js Image component for optimized images
-   Custom layer icons from resources
-   Tailwind CSS for styling

## Types

```typescript
interface LayerSelectProps {
    activeLayers: {
        anchorages: boolean;
        fairways: boolean;
        separation: boolean;
        vessels: boolean;
    };
    setActiveLayers: React.Dispatch<
        React.SetStateAction<{
            anchorages: boolean;
            fairways: boolean;
            separation: boolean;
            vessels: boolean;
        }>
    >;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
```
