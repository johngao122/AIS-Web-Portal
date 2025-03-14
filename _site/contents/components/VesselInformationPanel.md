<frontmatter>
  title: VesselInformationPanel Component
  layout: default.md
  pageNav: 3
</frontmatter>

# VesselInformationPanel Component

A comprehensive panel that displays detailed information about a selected vessel, including its identification, physical characteristics, and current status.

**File Location**: `src/components/VesselInformationPanel.tsx`

## Overview

The VesselInformationPanel component provides a detailed view of vessel information in a structured, easy-to-read format. It serves as a central information hub for users to access comprehensive vessel data when a vessel is selected on the map or from a list.

## Props

| Prop         | Type         | Default  | Description                                                          |
| ------------ | ------------ | -------- | -------------------------------------------------------------------- |
| `vessel`     | `VesselData` | Required | The vessel data object containing all information to display         |
| `onClose`    | `function`   | Required | Callback function triggered when the close button is clicked         |
| `className`  | `string`     | `""`     | Additional CSS classes to apply to the component                     |
| `showHeader` | `boolean`    | `true`   | Whether to show the header with vessel name and close button         |
| `compact`    | `boolean`    | `false`  | Whether to display the panel in a compact mode with less information |

## Features

### Vessel Identification

-   Vessel name and call sign
-   MMSI (Maritime Mobile Service Identity) number
-   IMO (International Maritime Organization) number
-   Flag state with flag icon

### Physical Characteristics

-   Vessel type with appropriate icon
-   Length, breadth, and draught
-   Gross tonnage and deadweight
-   Year built and shipyard information

### Current Status

-   Current position (latitude/longitude)
-   Speed and course
-   Navigation status (e.g., "Underway using engine")
-   Destination and ETA
-   Last update timestamp

### Interactive Elements

-   Clickable links for related information
-   Expandable sections for additional details
-   Close button for dismissing the panel

## Usage

```tsx
// Basic usage
<VesselInformationPanel
  vessel={selectedVessel}
  onClose={() => setSelectedVessel(null)}
/>

// Compact mode
<VesselInformationPanel
  vessel={selectedVessel}
  onClose={handleClose}
  compact={true}
/>

// Custom styling
<VesselInformationPanel
  vessel={selectedVessel}
  onClose={handleClose}
  className="dark-theme-panel"
  showHeader={false}
/>
```

## Implementation Details

The component is structured with a header section and multiple information sections organized by category.

```tsx
return (
    <div
        className={`vessel-information-panel ${className} ${
            compact ? "compact" : ""
        }`}
    >
        {showHeader && (
            <div className="panel-header">
                <h2>{vessel.shipname || "Unknown Vessel"}</h2>
                <button className="close-button" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
        )}

        <div className="panel-content">
            <section className="info-section">
                <h3>Identification</h3>
                <InfoRow label="MMSI" value={vessel.mmsi} />
                <InfoRow label="IMO" value={vessel.imo || "N/A"} />
                <InfoRow label="Call Sign" value={vessel.callsign || "N/A"} />
                <InfoRow
                    label="Flag"
                    value={vessel.flag || "N/A"}
                    icon={
                        vessel.flag ? <FlagIcon country={vessel.flag} /> : null
                    }
                />
            </section>

            {/* Additional sections for physical characteristics, status, etc. */}
        </div>
    </div>
);
```

## Dependencies

-   React for component structure
-   Tailwind CSS for styling
-   Lucide React for icons
-   Custom InfoRow component for consistent information display
-   Optional integration with flag icon libraries

## Styling

The component uses Tailwind CSS for styling with a clean, organized layout:

```tsx
<div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-semibold truncate">
            {vessel.shipname || "Unknown Vessel"}
        </h2>
        <button
            className="text-white hover:bg-blue-800 rounded-full p-1 transition-colors"
            onClick={onClose}
        >
            <X size={20} />
        </button>
    </div>

    <div className="p-4 max-h-[80vh] overflow-y-auto">
        <div className="mb-4 pb-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                Identification
            </h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">
                    <span className="text-gray-500">MMSI:</span>
                    <span className="ml-2 font-medium">{vessel.mmsi}</span>
                </div>
                {/* Additional information rows */}
            </div>
        </div>
        {/* Additional sections */}
    </div>
</div>
```

## Performance Considerations

-   Uses memoization to prevent unnecessary re-renders
-   Conditionally renders sections based on available data
-   Implements virtualization for long lists of information
-   Optimizes image loading for flag icons
