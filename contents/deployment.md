<frontmatter>
  title: Deployment
  layout: default.md
  pageNav: 3
</frontmatter>

# Deployment

This page describes the deployment options for the AIS Web Portal.

## Docker Deployment

The project includes Docker configuration for containerized deployment.

### Prerequisites

-   Docker installed on your system
-   Docker Compose installed on your system
-   Mapbox API key
-   Backend API endpoint

### Building the Docker Image

1. Build the Docker image with your environment variables:

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

### Docker Compose Configuration

The `docker-compose.yml` file configures the container:

```yaml
version: "3"

services:
    ais-web:
        image: johngao122/ais-web-portal:latest
        build:
            context: .
            dockerfile: Dockerfile
            args:
                - NEXT_PUBLIC_MAPBOX=${NEXT_PUBLIC_MAPBOX}
                - NEXT_PUBLIC_API=${NEXT_PUBLIC_API}
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=production
```

### Dockerfile

The `Dockerfile` defines how the application is built and run:

```dockerfile
# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_MAPBOX
ARG NEXT_PUBLIC_API

# Set environment variables
ENV NEXT_PUBLIC_MAPBOX=$NEXT_PUBLIC_MAPBOX
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Set the command to run the application
CMD ["node", "server.js"]
```

## Vercel Deployment

The project is configured for deployment on Vercel, which provides a seamless experience for Next.js applications.

### Steps for Vercel Deployment

1. Connect your GitHub repository to Vercel:

    - Sign up or log in to [Vercel](https://vercel.com)
    - Click "Import Project" and select your GitHub repository
    - Follow the prompts to connect your repository

2. Configure environment variables in Vercel dashboard:

    - Go to your project settings
    - Add the following environment variables:
        - `NEXT_PUBLIC_MAPBOX`: Your Mapbox API key
        - `NEXT_PUBLIC_API`: Your API URL

3. Deploy the application:
    - Vercel will automatically deploy your application
    - Each push to the main branch will trigger a new deployment

### Vercel Configuration

The project includes a `vercel.json` file for custom configuration:

```json
{
    "version": 2,
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/next"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/$1"
        }
    ]
}
```

## GitHub Pages Deployment

The project can also be deployed to GitHub Pages using the built-in scripts.

### Steps for GitHub Pages Deployment

1. Build the application:

    ```bash
    npm run build
    ```

2. Export the application to static HTML:

    ```bash
    npm run export
    ```

3. Deploy to GitHub Pages:

    ```bash
    npm run deploy
    ```

This will deploy the contents of the `out` directory to the `gh-pages` branch of your repository.

## Environment Variables

Regardless of the deployment method, you need to configure the following environment variables:

-   `NEXT_PUBLIC_MAPBOX`: Your Mapbox API key
-   `NEXT_PUBLIC_API`: Your API URL

## Continuous Integration

The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
    push:
        branches: [main]

jobs:
    build-and-deploy:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v2

            - name: Setup Node.js
              uses: actions/setup-node@v2
              with:
                  node-version: "18"

            - name: Install dependencies
              run: npm ci

            - name: Build
              run: npm run build
              env:
                  NEXT_PUBLIC_MAPBOX: ${{ secrets.NEXT_PUBLIC_MAPBOX }}
                  NEXT_PUBLIC_API: ${{ secrets.NEXT_PUBLIC_API }}

            - name: Export
              run: npm run export

            - name: Deploy to GitHub Pages
              uses: JamesIves/github-pages-deploy-action@4.1.4
              with:
                  branch: gh-pages
                  folder: out
```

This workflow automatically deploys your application to GitHub Pages whenever you push to the main branch.
