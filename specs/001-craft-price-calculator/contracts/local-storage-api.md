# Contract: Local Storage Data Access API

This document defines the internal "Data Access API" for the CraftPrice application. As this is a client-side only application, there is no network API. This contract describes the public functions and state structure that the UI components will use to interact with the Zustand data stores. These stores, in turn, persist their data to the browser's LocalStorage.

## 1. Store: `settingsStore`

Manages global application settings.

-   **State Shape**:
    ```javascript
    {
      hourlyRate: number
    }
    ```
-   **Actions (Public Functions)**:
    -   `setHourlyRate(rate: number): void`
        -   Sets the user's hourly labor rate.
        -   Performs validation to ensure the rate is a positive number.

## 2. Store: `materialsStore`

Manages the inventory of raw materials.

-   **State Shape**:
    ```javascript
    {
      materials: Array<{
        id: string,
        name: string,
        purchasePrice: number,
        purchaseQuantity: number,
        unit: string
      }>
    }
    ```
-   **Selectors (Public Getters)**:
    -   `getMaterials(): Array<Material>`
        -   Returns the full list of materials.
    -   `getMaterialById(id: string): Material | undefined`
        -   Returns a single material object by its ID.
-   **Actions (Public Functions)**:
    -   `addMaterial(newMaterial: Omit<Material, 'id'>): void`
        -   Adds a new material to the store. Generates a unique ID internally.
        -   Performs validation on the input data.
    -   `updateMaterial(id: string, updatedMaterial: Partial<Material>): void`
        -   Updates an existing material identified by its ID.
        -   Performs validation on the updated data.
    -   `deleteMaterial(id: string): void`
        -   Removes a material from the store by its ID.

## 3. Store: `modelsStore`

Manages the product models (finished goods).

-   **State Shape**:
    ```javascript
    {
      models: Array<{
        id: string,
        name: string,
        creationTimeInMinutes: number,
        composition: Array<{
          materialId: string,
          quantityUsed: number
        }>
      }>
    }
    ```
-   **Selectors (Public Getters)**:
    -   `getModels(): Array<ProductModel>`
        -   Returns the full list of product models.
    -   `getModelById(id: string): ProductModel | undefined`
        -   Returns a single product model by its ID.
-   **Actions (Public Functions)**:
    -   `addModel(newModel: Omit<ProductModel, 'id'>): void`
        -   Adds a new product model. Generates a unique ID internally.
        -   Performs validation on the input data.
    -   `updateModel(id: string, updatedModel: Partial<ProductModel>): void`
        -   Updates an existing model.
        -   Performs validation on the updated data.
    -   `deleteModel(id: string): void`
        -   Removes a model by its ID. Also handles any necessary cleanup related to its composition if needed in the future.
