<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'
import { nextTick } from 'vue'
import { useElementVisibility, watchDebounced } from '@vueuse/core'

const { mail } = $defineProps<{
  mail: Mail,
}>()

const msgTop = ref(null)
const msgTopIsVisible = useElementVisibility(msgTop)

// load this process data list
// send msg
// auto load new message for this process and other process, so we can show last unread message on the left sidebar msg list
const { sendMessage, loadInboxList, itemsCache } = $(inboxStore())
const { showSuccess } = $(notificationStore())
const { address } = $(arweaveWalletStore())

const msgBottom = $ref(null)
let msg = $ref('')
let isLoading = $ref(false)

const loadedItemsCount = $computed(() => Object.keys(itemsCache[mail.id]).length)
const scrollToBottom = () => {
  nextTick(() => {
    msgBottom.scrollIntoView({ behavior: 'smooth' })
  })
}

const doSubmit = async () => {
  if (isLoading) return
  isLoading = true

  // show pending status
  itemsCache[mail.id][999999] = {
    id: 999999,
    isPending: true,
    Timestamp: Date.now(),
    From: address,
    Data: msg,
  }
  scrollToBottom()

  await sendMessage(mail.id, msg)
  showSuccess('Send message successed!')
  isLoading = false
  msg = ''
  await loadInboxList(mail.id)
  scrollToBottom()
}

let isTopLoading = $ref(false)

watchDebounced(msgTopIsVisible, async () => {
  if (!msgTopIsVisible.value || isTopLoading || loadedItemsCount === 0) return

  isTopLoading = true
  await loadInboxList(mail.id, 10, false)
  isTopLoading = false
})

defineShortcuts({
  meta_enter: {
    usingInput: 'msg',
    handler: doSubmit
  }
})

</script>

<template>
  <UDashboardPanelContent>
    <div class="-m-4 -top-4 z-99 sticky">
      <div class="bg-background flex  p-4  justify-between  ">
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

      <UDivider class="" />
    </div>
    <div ref="msgTop" class="my-5">
      &nbsp;
      <div v-show="isTopLoading" class="flex py-10 items-center justify-center">
        <Loading class="h-8 w-8" />
      </div>
    </div>
    <div class="flex-1 min-h-50">
      <InboxListMessage :id="mail.id" @loaded="scrollToBottom" />
    </div>
    <div class="my-5" ref="msgBottom"> </div>
    <div class="-bottom-4 sticky">
      <form @submit.prevent="doSubmit">
        <UTextarea :disabled="isLoading" v-model="msg" name="msg" color="gray" required size="xl" :rows="5" :placeholder="`Reply to ${mail.name}`">
          <!-- <Loading v-show="isLoading" class="h-8 top-1/2 left-1/2 w-8 absolute" /> -->
          <UButton :disabled="isLoading" type="submit" color="black" label="Send" icon="i-heroicons-paper-airplane" class="right-3.5 bottom-2.5 absolute">
          </UButton>
        </UTextarea>
      </form>
    </div>
  </UDashboardPanelContent>
</template>
