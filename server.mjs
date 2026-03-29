import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";
import { processContactSubmission, normalize } from "./lib/contact-service.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 3000);

const app = express();
app.disable("x-powered-by");

app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: isProduction
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://challenges.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://challenges.cloudflare.com"],
            fontSrc: ["'self'", "data:"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            frameAncestors: ["'none'"],
            frameSrc: [
              "'self'",
              "https://challenges.cloudflare.com",
              "https://drops.foodtruckcommunity.com",
            ],
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);
app.use(express.json({ limit: "10kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Too many submissions right now. Please try again later.",
  },
});

function getTurnstileRemoteIp(req) {
  const forwarded = normalize(req.headers["x-forwarded-for"]).split(",")[0];
  return forwarded || req.ip || "";
}

app.post("/api/contact", contactLimiter, async (req, res) => {
  const result = await processContactSubmission({
    payload: req.body || {},
    remoteIp: getTurnstileRemoteIp(req),
    hostname: req.hostname,
  });

  return res.status(result.statusCode).json(result.body);
});

if (isProduction) {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath));
  app.use(async (_req, res) => {
    const html = await readFile(path.join(distPath, "index.html"), "utf8");
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);
  app.use(async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const templatePath = path.join(__dirname, "index.html");
      const template = await readFile(templatePath, "utf8");
      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });
}

app.listen(port, () => {
  console.log(`Portfolio server running on http://localhost:${port}`);
});
