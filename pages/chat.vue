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
  <UPage>
    <UContainer>
      <UPageGrid>
        <UAside class="border rounded-md  border-1 border-gray-600">
          <UDashboardNavbar title="Inbox" :badge="filteredMails.length">
            <template #center v-if="false">
              <UTabs v-model="selectedTab" :items="tabItems" :ui="{ wrapper: '', list: { height: 'h-9', tab: { height: 'h-7', size: 'text-[13px]' } } }" />
            </template>
            <template #right>
              <InboxNewBtn />
            </template>
          </UDashboardNavbar>
          <InboxList v-model="selectedMail" :mails="filteredMails" />
        </UAside>
        <div class="flex xl:col-span-2">
          <div v-if="selectedMail" class="w-full">
            <UDashboardNavbar v-if="false">
              <template #toggle>
                <UDashboardNavbarToggle icon="i-heroicons-x-mark" />

                <UDivider orientation="vertical" class="mx-1.5 lg:hidden" />
              </template>

              <template #left>
                <UTooltip text="Archive">
                  <UButton icon="i-heroicons-archive-box" color="gray" variant="ghost" />
                </UTooltip>

                <UTooltip text="to Move junk">
                  <UButton icon="i-heroicons-archive-box-x-mark" color="gray" variant="ghost" />
                </UTooltip>

                <UDivider orientation="vertical" class="mx-1.5" />

                <UPopover :popper="{ placement: 'bottom-start' }">
                  <template #default="{ open }">
                    <UTooltip text="Snooze" :prevent="open">
                      <UButton icon="i-heroicons-clock" color="gray" variant="ghost" :class="[open && 'bg-gray-50 dark:bg-gray-800']" />
                    </UTooltip>
                  </template>

                  <template #panel="{ close }">
                    <DatePicker @close="close" />
                  </template>
                </UPopover>
              </template>

              <template #right>
                <UTooltip text="Reply">
                  <UButton icon="i-heroicons-arrow-uturn-left" color="gray" variant="ghost" />
                </UTooltip>

                <UTooltip text="Forward">
                  <UButton icon="i-heroicons-arrow-uturn-right" color="gray" variant="ghost" />
                </UTooltip>

                <UDivider orientation="vertical" class="mx-1.5" />

                <UDropdown :items="dropdownItems">
                  <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" />
                </UDropdown>
              </template>
            </UDashboardNavbar>

            <InboxMail :mail="selectedMail" />
          </div>
          <UMain v-else class="flex-1 hidden items-center justify-center lg:flex">
            <UIcon name="i-heroicons-inbox" class="h-32 text-gray-400 w-32 dark:text-gray-500" />
          </UMain>
        </div>
      </UPageGrid>
    </UContainer>
  </UPage>
</template>
