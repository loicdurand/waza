# Tasks: CraftPrice Application MVP

This document breaks down the implementation of the CraftPrice MVP into actionable, dependency-ordered tasks.

## Implementation Strategy

The project will be built incrementally, with each user story representing a deliverable, testable piece of functionality. The MVP is defined as the completion of all user stories listed below, resulting in a fully functional client-side application.

---

## Phase 1: Project Setup

These tasks initialize the project environment.

- [x] T001 Initialize a new Vite + React project using `npm create vite@latest . -- --template react`
- [x] T002 Install project dependencies: `npm install zustand react-router-dom uuid`
- [x] T003 Install development dependencies: `npm install -D tailwindcss postcss autoprefixer`
- [x] T004 ~~Initialize Tailwind CSS configuration by running `npx tailwindcss init -p`~~ (Skipped for Tailwind v4)
- [x] T005 Create a basic `tailwind.config.js` file in the project root
- [x] T006 Add `@import 'tailwindcss';` to the `src/index.css` file
- [x] T007 Create the project directory structure in `src/`: `components`, `pages`, `stores`, `services`

---

## Phase 2: Foundational & Core UI

These tasks create the application shell, routing, and shared state management.

- [x] T008 [P] Set up client-side routing using `react-router-dom` in `src/App.jsx`
- [x] T009 [P] Create a main layout component in `src/components/Layout.jsx` with a header and navigation links
- [x] T010 Create the `settingsStore` for the hourly rate in `src/stores/settingsStore.js`
- [x] T011 Create the `materialsStore` for materials CRUD in `src/stores/materialsStore.js`
- [x] T012 Create the `modelsStore` for models CRUD in `src/stores/modelsStore.js`
- [x] T013 Implement `persist` middleware for all Zustand stores to save data to LocalStorage
- [x] T014 [P] Create a reusable `Input.jsx` component in `src/components/` with validation feedback
- [x] T015 [P] Create a reusable `Button.jsx` component in `src/components/`
- [x] T016 [P] Create a reusable `Card.jsx` component in `src/components/`

---

## Phase 3: User Story 1 - Set Hourly Rate

-   **Goal**: An artisan can set and persist their hourly labor rate.
-   **Test Criteria**: User can enter a rate on the Settings page, save it, and see the value persist after a page refresh. Input validation prevents non-positive numbers.

- [x] T017 [US1] Create the `SettingsPage.jsx` component in `src/pages/`
- [x] T018 [US1] Add a route for `/settings` in `src/App.jsx` pointing to `SettingsPage`
- [x] T019 [US1] Implement the UI for the settings page with an input field for the hourly rate and a save button
- [x] T020 [US1] Connect the `SettingsPage` input field to the `settingsStore`, calling `setHourlyRate` on save

---

## Phase 4: User Story 2 - Manage Materials

-   **Goal**: An artisan can perform full CRUD operations on their material inventory.
-   **Test Criteria**: User can add, view a list of, update, and delete materials. The calculated unit cost is displayed correctly.

- [x] T021 [P] [US2] Create the `MaterialsPage.jsx` component in `src/pages/`
- [x] T022 [P] [US2] Create the `MaterialForm.jsx` component in `src/components/` for adding/editing materials
- [x] T023 [P] [US2] Create the `MaterialList.jsx` and `MaterialListItem.jsx` components in `src/components/`
- [x] T024 [US2] Add a route for `/materials` in `src/App.jsx` pointing to `MaterialsPage`
- [x] T025 [US2] Implement the `MaterialsPage` UI to display the material list and an "Add Material" button
- [x] T026 [US2] Connect the `MaterialForm` to the `materialsStore` actions (`addMaterial`, `updateMaterial`)
- [x] T027 [US2] Implement the delete functionality on each list item, calling `deleteMaterial` from the store

---

## Phase 5: User Story 3 - Manage Product Models

-   **Goal**: An artisan can create and edit product models, including their material composition.
-   **Test Criteria**: User can create a new model with a name and time. User can add/remove materials from the model's composition. All data is saved correctly.

- [x] T028 [P] [US3] Create the `ModelEditorPage.jsx` component in `src/pages/`
- [x] T029 [P] [US3] Create the `CompositionEditor.jsx` component in `src/components/` to manage a model's material list
- [x] T030 [US3] Add a route for `/models/new` and `/models/edit/:id` in `src/App.jsx` pointing to `ModelEditorPage`
- [x] T031 [US3] Implement the UI for `ModelEditorPage` with fields for name and creation time
- [x] T032 [US3] In `CompositionEditor.jsx`, implement UI to select a material from the `materialsStore` and input a quantity
- [x] T033 [US3] Connect the `ModelEditorPage` to the `modelsStore` actions (`addModel`, `updateModel`)

---

## Phase 6: User Story 4 - View Dashboard & Prices

-   **Goal**: An artisan can see a dashboard listing all their models with calculated prices.
-   **Test Criteria**: The dashboard correctly displays all created models. The "Suggested Selling Price" for each model is calculated and displayed accurately based on its composition and the global hourly rate.

- [x] T034 [P] [US4] Create the `DashboardPage.jsx` component in `src/pages/`
- [x] T035 [P] [US4] Create the `ModelCard.jsx` component in `src/components/` to display a single model's info
- [x] T036 [US4] Implement the core calculation logic in `src/services/calculationService.js`
- [x] T037 [US4] Add a default route for `/` in `src/App.jsx` pointing to `DashboardPage`
- [x] T038 [US4] In `DashboardPage`, fetch all models, materials, and the hourly rate from the stores
- [x] T039 [US4] For each model, use `calculationService` to compute the final price and pass the data to `ModelCard` components

---

## Phase 7: Polish & Cross-Cutting Concerns

-   **Goal**: Ensure the application is responsive and user-friendly.
-   **Test Criteria**: All views are styled correctly on mobile and desktop. Empty states are handled gracefully.

- [x] T040 [P] Review and refine all pages for responsive design using Tailwind CSS utility classes
- [x] T041 Implement empty state UI for the Dashboard and Materials pages (e.g., "No models yet. Create one!")
- [x] T042 Add clear navigation links to all pages in the main `Layout.jsx` component
- [x] T043 Final code cleanup and removal of any console logs

---

## Dependencies & Execution Order

1.  **Phase 1** and **Phase 2** must be completed first.
2.  **Phase 3 (US1)** and **Phase 4 (US2)** can be worked on in parallel.
3.  **Phase 5 (US3)** depends on the completion of Phase 4 (requires materials to exist).
4.  **Phase 6 (US4)** depends on all previous phases (US1, US2, US3) to display meaningful data.
5.  **Phase 7** is the final step.

**MVP Scope**: A minimal viable product can be achieved by completing Phases 1, 2, 3, 4, and the calculation service part of Phase 6 (T036). This would allow a user to manage inventory and see prices, even if the dashboard isn't fully built. A more complete MVP includes all phases.