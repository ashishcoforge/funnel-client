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
    const parsedUrl: any = parse(req.url ?? "/", true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Next.js server running on port ${port}`);
  });
});
