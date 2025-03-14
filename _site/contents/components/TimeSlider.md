<frontmatter>
title: TimeSlider Component
layout: default.md
pageNav: 3
</frontmatter>

# TimeSlider Component

An interactive time range slider component with playback controls and time display.

**File Location**: `src/components/TimeSlider.tsx`

## Overview

The TimeSlider component provides a user interface for selecting and navigating through a time range. It features a play/pause button, a draggable slider, and time display with UTC format.

## Props

| Prop           | Type                                               | Required | Description                      |
| -------------- | -------------------------------------------------- | -------- | -------------------------------- |
| `startTime`    | `Date`                                             | Yes      | The start time of the time range |
| `endTime`      | `Date`                                             | Yes      | The end time of the time range   |
| `onTimeChange` | `(currentTime: Date, isDragging: boolean) => void` | No       | Callback when time changes       |
| `isPlaying`    | `boolean`                                          | Yes      | Whether playback is active       |
| `setIsPlaying` | `(playing: boolean) => void`                       | Yes      | Callback to toggle playback      |
| `currentTime`  | `Date \| null`                                     | Yes      | Current selected time            |

## Features

### Time Control

-   Play/pause button for automated playback
-   Interactive slider for manual time selection
-   Real-time time display in UTC
-   Date display in DD/MM/YYYY format
-   Time display in HH:MM:SS format

### User Interface

-   Gradient background track
-   Draggable slider handle
-   Hover state with opacity change
-   Tooltip showing current time while dragging
-   Smooth transitions and animations

### Interaction States

-   Hover feedback
-   Dragging state
-   Playing state
-   Touch device support
-   Keyboard accessibility

## Usage

```tsx
<TimeSlider
    startTime={new Date("2024-01-01T00:00:00Z")}
    endTime={new Date("2024-01-02T00:00:00Z")}
    onTimeChange={(time, isDragging) => {
        console.log("Selected time:", time);
        console.log("Is dragging:", isDragging);
    }}
    isPlaying={false}
    setIsPlaying={(playing) => setPlaybackState(playing)}
    currentTime={new Date("2024-01-01T12:00:00Z")}
/>
```

## Implementation Details

### Time Calculations

```typescript
const getTimeFromValue = (value: number): Date => {
    const currentSeconds = Math.floor((value / 1000) * totalSeconds);
    return new Date(startTime.getTime() + currentSeconds * 1000);
};

const getValueFromTime = (time: Date): number => {
    const currentSeconds = Math.floor(
        (time.getTime() - startTime.getTime()) / 1000
    );
    return Math.floor((currentSeconds / totalSeconds) * 1000);
};
```

### Time Formatting

```typescript
const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
};

const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
```

### Event Handlers

```typescript
const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
): void => {
    const value = Number(event.target.value);
    const newTime = getTimeFromValue(value);
    onTimeChange?.(newTime, isDragging);

    // Update tooltip position
    if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const position = (value / 1000) * rect.width;
        setTooltipPosition(position);
    }
};
```

## State Management

```typescript
const [isHovering, setIsHovering] = useState<boolean>(false);
const [isDragging, setIsDragging] = useState<boolean>(false);
const [toolTipPosition, setTooltipPosition] = useState<number>(0);
const sliderRef = useRef<HTMLDivElement>(null);
```

## Styling

The component uses:

-   Tailwind CSS for styling
-   Custom gradient background
-   Responsive design
-   Custom slider thumb styling
-   Shadow effects for depth
-   Smooth transitions

## Dependencies

-   React
-   lucide-react for play/pause icons
-   Tailwind CSS for styling
-   React hooks for state management

## Performance Considerations

-   Memoized time calculations
-   Optimized event handlers
-   Efficient state updates
-   Smooth animations
-   Touch event optimization
