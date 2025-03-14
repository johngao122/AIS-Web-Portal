<frontmatter>
title: AutoLoginNotification Component
layout: default.md
pageNav: 3
</frontmatter>

# AutoLoginNotification Component

A notification component that informs users they are already logged in and being redirected to the dashboard.

**File Location**: `src/components/AutoLoginNotification.tsx`

## Overview

The AutoLoginNotification component provides feedback to users who attempt to access login-related pages while already being authenticated. It displays a success message with their username and indicates that they are being redirected to the dashboard.

## Props

| Prop       | Type     | Default  | Description                                  |
| ---------- | -------- | -------- | -------------------------------------------- |
| `username` | `string` | Required | The username of the currently logged-in user |

## Usage

```tsx
<AutoLoginNotification username="john.doe" />
```

## Implementation Details

The component:

1. Takes a username prop
2. Uses the Alert component internally to display the message
3. Formats the message with the username in a slightly emphasized style
4. Always displays as a success-type alert at the top position

## Dependencies

-   Uses the `Alert` component for displaying the notification
-   Relies on Tailwind CSS for text styling

## Source Code

```tsx
interface AutoLoginNotificationProps {
    username: string;
}

const AutoLoginNotification = ({ username }: AutoLoginNotificationProps) => {
    const message = (
        <>
            You are already logged in,{" "}
            <span className="font-medium">{username}</span>! Redirecting to
            dashboard...
        </>
    );

    return <Alert message={message} type="success" position="top" />;
};
```
