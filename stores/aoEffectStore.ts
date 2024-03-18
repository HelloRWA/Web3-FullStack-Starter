
export const aoEffectStore = defineStore('aoEffectStore', () => {
  const state = $(lsItemRef('aoEffectStore', {}))

  const { getData } = $(aoStore())
  const getGameState = async (process) => {
    const rz = await getData({ process, Action: 'GetGameState' }, { Action: 'GameState', Type: 'Message' })

     if (!rz) {
      return
     }
    let players = {}
    let waiting = {}
    let timeRemaining = 0
    let gameMode = ''

    if (Object.keys(rz.Players).length > 0) {
      players = rz.Players
      // const { x, y } = players[Object.keys(players)[0]]
      // console.log(`====> x, y :`, x, y)
    }
    if (Object.keys(rz.Waiting).length > 0) {
      waiting = rz.Waiting
      // console.log(`====> waiting :`, waiting)
    }
    timeRemaining = rz.TimeRemaining
    gameMode = rz.GameMode
    console.log(`====> timeRemaining, gameMode :`, timeRemaining, gameMode)
    state[process] = {
      players,
      waiting,
      timeRemaining,
      gameMode,
    }
  }

  return $$({ getGameState, state })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoEffectStore, import.meta.hot))
