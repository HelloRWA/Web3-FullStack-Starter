<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Mail } from '~/types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Mail | null>,
    default: null
  },
  mails: {
    type: Array as PropType<Mail[]>,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const mailsRefs = ref<Element[]>([])

const selectedMail = computed({
  get() {
    return props.modelValue
  },
  set(value: Mail | null) {
    emit('update:modelValue', value)
  }
})

watch(selectedMail, () => {
  if (!selectedMail.value) {
    return
  }

  const ref = mailsRefs.value[selectedMail.value.id]
  if (ref) {
    ref.scrollIntoView({ block: 'nearest' })
  }
})

defineShortcuts({
  arrowdown: () => {
    const index = props.mails.findIndex((mail) => mail.id === selectedMail.value?.id)

    if (index === -1) {
      selectedMail.value = props.mails[0]
    } else if (index < props.mails.length - 1) {
      selectedMail.value = props.mails[index + 1]
    }
  },
  arrowup: () => {
    const index = props.mails.findIndex((mail) => mail.id === selectedMail.value?.id)

    if (index === -1) {
      selectedMail.value = props.mails[props.mails.length - 1]
    } else if (index > 0) {
      selectedMail.value = props.mails[index - 1]
    }
  }
})
// @click="selectedMail = mail"

const route = useRoute()
watchEffect(() => {
  if (!route.params.pid) return

  const index = props.mails.findIndex((mail) => mail.id === route.params.pid)

  selectedMail.value = props.mails[index]
})

</script>

<template>
  <UDashboardPanelContent class="p-0">
    <div v-for="(mail, index) in mails" :key="index" :ref="el => { mailsRefs[mail.id] = el as Element }">
      <NuxtLink class="cursor-pointer border-l-2 text-sm p-4 block" :class="[
      mail.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300',
      selectedMail && selectedMail.id === mail.id ? 'border-primary-500 dark:border-primary-400 bg-primary-100 dark:bg-primary-900/25' : 'border-white dark:border-gray-900 hover:border-primary-500/25 dark:hover:border-primary-400/25 hover:bg-primary-100/50 dark:hover:bg-primary-900/10'
    ]" :to="`/chat/${mail.id}`">
        <div class="flex items-center justify-between" :class="[mail.unread && 'font-semibold']">
          <div class="flex gap-3 items-center">
            {{ mail.name }}

            <UChip v-if="mail.unread" />
          </div>

          <span>{{ isToday(new Date(mail.latestMsgTime)) ? format(new Date(mail.latestMsgTime), 'HH:mm') : format(new Date(mail.latestMsgTime), 'dd MMM') }}</span>
        </div>
        <p :class="[mail.unread && 'font-semibold']">
          {{ mail.id }}
        </p>
        <p class="text-gray-400 line-clamp-1 dark:text-gray-500">
          {{ mail.body }}
        </p>
      </NuxtLink>

      <UDivider />
    </div>
  </UDashboardPanelContent>
</template>
