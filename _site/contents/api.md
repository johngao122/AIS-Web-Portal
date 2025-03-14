<frontmatter>
  title: API Integration
  layout: default.md
  pageNav: 3
</frontmatter>

# API Integration

This page describes how the AIS Web Portal integrates with the backend API to fetch and process data.

## API Overview

API integration is handled in `src/utils/api.ts`, which provides functions for:

-   Fetching vessel activity data
-   Fetching port service data
-   Fetching port information
-   Processing and transforming API responses

## Key API Functions

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

## API Request Types

The API functions accept request objects with specific parameters:

### VesselActivityRequest

```typescript
interface VesselActivityRequest {
    startTime?: string;
    endTime?: string;
    mmsi?: number;
    imo?: number;
    vesselName?: string;
    limit?: number;
}
```

### PortServiceRequest

```typescript
interface PortServiceRequest {
    portId: string;
    startTime: string;
    endTime: string;
}
```

### PortInfoRequest

```typescript
interface PortInfoRequest {
    portId: string;
}
```

## API Response Types

The API functions return structured data types:

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

### PortServiceData

```typescript
interface PortServiceData {
    portId: string;
    portName: string;
    metrics: {
        averageWaitTime: number;
        averageServiceTime: number;
        vesselCount: number;
        congestionLevel: "Low" | "Medium" | "High";
    };
    vesselActivities: VesselActivity[];
}
```

### PortInfoData

```typescript
interface PortInfoData {
    portId: string;
    portName: string;
    country: string;
    latitude: number;
    longitude: number;
    terminals: Terminal[];
}

interface Terminal {
    terminalId: string;
    terminalName: string;
    terminalType: string;
    coordinates: [number, number][];
}
```

## Authentication for API Requests

API requests require authentication using JWT tokens. The token is included in the Authorization header of each request:

```typescript
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getUserToken()}`,
};

const response = await fetch(`${API_URL}/vessel-activity`, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
});
```

## Error Handling

API requests include error handling to manage network issues, authentication problems, and invalid responses:

```typescript
try {
    const response = await fetch(`${API_URL}/vessel-activity`, {
        method: "POST",
        headers,
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
} catch (error) {
    console.error("Error fetching vessel activity:", error);
    throw error;
}
```

## API Base URL

The API base URL is configured in the environment variables:

```
NEXT_PUBLIC_API=your_api_url
```

This allows for different API endpoints in development, staging, and production environments.

## Data Transformation

Raw API responses are often transformed before being used in the application:

```typescript
// Transform vessel data for map visualization
export const transformVesselDataForMap = (
    data: VesselActivity[]
): MapVesselData[] => {
    return data.map((vessel) => ({
        id: vessel.mmsi,
        mmsi: vessel.mmsi,
        imo: vessel.imo,
        name: vessel.vesselName,
        position: [vessel.longitude, vessel.latitude],
        heading: vessel.heading,
        speed: vessel.sog,
        timestamp: new Date(vessel.timestamp),
        // Additional transformed properties
    }));
};
```

## API Testing

The API integration can be tested using the test suite:

```bash
npm run test
```

This runs tests that verify the API functions correctly handle various scenarios, including successful responses, error conditions, and edge cases.
