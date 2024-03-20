<script setup lang="ts">
useSeoMeta({
  title: 'Stake'
})

let currentStake = $ref(1)
const maxStake = $ref(1000)

const round1StakeAmount = $ref(500)

const { aoCoinBalance, tokenMap, sendToken, init, getData } = $(aoStore())
let loading = $ref(false)

const arenaPID = $computed(() => tokenMap['Arena'])

const { showSuccess } = $(notificationStore())
let isLoading = $ref(true)
const doInit = async () => {
  isLoading = true
  await init()
  currentStake = (await getData({
    process: 'Arena',
    Action: 'getStakeTotalAmount'
  }, {
    Action: 'getStakeTotalAmount'
  })) / 1000
  console.log(`====> currentStake :`, currentStake)
  isLoading = false
}

onMounted(doInit)

const doSubmit = async () => {
  if (loading) return
  loading = true

  const rz = await sendToken('AOCoin', arenaPID, round1StakeAmount, [{ name: 'Stake', value: arenaPID }])
  if (rz) {
    showSuccess('Stake succeed, refreshing...')
    await doInit()
  }
  loading = false
}

const btn = $computed(() => {
  let label = `Stake ${round1StakeAmount} $AO`
  if (loading) {
    label = 'Staking...'
  }

  const disabled = round1StakeAmount === 0

  return { label, disabled, loading, onClick: doSubmit }
})
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHero id="stake" class="mt-20" title="Stake in the Arena and Earn" align="center">
        <template #description>
          <p>Arena get 10% of the total Bet $AO as fee for every round of the game. All the stakers share the profit. <br />Stakers also have the vote right for Arena's new proposal</p>
        </template>
      </UPageHero>

      <UPageHero title="1st Round" align="left" class="">
        <template #description>
          <p class="my-5">This round's staker get <span class="font-bold text-primary">10%</span> of the arena profit.</p>
          <UMeter class="mr-10" size="md" :value="currentStake" :max="maxStake" indicator>
            <template #label>
              <div class="flex text-sm pt-4 justify-between items-center">
                <div>
                  Target Amount: <span class="text-primary"> {{ maxStake }}</span> $AO
                </div>
                <div class="flex space-x-2 justify-center items-center">
                  <span>Current Staked:</span>
                  <Loading v-if="isLoading" class="h-7 text-xl w-7" />
                  <span v-else class="font-bold text-primary text-xl">{{ numberFormat(currentStake) }}</span>
                  <span>$AO</span>
                </div>
              </div>
            </template>
          </UMeter>
        </template>
        <UPricingCard title="Stake" :button="btn" orientation="vertical" align="bottom">
          <template #description>
            <div class="flex justify-between items-center">
              <div>
                You can deposit CRED to get $AO
              </div>
              <div class="text-right">
                <div>
                  Your have: <span class="text-primary">{{ numberFormat(aoCoinBalance) }} $AO</span>
                </div>
                <UButton to="/deposit" color="white" trailing icon="i-heroicons-arrow-small-right">
                  Deposit
                </UButton>
              </div>
            </div>
          </template>
          <template #features>
            <h2 class="font-bold text-center mb-5 text-5xl">{{ round1StakeAmount }} $AO</h2>
            <URange color="primary" v-model="round1StakeAmount" :max="1000" />
          </template>
        </UPricingCard>
      </UPageHero>

      <UserActivityList class="my-20" title="Stake Activity(TODO)" />
    </UContainer>
  </UPage>
</template>
