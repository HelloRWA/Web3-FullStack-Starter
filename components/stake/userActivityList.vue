<script setup lang="ts">
const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'User name'
}, {
  key: 'title',
  label: 'Job position'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role'
}]

const items = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]

const pending = $ref(false)
</script>
<template>
  <UTable :columns="columns" :rows="items" :loading="pending" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }" class="w-full">
    <template #name-data="{ row }">
      <div class="flex items-center">
        <UAvatar size="sm" :src="row.avatar" :alt="row.name" class="mr-2" />
        {{ row.name }}
      </div>
    </template>
    <template #link-data="{ row }">
      <a :href="row.link" class="truncate hover:text-primary" target="_blank">{{ row.link }}</a>
    </template>

    <template #created_at-data="{ row }">
      <TimeAgo :time="row.created_at" />
    </template>
  </UTable>
</template>