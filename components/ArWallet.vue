<script setup lang="ts">
const {
  // currentChain, selectedWallet,
  address,
  credBalance,
  init, doLogout, doLogin } = $(aoStore())

onMounted(init)

</script>

<template>
  <div>
    <UPopover v-if="address" :popper="{ placement: 'bottom-end' }">
      <UButton color="white" block>
        <!-- <UAvatar :src="selectedWallet.iconUrl" :alt="selectedWallet.label" size="2xs" />
        {{ currentChain }} -->
        <DicebearAvatar :seed="address" />
        {{ shortAddress(address) }}
        <span class="text-primary">{{ credBalance }} $CRED</span>
      </UButton>
      <template #panel>
        <UButton color="red" @click="doLogout">
          Disconnect
        </UButton>
      </template>
    </UPopover>
    <UButton v-else color="white" @click="doLogin">
      Connect Wallet
    </UButton>
  </div>
</template>
