<template>
  <div class="page">
    <header class="header">
      <nav class="nav">
        <p class="logo">Niño Christian P. Pagaran</p>
        <div class="nav-actions">
          <button
            type="button"
            class="theme-toggle"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button
            v-if="hasContactForm"
            type="button"
            class="nav-cta__button"
            @click="openContactModal"
          >
            Let's talk
          </button>
          <a
            v-else
            class="nav-cta__button"
            href="mailto:ninoppagaran@gmail.com"
          >
            Email me
          </a>
        </div>
      </nav>

      <div class="hero-grid">
        <div class="intro">
          <p class="eyebrow">Full stack developer</p>
          <h1>Websites and web products built to feel clear and look sharp.</h1>
          <p class="intro-copy">
            <span class="emph">Custom websites</span>,
            <span class="emph">product UI</span>, and
            <span class="emph">full-stack builds</span>.
            <span class="muted">Based in Lapu-Lapu City.</span>
          </p>
        </div>

        <aside class="hero-preview" aria-hidden="true">
          <div class="hero-gallery">
            <div
              v-for="(slide, index) in heroSlides"
              :key="slide.name"
              :class="['gallery-slide', { 'is-active': index === activeHeroSlide }]"
            >
              <div class="gallery-slide__card">
                <div class="gallery-slide__bar">
                  <span class="gallery-slide__dot"></span>
                  <span class="gallery-slide__dot"></span>
                  <span class="gallery-slide__dot"></span>
                </div>
                <div class="gallery-slide__viewport">
                  <img
                    :src="slide.image"
                    :alt="slide.name"
                    class="gallery-slide__image"
                  />
                </div>
              </div>
            </div>
            <div class="gallery-pager">
              <span
                v-for="(slide, index) in heroSlides"
                :key="slide.name"
                :class="['gallery-pager__dot', { 'is-active': index === activeHeroSlide }]"
              ></span>
            </div>
          </div>
        </aside>
      </div>

    </header>

    <main id="content" class="content">
      <SectionCard
        id="websites"
        eyebrow="Website showcase"
        title="Selected websites"
      >
        <div class="showcase-grid">
          <article v-for="site in websites" :key="site.name" class="project website-card">
            <div :class="['preview', site.previewClass]">
              <div v-if="site.previewEmbed" class="preview__embed-shell">
                <iframe
                  :src="site.previewEmbed"
                  :title="`${site.name} live preview`"
                  class="preview__frame"
                  loading="lazy"
                  tabindex="-1"
                ></iframe>
              </div>
              <img
                v-else-if="site.previewImage"
                :src="site.previewImage"
                :alt="`${site.name} preview`"
                class="preview__image"
              />
              <span v-else class="preview__label">{{ site.placeholder }}</span>
            </div>
            <p class="project-label">{{ site.type }}</p>
            <h3>
              <a :href="site.link" target="_blank" rel="noopener">{{ site.name }}</a>
            </h3>
            <p class="meta"><span class="muted">{{ site.stack }}</span></p>
          </article>
        </div>
      </SectionCard>

      <SectionCard
        id="work"
        eyebrow="Experience"
        title="Work experience"
      >
        <div class="experience-list">
          <article
            v-for="experience in featuredExperiences"
            :key="`${experience.role}-${experience.company}`"
            class="experience-item"
          >
            <div class="experience-item__rail" aria-hidden="true">
              <div class="experience-item__logo">{{ experience.logo }}</div>
              <div class="experience-item__line"></div>
            </div>
            <div class="experience-item__body">
              <h3>{{ experience.role }}</h3>
              <p class="experience-item__company">
                <span class="emph">{{ experience.company }}</span>
                <span class="muted">/ {{ experience.type }}</span>
              </p>
              <p class="experience-item__period">{{ experience.period }}</p>
              <p class="project-copy">{{ experience.summary }}</p>
              <div v-if="experience.metrics?.length" class="experience-item__metrics">
                <span v-for="metric in experience.metrics" :key="metric">{{ metric }}</span>
              </div>
              <ul v-if="experience.highlights?.length" class="experience-item__highlights">
                <li v-for="highlight in experience.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
              <div class="experience-item__stack">
                <span
                  v-for="stackItem in experience.stack"
                  :key="stackItem"
                  class="experience-item__stack-chip"
                >
                  {{ stackItem }}
                </span>
              </div>
            </div>
          </article>
        </div>
        <p class="experience-list__note">
          Earlier student projects and additional background are available in the
          <a
            href="https://drive.google.com/file/d/1RBAS5sO7K8FZjDbwp5VJySjnDei6EBra/view?usp=drive_link"
            target="_blank"
            rel="noopener"
          >
            resume
          </a>.
        </p>
      </SectionCard>

      <div class="split">
        <SectionCard
          id="about"
          eyebrow="Services"
          title="What I build"
        >
          <div class="tag-list">
            <span v-for="service in services" :key="service">{{ service }}</span>
          </div>
        </SectionCard>

        <SectionCard
          id="skills"
          eyebrow="Stack"
          title="Core stack"
        >
          <div class="tag-list">
            <span v-for="tool in stackTools" :key="tool">{{ tool }}</span>
          </div>
        </SectionCard>
      </div>

      <section id="contact" class="section contact-section" aria-labelledby="section-contact">
        <div class="contact-compact">
          <div class="contact-details">
            <p class="section-eyebrow">Contact</p>
            <h2 id="section-contact" class="section-title">Let's build something good</h2>
            <p class="contact-card__value">Niño Christian Pagaran</p>
            <p class="contact-card__line">
              <a href="mailto:ninoppagaran@gmail.com">ninoppagaran@gmail.com</a>
            </p>
            <p class="contact-card__line">
              <a href="tel:+639760234686">+639760234686</a>
            </p>
            <p class="note">Best for project inquiries, freelance work, and collaborations.</p>
          </div>
          <div class="contact-links">
            <a href="https://github.com/ninopagaran" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/ninoppagaran/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://drive.google.com/file/d/1RBAS5sO7K8FZjDbwp5VJySjnDei6EBra/view?usp=drive_link" target="_blank" rel="noopener">Resume</a>
            <a href="https://ninopagaran.vercel.app/" target="_blank" rel="noopener">Portfolio</a>
            <a href="https://wa.me/639760234686" target="_blank" rel="noopener">WhatsApp</a>
            <a href="viber://chat?number=%2B639760234686" target="_blank" rel="noopener">Viber</a>
            <button
              v-if="hasContactForm"
              type="button"
              class="contact-card__button"
              @click="openContactModal"
            >
              Contact form
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>(c) 2026 Niño Christian P. Pagaran</p>
    </footer>

    <div
      v-if="isContactModalOpen && hasContactForm"
      class="modal-backdrop"
      @click.self="closeContactModal"
    >
      <div
        class="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div class="contact-modal__header">
          <div>
            <p class="contact-card__label">Contact form</p>
            <h2 id="contact-modal-title">Start a project</h2>
            <p class="contact-modal__intro">
              Send the basics. I will reply with next steps, scope, and availability.
            </p>
          </div>
          <button
            type="button"
            class="contact-modal__close"
            aria-label="Close contact form"
            @click="closeContactModal"
          >
            &times;
          </button>
        </div>

        <form class="contact-form" @submit.prevent="submitContactForm">
          <input
            v-model="contactForm.company"
            class="contact-form__honeypot"
            type="text"
            name="company"
            tabindex="-1"
            autocomplete="off"
          />

          <div class="contact-form__row">
            <label class="contact-form__field">
              <span>Name</span>
              <input
                v-model.trim="contactForm.name"
                :class="{ 'is-invalid': contactState.errors.name }"
                type="text"
                name="name"
                maxlength="80"
                autocomplete="name"
                placeholder="Your name"
              />
              <span v-if="contactState.errors.name" class="contact-form__error">
                {{ contactState.errors.name }}
              </span>
            </label>

            <label class="contact-form__field">
              <span>Email</span>
              <input
                v-model.trim="contactForm.email"
                :class="{ 'is-invalid': contactState.errors.email }"
                type="email"
                name="email"
                maxlength="160"
                autocomplete="email"
                placeholder="you@example.com"
              />
              <span v-if="contactState.errors.email" class="contact-form__error">
                {{ contactState.errors.email }}
              </span>
            </label>
          </div>

          <label class="contact-form__field">
            <span>Project</span>
            <input
              v-model.trim="contactForm.project"
              :class="{ 'is-invalid': contactState.errors.project }"
              type="text"
              name="project"
              maxlength="120"
              placeholder="Landing page, dashboard, booking app..."
            />
            <span v-if="contactState.errors.project" class="contact-form__error">
              {{ contactState.errors.project }}
            </span>
          </label>

          <label class="contact-form__field">
            <span>Message</span>
            <textarea
              v-model.trim="contactForm.message"
              :class="{ 'is-invalid': contactState.errors.message }"
              name="message"
              rows="5"
              maxlength="3000"
              placeholder="What are you building, what do you need, and when do you need it?"
            ></textarea>
            <span v-if="contactState.errors.message" class="contact-form__error">
              {{ contactState.errors.message }}
            </span>
          </label>

          <div class="contact-form__captcha">
            <p class="contact-form__field-label">Verification</p>
            <div
              v-if="turnstileSiteKey"
              ref="turnstileContainer"
              class="contact-form__captcha-widget"
            ></div>
            <p v-else class="contact-form__error">
              Captcha is not configured yet. Add your Turnstile keys before deployment.
            </p>
            <p v-if="turnstileError" class="contact-form__error">{{ turnstileError }}</p>
            <p v-if="contactState.errors.turnstileToken" class="contact-form__error">
              {{ contactState.errors.turnstileToken }}
            </p>
          </div>

          <div class="contact-form__actions">
            <div class="contact-form__meta">
              <p class="contact-form__note">Email goes directly to `ninoppagaran@gmail.com`.</p>
              <p
                v-if="contactState.message"
                :class="[
                  'contact-form__status',
                  `contact-form__status--${contactState.status}`,
                ]"
              >
                {{ contactState.message }}
              </p>
            </div>

            <button
              class="contact-form__submit"
              type="submit"
              :disabled="
                contactState.status === 'sending' ||
                !turnstileSiteKey ||
                !turnstileScriptReady ||
                !turnstileToken
              "
            >
              {{ contactState.status === "sending" ? "Sending..." : "Send message" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import attendsPreview from "./assets/attends-preview.png";
import foodtruckPreview from "./assets/foodtruck-microlink.png";
import missiontoolsPreview from "./assets/missiontools-preview.png";
import heroImage03 from "./assets/hero/hero-03.png";
import SectionCard from "./components/SectionCard.vue";

const activeHeroSlide = ref(0);
const isContactModalOpen = ref(false);
const turnstileContainer = ref(null);
const turnstileToken = ref("");
const turnstileError = ref("");
const turnstileWidgetId = ref(null);
const turnstileScriptReady = ref(false);
let heroSlideTimer;
let turnstileScriptPromise;
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const hasContactForm = Boolean(turnstileSiteKey);

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

const savedTheme = localStorage.getItem("theme");
const isDark = ref(savedTheme ? savedTheme === "dark" : getSystemTheme() === "dark");

function applyTheme() {
  document.documentElement.classList.toggle("light", !isDark.value);
  document.documentElement.classList.toggle("dark", isDark.value);
  document.documentElement.style.colorScheme = isDark.value ? "dark" : "light";
}

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  applyTheme();
}

applyTheme();

function getPreferredTheme() {
  return isDark.value ? "dark" : "light";
}

function isTurnstileAvailable() {
  return typeof window !== "undefined" && window.turnstile;
}

function openContactModal() {
  if (!hasContactForm) {
    return;
  }

  isContactModalOpen.value = true;
}

function closeContactModal() {
  isContactModalOpen.value = false;
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    closeContactModal();
  }
}

