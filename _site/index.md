<frontmatter>
  title: Home Page
  layout: default.md
  pageNav: 4
  pageNavTitle: "Topics"
</frontmatter>

<br>

<div class="bg-primary text-white px-2 py-5 mb-4">
  <div class="container">
    <h1 class="display-5 no-index">AIS Web Portal Documentation</h1>
    <p class="lead">A comprehensive guide to the maritime traffic monitoring system</p>
  </div>
</div>

# AIS Web Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

A comprehensive maritime traffic monitoring system that provides real-time vessel tracking, port service analysis, and interactive visualization tools for maritime operations.

## Overview

AIS Web Portal is a Next.js-based web application designed to visualize and analyze maritime traffic data from Automatic Identification System (AIS) sources. The platform offers powerful tools for tracking vessels, monitoring port service levels, and analyzing maritime activities in real-time.

<box type="info">
This documentation site provides comprehensive information for developers working on the AIS Web Portal project. It covers the project architecture, setup instructions, core components, and best practices for development.
</box>

## Features

<div class="row">
  <div class="col-md-6">
    <panel header="**Interactive Map Visualization**" type="primary">
      High-performance WebGL-based map rendering using deck.gl and Mapbox
    </panel>
  </div>
  <div class="col-md-6">
    <panel header="**Real-time Vessel Tracking**" type="primary">
      Monitor vessel positions, movements, and activities
    </panel>
  </div>
</div>

<div class="row mt-3">
  <div class="col-md-6">
    <panel header="**Advanced Search Capabilities**" type="primary">
      Find vessels by name, IMO number, or other identifiers
    </panel>
  </div>
  <div class="col-md-6">
    <panel header="**Port Service Level Analysis**" type="primary">
      Evaluate and compare port performance metrics
    </panel>
  </div>
</div>

<div class="row mt-3">
  <div class="col-md-6">
    <panel header="**Historical Data Analysis**" type="primary">
      Review past vessel movements with time-based filtering
    </panel>
  </div>
  <div class="col-md-6">
    <panel header="**Responsive Design**" type="primary">
      Optimized for various screen sizes and devices
    </panel>
  </div>
</div>

## Tech Stack

-   **Frontend**: Next.js, React, TypeScript
-   **UI Components**: Mantine, Radix UI, shadcn/ui
-   **Map Visualization**: deck.gl, Mapbox GL, react-map-gl
-   **Data Handling**: Lodash, date-fns, dayjs
-   **Authentication**: JWT-based auth system
-   **Deployment**: Docker, Vercel

## Quick Links

<div class="row">
  <div class="col-md-4">
    <panel header="**Getting Started**" type="success">
      <a href="{{baseUrl}}/contents/getting-started.html">Setup instructions and prerequisites</a>
    </panel>
  </div>
  <div class="col-md-4">
    <panel header="**Architecture**" type="success">
      <a href="{{baseUrl}}/contents/architecture.html">Project structure and design</a>
    </panel>
  </div>
  <div class="col-md-4">
    <panel header="**Components**" type="success">
      <a href="{{baseUrl}}/contents/components/map.html">Core components documentation</a>
    </panel>
  </div>
</div>

<div class="row mt-3">
  <div class="col-md-4">
    <panel header="**API**" type="success">
      <a href="{{baseUrl}}/contents/api.html">API integration details</a>
    </panel>
  </div>
  <div class="col-md-4">
    <panel header="**Deployment**" type="success">
      <a href="{{baseUrl}}/contents/deployment.html">Deployment instructions</a>
    </panel>
  </div>
</div>
