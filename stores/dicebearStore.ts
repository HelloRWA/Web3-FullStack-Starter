import { createAvatar } from '@dicebear/core'
import { botttsNeutral } from '@dicebear/collection'

export const dicebearStore = defineStore('dicebearStore', () => {
  const state = $(lsItemRef('dicebearCache', {}))

  const getAvatar = seed => {
    if (state[seed]) {
      return state[seed]
    }

    const avatar =  createAvatar(botttsNeutral, {
      seed,
      backgroundColor: ['#a3e635', '#34d399', '#2dd4bf', '#38bdf8', '#818cf8', '#fb7185'],
    })
    state[seed] = avatar.toDataUriSync(); 

    return state[seed]
  }

  return $$({ getAvatar })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(dicebearStore, import.meta.hot))
