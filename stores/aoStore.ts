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
  return $$({ getData })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(aoStore, import.meta.hot))
