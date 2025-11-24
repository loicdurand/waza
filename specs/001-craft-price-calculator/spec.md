# Feature Specification: CraftPrice Application MVP

## 1. Overview

- **Feature Name**: CraftPrice Application MVP
- **Priority**: High
- **Release Target**: 1.0.0
- **Summary**: This document specifies the requirements for a simple, responsive web application named "CraftPrice". The application will help artisans calculate the cost of their creations and determine a suggested selling price by factoring in both material and labor costs. For this initial version (MVP), the application will be a standalone, client-side tool with all data stored locally in the user's browser.

## 2. User Problem & Value

### The Problem
Artisans and crafters often struggle with pricing their handmade goods. They may undervalue their work by neglecting to account for labor time, or they may find it tedious to manually calculate the exact cost of materials for each item they produce. This leads to inconsistent pricing, reduced profitability, and a lack of confidence in their business.

### The Value
CraftPrice will provide a simple, intuitive tool that solves this problem directly. By separating material costs, labor costs, and a clear pricing formula, the application will empower artisans to:
-   Accurately calculate the true cost of their products.
-   Value their labor time appropriately.
-   Set consistent and profitable prices.
-   Gain confidence in their pricing strategy.

## 3. Actors & Roles

-   **Artisan** (Primary User): An individual who creates and sells handmade goods (e.g., jewelry, sculptures, origami). They are the sole user of the application and manage all data within it.

## 4. User Scenarios & Experience

-   **Scenario 1: First-Time Setup**
    -   An artisan opens the app for the first time. The dashboard is empty. They navigate to the "Settings" area and enter their desired hourly wage, for example, "20" €/hour, and save it.

-   **Scenario 2: Populating Inventory**
    -   The artisan has just bought a new batch of supplies. They go to the "Materials" section and add a new material:
        -   **Name**: Sterling Silver Clasps
        -   **Purchase Price**: 25
        -   **Quantity in Lot**: 50
        -   **Unit**: "clasps"
    -   The application automatically calculates and shows a unit cost of 0.50 per clasp.

-   **Scenario 3: Defining a New Product**
    -   The artisan wants to price a new creation. They navigate to "Models" and create a new model:
        -   **Name**: Origami Crane Earrings
        -   **Time to Make**: 45 minutes.
    -   Within the new model's editor, they add the required materials from a list of their existing inventory:
        -   `Origami Paper Sheet`: quantity `2`
        -   `Sterling Silver Clasp`: quantity `2`

-   **Scenario 4: Reviewing the Price**
    -   After saving the new model, the artisan is taken to the main dashboard.
    -   They see "Origami Crane Earrings" in the list, along with the final, calculated "Suggested Selling Price". They can click on it to see the breakdown of material costs vs. labor costs.

## 5. Functional Requirements

FR-1.  **Settings**: The user MUST be able to define, update, and persist a single numerical value for their hourly labor rate. Input for the hourly rate MUST be strictly validated to accept only positive numerical values, preventing non-numeric input and providing immediate feedback if invalid (e.g., "Must be a positive number").
FR-2.  **Materials CRUD**: The system MUST provide full CRUD (Create, Read, Update, Delete) functionality for materials.
FR-3.  **Material Attributes**: Each material entry MUST include a `Name`, `Purchase Price`, `Quantity in Lot`, and a free-text `Unit`. Numerical inputs (`Purchase Price`, `Quantity in Lot`) MUST be strictly validated to accept only positive numerical values, preventing non-numeric input and providing immediate feedback if invalid (e.g., "Must be greater than 0"). Specifically, `Quantity in Lot` MUST prevent a zero value to avoid division by zero.
FR-4.  **Unit Cost Calculation**: The system MUST automatically calculate and display the `Unit Cost` for a material (`Purchase Price` / `Quantity in Lot`).
FR-5.  **Product Models CRUD**: The system MUST provide full CRUD functionality for product models.
FR-6.  **Model Attributes**: Each product model entry MUST include a `Name` and the `Time to Make` (capturable in hours and minutes). Numerical inputs (`Time to Make` in hours and minutes) MUST be strictly validated to accept only non-negative numerical values, preventing non-numeric input and providing immediate feedback if invalid (e.g., "Must be a number greater than or equal to 0").
FR-7.  **Model Composition**: The system MUST allow the user to associate multiple materials from their inventory to a product model, specifying the `Quantity Used` for each. It MUST also allow a product model to be created and saved with an empty material composition, in which case the 'Coût de Revient Matériel' will be zero.
FR-8.  **Material Cost Calculation**: For each model, the system MUST correctly calculate the `Coût de Revient Matériel` (Total Material Cost) by summing the `Unit Cost * Quantity Used` for all materials in its composition.
FR-9.  **Labor Cost Calculation**: For each model, the system MUST correctly calculate the `Coût Main d'Œuvre` (Labor Cost) by multiplying the `Time to Make` by the user's `Hourly Rate`.
FR-10. **Suggested Price Calculation**: For each model, the system MUST calculate the `Prix de Vente Conseillé` (Suggested Selling Price) using the formula: `(Total Material Cost * 3) + Labor Cost`.
FR-11. **Dashboard Display**: The main dashboard MUST display a list of all saved product models and their corresponding `Prix de Vente Conseillé`.
FR-12. **Responsiveness**: All application functionality MUST be accessible and usable on both mobile and desktop screen sizes.

