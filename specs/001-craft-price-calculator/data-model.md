# CraftPrice Data Model

This document provides a detailed description of the data structures used in the CraftPrice application. The data is stored in the browser's LocalStorage, likely as a single JSON object containing arrays for each entity type.

## 1. Core Entities

### 1.1. `Settings`

A singleton object holding global application settings.

-   **Fields**:
    -   `hourlyRate` (Number): The user's monetary rate per hour.
-   **Validation Rules**:
    -   Must be a positive numerical value. Cannot be negative.

### 1.2. `Material`

Represents a single type of raw material in the user's inventory.

-   **Fields**:
    -   `id` (String): A unique identifier (e.g., UUID v4).
    -   `name` (String): User-defined name for the material (e.g., "Fermoir argenté").
    -   `purchasePrice` (Number): The price paid for the entire lot of the material.
    -   `purchaseQuantity` (Number): The number of individual items in the lot.
    -   `unit` (String): A descriptive unit for the quantity (e.g., "pièces", "ml", "gouttes").
-   **Validation Rules**:
    -   `name` must not be empty.
    -   `purchasePrice` must be a positive number.
    -   `purchaseQuantity` must be a positive number greater than zero to prevent division by zero.
-   **Derived Properties (In-memory)**:
    -   `unitCost` (Number): Calculated as `purchasePrice / purchaseQuantity`.

### 1.3. `ProductModel`

Represents a blueprint for a finished product the artisan creates.

-   **Fields**:
    -   `id` (String): A unique identifier (e.g., UUID v4).
    -   `name` (String): User-defined name for the finished product (e.g., "Boucles d'oreilles Origami").
    -   `creationTimeInMinutes` (Number): Total time required to create the product, stored in minutes for easier calculation.
    -   `composition` (Array of `ModelComposition` objects): A list of materials and quantities required for this model.
-   **Validation Rules**:
    -   `name` must not be empty.
    -   `creationTimeInMinutes` must be a non-negative number.
    -   As per the clarification, a `composition` array can be empty.

### 1.4. `ModelComposition` (Embedded Object)

This is a sub-entity and will be part of the `composition` array within a `ProductModel` object. It links a `ProductModel` to a `Material` and specifies the quantity used.

-   **Fields**:
    -   `materialId` (String): A foreign key referencing the `id` of a `Material`.
    -   `quantityUsed` (Number): The quantity of the specific material used for one instance of the `ProductModel`.
-   **Validation Rules**:
    -   `materialId` must correspond to an existing material.
    -   `quantityUsed` must be a positive number.

## 2. Example JSON Structure in LocalStorage

```json
{
  "state": {
    "settings": {
      "hourlyRate": 20
    },
    "materials": [
      {
        "id": "uuid-material-1",
        "name": "Fermoir argenté",
        "purchasePrice": 12,
        "purchaseQuantity": 28,
        "unit": "pièces"
      },
      {
        "id": "uuid-material-2",
        "name": "Papier Washi",
        "purchasePrice": 10,
        "purchaseQuantity": 50,
        "unit": "feuilles"
      }
    ],
    "models": [
      {
        "id": "uuid-model-1",
        "name": "Boucles d'oreilles Origami",
        "creationTimeInMinutes": 45,
        "composition": [
          {
            "materialId": "uuid-material-1",
            "quantityUsed": 2
          },
          {
            "materialId": "uuid-material-2",
            "quantityUsed": 2
          }
        ]
      }
    ]
  },
  "version": 0
}
```
*Note: The exact structure will be determined by the Zustand `persist` middleware, but this illustrates the conceptual model.*
