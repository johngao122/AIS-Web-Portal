# AIS Web Portal - Developer Guide

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Project Architecture](#project-architecture)
3. [Development Environment Setup](#development-environment-setup)
4. [Core Components](#core-components)
5. [Data Flow](#data-flow)
6. [API Integration](#api-integration)
7. [Authentication](#authentication)
8. [Map Visualization](#map-visualization)
9. [State Management](#state-management)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Best Practices](#best-practices)
13. [Troubleshooting](#troubleshooting)

## Introduction

AIS Web Portal is a Next.js-based web application designed to visualize and analyze maritime traffic data from Automatic Identification System (AIS) sources. The platform offers powerful tools for tracking vessels, monitoring port service levels, and analyzing maritime activities in real-time.

This developer guide provides comprehensive information for developers working on the AIS Web Portal project. It covers the project architecture, setup instructions, core components, and best practices for development.

## Project Architecture

The AIS Web Portal is built using the following tech stack:

-   **Frontend Framework**: Next.js 15.x with React 19.x
-   **Language**: TypeScript 5.x
-   **UI Components**: Mantine, Radix UI, shadcn/ui
-   **Map Visualization**: deck.gl, Mapbox GL, react-map-gl
-   **Data Handling**: Lodash, date-fns, dayjs
-   **Authentication**: JWT-based auth system
-   **Deployment**: Docker, Vercel

### Directory Structure

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

## Development Environment Setup

### Prerequisites

-   Node.js 18 or later
-   npm, yarn, or pnpm
-   Mapbox API key
-   Backend API endpoint

### Environment Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/johngao122/ais-web.git
    cd ais-web
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. Create a `.env.local` file in the root directory with the following variables:

    ```
    NEXT_PUBLIC_MAPBOX=your_mapbox_api_key
    NEXT_PUBLIC_API=your_api_url
    ```

4. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Core Components

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

### State Management

The application uses React's built-in state management with `useState` and `useEffect` hooks. Key state objects include:

-   Vessel data
-   Map view state
-   Selected vessel information
-   Port service data
-   Time range
-   Filter states

## API Integration

API integration is handled in `src/utils/api.ts`, which provides functions for:

-   Fetching vessel activity data
-   Fetching port service data
-   Fetching port information
-   Processing and transforming API responses

### Key API Functions

```typescript
// Fetch vessel activity data
export const fetchVesselActivity = async (
    params: VesselActivityRequest
): Promise<VesselActivity[]>

// Fetch port service data
export const fetchPortService = async (
    params: PortServiceRequest[]
): Promise<PortServiceData>

// Fetch port information
export const fetchPortInfo = async (
    params: PortInfoRequest[]
): Promise<PortInfoData>
```

## Authentication

Authentication is managed in `src/utils/auth.ts`, which provides:

-   Token management (storage, retrieval, refresh)
-   User session handling
-   Login/logout functionality

### Key Authentication Functions

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

## Map Visualization

The map visualization is built using deck.gl and Mapbox GL. Key features include:

### Layers

-   **IconLayer**: For vessel markers
-   **PathLayer**: For vessel paths
-   **PolygonLayer**: For areas like terminals and separation zones

### Interactions

-   Panning and zooming
-   Clicking on vessels for details
-   Hovering for tooltips
-   Time-based animation

### Example: Creating a Vessel Layer

```typescript
const vesselLayer = new IconLayer({
    id: "vessel-layer",
    data: filteredVesselData,
    pickable: true,
    iconAtlas: vesselMarker.src,
    iconMapping: {
        marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
    },
    getIcon: (d) => "marker",
    sizeScale: 15,
    getPosition: (d) => [d.longitude, d.latitude],
    getSize: (d) => (d.mmsi === selectedVessel?.mmsi ? 2 : 1),
    getColor: (d) => getVesselColor(d),
    onHover: createHoverHandler("vessel"),
});
```

## State Management

The application uses React's built-in state management with hooks. For complex components like `MapWithSearchbar.tsx`, multiple state variables are used to manage different aspects of the application:

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

## Testing

The project uses Vitest for testing. Tests are located in `src/utils/__tests__/` directory.

To run tests:

```bash
npm run test
# or
yarn test
```

## Deployment

### Docker Deployment

The project includes Docker configuration for containerized deployment:

1. Build the Docker image:

    ```bash
    docker build \
      --build-arg NEXT_PUBLIC_MAPBOX="your_mapbox_api_key" \
      --build-arg NEXT_PUBLIC_API="your_api_url" \
      -t johngao122/ais-web-portal:latest .
    ```

2. Run with Docker Compose:
    ```bash
    docker-compose up
    ```

### Vercel Deployment

The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy the application

## Best Practices

### Code Style

-   Use TypeScript for type safety
-   Follow the component structure in the `src/components` directory
-   Add JSDoc comments for component documentation
-   Use the UI components from the shadcn/ui library when possible

### Performance Optimization

-   Use React.memo for components that don't need frequent re-renders
-   Implement virtualization for large lists (e.g., vessel tables)
-   Optimize deck.gl layers for better rendering performance
-   Use useMemo and useCallback hooks to prevent unnecessary recalculations

### State Management

-   Keep state as local as possible
-   Use context for global state when necessary
-   Consider using React Query for API data fetching and caching

## Troubleshooting

### Common Issues

1. **Map not loading**

    - Check if Mapbox API key is correctly set in .env.local
    - Verify that the Mapbox script is loaded correctly

2. **API connection issues**

    - Verify API URL in .env.local
    - Check network tab for specific error responses
    - Ensure authentication token is valid

3. **Performance issues**
    - Reduce the number of deck.gl layers
    - Implement data filtering to reduce the number of rendered elements
    - Use React.memo and useMemo for optimization

### Debugging

-   Use React DevTools for component inspection
-   Check browser console for errors
-   Use the Network tab to inspect API calls
-   Add console.log statements for debugging specific issues

---

This developer guide provides a comprehensive overview of the AIS Web Portal project. For more detailed information, refer to the codebase and comments within the source files.
