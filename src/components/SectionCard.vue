<template>
  <section class="scroll-mt-5 border-b border-[#d6d1c5] py-6 last:border-b-0 md:py-8 dark:border-[#40433d]" :aria-labelledby="titleId">
    <header class="mb-5">
      <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-[#af3f2c] dark:text-[#ed876f]">{{ eyebrow }}</p>
      <h2 :id="titleId" class="text-2xl font-semibold tracking-tight">{{ title }}</h2>
      <p v-if="subtitle" class="mt-2 text-sm text-[#55554e] leading-relaxed dark:text-[#c9c5bb]">{{ subtitle }}</p>
    </header>
    <slot />
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
});

const titleId = computed(() =>
  `section-${props.title.toLowerCase().replace(/\s+/g, "-")}`
);
</script>