function ensureTurnstileScript() {
  if (!turnstileSiteKey) {
    return Promise.resolve();
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  if (isTurnstileAvailable()) {
    turnstileScriptReady.value = true;
    turnstileScriptPromise = Promise.resolve();
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-turnstile-script="true"]');

    if (existing) {
      existing.addEventListener("load", () => {
        turnstileScriptReady.value = true;
        resolve();
      });
      existing.addEventListener("error", () => reject(new Error("Captcha could not load.")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = "true";
    script.onload = () => {
      turnstileScriptReady.value = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Captcha could not load."));
    document.head.appendChild(script);
  }).catch((error) => {
    turnstileScriptPromise = null;
    turnstileError.value = error.message;
    throw error;
  });

  return turnstileScriptPromise;
}

function resetTurnstile() {
  turnstileToken.value = "";

  if (isTurnstileAvailable() && turnstileWidgetId.value !== null) {
    window.turnstile.reset(turnstileWidgetId.value);
  }
}

async function renderTurnstile() {
  if (!turnstileSiteKey || !turnstileContainer.value || !isTurnstileAvailable()) {
    return;
  }

  if (turnstileWidgetId.value !== null) {
    window.turnstile.reset(turnstileWidgetId.value);
    return;
  }

  turnstileWidgetId.value = window.turnstile.render(turnstileContainer.value, {
    sitekey: turnstileSiteKey,
    theme: getPreferredTheme(),
    action: "contact_form",
    callback: (token) => {
      turnstileToken.value = token;
      turnstileError.value = "";
      delete contactState.errors.turnstileToken;
    },
    "expired-callback": () => {
      turnstileToken.value = "";
      turnstileError.value = "Verification expired. Please complete it again.";
    },
    "error-callback": () => {
      turnstileToken.value = "";
      turnstileError.value = "Verification failed to load. Please retry.";
    },
  });
}

onMounted(() => {
  heroSlideTimer = window.setInterval(() => {
    activeHeroSlide.value = (activeHeroSlide.value + 1) % heroSlides.length;
  }, 2600);

  window.addEventListener("keydown", handleEscapeKey);
});

onBeforeUnmount(() => {
  if (heroSlideTimer) {
    window.clearInterval(heroSlideTimer);
  }

  window.removeEventListener("keydown", handleEscapeKey);
  document.body.style.overflow = "";
});

watch(isContactModalOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";

  if (!isOpen) {
    turnstileToken.value = "";
    turnstileError.value = "";
    turnstileWidgetId.value = null;
    return;
  }

  if (!turnstileSiteKey) {
    return;
  }

  nextTick()
    .then(() => ensureTurnstileScript())
    .then(() => renderTurnstile())
    .catch(() => {
      turnstileError.value = "Captcha could not load. Please refresh and try again.";
    });
});

const contactForm = reactive({
  name: "",
  email: "",
  project: "",
  message: "",
  company: "",
});

const contactState = reactive({
  status: "idle",
  message: "",
  errors: {},
});

const contactEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm() {
  const errors = {};

  if (contactForm.name.trim().length < 2 || contactForm.name.trim().length > 80) {
    errors.name = "Enter a valid name.";
  }

  if (
    !contactEmailPattern.test(contactForm.email.trim()) ||
    contactForm.email.trim().length > 160
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (
    contactForm.project.trim().length < 3 ||
    contactForm.project.trim().length > 120
  ) {
    errors.project = "Add a short project summary.";
  }

  if (
    contactForm.message.trim().length < 20 ||
    contactForm.message.trim().length > 3000
  ) {
    errors.message = "Message should be between 20 and 3000 characters.";
  }

  if (!turnstileSiteKey) {
    errors.turnstileToken = "Captcha is not configured yet.";
  } else if (!turnstileToken.value) {
    errors.turnstileToken = "Complete the verification challenge.";
  }

  return errors;
}

async function submitContactForm() {
  contactState.errors = {};
  contactState.message = "";

  const errors = validateContactForm();

  if (Object.keys(errors).length > 0) {
    contactState.status = "error";
    contactState.errors = errors;
    contactState.message = "Please fix the highlighted fields.";
    return;
  }

  contactState.status = "sending";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...contactForm,
        turnstileToken: turnstileToken.value,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      contactState.status = "error";
      contactState.errors = data.errors || {};
      contactState.message = data.message || "Message could not be sent.";
      resetTurnstile();
      return;
    }

    contactState.status = "success";
    contactState.message = data.message || "Message sent.";
    contactForm.name = "";
    contactForm.email = "";
    contactForm.project = "";
    contactForm.message = "";
    contactForm.company = "";
    resetTurnstile();
  } catch (error) {
    contactState.status = "error";
    contactState.message = "Network error. Please try again.";
    resetTurnstile();
  }
}

const services = [
  "Portfolio sites",
  "Landing pages",
  "Dashboards",
  "Admin tools",
  "Automation workflows",
  "API integrations",
  "Auth systems",
  "Cloud deployment",
];

const stackTools = [
  "React",
  "Next.js",
  "Vue / Nuxt",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "Drizzle ORM",
  "Prisma",
  "n8n",
];

const experiences = [
  {
    logo: "DI",
    role: "Software Engineer / Product Developer",
    company: "DI Strategy",
    type: "Contract",
    period: "Apr 2026 – Jul 2026",
    summary: "Built AI workflow PoCs, full-stack product features, and packaged web deliverables across Python, SwiftUI, FastAPI, React, and WordPress.",
    metrics: ["Local-first AI subtitles", "SwiftUI + FastAPI app", "CI + pre-push checks"],
    highlights: [
      "Built a Traditional Chinese subtitle PoC covering STT, context injection, SRT export, run history, caching, and oversized-file handling.",
      "Developed a reptile care platform with auth, pet profiles, care records, feeding plans, media, community features, AI-assisted care, and commerce flows.",
      "Added migrations, diagnostics, linting, formatting, automated tests, smoke checks, Makefile tasks, and bilingual product specs for cleaner delivery and handoff.",
    ],
    stack: ["Python", "Gradio", "SQLite", "OpenAI", "Groq", "SwiftUI", "FastAPI"],
  },
  {
    logo: "SL",
    role: "Full-Stack Developer",
    company: "Strixen Limited (Mission Tools App)",
    type: "Contract",
    period: "Nov 2025 – Mar 2026",
    summary: "Built a mobile-first Nuxt/Vue product surface and supporting API workflows for dashboards, media access, and billing operations.",
    metrics: ["Mobile-first SPA", "Dashboard + billing flows", "API-backed media access"],
    highlights: [
      "Built product interfaces for dashboards, playback, account access, and billing flows with Nuxt 4 and Vue 3.",
      "Implemented backend workflows with Bun, Hono, and Drizzle ORM for application state, data access, and operational flows.",
      "Refined release quality, deployment behavior, and production-style app structure across frontend and backend.",
    ],
    stack: ["Nuxt", "Vue 3", "Bun", "Hono", "Drizzle ORM"],
  },
  {
    logo: "FW",
    role: "Freelance Full-Stack Developer",
    company: "Independent / Client Work",
    type: "Freelance",
    period: "Jul 2023 – Dec 2025",
    summary: "Built and deployed full-stack web applications for small businesses, internal tools, and campus use cases.",
    metrics: ["Custom business websites", "Internal tools", "Automation workflows"],
    highlights: [
      "Delivered custom websites, admin tools, and product interfaces aligned to client requirements and operational workflows.",
      "Implemented authentication, REST APIs, database-backed features, and automation flows for content, operations, and user management.",
      "Handled end-to-end delivery from planning and UI implementation to backend integration, deployment, and stakeholder iteration.",
    ],
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "n8n", "Supabase"],
  },
  {
    logo: "BA",
    role: "Web Development Intern",
    company: "Bayoa Analytics Engineering",
    type: "Internship",
    period: "Sep – Nov 2024",
    summary: "Supported internal dashboard development and data-layer improvements for analytics-oriented product workflows.",
    metrics: ["Internal dashboards", "Schema migration work", "Analytics interfaces"],
    highlights: [
      "Built dashboard and analytics interface features with a focus on maintainable frontend structure and data presentation.",
      "Contributed to schema migration work from Prisma to Drizzle ORM for clearer backend structure and maintainability.",
      "Worked within an existing engineering environment using internal tooling, relational modeling, and shared implementation standards.",
    ],
    stack: ["TypeScript", "Drizzle ORM", "Prisma", "Dashboards"],
  },
  {
    logo: "UP",
    role: "Project Lead / Team Collaborator",
    company: "University Projects and Hackathons",
    type: "Part-time",
    period: "2023 – Present",
    summary: "Led student product builds and collaborated on technical delivery, documentation, and presentation work.",
    metrics: ["Team leadership", "Attendance system", "Hackathon delivery"],
    highlights: [
      "Led a team building a location-based attendance system, coordinating implementation, task ownership, and technical direction.",
      "Supported hackathon and student project delivery through technical documentation, product framing, and pitch preparation.",
      "Worked across planning, execution, and communication to keep student-built products aligned with technical and presentation goals.",
    ],
    stack: ["Product planning", "Backend coordination", "Presentations"],
  },
];

