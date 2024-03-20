<script setup lang="ts">
const appConfig = useAppConfig()
appConfig.ui.gray = 'green'
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