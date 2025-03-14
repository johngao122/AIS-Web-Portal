<frontmatter>
  title: Architecture
  layout: default.md
  pageNav: 3
</frontmatter>

# Project Architecture

This page describes the architecture of the AIS Web Portal, including its tech stack, directory structure, and data flow.

## Tech Stack

The AIS Web Portal is built using the following technologies:

-   **Frontend Framework**: Next.js 15.x with React 19.x
-   **Language**: TypeScript 5.x
-   **UI Components**: Mantine, Radix UI, shadcn/ui
-   **Map Visualization**: deck.gl, Mapbox GL, react-map-gl
-   **Data Handling**: Lodash, date-fns, dayjs
-   **Authentication**: JWT-based auth system
-   **Deployment**: Docker, Vercel

## Directory Structure

The project follows a structured organization to maintain code clarity and separation of concerns:

```
ais_web/
├── .github/            # GitHub Actions workflows
├── .next/              # Next.js build output
├── node_modules/       # Dependencies
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   └── ui/         # UI components (shadcn/ui)
│   ├── data/           # Static data files
│   ├── lib/            # Utility libraries
│   ├── resources/      # Resources like images
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── .env                # Environment variables
├── .env.local          # Local environment variables
├── .env.production     # Production environment variables
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile          # Docker configuration
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies
└── tailwind.config.ts  # Tailwind CSS configuration
```

## Core Components

The application is built around several core components that handle different aspects of the functionality:

### Map Components

The map visualization is the central feature of the application, implemented primarily in `src/components/MapWithSearchbar.tsx`. This component integrates:

-   **deck.gl** for WebGL-based rendering
-   **Mapbox GL** for the base map layer
-   **react-map-gl** for React integration

Key map-related components:

-   `MapWithSearchbar.tsx`: Main map component with search functionality
-   `Map.tsx`: Base map component
-   `MapControls.tsx`: UI controls for the map (zoom, layers, etc.)
-   `TerminalLayer.tsx`: Visualization of port terminals

### Vessel Information Components

Components for displaying vessel information:

-   `VesselInfoPanel.tsx`: Panel showing detailed vessel information
-   `VesselActivityTable.tsx`: Table of vessel activities
-   `VesselActivitySingle.tsx`: Single vessel activity display
-   `VesselInformationFloatingActionButton.tsx`: Floating action button for vessel info

### Port Service Components

Components for port service analysis:

-   `PortServiceTable.tsx`: Table of port service metrics
-   `PortServiceLevelFloatingActionButton.tsx`: Floating action button for port services

### UI Components

General UI components:

-   `Searchbar.tsx`: Search functionality for vessels
-   `TimeSlider.tsx`: Slider for controlling time-based data
-   `DatePicker.tsx`: Date selection component
-   `TopBarWithUser.tsx`: Top navigation bar with user info

## Data Flow

The application follows a unidirectional data flow:

1. User interacts with the UI (search, click, filter)
2. Event handlers process the interaction
3. API calls fetch data from the backend
4. State is updated with the new data
5. Components re-render with the updated state

<box type="info">
This architecture ensures that data flows in a predictable way, making the application easier to debug and maintain.
</box>

## State Management

The application uses React's built-in state management with `useState` and `useEffect` hooks. Key state objects include:

-   Vessel data
-   Map view state
-   Selected vessel information
-   Port service data
-   Time range
-   Filter states

Example of state management in a component:

```typescript
// View state for the map
const [viewState, setViewState] = useState(initialViewState);

// Vessel data
const [vesselData, setVesselData] = useState<VesselActivity[]>([]);
const [filteredVesselData, setFilteredVesselData] = useState<VesselActivity[]>(
    []
);

// Selected vessel
const [selectedVessel, setSelectedVessel] = useState<VesselActivity | null>(
    null
);

// UI states
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

## Authentication

Authentication is managed in `src/utils/auth.ts`, which provides:

-   Token management (storage, retrieval, refresh)
-   User session handling
-   Login/logout functionality

Key authentication functions:

```typescript
// Get the current user's token
export const getUserToken = (): string | null

// Set up token refresh interval
export const setupTokenRefresh = ()

// Clear token refresh interval
export const clearTokenRefresh = ()

// Sync user data between localStorage and sessionStorage
export const syncStorageOnLoad = ()
```
