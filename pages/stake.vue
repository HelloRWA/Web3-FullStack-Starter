<script setup lang="ts">
useSeoMeta({
  title: 'Stake'
})

const credSwap = $ref(500)
const credPay = $computed(() => credSwap)

const arSwap = $ref(500)
const arPay = $computed(() => arSwap / 100)

const currentStake = $ref(100000)
const maxStake = $ref(1000 * 1000)

const round1StakeAmount = $ref(500)
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHero id="stake" class="mt-20" title="Stake in the Arena and Earn" description="Arena get 10% of the total Bet $AO as fee for every round of the game. All the stakers share the profit. Stakers also have the vote right for Arena's new proposal" align="center">
      </UPageHero>

      <UPageHero title="1st Round" align="left" class="">
        <template #description>
          <p class="my-5">This round's staker get <span class="font-bold text-primary">10%</span> of the arena profit.</p>
          <UMeter class="mr-10" size="md" :value="currentStake" :max="maxStake" :label="`Target Stake Amount ${maxStake} $AO`" indicator>
          </UMeter>
        </template>
        <UPricingCard title="Stake" description="You can get it free on ao testnet by solve the quests." :button="{ label: `Stake`, disabled: round1StakeAmount === 0 }" orientation="vertical" align="bottom">
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
