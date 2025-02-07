# React Router 7 Express.js API Backend

A streamlined Express.js API backend template using React Router 7 for file-based routing. This project is a modified version of the [React Router Custom Server Template](https://github.com/remix-run/react-router-templates/tree/main/node-custom-server), stripped down to serve as a pure API backend.

## Features

- 🚀 File-based API routing using React Router
- ⚡️ Hot Module Replacement (HMR) for rapid development
- 🔒 TypeScript by default
- 📁 Express.js backend with React Router integration
- 🔄 Automatic route generation from file system
- 🛠️ Development mode with hot reloading

## What's Different from the Original Template?

This version has been modified to remove all front-end rendering capabilities and focus solely on API functionality:

- Removed all client-side React rendering
- Removed TailwindCSS and other front-end styling
- Removed SSR (Server Side Rendering) of React components
- Removed client-side asset bundling
- Kept the file-based routing system powered by React Router
- Maintained Express.js integration with hot reloading

## Getting Started

### Installation

Install the dependencies:

```bash
yarn install
```

### Development

Start the development server with HMR:

```bash
yarn dev
```

Your API will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
yarn build
```

## Deployment

### Docker Deployment

This template includes a Dockerfile optimized for yarn:

```bash
# Build the image
docker build -t my-api .

# Run the container
docker run -p 3000:3000 my-api
```

The containerized API can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in Express server is production-ready.

Make sure to deploy the output of `yarn build`:

```
├── package.json
├── yarn.lock
├── server.js
└── build/
    └── server/    # Server-side code
```

## File-Based Routing

Routes are automatically generated based on the file structure in the `app/routes` directory. Each route file should export the necessary route handlers (loader, action) following the React Router conventions.

Example:

```typescript
// app/routes/api/users.ts
export async function loader({ request }: LoaderArgs) {
  // Handle GET requests
  return json({ users: [] });
}

export async function action({ request }: ActionArgs) {
  // Handle POST, PUT, DELETE requests
  // ...
}
```

---

Built with React Router and Express.js.
