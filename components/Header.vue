<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Deposit',
    to: '/deposit'
  },
  {
    label: 'Stake',
    to: '/stake'
  },
  {
    label: 'Arena',
    to: '/arena'
  },
  {
    label: 'Chat',
    to: '/chat'
  },
  // {
  //   label: 'About',
  //   to: '/about'
  // }
]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      AO Arena
      <UBadge label="DAO" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <!-- <UButton label="Sign in" color="gray" to="/login" />
      <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup" class="hidden lg:flex" /> -->
      <ArWallet />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
