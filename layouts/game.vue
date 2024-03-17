<script setup lang="ts">

</script>

<template>
  <UPage>
    <div>
      <slot />
    </div>
    <template #right>
      <UAside>
        right
      </UAside>
    </template>
  </UPage>
</template>
