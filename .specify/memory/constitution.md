# CraftPrice Constitution

## Core Principles

### I. Simplicity First (YAGNI)
"You Ain't Gonna Need It". We will always start with the simplest solution that works. Complexity will only be introduced when it is demonstrably necessary. This project begins as a client-only application using LocalStorage to maximize simplicity and immediate utility.

### II. Client-Side Centric
The application is, at its core, a tool that runs entirely in the user's browser. All business logic, calculations, and data storage are managed on the client side. This principle guides our architectural choices, favoring front-end solutions.

### III. Component-Based Architecture
The UI will be built using a component-based framework (React). Components should be small, reusable, and have a single responsibility. This promotes a clean, maintainable, and testable codebase.

### IV. Responsive & Mobile-First Design
The user interface must be designed and implemented with a mobile-first approach. It must be clean, intuitive, and fully functional on a wide range of screen sizes, from small phones to desktops.

### V. Data Privacy by Design
Since all data is stored locally on the user's device, we must be transparent about this fact. The application will not collect or transmit any user data. Any future feature considering data synchronization will require explicit user consent.

## Technology Stack

- **Frontend Framework:** React (with Vite)
- **UI/Styling:** Tailwind CSS
- **Data Persistence:** Browser LocalStorage
- **State Management:** React Context or a lightweight library like Zustand.

## Development Workflow

- All new features should be guided by User Stories.
- Code should be clean, readable, and self-documenting where possible.
- The application must remain fully functional after each change.

## Governance
These principles guide all development and architectural decisions. Any deviation must be justified and agreed upon by the project owner. The primary goal is to serve the end-user—the artisan—with a tool that is simple, reliable, and effective.

**Version**: 1.0.0 | **Ratified**: 2025-11-23 | **Last Amended**: 2025-11-23