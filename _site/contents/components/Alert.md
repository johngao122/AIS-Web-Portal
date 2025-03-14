<frontmatter>
title: Alert Component
layout: default.md
pageNav: 3
</frontmatter>

# Alert Component

The Alert component is a versatile notification element that displays messages with different styles based on their type.

**File Location**: `src/components/Alert.tsx`

## Overview

The Alert component provides a consistent way to display notifications or messages to users. It supports different types of alerts (success, error, warning, info) and can be positioned at the top or bottom of its container.

## Props

| Prop       | Type                                          | Default     | Description                                         |
| ---------- | --------------------------------------------- | ----------- | --------------------------------------------------- |
| `message`  | `ReactNode`                                   | Required    | The content to display in the alert                 |
| `type`     | `"success" \| "error" \| "warning" \| "info"` | `"success"` | The type of alert which determines its color scheme |
| `position` | `"top" \| "bottom"`                           | `"top"`     | The vertical position of the alert                  |

## Usage

```tsx
// Success Alert
<Alert message="Operation completed successfully" />

// Error Alert
<Alert
  message="An error occurred"
  type="error"
/>

// Warning Alert with Bottom Position
<Alert
  message="Please save your changes"
  type="warning"
  position="bottom"
/>

// Info Alert with React Node
<Alert
  message={<>Important information with <strong>bold text</strong></>}
  type="info"
/>
```

## Styling

The component uses Tailwind CSS for styling and applies different color schemes based on the alert type:

-   **Success**: Green theme with light background
-   **Error**: Red theme with light background
-   **Warning**: Yellow theme with light background
-   **Info**: Blue theme with light background

## Implementation Details

The Alert component is implemented as a functional React component that:

1. Accepts props for message content, alert type, and position
2. Uses a color mapping object to determine the appropriate Tailwind classes
3. Renders a responsive container with centered content
4. Supports both string messages and complex React nodes

## Source Code

```tsx
interface AlertProps {
    message: ReactNode;
    type?: AlertType;
    position?: AlertPosition;
}

type AlertType = "success" | "error" | "warning" | "info";
type AlertPosition = "top" | "bottom";
```
