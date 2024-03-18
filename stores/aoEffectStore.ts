
export const aoEffectStore = defineStore('aoEffectStore', () => {
  const { getData } = $(aoStore())
  const getGameState = async (process) => {
    const rz = await getData({process, action: 'GetGameState'})
    console.log(`====> rz :`, rz)
  }

  return $$({ getGameState  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoEffectStore, import.meta.hot))
