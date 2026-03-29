<template>
  <section class="section" :aria-labelledby="titleId">
    <header class="section-header">
      <p class="section-eyebrow">{{ eyebrow }}</p>
      <h2 :id="titleId" class="section-title">{{ title }}</h2>
      <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    </header>
    <div class="section-body">
      <slot />
    </div>
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
