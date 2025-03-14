<frontmatter>
  title: Vessel Information Components
  layout: default.md
  pageNav: 3
</frontmatter>

# Vessel Information Components

The vessel information components provide detailed data about vessels tracked in the AIS Web Portal, including their current status, historical activities, and technical specifications.

## Overview

These components display comprehensive information about vessels, allowing users to monitor vessel movements, analyze historical data, and access detailed vessel specifications. They work in conjunction with the map visualization to provide a complete view of maritime traffic.

## Key Components

### VesselInfoPanel

A panel that displays detailed information about a selected vessel.

**File Location**: `src/components/VesselInfoPanel.tsx`

**Key Features**:

-   Vessel identification details (MMSI, IMO, name, call sign)
-   Current position and navigation status
-   Technical specifications (length, width, draught)
-   Voyage information (destination, ETA)
-   Collapsible sections for different information categories

**Example Usage**:

```tsx
<VesselInfoPanel
    vessel={selectedVessel}
    onClose={handleClosePanel}
    onTrackVessel={handleTrackVessel}
/>
```

**Props**:

-   `vessel`: The vessel object containing all vessel data
-   `onClose`: Function to handle closing the panel
-   `onTrackVessel`: Function to handle tracking the vessel on the map

### VesselActivityTable

A table that displays a list of vessel activities over time.

**File Location**: `src/components/VesselActivityTable.tsx`

**Key Features**:

-   Sortable columns for different vessel attributes
-   Filtering options for vessel types, status, and time periods
-   Pagination for handling large datasets
-   Row selection for detailed view
-   Export functionality for data analysis

**Example Usage**:

```tsx
<VesselActivityTable
    activities={vesselActivities}
    onSelectActivity={handleSelectActivity}
    sortBy="timestamp"
    sortDirection="desc"
    pageSize={10}
/>
```

**Props**:

-   `activities`: Array of vessel activity objects
-   `onSelectActivity`: Function to handle selecting an activity
-   `sortBy`: Column to sort by
-   `sortDirection`: Sort direction ('asc' or 'desc')
-   `pageSize`: Number of items per page

### VesselActivitySingle

A component that displays a single vessel activity with detailed information.

**File Location**: `src/components/VesselActivitySingle.tsx`

**Key Features**:

-   Detailed view of a single vessel activity
-   Navigation status visualization
-   Position information with coordinates
-   Speed and heading indicators
-   Timestamp with relative time display

**Example Usage**:

```tsx
<VesselActivitySingle activity={selectedActivity} showDetails={true} />
```

**Props**:

-   `activity`: The vessel activity object
-   `showDetails`: Boolean to toggle detailed view

### VesselInformationFloatingActionButton

A floating action button that provides quick access to vessel information.

**File Location**: `src/components/VesselInformationFloatingActionButton.tsx`

**Key Features**:

-   Quick access to vessel information
-   Toggle between different information views
-   Customizable position on the screen
-   Animated transitions between states

**Example Usage**:

```tsx
<VesselInformationFloatingActionButton
    onToggle={handleToggleVesselInfo}
    position="bottom-right"
    isOpen={isVesselInfoOpen}
/>
```

**Props**:

-   `onToggle`: Function to handle toggling the vessel information panel
-   `position`: Position of the button on the screen
-   `isOpen`: Boolean indicating if the panel is open

## Data Structures

The vessel components work with several data structures:

### VesselActivity

```typescript
interface VesselActivity {
    mmsi: number;
    imo?: number;
    vesselName: string;
    callSign?: string;
    vesselType?: number;
    length?: number;
    width?: number;
    draught?: number;
    latitude: number;
    longitude: number;
    sog?: number;
    cog?: number;
    rot?: number;
    heading?: number;
    navStatus?: number;
    timestamp: string;
}
```

### VesselDetails

```typescript
interface VesselDetails {
    mmsi: number;
    imo?: number;
    name: string;
    callSign?: string;
    flag?: string;
    vesselType?: string;
    grossTonnage?: number;
    yearBuilt?: number;
    status?: string;
    dimensions?: {
        length: number;
        width: number;
        draught: number;
    };
    lastReport?: string;
}
```

### VesselFilter

```typescript
interface VesselFilter {
    vesselTypes?: number[];
    navStatus?: number[];
    startTime?: string;
    endTime?: string;
    minSpeed?: number;
    maxSpeed?: number;
    searchText?: string;
}
```

## State Management

The vessel components use React's useState and useEffect hooks for state management. Key state variables include:

```typescript
// Selected vessel
const [selectedVessel, setSelectedVessel] = useState<VesselActivity | null>(
    null
);

// Vessel activities
const [activities, setActivities] = useState<VesselActivity[]>([]);

// Filtering and sorting
const [filter, setFilter] = useState<VesselFilter>({});
const [sortBy, setSortBy] = useState<string>("timestamp");
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

// Pagination
const [currentPage, setCurrentPage] = useState<number>(1);
const [pageSize, setPageSize] = useState<number>(10);

// UI states
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
```

## Event Handling

The vessel components handle various events for user interaction:

```typescript
// Handle selecting a vessel
const handleSelectVessel = (vessel: VesselActivity) => {
    setSelectedVessel(vessel);
    setIsPanelOpen(true);
    onVesselSelect?.(vessel);
};

// Handle filtering vessel activities
const handleFilterChange = (newFilter: Partial<VesselFilter>) => {
    setFilter({
        ...filter,
        ...newFilter,
    });
};

// Handle sorting vessel activities
const handleSortChange = (column: string) => {
    if (sortBy === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
        setSortBy(column);
        setSortDirection("asc");
    }
};

// Handle pagination
const handlePageChange = (page: number) => {
    setCurrentPage(page);
};
```

## Integration with Other Components

The vessel components integrate with other parts of the application:

-   **Map Visualization**: Selecting vessels on the map updates the vessel information panel
-   **Time Slider**: Adjusting the time range filters the vessel activities
-   **Search Functionality**: Searching for vessels updates the displayed vessel information
-   **Port Service Analysis**: Port service data includes vessel activities within the port
