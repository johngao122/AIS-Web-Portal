# AIS Web Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![CI](https://img.shields.io/github/actions/workflow/status/your-username/ais-web/ci.yml?branch=main&style=flat-square&logo=github)](https://github.com/johngao122/AIS-Web-Portal/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A comprehensive maritime traffic monitoring system that provides real-time vessel tracking, port service analysis, and interactive visualization tools for maritime operations.

## 🚢 Overview

AIS Web Portal is a Next.js-based web application designed to visualize and analyze maritime traffic data from Automatic Identification System (AIS) sources. The platform offers powerful tools for tracking vessels, monitoring port service levels, and analyzing maritime activities in real-time.

## ✨ Features

-   **Interactive Map Visualization**: High-performance WebGL-based map rendering using deck.gl and Mapbox
-   **Real-time Vessel Tracking**: Monitor vessel positions, movements, and activities
-   **Advanced Search Capabilities**: Find vessels by name, IMO number, or other identifiers
-   **Port Service Level Analysis**: Evaluate and compare port performance metrics
-   **Historical Data Analysis**: Review past vessel movements with time-based filtering
-   **User Authentication**: Secure login and registration system
-   **Responsive Design**: Optimized for various screen sizes and devices

## 🛠️ Tech Stack

-   **Frontend**: Next.js, React, TypeScript
-   **UI Components**: Mantine, Radix UI, shadcn/ui
-   **Map Visualization**: deck.gl, Mapbox GL, react-map-gl
-   **Data Handling**: Lodash, date-fns, dayjs
-   **Authentication**: JWT-based auth system
-   **Deployment**: Docker, Vercel

## 🚀 Getting Started

### Prerequisites

-   Node.js 18 or later
-   npm, yarn, or pnpm
-   Mapbox API key
-   Backend API endpoint (see API Instructions section)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_MAPBOX=your_mapbox_api_key
NEXT_PUBLIC_API=your_api_url
```

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/ais-web.git
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

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📊 Main Components

-   **Dashboard**: The main interface with the interactive map and vessel tracking
-   **Vessel Information Panel**: Detailed information about selected vessels
-   **Port Service Analysis**: Tools for analyzing port performance metrics
-   **Time Slider**: Control for viewing historical vessel data
-   **Search Functionality**: Advanced search for finding specific vessels

## 🔒 Authentication

The application uses a token-based authentication system. Users need to register and log in to access the dashboard and its features.

## 🐳 Docker Deployment

### Build the Docker Image

```bash
docker build \
  --build-arg NEXT_PUBLIC_MAPBOX="your_mapbox_api_key" \
  --build-arg NEXT_PUBLIC_API="your_api_url" \
  -t your-username/ais-web-portal:latest .
```

### Run with Docker Compose

```bash
docker-compose up
```

## 🌐 API Instructions

The backend API is currently hosted as a test service on render.com. Due to the free tier limitations, the server will sleep and reset after 15 minutes of inactivity.

### User Registration

To register a user, use the POST method with the endpoint:

```
https://ais-testing-backend.onrender.com/register
```

Request body (JSON format):

```json
{
    "username": "your_username",
    "password": "your_password"
}
```

Ensure the Content-Type header is set to application/json.

## 🧪 Testing

Run tests using:

```bash
npm run test
# or
yarn test
```

## 📝 Development Guidelines

-   Use TypeScript for type safety
-   Follow the component structure in the `src/components` directory
-   Add JSDoc comments for component documentation
-   Use the UI components from the shadcn/ui library when possible

## 🔄 Continuous Integration

The project uses GitHub Actions for CI/CD. See the `.github/workflows` directory for workflow configurations.

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgements

-   [Next.js](https://nextjs.org/)
-   [deck.gl](https://deck.gl/)
-   [Mapbox](https://www.mapbox.com/)
-   [shadcn/ui](https://ui.shadcn.com/)
