import compression from "compression";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import type { ViteDevServer } from "vite";

// The react-router build output path (relative to the compiled server.js location)
const BUILD_PATH = "../react-router/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();

app.use(compression());
app.disable("x-powered-by");

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer: Promise<ViteDevServer> = import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );

  viteDevServer.then((server) => {
    app.use(server.middlewares);
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      try {
        const source = await server.ssrLoadModule("./server/app.ts");
        return await source.app(req, res, next);
      } catch (error) {
        if (typeof error === "object" && error instanceof Error) {
          server.ssrFixStacktrace(error);
        }
        next(error);
      }
    });
  });
} else {
  console.log("Starting production server");
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
