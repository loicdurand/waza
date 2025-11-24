# Quickstart Guide: CraftPrice MVP

This guide provides instructions for setting up and running the CraftPrice development environment.

## 1. Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
-   [npm](https://www.npmjs.com/) (usually included with Node.js)

## 2. Setup & Installation

1.  **Clone the Repository**:
    ```bash
    # If you haven't already, clone the repository to your local machine
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Checkout the Feature Branch**:
    ```bash
    git checkout 001-craft-price-calculator
    ```

3.  **Install Dependencies**:
    From the root of the project, run the following command to install all the necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

## 3. Running the Development Server

Once the dependencies are installed, you can start the Vite development server:

```bash
npm run dev
```

This will start the application, typically on `http://localhost:5173`. The server supports Hot Module Replacement (HMR), so most changes you make to the source code will be reflected in the browser instantly without a full page reload.

## 4. Project Structure Overview

The project follows a standard Vite + React structure.

-   `public/`: Static assets that are not processed by the build pipeline.
-   `src/`: Contains all the application source code.
    -   `components/`: Reusable UI components (e.g., `Button.jsx`, `Input.jsx`).
    -   `pages/`: Top-level page components corresponding to different routes (e.g., `DashboardPage.jsx`, `MaterialsPage.jsx`).
    -   `stores/`: Zustand store definitions for state management (e.g., `materialsStore.js`).
    -   `services/`: Contains core business logic, like `calculationService.js`.
    -   `App.jsx`: The main application component, responsible for routing.
    -   `main.jsx`: The entry point of the application.
-   `specs/`: Contains all feature specification and planning documents.
-   `package.json`: Project metadata and dependency list.
-   `vite.config.js`: Vite build configuration.
-   `tailwind.config.js`: Tailwind CSS configuration.

## 5. Development Workflow

1.  Ensure you are on the correct feature branch (`001-craft-price-calculator`).
2.  Start the dev server using `npm run dev`.
3.  Modify the code in the `src/` directory.
4.  View your changes in the browser.
5.  Write unit and component tests as necessary to validate functionality.
