<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'AO Arena DAO'
const description = 'AO Arena DAO.'

useSeoMeta({
  title,
  description,
  titleTemplate: '%s - AO Arena DAO',
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://github.com/HelloRWA/Web3-FullStack-Starter/raw/main/screenshots/home.png',
  twitterImage: 'https://github.com/HelloRWA/Web3-FullStack-Starter/raw/main/screenshots/home.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
  </div>
</template>
