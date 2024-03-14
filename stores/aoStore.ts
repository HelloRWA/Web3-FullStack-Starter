import { useStorage } from '@vueuse/core'

export const aoStore = defineStore('aoStore', () => {
  const state = $(useStorage('aoStore', { }))

  const add = async (name, pid) => {
    if (state[pid]) {
      return {
        err: 'alreadyExist',
        msg: 'Already Exist'
      }
    }

    state[pid] = {
      name,
      createdAt: new Date()
    }
    return true
  }

  return $$({ state, add})
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))
