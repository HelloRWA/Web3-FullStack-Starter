import { useStorage } from '@vueuse/core'

export const aoStore = defineStore('aoStore', () => {
  const state = $(useStorage('aoStore', { }))


  return $$({ topicMap, items })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))
