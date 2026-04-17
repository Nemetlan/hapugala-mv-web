# Hapugala Vidyalaya Galle Website

This document provides an overview of the Hapugala Vidyalaya Galle website project, designed to serve as instructional context for future interactions with the Gemini CLI.

## Project Overview

This is a Next.js project bootstrapped with `create-next-app`, serving as the official website for Hapugala Vidyalaya Galle, Sri Lanka. The project is built using:

*   **Framework:** Next.js (version 16.2.4)
*   **Language:** TypeScript
*   **UI Library:** React (version 19.2.4)
*   **Styling:** Tailwind CSS (configured via `postcss.config.mjs`)
*   **Animations:** Framer Motion (`motion` library)
*   **Icons:** Lucide React
*   **Image Optimization:** Next.js Image component with remote patterns configured for `picsum.photos`.
*   **Data Management:** Static data defined in `constants.ts` for school information, navigation, and club details.

The website features a modular component structure, with a main `RootLayout` (`app/layout.tsx`) and a homepage (`app/page.tsx`) that integrates various sections like Hero, Welcome, Ethos, Houses, Structure, Clubs, Achievements, News, and Location, each implemented as a separate React component.

## Building and Running

The project includes standard Next.js scripts for development, building, and starting the application.

*   **Development Server:**
    To run the development server with hot-reloading:
    ```bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    # or bun dev
    ```
    Open `http://localhost:3000` in your browser to view the application.

*   **Build for Production:**
    To build the application for production deployment:
    ```bash
    npm run build
    ```

*   **Start Production Server:**
    To start the Next.js production server (after building):
    ```bash
    npm run start
    ```

*   **Linting:**
    To run ESLint for code quality checks:
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Technology Stack:** The project adheres to a modern web development stack using Next.js, React, and TypeScript.
*   **Component-Based Architecture:** The UI is composed of reusable React components, organized within the `components/` directory.
*   **Styling:** Tailwind CSS is used for utility-first styling, providing a consistent and efficient way to style components.
*   **State Management:** For static data and global configuration, `constants.ts` is utilized. Component-level state is managed using React's built-in hooks.
*   **Linting:** ESLint is configured (`eslint.config.mjs`) to maintain code quality and consistency across the project.
*   **Font Management:** Custom fonts are managed via `fonts/fonts.tsx` and integrated using `next/font`.
*   **Image Handling:** Next.js Image component is used for optimized image delivery.

This project follows common Next.js best practices, including the App Router structure, for building performant and scalable web applications.
