# Implementation Plan: CraftPrice Application MVP

## 1. Technical Context

This document outlines the technical plan for implementing the CraftPrice MVP, a client-side web application for calculating the cost of handmade goods.

-   **Technology Choices**:
    -   **Framework**: React with Vite for a fast development experience.
    -   **Language**: JavaScript (ES6+).
    -   **Styling**: Tailwind CSS for a utility-first, responsive design.
    -   **State Management**: Zustand for simple, powerful global state management (hourly rate, materials, models).
    -   **Persistence**: Browser LocalStorage, managed via the Zustand middleware for persistence. This choice aligns with the core principles of simplicity and client-side centricity.

-   **Component Structure (High-Level)**:
    -   `App`: Main component, handles routing.
    -   `pages/`:
        -   `DashboardPage`: Displays the list of all `ProductModel` items.
        -   `MaterialsPage`: Manages CRUD operations for materials.
        -   `ModelEditorPage`: A form for creating/editing a `ProductModel` and its composition.
        -   `SettingsPage`: An input page for the user's hourly rate.
    -   `components/`: Reusable UI elements (Button, Input, Modal, Card).
    -   `stores/`: Zustand stores for `settings`, `materials`, and `models`.
    -   `services/`: A `calculationService.js` for the core pricing logic.

-   **Dependencies**:
    -   `react`, `react-dom`
    -   `vite` (as a dev dependency)
    -   `tailwindcss`
    -   `zustand`
    -   `uuid` (for generating unique IDs for materials and models)
    -   `react-router-dom` (for client-side routing)

-   **Integration Points**:
    -   None. The application is entirely self-contained in the user's browser.

-   **Unknowns / Clarifications Needed**:
    -   None. All critical ambiguities were resolved in the previous clarification phase.

## 2. Constitution Check

This plan is checked against the principles defined in `.specify/memory/constitution.md`.

-   **I. Simplicity First (YAGNI)**: **PASS**. The architecture is minimal, client-side only, and uses LocalStorage to avoid any backend or database complexity.
-   **II. Client-Side Centric**: **PASS**. The entire application logic and data storage are managed in the browser.
-   **III. Component-Based Architecture**: **PASS**. The plan is based on a React component architecture.
-   **IV. Responsive & Mobile-First Design**: **PASS**. The use of Tailwind CSS is explicitly for building a responsive, mobile-first UI as required.
-   **V. Data Privacy by Design**: **PASS**. All data remains on the user's device, upholding this principle.

**Conclusion**: The implementation plan is in full compliance with the project constitution.

## 3. Phased Implementation

### Phase 0: Research

-   **Status**: Complete.
-   **Findings**: The technology stack (React, Vite, Tailwind, Zustand, LocalStorage) is well-established for this type of application, and no major architectural unknowns exist. Best practices are readily available. See `research.md` for details.

### Phase 1: Core Design & Contracts

-   **Status**: In Progress.
-   **Artifacts to be Generated**:
    -   `data-model.md`: A detailed description of the data structures.
    -   `contracts/local-storage-api.md`: The internal API contract for data persistence.
    -   `quickstart.md`: Setup and development guide.
    -   Agent context update.

### Phase 2: Implementation (High-Level Task Outline)

1.  **Project Setup**: Initialize a new Vite + React project and install all dependencies. Configure Tailwind CSS.
2.  **State Management & Persistence**:
    -   Create Zustand stores for `settings`, `materials`, and `models`.
    -   Configure the `persist` middleware for each store to save data to LocalStorage.
3.  **Core Components**: Build the basic, reusable UI components (Input, Button, etc.).
4.  **Feature Implementation**:
    -   Implement the `SettingsPage` to manage the hourly rate.
    -   Implement the `MaterialsPage` with full CRUD functionality.
    -   Implement the `ModelEditorPage` to create/edit models and their composition.
    -   Implement the `DashboardPage` to display the final results.
5.  **Testing**: Implement unit tests for the calculation service and component tests for critical UI elements.
6.  **Styling & Finalization**: Refine the UI/UX to ensure it is clean and responsive.
