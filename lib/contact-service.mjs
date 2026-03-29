import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let transporter;

export function normalize(value) {
  return String(value || "").trim();
}

export function escapeHtml(value) {
  return normalize(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactPayload(payload) {
  const errors = {};
  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const project = normalize(payload.project);
  const message = normalize(payload.message);
  const company = normalize(payload.company);
  const turnstileToken = normalize(payload.turnstileToken);

  if (company) {
    errors.company = "Spam detected.";
  }

  if (name.length < 2 || name.length > 80) {
    errors.name = "Enter a valid name.";
  }

  if (!emailPattern.test(email) || email.length > 160) {
    errors.email = "Enter a valid email address.";
  }

  if (project.length < 3 || project.length > 120) {
    errors.project = "Enter a short project summary.";
  }

  if (message.length < 20 || message.length > 3000) {
    errors.message = "Message should be between 20 and 3000 characters.";
  }

  if (!turnstileToken || turnstileToken.length > 2048) {
    errors.turnstileToken = "Complete the verification challenge.";
  }

  return {
    errors,
    values: { name, email, project, message, company, turnstileToken },
  };
}

export function normalizeHostnameList(value) {
  return normalize(value)
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const {
    SMTP_HOST,
    SMTP_PORT = "587",
    SMTP_SECURE = "false",
    SMTP_USER,
    SMTP_PASS,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

export async function verifyTurnstileToken({ token, remoteIp, expectedHostname }) {
  const secret = normalize(process.env.TURNSTILE_SECRET_KEY);

  if (!secret) {
    return {
      ok: false,
      statusCode: 503,
      message: "Captcha verification is not configured yet.",
    };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  let result;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        signal: AbortSignal.timeout(5000),
      }
    );

    result = await response.json();
  } catch (_error) {
    return {
      ok: false,
      statusCode: 502,
      message: "Captcha verification failed. Please try again.",
    };
  }

  if (!result.success) {
    return {
      ok: false,
      statusCode: 400,
      message: "Captcha verification failed. Please try again.",
      errorCodes: result["error-codes"] || [],
    };
  }

  const allowedHostnames = normalizeHostnameList(process.env.TURNSTILE_ALLOWED_HOSTNAMES);
  const verifiedHostname = normalize(result.hostname).toLowerCase();

  if (allowedHostnames.length > 0 && !allowedHostnames.includes(verifiedHostname)) {
    return {
      ok: false,
      statusCode: 400,
      message: "Captcha verification failed for this host.",
    };
  }

  if (
    expectedHostname &&
    allowedHostnames.length === 0 &&
    verifiedHostname &&
    verifiedHostname !== expectedHostname
  ) {
    return {
      ok: false,
      statusCode: 400,
      message: "Captcha verification failed for this host.",
    };
  }

  return { ok: true };
}

export async function processContactSubmission({ payload, remoteIp, hostname }) {
  const { errors, values } = validateContactPayload(payload || {});

  if (values.company) {
    return {
      statusCode: 200,
      body: { ok: true, message: "Thanks." },
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      statusCode: 400,
      body: {
        ok: false,
        message: "Please fix the highlighted fields.",
        errors,
      },
    };
  }

  const turnstileCheck = await verifyTurnstileToken({
    token: values.turnstileToken,
    remoteIp,
    expectedHostname: normalize(hostname).toLowerCase(),
  });

  if (!turnstileCheck.ok) {
    return {
      statusCode: turnstileCheck.statusCode,
      body: {
        ok: false,
        message: turnstileCheck.message,
        errors: {
          turnstileToken: turnstileCheck.message,
        },
      },
    };
  }

  const mailer = getTransporter();
  const to = normalize(process.env.CONTACT_TO_EMAIL);
  const from = normalize(process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER);

  if (!mailer || !to || !from) {
    return {
      statusCode: 503,
      body: {
        ok: false,
        message: "Contact form is not configured yet.",
      },
    };
  }

  const subject = `[Portfolio] ${values.project} - ${values.name}`;
  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Project: ${values.project}`,
    "",
    values.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Project:</strong> ${escapeHtml(values.project)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p>
    </div>
  `;

  try {
    await mailer.sendMail({
      to,
      from,
      replyTo: values.email,
      subject,
      text,
      html,
    });

    return {
      statusCode: 200,
      body: {
        ok: true,
        message: "Message sent. I will get back to you soon.",
      },
    };
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return {
      statusCode: 500,
      body: {
        ok: false,
        message: "Message could not be sent right now.",
      },
    };
  }
}
