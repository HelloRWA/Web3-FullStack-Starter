<script setup lang="ts">
definePageMeta({
  layout: 'game',
})

const route = useRoute()
const pid = $computed(() => route.params.pid)
</script>

<template>
  <div class="flex h-full bg-green-400 w-full overflow-scroll justify-center items-center">
    <GameWarGround :pid="pid" />
  </div>
</template>
