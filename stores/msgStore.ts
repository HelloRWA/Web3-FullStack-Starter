export const msgStore = defineStore('msgStore', () => {
  const toast = useToast()
  const showError = description => {
    toast.add({ title: 'Error', description, icon: 'i-heroicons-x-circle-16-solid', color: 'red' })
  }
  const showSuccess = description => {
    toast.add({ title: 'Successed', description, icon: 'i-heroicons-check-circle', color: 'green' })
  }

  return $$({ showError, showSuccess })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(msgStore, import.meta.hot))
