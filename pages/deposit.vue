<script setup lang="ts">
useSeoMeta({
  title: 'Deposit'
})

const credSwap = $ref(0.1)
const credPay = $computed(() => credSwap)

const arSwap = $ref(500)
const arPay = $computed(() => arSwap / 100)

const depositPID = 'kzcVZhdcZOpM90eeKb-JRX3AG7TGH__S7p5I6PsqA3g'
const { aoCoinBalance, sendToken, init } = $(aoStore())
let loading = $ref(false)

const { showSuccess } = $(notificationStore())

const doDeposit = async () => {
  if (loading) return
  loading = true

  const rz = await sendToken('CRED', depositPID, credPay)
  if (rz) {
    showSuccess('Deposit succeed, refreshing balance')
    await init()
  }
  loading = false
}

const credBtn = $computed(() => {
  let label = `Deposit ${credPay} CRED`
  if (loading) {
    label = 'Depositing...'
  }
  return { label, disabled: credSwap === 0, loading, onClick: doDeposit }
})
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHero id="deposit" title="Deposit" description="This is where you can get $AO token, deposit your CRED, AR or USDT, get $AO token." align="center">
        <h2 class="font-bold mt-10 text-center text-5xl">
          You Own <span class="text-primary">{{ numberFormat(aoCoinBalance) }}</span> $AO
        </h2>
        <UPricingGrid :compact="false" :ui="{ wrapper: 'lg:grid-cols-2 mt-20' }">
          <UPricingCard title="CRED" highlight scale :badge="{ label: 'Most popular' }" description="You can get it free on ao testnet by solve the quests." :button="credBtn" orientation="vertical" align="bottom">
            <template #features>
              <h2 class="font-bold text-center mb-5 text-5xl">{{ credSwap }} $AO</h2>
              <URange color="primary" v-model="credSwap" :max="1000" />
            </template>
          </UPricingCard>
          <UPricingCard title="AR" :badge="{ label: 'WIP' }" description="You don't have CRED? All right, just pay 1 AR to buy 100 $AO. (This feature still work in progress)" :button="{ label: `Deposit ${arPay} AR`, disabled: true }" orientation="vertical" align="bottom">
            <template #features>
              <h2 class="font-bold text-center mb-5 text-5xl">{{ arSwap }} $AO</h2>
              <URange color="primary" v-model="arSwap" :max="1000" />
            </template>
          </UPricingCard>
        </UPricingGrid>
      </UPageHero>

      <UserActivityList class="my-20" title="Deposit Activity(TODO)" />
    </UContainer>
  </UPage>
</template>
