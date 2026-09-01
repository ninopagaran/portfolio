<template>
  <div class="mx-auto max-w-[1080px] px-4 py-6 sm:px-5 md:py-8">
    <header>
      <nav class="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border border-[#d6d1c5] bg-white px-4 py-3 shadow-sm md:grid-cols-[1fr_auto_1fr] md:px-5 dark:border-[#40433d] dark:bg-[#242622]">
        <div class="inline-flex items-center gap-2.5 text-sm leading-tight font-bold">
          <button type="button" class="rounded-full" aria-label="View Niño Christian Pagaran's profile picture" @click="openProfileImage">
            <img :src="profilePhoto" alt="Niño Christian Pagaran" class="size-[33px] rounded-full object-cover ring-1 ring-black/10 transition hover:ring-2 hover:ring-[#af3f2c] dark:ring-white/20 dark:hover:ring-[#ed876f]" />
          </button>
          <a href="#content" aria-label="Niño Christian Pagaran — back to top">Niño Christian<br />Pagaran</a>
        </div>
        <div class="order-3 col-span-2 flex justify-between border-t border-[#d6d1c5] pt-3 text-sm md:order-none md:col-span-1 md:justify-center md:gap-6 md:border-0 md:pt-0 dark:border-[#40433d]" aria-label="Primary navigation">
          <a class="text-[#55554e] transition-colors hover:text-[#af3f2c] dark:text-[#c9c5bb] dark:hover:text-[#ed876f]" href="#websites">Work</a>
          <a class="text-[#55554e] transition-colors hover:text-[#af3f2c] dark:text-[#c9c5bb] dark:hover:text-[#ed876f]" href="#work">Experience</a>
          <a class="text-[#55554e] transition-colors hover:text-[#af3f2c] dark:text-[#c9c5bb] dark:hover:text-[#ed876f]" href="#contact">Contact</a>
        </div>
        <div class="flex items-center justify-end gap-2 md:gap-3">
          <button
            type="button"
            class="grid size-9 place-items-center rounded border border-[#aea89a] bg-white text-current transition-colors hover:bg-[#f5e7e2] dark:border-[#696b62] dark:bg-[#242622] dark:hover:bg-[#392923]"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" :size="18" aria-hidden="true" />
            <Moon v-else :size="18" aria-hidden="true" />
          </button>
          <button
            v-if="hasContactForm"
            type="button"
            class="rounded bg-[#af3f2c] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#812b1d] dark:bg-[#ed876f] dark:text-[#1c1e1b]"
            @click="openContactModal"
          >
            Let's talk
          </button>
          <a
            v-else
            class="rounded bg-[#af3f2c] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#812b1d] dark:bg-[#ed876f] dark:text-[#1c1e1b]"
            href="mailto:ninoppagaran@gmail.com"
          >
            Email me
          </a>
        </div>
      </nav>

      <div class="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <p class="text-sm font-semibold text-[#af3f2c] dark:text-[#ed876f]">Full stack developer</p>
          <h1 class="mt-2 mb-3 max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] leading-tight font-bold">I build websites, tools, and product UI that people use.</h1>
          <p class="max-w-[55ch] text-base leading-relaxed text-[#55554e] dark:text-[#c9c5bb]">
            I work across <span class="font-semibold text-[#1a1b19] dark:text-[#f1eee6]">frontend</span>, <span class="font-semibold text-[#1a1b19] dark:text-[#f1eee6]">backend</span>,
            and <span class="font-semibold text-[#1a1b19] dark:text-[#f1eee6]">deployment</span>.
          </p>
          <div class="mt-5 grid gap-2 text-sm text-[#55554e] dark:text-[#c9c5bb]">
            <span><b class="text-[#1a1b19] dark:text-[#f1eee6]">Based:</b> Lapu-Lapu City, PH</span>
            <span><b class="text-[#1a1b19] dark:text-[#f1eee6]">Focus:</b> Web apps, tools &amp; sites</span>
            <span><b class="text-[#1a1b19] dark:text-[#f1eee6]">Status:</b> Available for freelance work</span>
          </div>
        </div>

        <aside class="min-w-0 self-center" aria-label="Selected interface work">
          <div class="relative aspect-4/3 overflow-hidden rounded-lg border border-[#aea89a] bg-black dark:border-[#696b62]" role="region" aria-roledescription="carousel" aria-label="Selected interface work">
            <div
              v-for="(slide, index) in heroSlides"
              :key="slide.name"
              :class="['absolute inset-0 transition duration-500', index === activeHeroSlide ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0 pointer-events-none']"
              :aria-hidden="index !== activeHeroSlide"
            >
              <img :src="slide.image" :alt="slide.alt" class="block size-full object-cover object-top" />
            </div>
            <div class="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/75 to-transparent px-3 pt-10 pb-3">
              <p class="font-mono text-[.64rem] tracking-[.04em] text-white uppercase">{{ heroSlides[activeHeroSlide].name }}</p>
              <p class="font-mono text-[.64rem] tracking-[.04em] text-white/75">{{ activeHeroSlide + 1 }} / {{ heroSlides.length }}</p>
            </div>
            <button type="button" class="absolute top-1/2 left-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/45 text-white transition hover:border-[#60a5fa] hover:bg-[#2563eb]" aria-label="Show previous interface" @click="showPreviousHeroSlide">
              <ChevronLeft :size="18" aria-hidden="true" />
            </button>
            <button type="button" class="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/45 text-white transition hover:border-[#60a5fa] hover:bg-[#2563eb]" aria-label="Show next interface" @click="showNextHeroSlide">
              <ChevronRight :size="18" aria-hidden="true" />
            </button>
          </div>
          <div class="flex items-center justify-between pt-3">
            <p class="font-mono text-[.64rem] tracking-[.04em] text-[#76756d] uppercase dark:text-[#a8a49a]">Selected interface work</p>
            <div class="flex gap-1.5" aria-label="Select interface preview">
              <button v-for="(slide, index) in heroSlides" :key="slide.name" type="button" :class="['h-1.5 rounded-full transition-all', index === activeHeroSlide ? 'w-5 bg-[#2563eb]' : 'w-1.5 bg-[#d4d4d4] hover:bg-[#737373] dark:bg-[#525252] dark:hover:bg-[#a3a3a3]']" :aria-label="`Show ${slide.name}`" :aria-current="index === activeHeroSlide ? 'true' : undefined" @click="activeHeroSlide = index"></button>
            </div>
          </div>
        </aside>
      </div>

    </header>

    <main id="content" class="mt-5 grid gap-5">
      <SectionCard
        id="websites"
        eyebrow="Website showcase"
        title="Recent work"
      >
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article v-for="site in websites" :key="site.name" class="group flex min-w-0 flex-col overflow-hidden rounded-md border border-[#d6d1c5] bg-white shadow-sm dark:border-[#40433d] dark:bg-[#242622]">
            <div :class="['relative grid aspect-video min-h-0 place-items-center overflow-hidden bg-[#20221f] dark:bg-[#111210]', site.previewClass]">
              <div v-if="site.previewEmbed" class="relative size-full overflow-hidden bg-[#20221f] dark:bg-[#111210]">
                <iframe
                  :src="site.previewEmbed"
                  :title="`${site.name} live preview`"
                  class="pointer-events-none block size-[400%] origin-top-left scale-[.25] border-0"
                  loading="lazy"
                  tabindex="-1"
                ></iframe>
              </div>
              <img
                v-else-if="site.previewImage"
                :src="site.previewImage"
                :alt="`${site.name} preview`"
                class="block size-full object-cover object-top"
              />
              <span v-else class="font-mono text-[.7rem] text-[#76756d] uppercase dark:text-[#a8a49a]">{{ site.placeholder }}</span>
            </div>
            <div class="grid content-start p-4">
              <p class="text-xs font-semibold text-[#af3f2c] dark:text-[#ed876f]">{{ site.type }}</p>
              <h3 class="mt-1 mb-1 text-lg font-semibold">
                <a class="transition-colors hover:text-[#af3f2c] dark:hover:text-[#ed876f]" :href="site.link" target="_blank" rel="noopener">{{ site.name }}</a>
              </h3>
              <p class="text-sm leading-relaxed text-[#76756d] dark:text-[#a8a49a]">{{ site.stack }}</p>
              <a class="mt-3 w-fit text-sm font-medium text-[#af3f2c] hover:underline dark:text-[#ed876f]" :href="site.link" target="_blank" rel="noopener">
                View live site <ArrowUpRight class="inline-block text-[#af3f2c] dark:text-[#ed876f]" :size="15" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </SectionCard>

      <SectionCard
        id="work"
        eyebrow="Experience"
        title="Experience"
      >
        <div class="grid gap-3">
          <article
            v-for="experience in experiences"
            :key="`${experience.role}-${experience.company}`"
            class="grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-md border border-[#d6d1c5] bg-white p-4 md:grid-cols-[52px_minmax(0,1fr)] dark:border-[#40433d] dark:bg-[#242622]"
          >
            <div class="flex items-start pt-0.5" aria-hidden="true">
              <div class="grid size-9 place-items-center rounded border border-[#aea89a] bg-[#f5e7e2] text-xs font-medium text-[#af3f2c] dark:border-[#696b62] dark:bg-[#392923] dark:text-[#ed876f]">{{ experience.logo }}</div>
            </div>
            <div class="min-w-0">
              <h3 class="mb-1 text-lg leading-tight font-semibold">{{ experience.role }}</h3>
              <p class="mb-2 flex flex-wrap gap-1 text-sm text-[#55554e] dark:text-[#c9c5bb]">
                <span class="font-semibold text-[#1a1b19] dark:text-[#f1eee6]">{{ experience.company }}</span>
                <span class="text-[#76756d] dark:text-[#a8a49a]">/ {{ experience.type }}</span>
              </p>
              <p class="mb-3 text-xs font-medium text-[#af3f2c] dark:text-[#ed876f]">{{ experience.period }}</p>
              <p class="mb-3 max-w-[70ch] text-sm leading-relaxed text-[#55554e] dark:text-[#c9c5bb]">{{ experience.summary }}</p>
              <div v-if="experience.metrics?.length" class="mb-3 flex flex-wrap gap-1.5">
                <span v-for="metric in experience.metrics" :key="metric" class="rounded bg-[#f5e7e2] px-2 py-1 text-xs text-[#812b1d] dark:bg-[#392923] dark:text-[#ffad99]">{{ metric }}</span>
              </div>
              <ul v-if="experience.highlights?.length" class="mb-3 grid max-w-[80ch] list-disc gap-1 pl-5 text-sm leading-relaxed text-[#55554e] marker:text-[#af3f2c] dark:text-[#c9c5bb] dark:marker:text-[#ed876f]">
                <li v-for="highlight in experience.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="stackItem in experience.stack"
                  :key="stackItem"
                  class="rounded border border-[#d6d1c5] px-2 py-1 text-xs text-[#55554e] dark:border-[#40433d] dark:text-[#c9c5bb]"
                >
                  {{ stackItem }}
                </span>
              </div>
            </div>
          </article>
        </div>
        <p class="mt-1 text-sm leading-relaxed text-[#55554e] dark:text-[#c9c5bb]">
          More background and older projects are in the
          <a
            href="https://drive.google.com/file/d/1RBAS5sO7K8FZjDbwp5VJySjnDei6EBra/view?usp=drive_link"
            target="_blank"
            rel="noopener"
            class="text-[#1a1b19] underline decoration-[#af3f2c] underline-offset-3 dark:text-[#f1eee6] dark:decoration-[#ed876f]"
          >
            resume
          </a>.
        </p>
      </SectionCard>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <SectionCard class="min-w-0"
          id="about"
          eyebrow="Services"
          title="What I can help with"
        >
          <div class="flex flex-wrap gap-2">
            <span v-for="service in services" :key="service" class="rounded bg-[#f5e7e2] px-2.5 py-1.5 text-sm text-[#55554e] dark:bg-[#392923] dark:text-[#c9c5bb]">{{ service }}</span>
          </div>
        </SectionCard>

        <SectionCard class="min-w-0"
          id="skills"
          eyebrow="Stack"
          title="Main tools"
        >
          <div class="flex flex-wrap gap-2">
            <span v-for="tool in stackTools" :key="tool" class="rounded bg-[#f5e7e2] px-2.5 py-1.5 text-sm text-[#55554e] dark:bg-[#392923] dark:text-[#c9c5bb]">{{ tool }}</span>
          </div>
        </SectionCard>
      </div>

      <section id="contact" class="scroll-mt-5 border-b border-[#d6d1c5] py-6 md:py-8 dark:border-[#40433d]" aria-labelledby="section-contact">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="grid gap-1.5">
            <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-[#af3f2c] dark:text-[#ed876f]">Contact</p>
            <h2 id="section-contact" class="mb-1 text-2xl font-semibold">Get in touch</h2>
            <p class="text-base font-semibold">Niño Christian Pagaran</p>
            <p class="text-[#55554e] dark:text-[#c9c5bb]">
              <a class="underline decoration-[#af3f2c] underline-offset-4 dark:decoration-[#ed876f]" href="mailto:ninoppagaran@gmail.com">ninoppagaran@gmail.com</a>
            </p>
            <p class="text-[#55554e] dark:text-[#c9c5bb]">
              <a class="underline decoration-[#af3f2c] underline-offset-4 dark:decoration-[#ed876f]" href="tel:+639760234686">+639760234686</a>
            </p>
          </div>
          <div class="grid grid-cols-2 gap-2">
          <a class="rounded border border-[#d6d1c5] bg-white px-3 py-2 text-sm font-medium hover:border-[#af3f2c] hover:text-[#af3f2c] dark:border-[#40433d] dark:bg-[#242622] dark:hover:text-[#ed876f]" href="https://github.com/ninopagaran" target="_blank" rel="noopener">GitHub</a>
          <a class="rounded border border-[#d6d1c5] bg-white px-3 py-2 text-sm font-medium hover:border-[#af3f2c] hover:text-[#af3f2c] dark:border-[#40433d] dark:bg-[#242622] dark:hover:text-[#ed876f]" href="https://www.linkedin.com/in/ninoppagaran/" target="_blank" rel="noopener">LinkedIn</a>
          <a class="rounded border border-[#d6d1c5] bg-white px-3 py-2 text-sm font-medium hover:border-[#af3f2c] hover:text-[#af3f2c] dark:border-[#40433d] dark:bg-[#242622] dark:hover:text-[#ed876f]" href="https://drive.google.com/file/d/1RBAS5sO7K8FZjDbwp5VJySjnDei6EBra/view?usp=drive_link" target="_blank" rel="noopener">Resume</a>
          <a class="rounded border border-[#d6d1c5] bg-white px-3 py-2 text-sm font-medium hover:border-[#af3f2c] hover:text-[#af3f2c] dark:border-[#40433d] dark:bg-[#242622] dark:hover:text-[#ed876f]" href="https://wa.me/639760234686" target="_blank" rel="noopener">WhatsApp</a>
          <button
            v-if="hasContactForm"
            type="button"
            class="rounded border border-[#d6d1c5] bg-white px-3 py-2 text-left text-sm font-medium hover:border-[#af3f2c] hover:text-[#af3f2c] dark:border-[#40433d] dark:bg-[#242622] dark:hover:text-[#ed876f]"
            @click="openContactModal"
            >
              Contact form
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer class="pt-5 text-center text-xs text-[#76756d] dark:text-[#a8a49a]">
      <p>(c) 2026 Niño Christian P. Pagaran</p>
    </footer>

    <div
      v-if="isContactModalOpen && hasContactForm"
      class="fixed inset-0 z-20 grid place-items-center bg-[rgba(20,20,18,.58)] p-5 backdrop-blur-sm dark:bg-black/70"
      @click.self="closeContactModal"
    >
      <div
        class="max-h-[calc(100vh-40px)] w-full max-w-[590px] overflow-y-auto rounded-xl border border-[#aea89a] bg-[#fbfaf6] p-5 shadow-xl sm:p-8 dark:border-[#696b62] dark:bg-[#242622]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div class="mb-6 flex justify-between gap-4">
          <div>
            <p class="font-mono text-[.69rem] font-medium tracking-[.08em] text-[#af3f2c] uppercase dark:text-[#ed876f]">Contact form</p>
            <h2 id="contact-modal-title" class="mt-1.5 font-display text-[2rem] leading-[1] font-semibold">Start a project</h2>
            <p class="mt-3 max-w-[48ch] leading-relaxed text-[#55554e] dark:text-[#c9c5bb]">
              Send the basics. I will reply with next steps, scope, and availability.
            </p>
          </div>
          <button
            type="button"
            class="grid size-9 shrink-0 place-items-center border border-[#aea89a] bg-transparent text-[1.3rem] leading-none transition hover:bg-[#f5e7e2] hover:text-[#812b1d] dark:border-[#696b62] dark:hover:bg-[#392923] dark:hover:text-[#ffad99]"
            aria-label="Close contact form"
            @click="closeContactModal"
          >
            &times;
          </button>
        </div>

        <form class="grid gap-4" @submit.prevent="submitContactForm">
          <input
            v-model="contactForm.company"
            class="pointer-events-none absolute -left-[9999px] opacity-0"
            type="text"
            name="company"
            tabindex="-1"
            autocomplete="off"
          />

          <div class="grid gap-3.5 sm:grid-cols-2">
            <label class="grid gap-1.5">
              <span class="font-mono text-[.65rem] tracking-[.07em] text-[#76756d] uppercase dark:text-[#a8a49a]">Name</span>
              <input
                v-model.trim="contactForm.name"
                :class="['w-full border border-[#aea89a] bg-[#fffefa] px-3 py-2.5 text-current dark:border-[#696b62] dark:bg-[#181a17]', { 'border-[#b42318] bg-[#fff2f0] dark:border-[#ff9d89] dark:bg-[#3b2522]': contactState.errors.name }]"
                type="text"
                name="name"
                maxlength="80"
                autocomplete="name"
                placeholder="Your name"
              />
              <span v-if="contactState.errors.name" class="text-[.8rem] leading-snug text-[#b42318] dark:text-[#ff9d89]">
                {{ contactState.errors.name }}
              </span>
            </label>

            <label class="grid gap-1.5">
              <span class="font-mono text-[.65rem] tracking-[.07em] text-[#76756d] uppercase dark:text-[#a8a49a]">Email</span>
              <input
                v-model.trim="contactForm.email"
                :class="['w-full border border-[#aea89a] bg-[#fffefa] px-3 py-2.5 text-current dark:border-[#696b62] dark:bg-[#181a17]', { 'border-[#b42318] bg-[#fff2f0] dark:border-[#ff9d89] dark:bg-[#3b2522]': contactState.errors.email }]"
                type="email"
                name="email"
                maxlength="160"
                autocomplete="email"
                placeholder="you@example.com"
              />
              <span v-if="contactState.errors.email" class="text-[.8rem] leading-snug text-[#b42318] dark:text-[#ff9d89]">
                {{ contactState.errors.email }}
              </span>
            </label>
          </div>

          <label class="grid gap-1.5">
            <span class="font-mono text-[.65rem] tracking-[.07em] text-[#76756d] uppercase dark:text-[#a8a49a]">Project</span>
            <input
              v-model.trim="contactForm.project"
              :class="['w-full border border-[#aea89a] bg-[#fffefa] px-3 py-2.5 text-current dark:border-[#696b62] dark:bg-[#181a17]', { 'border-[#b42318] bg-[#fff2f0] dark:border-[#ff9d89] dark:bg-[#3b2522]': contactState.errors.project }]"
              type="text"
              name="project"
              maxlength="120"
              placeholder="Landing page, dashboard, booking app..."
            />
            <span v-if="contactState.errors.project" class="text-[.8rem] leading-snug text-[#b42318] dark:text-[#ff9d89]">
              {{ contactState.errors.project }}
            </span>
          </label>

          <label class="grid gap-1.5">
            <span class="font-mono text-[.65rem] tracking-[.07em] text-[#76756d] uppercase dark:text-[#a8a49a]">Message</span>
            <textarea
              v-model.trim="contactForm.message"
              :class="['w-full resize-y border border-[#aea89a] bg-[#fffefa] px-3 py-2.5 text-current dark:border-[#696b62] dark:bg-[#181a17]', { 'border-[#b42318] bg-[#fff2f0] dark:border-[#ff9d89] dark:bg-[#3b2522]': contactState.errors.message }]"
              name="message"
              rows="5"
              maxlength="3000"
              placeholder="What are you building, what do you need, and when do you need it?"
            ></textarea>
            <span v-if="contactState.errors.message" class="text-[.8rem] leading-snug text-[#b42318] dark:text-[#ff9d89]">
              {{ contactState.errors.message }}
            </span>
          </label>

          <div class="grid gap-2">
            <p class="font-mono text-[.65rem] tracking-[.07em] text-[#76756d] uppercase dark:text-[#a8a49a]">Verification</p>
            <div
              v-if="turnstileSiteKey"
              ref="turnstileContainer"
              class="min-h-[65px]"
            ></div>
            <p v-else class="text-[.8rem] leading-snug text-[#b42318] dark:text-[#ff9d89]">
              Captcha is not configured yet. Add your Turnstile keys before deployment.
            </p>
            <p v-if="turnstileError" class="text-[.8rem] leading-snug text-[#b42318] dark:text-[#ff9d89]">{{ turnstileError }}</p>
            <p v-if="contactState.errors.turnstileToken" class="text-[.8rem] leading-snug text-[#b42318] dark:text-[#ff9d89]">
              {{ contactState.errors.turnstileToken }}
            </p>
          </div>

          <div class="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
            <div class="grid gap-1.5">
              <p class="text-[.84rem] leading-snug text-[#76756d] dark:text-[#a8a49a]">Email goes directly to `ninoppagaran@gmail.com`.</p>
              <p
                v-if="contactState.message"
                :class="[
                  'text-[.84rem] leading-snug',
                  contactState.status === 'success' ? 'text-[#812b1d] dark:text-[#ffad99]' : 'text-[#b42318] dark:text-[#ff9d89]',
                ]"
              >
                {{ contactState.message }}
              </p>
            </div>

            <button
              class="min-w-[150px] border border-[#af3f2c] bg-[#af3f2c] px-4 py-3 font-mono text-[.67rem] tracking-[.04em] text-[#fffaf5] uppercase transition hover:-translate-y-px hover:bg-[#812b1d] disabled:cursor-wait disabled:opacity-55 dark:border-[#ed876f] dark:bg-[#ed876f] dark:text-[#1c1e1b] dark:hover:bg-[#ffad99]"
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

    <div
      v-if="isProfileImageOpen"
      class="fixed inset-0 z-30 grid place-items-center bg-black/90 p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Profile picture preview"
      @click.self="closeProfileImage"
    >
      <button type="button" class="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close profile picture preview" @click="closeProfileImage">
        <X :size="21" aria-hidden="true" />
      </button>
      <img :src="profilePhoto" alt="Niño Christian Pagaran" class="max-h-[88vh] max-w-[92vw] rounded-md object-contain shadow-2xl" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { ArrowUpRight, ChevronLeft, ChevronRight, Moon, Sun, X } from "@lucide/vue";
import attendsPreview from "./assets/attends-preview.png";
import foodtruckPreview from "./assets/foodtruck-microlink.png";
import kleoPreview from "./assets/kleo-paid-trial-preview.png";
import missiontoolsPreview from "./assets/missiontools-preview.png";
import takeUpDeltaPreview from "./assets/take-up-delta-preview.png";
import heroImage03 from "./assets/hero/hero-03.png";
import profilePhoto from "./assets/nino-pagaran.jpg";
import SectionCard from "./components/SectionCard.vue";

const activeHeroSlide = ref(0);
const isContactModalOpen = ref(false);
const isProfileImageOpen = ref(false);
const turnstileContainer = ref(null);
const turnstileToken = ref("");
const turnstileError = ref("");
const turnstileWidgetId = ref(null);
const turnstileScriptReady = ref(false);
let turnstileScriptPromise;
let heroSlideTimer;
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

function showNextHeroSlide() {
  activeHeroSlide.value = (activeHeroSlide.value + 1) % heroSlides.length;
}

function showPreviousHeroSlide() {
  activeHeroSlide.value = (activeHeroSlide.value - 1 + heroSlides.length) % heroSlides.length;
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

function openProfileImage() {
  isProfileImageOpen.value = true;
}

function closeProfileImage() {
  isProfileImageOpen.value = false;
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    if (isProfileImageOpen.value) {
      closeProfileImage();
      return;
    }

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
  heroSlideTimer = window.setInterval(showNextHeroSlide, 4500);
  window.addEventListener("keydown", handleEscapeKey);
});

onBeforeUnmount(() => {
  window.clearInterval(heroSlideTimer);
  window.removeEventListener("keydown", handleEscapeKey);
  document.body.style.overflow = "";
});

watch([isContactModalOpen, isProfileImageOpen], ([isContactOpen, isProfileOpen]) => {
  document.body.style.overflow = isContactOpen || isProfileOpen ? "hidden" : "";
});

watch(isContactModalOpen, (isOpen) => {

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
    summary: "Worked on AI workflow prototypes, full-stack product features, and packaged web deliverables.",
    metrics: ["Local-first AI subtitles", "SwiftUI + FastAPI app", "CI + pre-push checks"],
    highlights: [
      "Built a Traditional Chinese subtitle PoC covering STT, context injection, SRT export, run history, caching, and oversized-file handling.",
      "Built a reptile care platform with auth, pet profiles, care records, feeding plans, media, community features, AI-assisted care, and commerce flows.",
      "Set up migrations, diagnostics, linting, formatting, automated tests, smoke checks, Makefile tasks, and bilingual product specs.",
    ],
    stack: ["Python", "Gradio", "SQLite", "OpenAI", "Groq", "SwiftUI", "FastAPI"],
  },
  {
    logo: "SL",
    role: "Full-Stack Developer",
    company: "Strixen Limited (Mission Tools App)",
    type: "Contract",
    period: "Nov 2025 – Mar 2026",
    summary: "Built a mobile-first Nuxt/Vue app and backend flows for dashboards, media access, and billing.",
    metrics: ["Mobile-first SPA", "Dashboard + billing flows", "API-backed media access"],
    highlights: [
      "Built product interfaces for dashboards, playback, account access, and billing with Nuxt 4 and Vue 3.",
      "Implemented backend workflows with Bun, Hono, and Drizzle ORM for application state, data access, and operations.",
      "Improved release quality, deployment behavior, and app structure across frontend and backend.",
    ],
    stack: ["Nuxt", "Vue 3", "Bun", "Hono", "Drizzle ORM"],
  },
  {
    logo: "FW",
    role: "Freelance Full-Stack Developer",
    company: "Independent / Client Work",
    type: "Freelance",
    period: "Jul 2023 – Dec 2025",
    summary: "Built and deployed web apps for small businesses, tools, and campus projects.",
    metrics: ["Custom business websites", "Internal tools", "Automation workflows"],
    highlights: [
      "Delivered custom websites, admin tools, and product interfaces based on client needs.",
      "Implemented authentication, REST APIs, database-backed features, and automation flows for content, operations, and user management.",
      "Handled delivery from planning and UI work through backend integration, deployment, and client iteration.",
    ],
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "n8n", "Supabase"],
  },
  {
    logo: "BA",
    role: "Web Development Intern",
    company: "Bayoa Analytics Engineering",
    type: "Internship",
    period: "Sep – Nov 2024",
    summary: "Worked on internal dashboards and data-layer improvements for analytics products.",
    metrics: ["Internal dashboards", "Schema migration work", "Analytics interfaces"],
    highlights: [
      "Built dashboard and analytics interface features with a focus on maintainable frontend structure and data presentation.",
      "Contributed to schema migration work from Prisma to Drizzle ORM for clearer backend structure and maintainability.",
      "Worked inside an engineering setup with internal tooling, relational modeling, and shared standards.",
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

const websites = [
  {
    name: "Take Up Delta",
    type: "Community marketplace",
    placeholder: "",
    previewClass: "preview--image",
    previewEmbed: "",
    previewImage: takeUpDeltaPreview,
    stack: "Live web app",
    link: "https://take-up-delta.vercel.app/",
  },
  {
    name: "SourceChat",
    type: "Private workspace",
    placeholder: "",
    previewClass: "preview--image",
    previewEmbed: "",
    previewImage: kleoPreview,
    stack: "Live web app",
    link: "https://kleo-paid-trial.vercel.app/",
  },
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
    name: "Product dashboard",
    image: heroImage03,
    alt: "A dark dashboard interface shown as a sample of Niño's product work",
  },
  {
    name: "SourceChat",
    image: kleoPreview,
    alt: "The SourceChat private workspace access screen",
  },
  {
    name: "Food Truck Community",
    image: foodtruckPreview,
    alt: "A booking platform interface for Food Truck Community",
  },
  {
    name: "MissionTools",
    image: missiontoolsPreview,
    alt: "A MissionTools operations dashboard interface",
  },
  {
    name: "Attends",
    image: attendsPreview,
    alt: "An attendance platform interface",
  },
];

</script>
