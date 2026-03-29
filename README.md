# Portfolio Website

Personal portfolio built with Vue + Vite, with a contact API for local/dev server use and a Vercel Function for deployment.

## Stack

- Vue 3
- Vite
- Express (local/dev server)
- Vercel Function (`api/contact.mjs`)
- Nodemailer
- Cloudflare Turnstile

## Local development

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example`, then run:

```bash
npm run dev
```

Build the frontend:

```bash
npm run build
```

## Environment variables

Required for email:

```env
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
```

Required to enable the contact form in production:

```env
VITE_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
TURNSTILE_ALLOWED_HOSTNAMES=
```

If `VITE_TURNSTILE_SITE_KEY` is not set, the UI hides the contact form and falls back to direct email links.

## Vercel deployment

Recommended project settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

The frontend is served from the Vite build output, and the contact endpoint is deployed as:

- `api/contact.mjs`

## Notes

- Do not commit `.env`
- Rotate exposed secrets before deployment
- Add your real hero screenshots under `src/assets/hero/` when ready
