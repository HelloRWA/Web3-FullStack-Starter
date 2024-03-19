<script setup lang="ts">
const modules = [{
  title: '1. Deposit',
  description: 'Deposit 1 CRED, Get 1 $AO.',
  to: '#deposit',
  icon: 'i-system-uicons-swap'
}, {
  title: '2. Stake',
  description: 'Stake $AO in the Arena, grant vote permission and profit share.',
  to: '#stake',
  icon: 'i-icon-park-twotone-arena'
}, {
  title: '3. Bet',
  description: 'Bet on your AO, win to get reward.',
  to: '#bet',
  icon: 'i-fluent-emoji-high-contrast-game-die'
}]
</script>

<template>
  <UPageGrid>
    <UPageCard v-for="(module, index) in modules" :key="index" v-bind="module">
      <template #description>
        <span class="line-clamp-2">{{ module.description }}</span>
      </template>
    </UPageCard>
  </UPageGrid>
</template>
