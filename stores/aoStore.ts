import { useStorage } from '@vueuse/core'

export const aoStore = defineStore('aoStore', () => {
  const state = $(useStorage('aoStore', {}))
  const stateArr = $computed(() => {
    return Object.keys(state).map(id => {
      return {
        ...state[id],
        id,
     }
    })
  })

  const add = async (name, id) => {
    if (state[id]) {
      return {
        err: 'alreadyExist',
        msg: 'Already Exist'
      }
    }

    state[id] = {
      name,
      latestMsgTime: new Date(),
      createdAt: new Date()
    }
    return true
  }

  return $$({ state, stateArr, add})
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))
