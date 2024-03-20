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



export const aoStore = defineStore('aoStore', () => {
  const tokenMap = $ref({
    CRED: 'Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc',
    AOCoin: 'rxl5oOyCuzrUUVB1edjrcHpcn9s9czhj4rsq4ACQGv4',
    Arena: 'moR8QJPV6NzhsdwibAVoqBoozTXSWqrMROrPFYAgfMs',
    DepositService: 'kzcVZhdcZOpM90eeKb-JRX3AG7TGH__S7p5I6PsqA3g'
  })
  
  let address = $(lsItemRef('address', ''))
  let credBalance = $(lsItemRef('credBalance', 0))
  let aoCoinBalance = $(lsItemRef('aoCoinBalance', 0))
  const {showError} = $(notificationStore())

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
    aoCoinBalance = 0
  }
  
  const getBalance = async (process: string) => {
    if (tokenMap[process]) {
      process = tokenMap[process]
    }
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
      rz = useGet(useGet(rz, 'Messages[0].Tags').find(tag => tag.name === 'Balance'), 'value', '0')
      return parseFloat(rz)
    } catch (err) {
      console.log(`====> err :`, err)
    }
    
    return 0
  }

  const getData = async ({ process, Action }, tagFilters) => {
    if (tokenMap[process]) {
      process = tokenMap[process]
    }
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

  const sendToken = async (process, recipient, amount, tags = []) => {
    if (!address) {
      await doLogin()
    }

    if (tokenMap[process]) {
      process = tokenMap[process]
    }

    if (amount <= 0) {
      showError(`amount can not be zero`)
      return false
    }

    amount = (parseFloat(amount) * 1000).toString()
   
    let rz = await message({
      process,
      tags: [
        ...tags,
        { name: 'Action', value: 'Transfer' },
        { name: 'Recipient', value: recipient },
        { name: 'Quantity', value: amount },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
    })

    try {
      rz = await result({
        message: rz,
        process,
      })
      const error = useGet(rz, 'Messages[0].Tags').find((tag: Tag) => tag.name === 'Error').value
      if (error) {
        showError(error)
        return false
      }
      rz = useGet(rz, 'Messages[0].Tags').find((tag: Tag) => tag.name === 'Action').value
      if (rz === "Debit-Notice") {
        return true
      }
    } catch (err) {
      console.log(`====> err :`, err)
      showError(err.toString())
    }
    return false
  }

  const init = async () => {
    if (!address) return
    
    credBalance = (await getBalance('CRED')) / 1e3
    aoCoinBalance = (await getBalance('AOCoin')) / 1e3
  }
  
  
  return $$({ tokenMap, getData, address, credBalance, aoCoinBalance, sendToken, init, doLogout, doLogin })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))

