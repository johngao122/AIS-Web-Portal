<frontmatter>
title: VesselInformationFloatingActionButton Component
layout: default.md
pageNav: 3
</frontmatter>

# VesselInformationFloatingActionButton Component

A floating action button component for quick access to vessel information and controls.

**File Location**: `src/components/VesselInformationFloatingActionButton.tsx`

## Overview

The VesselInformationFloatingActionButton component provides a floating action button (FAB) that allows users to quickly access vessel information and controls. It features a primary button with an icon and optional secondary actions that appear on hover or click.

## Props

| Prop        | Type                                                           | Required | Description                                  |
| ----------- | -------------------------------------------------------------- | -------- | -------------------------------------------- |
| `onClick`   | `() => void`                                                   | Yes      | Callback function when the button is clicked |
| `isActive`  | `boolean`                                                      | No       | Whether the button is in an active state     |
| `position`  | `'top-right' \| 'bottom-right' \| 'top-left' \| 'bottom-left'` | No       | Position of the FAB on the screen            |
| `className` | `string`                                                       | No       | Additional CSS classes to apply              |

## Features

### Visual Elements

-   Primary action button with icon
-   Active state indication
-   Hover effects
-   Shadow and depth
-   Smooth transitions

### Positioning

-   Configurable screen position
-   Fixed positioning
-   Z-index management
-   Responsive layout

### Interaction

-   Click handling
-   Hover feedback
-   Active state styling
-   Touch device support

## Implementation Details

### Component Structure

```tsx
const VesselInformationFloatingActionButton: React.FC<
    VesselInformationFloatingActionButtonProps
> = ({ onClick, isActive = false, position = "bottom-right", className }) => {
    const positionClasses = {
        "top-right": "top-4 right-4",
        "bottom-right": "bottom-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-left": "bottom-4 left-4",
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "fixed p-3 rounded-full shadow-lg transition-all duration-200 ease-in-out",
                "bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                isActive && "bg-blue-500 hover:bg-blue-600 text-white",
                positionClasses[position],
                className
            )}
            aria-label="Toggle vessel information"
        >
            <Ship
                className={cn(
                    "w-6 h-6",
                    isActive ? "text-white" : "text-gray-600"
                )}
            />
        </button>
    );
};
```

### Types

```typescript
interface VesselInformationFloatingActionButtonProps {
    onClick: () => void;
    isActive?: boolean;
    position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
    className?: string;
}
```

## Usage

```tsx
import VesselInformationFloatingActionButton from "@/components/VesselInformationFloatingActionButton";

const MapComponent = () => {
    const [showVesselInfo, setShowVesselInfo] = useState(false);

    const handleToggleVesselInfo = () => {
        setShowVesselInfo(!showVesselInfo);
    };

    return (
        <div className="relative w-full h-full">
            <VesselInformationFloatingActionButton
                onClick={handleToggleVesselInfo}
                isActive={showVesselInfo}
                position="bottom-right"
            />
        </div>
    );
};
```

## Styling

The component uses Tailwind CSS for styling:

### Colors

-   Default: White background, Gray-600 icon
-   Active: Blue-500 background, White icon
-   Hover: Gray-50 (default), Blue-600 (active)

### Layout

-   Fixed positioning
-   Rounded full shape
-   Padding: p-3
-   Icon size: 24x24 pixels

### Effects

-   Shadow: Large
-   Focus ring: Blue-500
-   Smooth transitions
-   Hover feedback

### Accessibility

-   ARIA label
-   Focus visible styles
-   High contrast colors
-   Touch target size

## Dependencies

-   React
-   lucide-react for the Ship icon
-   clsx/tailwind-merge for class management
-   Tailwind CSS for styling

## Performance Considerations

-   Minimal re-renders
-   Efficient class management
-   Hardware-accelerated transitions
-   Touch event optimization
-   Debounced click handling
-   Memory-efficient styling
