import { createDataItemSigner, result,
  results,
  message,
  spawn,
  monitor,
  unmonitor,
  dryrun } from '@permaweb/aoconnect'

export const aoStore = defineStore('aoStore', () => {
  const itemsCache = {}
  const state = $(lsItemRef('aoStore', {}))
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

  const remove = async (id) => {
    delete state[id]
  }

  const loadList = async (id) => {
    if (itemsCache[id]) {
      return itemsCache[id]
    }
    let items = []
    const rz = await results({
      process: id,
      sort: 'DESC',
      limit: 25,
    })

    items = rz.edges.reverse()
    itemsCache[id] = items
    
    return items
  }

  const loadOne = async () => {
    
  }


  return $$({ state, stateArr, add, remove, loadList, loadOne})
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))
