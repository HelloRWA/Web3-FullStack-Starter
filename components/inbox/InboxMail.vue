<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'

const { mail } = $defineProps<{
  mail: Mail,
}>()

// load this process data list
// send msg
// auto load new message for this process and other process, so we can show last unread message on the left sidebar msg list
const { sendMessage, loadInboxList } = $(aoStore())
const { showSuccess } = $(msgStore())

let msg = $ref('')
let isLoading = $ref(false)
const doSubmit = async () => {
  if (isLoading) return
  isLoading = true
  const rz = await sendMessage(mail.id, msg)
  showSuccess('Send message successed!')
  isLoading = false
  msg = ''
  await loadInboxList(mail.id)
}

defineShortcuts({
  meta_enter: {
    usingInput: 'msg',
    handler: doSubmit
  }
})

</script>

<template>
  <UDashboardPanelContent>
    <div class="flex justify-between">
      <div class="flex gap-4 items-center">
        <DicebearAvatar :seed="mail.id" :alt="mail.name" size="lg" />

        <div class="min-w-0">
          <p class="font-semibold text-gray-900 dark:text-white">
            {{ mail.name }}
          </p>
          <p class="font-medium text-gray-500 dark:text-gray-400">
            {{ mail.id }}
          </p>
        </div>
      </div>

      <p class="font-medium text-gray-900 dark:text-white">
        {{ isToday(new Date(mail.createdAt)) ? format(new Date(mail.createdAt), 'HH:mm') : format(new Date(mail.createdAt), 'dd MMM') }}
      </p>
    </div>

    <UDivider class="my-5" />

    <div class="flex-1">
      <InboxListMessage :id="mail.id" />
    </div>

    <UDivider class="my-5" />

    <form :disabled="isLoading" @submit.prevent="doSubmit">
      <UTextarea :disabled="isLoading" v-model="msg" name="msg" color="gray" required size="xl" :rows="5" :placeholder="`Reply to ${mail.name}`">
        <UIcon v-show="isLoading" name="i-line-md-loading-twotone-loop" class="h-8 top-1/2 left-1/2 w-8 absolute" dynamic />
        <UButton :disabled="isLoading" type="submit" color="black" label="Send" icon="i-heroicons-paper-airplane" class="right-3.5 bottom-2.5 absolute">
        </UButton>
      </UTextarea>
    </form>
  </UDashboardPanelContent>
</template>
