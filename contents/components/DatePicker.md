<frontmatter>
title: DatePicker Component
layout: default.md
pageNav: 3
</frontmatter>

# DatePicker Component

A comprehensive date and time picker component that allows users to select dates and times within specified ranges.

**File Location**: `src/components/DatePicker.tsx`

## Overview

The DatePicker component provides an interactive calendar interface for selecting dates and times. It supports various features like date range restrictions, time selection, and different view modes (calendar, month, year).

## Props

| Prop            | Type                   | Default     | Description                                        |
| --------------- | ---------------------- | ----------- | -------------------------------------------------- |
| `onSelect`      | `(date: Date) => void` | Required    | Callback function called when a date is selected   |
| `onClose`       | `() => void`           | Required    | Callback function called when the picker is closed |
| `selectedDate`  | `Date`                 | `undefined` | The initially selected date                        |
| `minDate`       | `Date`                 | `undefined` | The minimum selectable date                        |
| `maxDate`       | `Date`                 | `undefined` | The maximum selectable date                        |
| `isStartDate`   | `boolean`              | `undefined` | Whether this picker is for a start date            |
| `startDateTime` | `Date`                 | `undefined` | The start date time when used in a range           |

## Features

### View Modes

-   **Calendar View**: Shows a monthly calendar with selectable dates
-   **Month View**: Displays months for selection
-   **Year View**: Shows a range of years for selection

### Time Selection

-   Hours, minutes, and seconds selection
-   Time validation against min/max dates
-   24-hour format

### Date Validation

-   Prevents selection of future dates
-   Validates against minimum and maximum dates
-   Validates time ranges on the same day

## Usage

```tsx
// Basic usage
<DateTimePicker
  onSelect={(date) => handleDateSelection(date)}
  onClose={() => setPickerOpen(false)}
/>

// With date restrictions
<DateTimePicker
  onSelect={handleDateSelection}
  onClose={handleClose}
  minDate={new Date('2024-01-01')}
  maxDate={new Date('2024-12-31')}
  selectedDate={new Date()}
/>

// As part of a date range picker
<DateTimePicker
  onSelect={handleStartDateSelection}
  onClose={handleClose}
  isStartDate={true}
  startDateTime={startDate}
/>
```

## Implementation Details

### State Management

```typescript
const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
const [viewMode, setViewMode] = useState<ViewMode>("calendar");
const [hours, setHours] = useState(
    selectedDate?.getHours().toString().padStart(2, "0") || "00"
);
const [minutes, setMinutes] = useState(
    selectedDate?.getMinutes().toString().padStart(2, "0") || "00"
);
const [seconds, setSeconds] = useState(
    selectedDate?.getSeconds().toString().padStart(2, "0") || "00"
);
```

### Key Functions

1. **Date Validation**

```typescript
const isDateValid = (date: Date): boolean => {
    const now = new Date();
    if (date > now) return false;

    if (minDate) {
        const isMinSameDay = isSameDay(date, minDate);
        if (isMinSameDay) return true;
        if (date < minDate) return false;
    }

    if (maxDate) {
        const isMaxSameDay = isSameDay(date, maxDate);
        if (isMaxSameDay) return true;
        if (date > maxDate) return false;
    }

    return true;
};
```

2. **Time Handling**

```typescript
const getTimeInSeconds = (date: Date): number => {
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
};
```

### View Modes

The component supports three view modes:

1. **Calendar**: Monthly view with individual date selection
2. **Month**: 12-month grid for month selection
3. **Year**: Year range selection with validation

## Styling

The component uses Tailwind CSS for styling and includes:

-   Grid layout for calendar display
-   Responsive design
-   Interactive hover and focus states
-   Disabled state styling for invalid dates
-   Clear visual hierarchy for selected dates

## Dependencies

-   React for component structure
-   Lucide React for icons
-   Tailwind CSS for styling
