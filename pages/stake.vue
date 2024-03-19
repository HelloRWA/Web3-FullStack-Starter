<script setup lang="ts">

</script>

<template>
  <UPage>
    <UContainer>
      <StakeStep class="mt-20" />
      <UPageHero title="Official Support" description="Through NuxtLabs experts and agency networks, we have a solution for every need." align="left">
        <UPricingCard title="Solo" description="For bootstrappers and indie hackers." price="$199" discount="" cycle="/month" highlight :badge="{ label: 'Most popular' }" :button="{ label: 'Buy now' }" orientation="vertical" align="bottom" :features="['One developer', 'Unlimited projects', 'Unlimited minor & patch updates', 'Lifetime access']" />
      </UPageHero>
    </UContainer>
  </UPage>
</template>
