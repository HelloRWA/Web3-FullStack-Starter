import {
  createDataItemSigner,
  result,
  // results,
  message,
  // spawn,
  // monitor,
  // unmonitor,
  dryrun
} from '@permaweb/aoconnect'

import { PermissionType } from 'arconnect'

const permissions: PermissionType[] = [
  'ACCESS_ADDRESS',
  'SIGNATURE',
  'SIGN_TRANSACTION',
  'DISPATCH'
]

const CRED = "Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc"

export const aoStore = defineStore('aoStore', () => {
  let address = $(lsItemRef('address', ''))
  let credBalance = $(lsItemRef('credBalance', 0))
 

  const doLogin = async () => {
    await window.arweaveWallet.connect(permissions)
    try {
      address = await window.arweaveWallet.getActiveAddress()
      credBalance = await getBalance()
    } catch(error) {
      console.error(error)
    }
  }

  const doLogout = async () => {
    await window.arweaveWallet.disconnect()
    address = ''
    credBalance = 0
  }
  
  const getBalance = async (process: string) => {
    let rz = await message({
        process,
        tags: [
            { name: 'Action', value: 'Balance' },
        ],
        signer: createDataItemSigner(window.arweaveWallet),
    })
    try {
      rz = await result({
        message: rz,
        process,
      })
      rz = useGet(rz, 'Messages[0].Tags').find(tag => tag.name === 'Balance')
      return rz ? parseFloat((rz.value / 1000).toFixed(4)) : 0
    } catch (err) {
      console.log(`====> err :`, err)
    }
    
    return 0
  }
  
  const getData = async ({process, Action}, tagFilters) => {
     let rz = await dryrun({
        process,
        tags: [
          { name: 'Action', value: Action},
        ],
     })
    try {
      rz = rz.Messages.filter(msg => {
        const hasMatchTag = msg.Tags.filter(tag => {
          if (tagFilters[tag.name]) {
            return tag.value == tagFilters[tag.name]
          }
          return false
        })
        return hasMatchTag.length === Object.keys(tagFilters).length
      })
      rz = JSON.parse(useGet(rz, '[0].Data'))
    } catch (err) {
      console.log(`====> err :`, err, rz)
    }
      
    return rz
  }

  const init = async () => {
    if (!address) return
    
    credBalance = await getBalance(CRED)
  }
  
  return $$({ getData, address, credBalance, init, doLogout, doLogin })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))
