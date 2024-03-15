<script setup lang="ts">
const { id } = $defineProps<{
  id: string
}>()

const loaded = defineEmit('loaded')

const { itemsCache, loadInboxList, isInboxLoading: isLoading } = $(aoStore())
const { address, getActiveAddress } = $(arweaveWalletStore())
const items = $computed(() => {
  return useSortBy(useFilter(itemsCache[id], item => !!item.Data), item => parseInt(item.index))
})

watchEffect(async () => {
  if (!id) return

  await loadInboxList(id)
  loaded()
})

onMounted(getActiveAddress)

const isSelf = item => item.From === address

const getData = item => {
  return item.Data
  const output = useGet(item, 'node.Output.data.output')
  const data = useGet(item, 'node.Output.data')
  if (!output) {
    return data
  }
  return output
}

</script>
<template>
  <div class="space-y-5">
    <div v-for="item in items" :key="item.id" class="flex gap-2.5 items-start" :class="isSelf(item) ? 'flex-row-reverse' : ''">
      <DicebearAvatar :seed="item.From" class="rounded-full h-8 w-8" size="lg" />

      <div class="flex flex-col w-full max-w-[400px] gap-1">
        <div class="flex space-x-2 items-center rtl:space-x-reverse" :class="isSelf(item) ? 'justify-end' : ''">
          <span class="font-semibold flex-1 text-sm text-gray-900 dark:text-white">{{ shortAddress(item.From) }}</span>
          <TimeAgo class="font-normal  text-sm text-gray-500 dark:text-gray-400" :time="item.Timestamp" />
        </div>
        <div class="flex flex-col bg-gray-100 border-gray-200 p-4 leading-1.5 dark:bg-gray-700" :class="isSelf(item) ? 'rounded-s-xl rounded-ee-xl' : 'rounded-e-xl rounded-es-xl'">
          <p class="font-normal text-sm text-gray-900 dark:text-white"> {{ getData(item) }}</p>
        </div>
        <span v-if="item.isPending" class="flex font-normal text-sm text-gray-500 justify-start items-center dark:text-gray-400">
          <Loading class="h-5 mr-2 w-5" />
          Pending...
        </span>
      </div>
    </div>
    <div v-show="isLoading" class="flex py-10 items-center justify-center">
      <Loading class="h-8 w-8" />
    </div>
  </div>
</template>