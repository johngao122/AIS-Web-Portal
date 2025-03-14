<frontmatter>
  title: Port Service Components
  layout: default.md
  pageNav: 3
</frontmatter>

# Port Service Components

The port service components provide tools for analyzing and visualizing port performance metrics, terminal operations, and vessel activities within ports.

## Overview

These components enable users to monitor port service levels, analyze port efficiency, and track vessel movements within port areas. They provide valuable insights for port operators, shipping companies, and maritime analysts.

## Key Components

### PortServiceTable

A table that displays port service metrics and performance indicators.

**File Location**: `src/components/PortServiceTable.tsx`

**Key Features**:

-   Sortable columns for service metrics
-   Filterable data by service type and date
-   Performance indicators visualization
-   Service level statistics
-   Interactive data exploration

**Example Usage**:

```tsx
<PortServiceTable data={portServiceData} onClose={handleClose} />
```

**Props**:

-   `data`: Array of port service data objects
-   `onClose`: Function to handle closing the table

### PortServiceLevelFloatingActionButton

A floating action button that provides quick access to port service level analysis.

**File Location**: `src/components/PortServiceLevelFloatingActionButton.tsx`

**Key Features**:

-   Quick access to port service level analysis
-   Toggle between different analysis views
-   Customizable position on the screen
-   Animated transitions between states
-   Time period selection
-   Filtering options for vessel categories and metrics

**Example Usage**:

```tsx
<PortServiceLevelFloatingActionButton
    onPortServiceDataUpdate={handlePortServiceDataUpdate}
    initialTimeRanges={timeRanges}
    isItExpanded={isExpanded}
    onClose={handleClose}
/>
```

**Props**:

-   `onPortServiceDataUpdate`: Function to handle port service data updates
-   `initialTimeRanges`: Initial time ranges to display
-   `isItExpanded`: Boolean indicating if the FAB is expanded
-   `onClose`: Function to handle closing the FAB

## Data Structures

The port components work with several data structures:

### PortServiceData

```typescript
interface PortServiceData {
    [periodKey: string]: {
        startDate: string;
        endDate: string;
        "All vessels"?: {
            TotalBerthed?: number;
            JIT?: number;
            WaitingHours?: number;
            BerthingHours?: number;
            InPortHours?: number;
            WharfUtilizationRate?: number;
        };
        "Category 1 vessels"?: {
            // Same metrics as All vessels
        };
        "Category 2 vessels"?: {
            // Same metrics as All vessels
        };
        "Category 3 vessels"?: {
            // Same metrics as All vessels
        };
        "Category 4 vessels"?: {
            // Same metrics as All vessels
        };
    };
}
```

### TimeRange

```typescript
interface TimeRange {
    startDate: Date;
    endDate: Date;
    label: string;
}
```

## State Management

The port components use React's useState and useEffect hooks for state management. Key state variables include:

```typescript
// Port service data
const [portServiceData, setPortServiceData] = useState<PortServiceData[]>([]);

// Time ranges
const [timeRanges, setTimeRanges] = useState<TimeRange[]>([]);
const [currentStartDate, setCurrentStartDate] = useState<Date>();
const [currentEndDate, setCurrentEndDate] = useState<Date>();

// Filtering and UI states
const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
const [dateError, setDateError] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean>(false);
```

## Event Handling

The port components handle various events for user interaction:

```typescript
// Handle filtering port data
const handleFilterChange = (newFilter: Partial<PortFilter>) => {
    setFilter({
        ...filter,
        ...newFilter,
    });
};

// Handle time range selection
const handleAddTimeRange = () => {
    if (!currentStartDate || !currentEndDate || dateError) return;
    if (timeRanges.length >= MAX_TIME_PERIODS) return;

    const label = `Period ${timeRanges.length + 1}`;
    const newRange = {
        startDate: currentStartDate,
        endDate: currentEndDate,
        label,
    };

    setTimeRanges([...timeRanges, newRange]);
    setCurrentStartDate(undefined);
    setCurrentEndDate(undefined);
};

// Handle data analysis
const handleAnalyze = async () => {
    setIsLoading(true);
    try {
        const requestBody = timeRanges.map((range, index) => ({
            name: `Period ${index + 1}`,
            startDate: range.startDate.toISOString(),
            endDate: range.endDate.toISOString(),
        }));

        const data = await fetchPortService(requestBody);
        const processedData =
            selectedFilters.length > 0
                ? filterPortServiceData(data, selectedFilters)
                : data;

        onPortServiceDataUpdate(processedData, {
            isExpanded: true,
            timeRanges,
            selectedFilters,
        });
    } catch (error) {
        console.error("Error fetching port service data:", error);
        setDateError(
            error instanceof Error ? error.message : "An error occurred"
        );
    } finally {
        setIsLoading(false);
    }
};
```

## Integration with Other Components

The port components integrate with other parts of the application:

-   **Map Visualization**: Port locations and terminals are displayed on the map
-   **Vessel Information**: Vessel activities within ports are linked to vessel details
-   **Time Slider**: Adjusting the time range updates the port service metrics
-   **Search Functionality**: Searching for ports filters the displayed port information
