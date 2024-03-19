<script setup lang="ts">

const pid = $ref('moR8QJPV6NzhsdwibAVoqBoozTXSWqrMROrPFYAgfMs') // 2
const { state } = $(aoEffectStore())
const isIniting = $computed(() => state[pid] ? false : true)
const gameMode = $computed(() => state[pid]?.gameMode || '')
const timeRemaining = $computed(() => state[pid]?.timeRemaining || 0)
const waiting = $computed(() => state[pid]?.waiting || {})
const players = $computed(() => state[pid]?.players || {})
</script>

<template>
  <UPage>
    <div class="h-screen bg-red-400 w-full">
      <div class="flex h-full bg-green-400 w-full overflow-scroll justify-center items-center">
        <GameWarGround :pid="pid" />
      </div>
    </div>
    <template #right>
      <ClientOnly>
        <UAside>
          <div class="pr-10">
            <div v-if="isIniting">
              loading...
            </div>
            <div v-else>
              <div>
                Game Mode: <span class="font-bold">{{ gameMode }}</span>
              </div>
              <div>
                Time Remaining: <span class="font-bold">{{ parseInt(timeRemaining / 1000) }}</span>
              </div>
              <div class="space-y-5 pt-10">
                <h2 class="flex font-bold mb-5 justify-between">Playing List <span>Health / Energy</span></h2>
                <div v-for="(item, key) in players" :key="key" class="flex justify-between items-center">
                  <div class="flex  items-center">
                    <DicebearAvatar :seed="key" class="rounded-full h-8 mr-2 w-8" size="3xl" />
                    <!-- {{ shortAddress(key) }} -->
                    ({{ item.x }}, {{ item.y }})
                  </div>
                  <div>
                    {{ item.health }} / {{ item.energy }}
                  </div>
                </div>
              </div>
              <div class="space-y-5 pt-10">
                <h2 class="font-bold mb-5">Waiting List</h2>
                <div v-for="(isPaid, key) in waiting" :key="key" class="flex justify-between items-center">
                  <div class="flex  items-center">
                    <DicebearAvatar :seed="key" class="rounded-full h-8 mr-2 w-8" size="3xl" />
                    {{ shortAddress(key) }}
                  </div>
                  <div>
                    {{ isPaid ? 'paid' : 'not pay' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UAside>
      </ClientOnly>
    </template>
  </UPage>
</template>
