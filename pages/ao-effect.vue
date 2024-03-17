<script setup lang="ts">
const links = [[{
  label: 'Hall',
  icon: 'i-streamline-city-hall-solid',
  to: '/ao-effect',
  exact: true
}, {
  label: 'Ranking',
  icon: 'i-fa6-solid-ranking-star',
  to: '/ao-effect/ranking'
}, {
  label: 'Setting',
  icon: 'i-material-symbols-settings-rounded',
  to: '/ao-effect/setting'
}]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="AO Effect" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
