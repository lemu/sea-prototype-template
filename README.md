# Sea Prototype Template

A React library template configured for rapid prototyping with modern tooling for Sea Design Team.

## Tech Stack

- **React 19.1.1** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Tide UI v0.91.0** - Tide UI component library (@lemu/tide-ui), hosted on GitHub Packages

## Setup

### GitHub Packages Authentication

Tide UI is published as a private package on [GitHub Packages](https://github.com/features/packages). To install dependencies, you need to authenticate:

1. Ensure you're logged in to the GitHub CLI with the `read:packages` scope:
   ```bash
   gh auth login
   gh auth refresh -s read:packages
   ```

2. Set the auth token in the project `.npmrc`:
   ```bash
   npm config set //npm.pkg.github.com/:_authToken $(gh auth token) --location=project
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Features

This template provides a complete setup for building React component libraries with:

- Hot Module Replacement (HMR) for fast development
- TypeScript support with declaration file generation
- Tailwind CSS v4 for styling
- React Router v7 for routing
- ES and UMD module outputs
- ESLint configuration
