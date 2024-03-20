<script setup lang="ts">
useSeoMeta({
  title: 'Arena'
})

const { showSuccess } = $(notificationStore())

const { tokenMap, sendToken, aoCoinBalance, init } = $(aoStore())
const pid = $computed(() => tokenMap['Arena'])
const { state } = $(aoEffectStore())
const isIniting = $computed(() => state[pid] ? false : true)
const gameMode = $computed(() => state[pid]?.gameMode || '')
const timeRemaining = $computed(() => state[pid]?.timeRemaining || 0)
const waiting = $computed(() => state[pid]?.waiting || {})
const players = $computed(() => state[pid]?.players || {})
const betOnTotalAmount = $computed(() => state[pid]?.betOnTotalAmount || 0)
const betOnAmountList = $computed(() => state[pid]?.betOnAmountList || {})
// const betOnList = $computed(() => state[pid]?.betOnList || {})

const arenaPID = $computed(() => tokenMap['Arena'])

let isLoading = $ref(false)
const doInit = async () => {
  isLoading = true
  await init()
  isLoading = false
}

let isShowBetOnModal = $ref(false)
let betOnProcess = $ref('')
let loading = $ref(false)
let betAmount = $ref(2)
const doSubmit = async () => {
  if (loading) return
  loading = true

  const rz = await sendToken('AOCoin', arenaPID, betAmount, [{ name: 'BetOn', value: betOnProcess }])
  if (rz) {
    isShowBetOnModal = false
    showSuccess('Bet succeed, refreshing...')
    await doInit()
  }

  loading = false
}
const showBet = async process => {
  if (loading) return

  isShowBetOnModal = true
  betOnProcess = process
}


const btn = $computed(() => {
  let label = `Bet ${betAmount} $AO`
  if (loading) {
    label = 'Betting...'
  }

  const disabled = betAmount === 0

  return { label, disabled, loading, onClick: doSubmit }
})

const mins = $computed(() => parseInt(timeRemaining / 1000 / 60))
const seconds = $computed(() => parseInt(timeRemaining / 1000 % 60))
</script>

<template>
  <UPage>
    <div class="flex h-screen bg-green-900 flex-1  w-full overflow-scroll justify-center items-center">
      <GameWarGround :pid="pid" />
    </div>
    <template #right>
      <ClientOnly>
        <UAside>
          <div class="pr-10">
            <div v-if="isIniting">
              <div class="font-bold text-primary text-center py-10 text-2xl">
                Arena Data is loading...
              </div>
            </div>
            <div v-else class="space-y-2">
              <div class="font-bold text-primary text-center py-10 text-5xl">
                {{ mins }} : {{ seconds }}
              </div>
              <div class="flex justify-between">
                Game Mode: <span class="font-bold text-primary">{{ gameMode }}</span>
              </div>
              <div class="flex justify-between">
                Total Bet Amount: <span class="font-bold text-primary">{{ numberFormat(betOnTotalAmount / 1000) }}</span>
              </div>
              <div v-if="Object.keys(players).length > 0" class="space-y-5 pt-10">
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
              <div v-if="waiting.length > 0" class="space-y-5 pt-10">
                <div class="flex font-bold mb-5">
                  Waiting List
                </div>
                <div v-for="(isPaid, key) in waiting" :key="key" class="flex justify-between items-center">
                  <div class="flex  items-center">
                    <DicebearAvatar :seed="key" class="rounded-full h-8 mr-2 w-8" size="3xl" />
                    {{ shortAddress(key) }}
                  </div>
                  <div>
                    {{ numberFormat(betOnAmountList[key] / 1000) }}
                    <UButton @click="showBet(key)">Add Bet</UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UAside>
      </ClientOnly>
    </template>

    <UModal v-model="isShowBetOnModal">
      <div class="p-4">
        <UPricingCard :title="`Bet on ${shortAddress(betOnProcess)}`" :button="btn" orientation="vertical" align="bottom">
          <template #description>
            <div class="flex mt-10 justify-between items-center">
              <div class="flex items-center justify-center">
                <span>Your have: </span>
                <UButton color="white" icon="i-ic-round-refresh" variant="ghost" trailing :loading="isLoading" @click="doInit">
                  <span class="text-primary">{{ numberFormat(aoCoinBalance) }} $AO</span>
                </UButton>
              </div>
              <UButton target="_blank" to="/deposit" color="white" trailing icon="i-heroicons-arrow-small-right">
                Deposit
              </UButton>
            </div>
          </template>
          <template #features>
            <h2 class="font-bold text-center mb-5 text-5xl">{{ betAmount }} $AO</h2>
            <URange color="primary" v-model="betAmount" :max="1000" />
          </template>
        </UPricingCard>
      </div>
    </UModal>
  </UPage>
</template>