const featuredExperiences = experiences.slice(0, 4);

const websites = [
  {
    name: "foodiedrops",
    type: "Limited food releases",
    placeholder: "",
    previewClass: "preview--embed",
    previewEmbed: "https://drops.foodtruckcommunity.com/",
    previewImage: "",
    stack: "React / Tailwind / Supabase",
    link: "https://drops.foodtruckcommunity.com/",
  },
  {
    name: "Food Truck Community App",
    type: "Booking platform",
    placeholder: "",
    previewClass: "preview--image",
    previewImage: foodtruckPreview,
    stack: "Nuxt / GraphQL / Custom UI",
    link: "https://app.foodtruckcommunity.com/",
  },
  {
    name: "MissionTools Staging",
    type: "Operations platform",
    placeholder: "",
    previewClass: "preview--image",
    previewImage: missiontoolsPreview,
    stack: "Nuxt / Dashboard UI",
    link: "https://app.staging.missiontools.app/",
  },
  {
    name: "Attends",
    type: "Attendance platform",
    placeholder: "",
    previewClass: "preview--image",
    previewImage: attendsPreview,
    stack: "Next.js / Session management UI",
    link: "https://attends-128proj-frontend.onrender.com/",
  },
];

const heroSlides = [
  {
    name: "Hero 03",
    image: heroImage03,
  },
];

</script>
