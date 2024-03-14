<script setup lang="ts">
const { id } = $defineProps<{
  id: string
}>()


const { loadList } = $(aoStore())

let items = $ref([])
watchEffect(async () => {
  if (!id) return

  items = await loadList(id)
  console.log(`====> items :`, items)
})
</script>
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="flex gap-2.5 items-start">
      <img class="rounded-full h-8 w-8" src="" alt="Jese image">
      <div class="flex flex-col w-full max-w-[320px] gap-1">
        <div class="flex space-x-2 items-center rtl:space-x-reverse">
          <span class="font-semibold text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span class="font-normal text-sm text-gray-500 dark:text-gray-400">11:46</span>
        </div>
        <div class="rounded-e-xl rounded-es-xl flex flex-col bg-gray-100 border-gray-200 p-4 leading-1.5 dark:bg-gray-700">
          <p class="font-normal text-sm text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
        </div>
        <span class="font-normal text-sm text-gray-500 dark:text-gray-400">Delivered</span>
      </div>
      <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="bg-white rounded-lg font-medium text-sm text-center p-2 text-gray-900 inline-flex self-center items-center dark:bg-gray-900 dark:text-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
        <svg class="h-4 text-gray-500 w-4 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div id="dropdownDots" class="divide-y bg-white rounded-lg divide-gray-100 shadow w-40 z-10 hidden dark:divide-gray-600 dark:bg-gray-700">
        <ul class="text-sm py-2 text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li>
            <a href="#" class="py-2 px-4 block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
          </li>
          <li>
            <a href="#" class="py-2 px-4 block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
          </li>
          <li>
            <a href="#" class="py-2 px-4 block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
          </li>
          <li>
            <a href="#" class="py-2 px-4 block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
          </li>
          <li>
            <a href="#" class="py-2 px-4 block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>