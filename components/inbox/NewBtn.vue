<script setup lang="ts">
let isShowNewModal = $ref(false)
const state = reactive({
  name: undefined,
  checkbox: false,
  // pid: undefined,
  pid: 'U1HFLMW0ZykPip03efMNpUpWcDlzkdxXwtoKZrOzhEA',
})

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Please enter a name.' })
  if (!state.pid) errors.push({ path: 'pid', message: 'Please enter your process id.' })

  return errors
}

const canSubmit = $computed(() => state.name && state.checkbox && state.pid)
const { add } = $(aoStore())
const { showError, showSuccess } = $(notificationStore())

async function onSubmit(event: FormSubmitEvent<any>) {
  const { name, pid } = event.data
  const rz = await add(name, pid)
  if (rz.err) {
    showError(rz.msg)
    return
  }
  isShowNewModal = false
  showSuccess('Add successed')
}
</script>
<template>
  <div>
    <UButton color="white" variant="solid" icon="i-heroicons-plus" @click="isShowNewModal = true">New</UButton>
    <UDashboardModal v-model="isShowNewModal" title="New Process" description="Add a process to your inbox" :ui="{ width: 'sm:max-w-md' }">
      <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" placeholder="Your process name" autofocus />
        </UFormGroup>
        <UFormGroup label="PID" name="pid">
          <UInput v-model="state.pid" placeholder="Your process id" />
        </UFormGroup>
        <UFormGroup name="checkbox" label="">
          <UCheckbox v-model="state.checkbox" label="I have loaded inbox.lua">
          </UCheckbox>
          <div class="text-sm pt-2 pl-7">
            Instructions: <a href="https://github.com/mayurmarvel/aos-unbox/blob/main/README.md" class="underline" target="_blank">Click Here</a>
          </div>
        </UFormGroup>
        <div class=" flex gap-3 justify-end">
          <UButton label="Cancel" color="gray" variant="ghost" @click="isShowNewModal = false" />
          <UButton type="submit" label="Save" color="primary" :disabled="!canSubmit" />
        </div>
      </UForm>
    </UDashboardModal>
  </div>
</template>