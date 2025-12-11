// server.ts
import { createServer } from "http";
import { parse } from "url";
import next from "next";

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    if (!req || !res) return;
    const parsedUrl = parse(req.url ?? "/", true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    // App Service injects PORT; don’t hardcode 3000
    console.log(`> Next.js server running on port ${port}`);
  });
});
