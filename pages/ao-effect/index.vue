<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const fileRef = ref<{ input: HTMLInputElement }>()
const isDeleteAccountModalOpen = ref(false)

const state = reactive({
  name: 'Benjamin Canac',
  email: 'ben@nuxtlabs.com',
  username: 'benjamincanac',
  avatar: '',
  bio: '',
  password_current: '',
  password_new: ''
})

const toast = useToast()

function validate(state: any): FormError[] {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Please enter your name.' })
  if (!state.email) errors.push({ path: 'email', message: 'Please enter your email.' })
  if ((state.password_current && !state.password_new) || (!state.password_current && state.password_new)) errors.push({ path: 'password', message: 'Please enter a valid password.' })
  return errors
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  state.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick() {
  fileRef.value?.input.click()
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  toast.add({ title: 'Profile updated', icon: 'i-heroicons-check-circle' })
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <ULandingGrid>
      <ULandingCard v-for="item in 10" class="col-span-3 row-span-2" icon="i-heroicons-swatch" :title="`Game Name ${item}`" :description="`Game ID ${item}`">
        <UProgress />
      </ULandingCard>
    </ULandingGrid>
  </UDashboardPanelContent>
</template>
