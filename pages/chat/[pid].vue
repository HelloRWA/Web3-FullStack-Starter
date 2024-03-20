<script setup lang="ts">
import type { Mail } from '~/types'

const tabItems = [{
  label: 'All'
}, {
  label: 'Unread'
}]
const selectedTab = $ref(0)

const dropdownItems = [[{
  label: 'Mark as unread',
  icon: 'i-heroicons-check-circle'
}, {
  label: 'Mark as important',
  icon: 'i-heroicons-exclamation-circle'
}], [{
  label: 'Star thread',
  icon: 'i-heroicons-star'
}, {
  label: 'Mute thread',
  icon: 'i-heroicons-pause-circle'
}]]

// const { data: mails } = await useFetch<Mail[]>('/api/mails', { default: () => [] })

const { stateArr: mails } = $(inboxStore())

// Filter mails based on the selected tab
const filteredMails = $computed(() => {
  if (selectedTab === 1) {
    return mails.filter(mail => !!mail.unread)
  }

  return mails
})

let selectedMail = $ref<Mail | null>()

const isMailPanelOpen = computed({
  get() {
    return !!selectedMail
  },
  set(value: boolean) {
    if (!value) {
      selectedMail = null
    }
  }
})

watchEffect(() => {
  if (!filteredMails?.find(mail => mail.id === selectedMail?.id)) {
    selectedMail = null
  }
})

</script>

<template>
  <div>
    test
  </div>
</template>
