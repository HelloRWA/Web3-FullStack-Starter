<script setup lang="ts">
const modules = [{
  title: '1. Deposit',
  description: 'Collection of essential Vue Composition Utilities for Vue 2 and 3.',
  to: '#deposit',
  icon: 'i-system-uicons-swap'
}, {
  title: '2. Stake',
  description: 'ESLint module for Nuxt.',
  to: '#stake',
  icon: 'i-icon-park-twotone-arena'
}, {
  title: '3. Bet',
  description: 'Add Tailwind CSS to your Nuxt application in seconds with PurgeCSS included for minimal CSS.',
  to: '#bet',
  icon: 'i-fluent-emoji-high-contrast-game-die'
}]
</script>

<template>
  <UPageGrid>
    <UPageCard v-for="(module, index) in modules" :key="index" v-bind="module" target="_blank">
      <template #description>
        <span class="line-clamp-2">{{ module.description }}</span>
      </template>
    </UPageCard>
  </UPageGrid>
</template>
