# Step1

# Project Title

[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)](https://www.typescriptlang.org/)  
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)  
[![NestJS](https://img.shields.io/badge/NestJS-9.x-red.svg)](https://nestjs.com/)

## Description

A full-stack application built using **React** for the front-end and **NestJS** for the back-end. The project leverages modern technologies like `TypeScript`, `Redux-Saga`, `Passport JWT`, and others to ensure a robust, scalable, and maintainable application.

## Features

- **Frontend**:

  - Built with `React` and `TypeScript`
  - State management using `Redux` and `Redux-Saga`
  - API communication via `Axios`
  - Code formatting and linting with `Prettier`

- **Backend**:
  - Developed with `NestJS` and `Express`
  - Data persistence with `MongoDB`
  - Validation using `class-validator` and `class-transformer`
  - Authentication and Authorization with `Passport JWT`
  - Logging with `Winston`
  - Testing using `Jest`

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/) (v5.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

# Step2

Install dependencies for both the frontend and backend:

# Frontend

cd client-side
npm install

# Backend

cd ../server-side
npm install

# Step 3.

    •   Backend:
        cd server-side
        npm run start

# Step4

    •   Frontend:
        cd client-side
        npm run start

# Project Structure

## Frontend

    •	src/redux: State management with Redux and Redux-Saga
    •	src/services: API service layer using Axios
    •	src/components: React components
    •	guards: Defines application-wide route configurations.
    •	helper: Utility functions to simplify common operations and improve code reusability.
    •	pages: Defines the main pages of the application, each representing a route.
    •	store Configures and initializes the Redux store.
    •	styles Contains global and modular CSS or SCSS files for styling the application.

    Component

    •   index.tsx: It handles the component logic and combines other parts (e.g., view, styles).
    •   view.tsx: Contains the presentational logic, defining how the component is rendered. Keeps the component focused on UI.
    •   css: A folder or file (.css/.scss) for styles specific to the component. This ensures styles are scoped and avoid conflicts.
    •   interface: Defines the TypeScript interfaces and types used in the component. Ensures strong typing for props and state.

## Backend

    •	src/modules: Feature modules
    •	src/auth: Authentication logic using Passport JWT
    •	src/helpers: Shared utilities

# Scripts

## Frontend

    •	start - Starts the development server with react-scripts and serves the application on localhost:3000.
    •	build - Builds the application for production. Optimizes the build and outputs it in the build directory.
    •	test - Runs the test suite using Jest. Launches in interactive watch mode by default.
    •	eject - Ejects the app from create-react-app, allowing full control over the configuration files. Note: This action is irreversible.

## Backend

    •	build - Compiles the TypeScript code into JavaScript in the dist directory using the NestJS compiler.
    •	format - Formats the code using Prettier for files in the src and test directories.
    •	start  - Starts the NestJS application in production mode.
    •	start:dev -  Starts the NestJS application in development mode with hot-reload enabled.
    •	start:debug - Starts the application in debug mode, enabling debugging tools.
    •	start:nodemon - Uses nodemon to watch for file changes and restarts the application automatically in dev mode.
    •	start:prod - Runs the compiled JavaScript application (dist/main.js) in production mode.
    •	lint - Runs ESLint to check for code quality issues and automatically fixes them if possible.
    •	test - Runs all the unit tests using Jest.
    •	test:watch - Runs Jest in watch mode, rerunning tests when files change.
    •	test:cov - Runs tests and generates a code coverage report.
    •	test:debug - Runs tests in debug mode with node --inspect-brk for debugging purposes.
    •	test:e2e - Runs end-to-end tests using Jest with the configuration specified in test/jest-e2e.json.

Testing

     •   Backend:
        cd server-side
        npm test

    •   Frontend:
        cd client-side
        npm test

Screenshots  
 ![alt text](<Screenshot 2024-11-18 at 11.45.10 PM.png>)
![alt text](<Screenshot 2024-11-18 at 11.45.04 PM.png>)
![alt text](<Screenshot 2024-11-18 at 11.44.55 PM.png>)
