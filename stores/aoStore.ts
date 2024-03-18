import {
  // createDataItemSigner,
  // result,
  // results,
  // message,
  // spawn,
  // monitor,
  // unmonitor,
  dryrun
} from '@permaweb/aoconnect'

export const aoStore = defineStore('aoStore', () => {

  const getData = async ({process, action}) => {
     let rz = await dryrun({
        process,
        tags: [
          { name: 'Action', value: action},
        ],
     })
    console.log(`====> rz :`, rz)
    try {
      rz = JSON.parse(useGet(rz, 'Messages[0].Data'))
    } catch (err) {
      console.log(`====> err :`, err)
    }
      
    return rz
  }
  return $$({ getData })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))
