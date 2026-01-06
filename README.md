# Restaurant Multi-Tenant SaaS Platform

## 1. Executive Summary

This project represents a comprehensive "Software as a Service" (SaaS) solution designed to automate the deployment and management of digital restaurant presence. The system employs a multi-tenant architecture, allowing a single deployment instance to serve multiple distinct restaurant brands with data isolation and unique visual branding.

The platform is engineered for high performance, Search Engine Optimization (SEO), and ease of management, separated into three distinct application layers: Public Client, Administrative Panel, and Backend API.

## 2. System Architecture

The following diagram illustrates the high-level container architecture of the system, demonstrating the data flow between the end-users, the application frontends, and the centralized backend services.

```mermaid
graph TD
    subgraph "External Users"
        Client[End Customer]
        AdminUser[Restaurant Owner/Manager]
    end

    subgraph "Presentation Layer"
        ClientApp[Frontend Client]
        AdminApp[Frontend Admin]
    end

    subgraph "Service Layer"
        API[Backend API Core]
    end

    subgraph "Data Layer"
        DB[(PostgreSQL Database)]
        Storage[Image Storage / CDN]
    end

    Client -->|HTTPS / Browsing| ClientApp
    AdminUser -->|HTTPS / Management| AdminApp
    
    ClientApp -->|Server-Side Fetching (SSR)| API
    ClientApp -->|Client-Side Hydration| API
    AdminApp -->|Secure REST API Requests| API
    
    API -->|Read/Write Operations| DB
    API -->|Asset Management| Storage
```

## 3. Technology Stack Overview

### Public Client (Storefront)
*   **Framework**: Astro v5 (Server-Side Rendering) for optimal First Contentful Paint (FCP) and SEO.
*   **Interactivity**: React 19 Islands architecture for dynamic components (Shopping Cart, Filters).
*   **Styling**: Tailwind CSS v4 for utility-first design systems.
*   **State Management**: Nanostores for lightweight, framework-agnostic state sharing.

### Admin Panel (Dashboard)
*   **Framework**: React 19 (SPA) powered by Vite.
*   **UI/UX**: Custom design system built on Tailwind CSS.
*   **Forms**: React Hook Form linked with Zod for rigorous schema validation.
*   **Routing**: React Router v7.

### Backend API
*   **Runtime**: Node.js.
*   **Framework**: Express.js with a strict Modular Monolith patterns.
*   **Language**: TypeScript for type safety across the entire stack.
*   **Database**: PostgreSQL using raw SQL (pg driver) within a Repository pattern for maximum query optimization and control.
*   **Security**: JWT for stateless authentication using RSA/Bcrypt standards.

## 4. Development Environment Setup

To orchestrate the full development environment, distinct services must be initialized. It is recommended to run each service in a separate terminal context.

### Prerequisites
*   Node.js v18 LTS or higher.
*   PostgreSQL 14 or higher (Local or Containerized).
*   Git for version control.

### Initialization Sequence

1.  **Database Initialization**
    Ensure PostgreSQL is running and the schema has been migrated using the scripts provided in the `backend/src/scripts` directory.

2.  **Backend Service**
    ```bash
    cd backend
    npm install
    npm run dev
    # Service listens on Port 3000
    ```

3.  **Frontend Administration**
    ```bash
    cd frontend-admin
    npm install
    npm run dev
    # Service listens on Port 5173
    ```

4.  **Frontend Client (Public)**
    ```bash
    cd frontend-client
    npm install
    npm run dev
    # Service listens on Port 4321
    ```

## 5. Directory Structure

*   **/backend**: API services, business logic, authentication, and database repositories.
*   **/frontend-admin**: Single Page Application (SPA) for content management and restaurant configuration.
*   **/frontend-client**: Multi-tenant SSR application serving the public facing websites.
