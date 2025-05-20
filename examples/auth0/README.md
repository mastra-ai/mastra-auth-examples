# Vite + React + TypeScript + Auth0

This repository is experimenting with a combined implementation of Vite, React, TypeScript, and Auth0.

## Requirements

- [Volta](https://volta.sh/)

Node.js is required to run this application. Please install Volta to automatically use the suitable Node.js version.

- [Auth0](https://auth0.com/)

This application uses Auth0. For more details, please refer to the [quickstart](https://auth0.com/docs/quickstart/spa/react).

## Recommended

- [Visual Studio Code](https://code.visualstudio.com/)

The recommended extensions for Visual Studio Code are listed in [.vscode/extensions.json](.vscode/extensions.json).

## Environment Variables

Environment variables are used in the `Auth0Provider`. For more details, please refer to the [documentation](https://auth0.github.io/auth0-react/functions/Auth0Provider.html).

```
VITE_AUTH0_DOMAIN="YOUR_DOMAIN"
VITE_AUTH0_CLIENT_ID="YOUR_CLIENT_ID"
```

## Getting Started

- Clone repository.

```
git clone https://github.com/kwn1125/vite-react-typescript-auth0-experiment.git <project_directory>
```

- Install dependencies by referencing the package-lock.json.

```
cd <project_directory>
npm ci
```

- Update the empty value and rename `.env.sample` to `.env.development`.
- Launch the application.

```
npm run dev
```
