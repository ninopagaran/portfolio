import { processContactSubmission, normalize } from "../lib/contact-service.mjs";

function getRemoteIp(req) {
  const forwarded = normalize(req.headers["x-forwarded-for"]).split(",")[0];
  return forwarded || normalize(req.socket?.remoteAddress);
}

function getHostname(req) {
  const hostHeader = normalize(req.headers.host).toLowerCase();
  return hostHeader.split(":")[0];
}

function parseBody(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (_error) {
      return {};
    }
  }

  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      message: "Method not allowed.",
    });
  }

  const result = await processContactSubmission({
    payload: parseBody(req),
    remoteIp: getRemoteIp(req),
    hostname: getHostname(req),
  });

  res.setHeader("Cache-Control", "no-store");
  return res.status(result.statusCode).json(result.body);
}