## 6. Non-Functional Requirements

NFR-1. **Persistence**: All user-entered data (rate, materials, models) MUST be persisted locally in the web browser using LocalStorage.
NFR-2. **Performance**: Calculations should appear instantaneous to the user (<200ms). The UI must remain responsive while listing up to 500 materials or 100 product models.
NFR-3.  **Usability**: The interface MUST be clean, intuitive, and require no special training to use.
NFR-4.  **Input Validation Experience**: All user-facing numerical input fields MUST implement strict validation (as detailed in FR-1, FR-3, FR-6) to prevent invalid data entry and provide immediate, clear feedback to the user.

## 7. Success Criteria

-   **Task Completion Rate**: A new user can successfully set their rate, add at least one material, and calculate the price for a new product model in under 5 minutes.
-   **Calculation Accuracy**: 100% of price calculations performed by the application must be verifiably correct according to the formulas specified in FR-8, FR-9, and FR-10.
-   **Mobile Usability**: The application achieves a "Mobile Friendly" pass from standard industry tools (e.g., Google's Mobile-Friendly Test). All primary user flows can be completed on a 375px-width viewport without issues.
-   **User Confidence (Qualitative)**: After one week of use, at least 80% of surveyed users report feeling "more confident" or "much more confident" in their product pricing.

## 8. Data Entities & Attributes

-   **`Settings`**:
    -   `hourlyRate` (Number): The user's monetary rate per hour.
-   **`Material`**:
    -   `id` (String): Unique identifier.
    -   `name` (String): User-defined name for the material.
    -   `purchasePrice` (Number): The price paid for the lot of material.
    -   `purchaseQuantity` (Number): The number of items in the lot.
    -   `unit` (String): A descriptive unit (e.g., "pieces", "ml", "g").
-   **`ProductModel`**:
    -   `id` (String): Unique identifier.
    -   `name` (String): User-defined name for the finished product.
    -   `creationTimeInMinutes` (Number): Total time to create the product, stored in minutes.
-   **`ModelComposition`** (Linkage between a Model and its Materials):
    -   `productModelId` (String): Foreign key to `ProductModel`.
    -   `materialId` (String): Foreign key to `Material`.
    -   `quantityUsed` (Number): The quantity of the specific material used in the specific model.

## 9. Assumptions & Dependencies

-   **Assumption 1**: The material cost multiplier is a fixed, hardcoded value of `3` for the MVP and is not configurable by the user.
-   **Assumption 2**: Currency is not explicitly handled. All monetary inputs are assumed to be in the same currency, and all outputs will reflect that implicit currency.
-   **Assumption 3**: Users are responsible for their own data. They will be notified that data is stored locally and there is no cloud backup.
-   **Dependency 1**: The application requires a modern web browser that supports LocalStorage.

## 10. Out of Scope for this Feature

-   Cloud synchronization or user accounts.
-   Data import/export.
-   Handling multiple currencies.
-   Inventory tracking (i.e., decrementing material stock).
-   User-configurable pricing formulas.

## Clarifications

### Session 2025-11-23

-   **Q:** How should the application behave when a user enters an invalid number in a field for price, quantity, or time?
    -   **A:** Strict Validation with Immediate Feedback.

-   **Q:** What should the user experience be if they try to add materials to a product model when their material inventory is empty?
    -   **A:** Allow Empty Composition.

-   **Q:** Should this material cost multiplier (3) be user-configurable, or should it remain a fixed value in the application?
    -   **A:** Fixed Value.
