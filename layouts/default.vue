<script setup lang="ts">
const appConfig = useAppConfig()
appConfig.ui.gray = 'cool'
</script>

<template>
  <div>
    <Header />
    <UMain>
      <slot />
    </UMain>
    <Footer />
  </div>
</template>