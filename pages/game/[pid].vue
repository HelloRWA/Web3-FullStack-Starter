<script setup lang="ts">
definePageMeta({
  layout: 'game',
})

const route = useRoute()
const pid = $computed(() => route.params.pid)
</script>

<template>
  <div class="h-full bg-green-400 w-auto max-w-4/5 overflow-scroll">
    <GameWarGround :pid="pid" />
  </div>
</template>
