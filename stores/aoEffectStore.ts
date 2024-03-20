
export const aoEffectStore = defineStore('aoEffectStore', () => {
  // const state = $(lsItemRef('aoEffectStore', {}))
  const state = $ref({})

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
    let betOnTotalAmount = 0
    let betOnAmountList = {}
    let betOnList = {}

    if (Object.keys(rz.Players).length > 0) {
      players = rz.Players
      // const { x, y } = players[Object.keys(players)[0]]
      // console.log(`====> x, y :`, x, y)
    }
    if (Object.keys(rz.Waiting).length > 0) {
      waiting = rz.Waiting
      // console.log(`====> waiting :`, waiting)
    }
    timeRemaining = rz?.TimeRemaining
    gameMode = rz?.GameMode
    betOnTotalAmount = rz?.BetOnTotalAmount
    betOnAmountList = rz?.BetOnAmountList
    betOnList = rz?.betOnList
    console.log(`====> betOnTotalAmount :`, betOnTotalAmount)
    state[process] = {
      players,
      waiting,
      timeRemaining,
      gameMode,
      betOnTotalAmount,
      betOnAmountList,
      betOnList
    }
  }

  return $$({ getGameState, state })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoEffectStore, import.meta.hot))
