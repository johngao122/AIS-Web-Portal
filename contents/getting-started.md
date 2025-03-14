<frontmatter>
  title: Getting Started
  layout: default.md
  pageNav: 3
</frontmatter>

# Getting Started

This guide will help you set up the AIS Web Portal development environment and get started with the project.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js 18 or later
-   npm, yarn, or pnpm
-   Mapbox API key
-   Backend API endpoint

## Environment Setup

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

## Project Structure

The AIS Web Portal is organized with the following directory structure:

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

## API Instructions

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

## Development Workflow

1. Make changes to the codebase
2. Test your changes locally
3. Commit your changes
4. Push to your branch
5. Create a pull request

## Testing

Run tests using:

```bash
npm run test
# or
yarn test
```

## Next Steps

After setting up your development environment, you might want to explore:

-   [Architecture]({{baseUrl}}/contents/architecture.html) - Learn about the project architecture
-   [Map Visualization]({{baseUrl}}/contents/components/map.html) - Understand the map components
-   [API Integration]({{baseUrl}}/contents/api.html) - Learn about API integration
