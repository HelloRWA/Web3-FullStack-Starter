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
      <!-- <StakeStep class="my-20" /> -->

      <UPageHero id="deposit" title="Deposit" description="This is where you can get $AO token, deposit your CRED, AR or USDT, get $AO token." align="center">
        <UPricingGrid :compact="false" :ui="{ wrapper: 'lg:grid-cols-2 mt-20' }">
          <UPricingCard title="CRED" highlight scale :badge="{ label: 'Most popular' }" description="You can get it free on ao testnet by solve the quests." :button="{ label: `Deposit ${credPay} CRED`, disabled: credSwap === 0 }" orientation="vertical" align="bottom">
            <template #features>
              <h2 class="font-bold text-center mb-5 text-5xl">{{ credSwap }} $AO</h2>
              <URange color="primary" v-model="credSwap" :max="1000" />
            </template>
          </UPricingCard>
          <UPricingCard title="AR" description="You don't have CRED? All right, just pay 1 AR to buy 100 $AO." :button="{ label: `Deposit ${arPay} AR`, disabled: arSwap === 0 }" orientation="vertical" align="bottom">
            <template #features>
              <h2 class="font-bold text-center mb-5 text-5xl">{{ arSwap }} $AO</h2>
              <URange color="primary" v-model="arSwap" :max="1000" />
            </template>
          </UPricingCard>
        </UPricingGrid>
      </UPageHero>

      <StakeUserActivityList class="my-20" />
    </UContainer>
  </UPage>
</template>
