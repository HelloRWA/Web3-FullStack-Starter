import {
  createDataItemSigner,
  result,
  results,
  message,
  spawn,
  monitor,
  unmonitor,
  dryrun
} from '@permaweb/aoconnect'

export const inboxStore = defineStore('inboxStore', () => {
  const itemsCache = $ref({})
  let isInboxLoading = $ref(false)
  
  const state = $(lsItemRef('inboxStore', {
    'Fv5lQPftoQ4VGhLGc-ZV0EteHaYSjsvaQQJoYxxwE40': {
      name: 'AO Arena DAO Chat',
      latestMsgTime: new Date(),
      createdAt: new Date()
    },
    'U1HFLMW0ZykPip03efMNpUpWcDlzkdxXwtoKZrOzhEA': {
      name: 'HelloRWA',
      latestMsgTime: new Date(),
      createdAt: new Date()
    },
  }))
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

  const loadOne = async (process, message) => {
    let { Messages, Spawns, Output, Error } = await result({
      message,
      process,
    });

    return { Messages, Spawns, Output, Error }
  }

  const sendMessage = async (process, data) => {
    await globalThis.arweaveWallet.connect(['SIGN_TRANSACTION'])
    const rz = await message({
      process,
      signer: createDataItemSigner(globalThis.arweaveWallet),
      Action: 'Eval',
      data,
    })
    return rz
  }

  const getDryrunData = (rz, key) => {
    return useGet(useKeyBy(useGet(rz, 'Messages[0].Tags'), 'name'), key)
  }
  const getInboxCount = async (process: string, isForce = false) => {
    if (state[process].inboxCount && !isForce) {
      return state[process].inboxCount
    }

    let rz = await dryrun({
          process, // Use the processId from the context
          tags: [
            {
              name: 'Target',
              value: process, // Use the processId from the context
            },
            { name: 'Action', value: '#Inbox' },
          ],
          data: '#Inbox',
     });
    rz = getDryrunData(rz, 'InboxCount.value')
    state[process].inboxCount = rz
    return rz
  }

  const loadInboxList = async (process: string, limit = 10, isNewer = true) => {
    if (!itemsCache[process]) {
      itemsCache[process] = {}
    }

    const inboxCount = await getInboxCount(process, true)
    const cachedIndex = useWithout(Object.keys(itemsCache[process]).map(item => parseInt(item)), 999999)
    const start = isNewer ? useMax(cachedIndex) : 1
    const allIndex = useRange(start, parseInt(inboxCount) + 1)
    const waitForReadIndex = useDifference(allIndex, cachedIndex).reverse()
    if (waitForReadIndex.length === 0) {
      return
    }
    
    isInboxLoading = true
    const waitForReadIndexTrunk = useChunk(waitForReadIndex, limit)

    await Promise.all(waitForReadIndexTrunk[0].map(async index => {
      if (itemsCache[process][index]) {
        return itemsCache[process][index]
      }

      const rz = await dryrun({
        process,
        tags: [
          {
            name: 'Target',
            value: process,
          },
          { name: 'Action', value: 'CheckInbox' },
          { name: 'Index', value:  String(index) },
        ],
      })
      itemsCache[process][index] = {
        ...getDryrunData(rz, 'MessageDetails.value'),
        index,
      }

      return itemsCache[process][index]
    }))
    if (itemsCache[process][999999]) {
      delete itemsCache[process][999999]
    }
    isInboxLoading = false
  }

  
  return $$({ state, stateArr, itemsCache, isInboxLoading, add, remove, loadList, loadOne, sendMessage, getInboxCount, loadInboxList})
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(inboxStore, import.meta.hot))
