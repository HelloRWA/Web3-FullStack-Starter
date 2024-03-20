<script setup lang="ts">
definePageMeta({
  colorMode: 'dark',
  layout: 'home'
})
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div v-if="page">
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links">
      <div class="inset-0 z-[-1] absolute landing-grid [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

      <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="rounded-full font-semibold relative">
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="inset-0 absolute" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="h-4 ml-1 w-4 pointer-events-none" />
        </UBadge>
      </template>
    </ULandingHero>

    <div class="mt-16 sm:mt-20">
      <div class="flex -my-4 py-4 gap-5 justify-center overflow-hidden sm:gap-8">
        <div class="rounded-xl flex-none bg-zinc-100 w-44 rotate-2 relative overflow-hidden aspect-[9/10] sm:rounded-2xl sm:w-72 dark:bg-zinc-800"><img alt="" loading="lazy" width="3744" height="5616" decoding="async" data-nimg="1" class="h-full object-cover w-full inset-0 absolute" sizes="(min-width: 640px) 18rem, 11rem" src="https://images.unsplash.com/photo-1605092676920-8ac5ae40c7c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGlnZXJ8ZW58MHx8MHx8fDA%3D" style="color: transparent;"></div>
        <div class="rounded-xl flex-none bg-zinc-100 w-44 -rotate-2 relative overflow-hidden aspect-[9/10] sm:rounded-2xl sm:w-72 dark:bg-zinc-800"><img alt="" loading="lazy" width="3936" height="2624" decoding="async" data-nimg="1" class="h-full object-cover w-full inset-0 absolute" sizes="(min-width: 640px) 18rem, 11rem" src="https://images.unsplash.com/photo-1602612639468-cd507b1cada9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRpZ2VyfGVufDB8fDB8fHww" style="color: transparent;"></div>
        <div class="rounded-xl flex-none bg-zinc-100 w-44 rotate-2 relative overflow-hidden aspect-[9/10] sm:rounded-2xl sm:w-72 dark:bg-zinc-800"><img alt="" loading="lazy" width="5760" height="3840" decoding="async" data-nimg="1" class="h-full object-cover w-full inset-0 absolute" sizes="(min-width: 640px) 18rem, 11rem" src="https://images.unsplash.com/photo-1615963244664-5b845b2025ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlnZXJ8ZW58MHx8MHx8fDA%3D" style="color: transparent;"></div>
        <div class="rounded-xl flex-none bg-zinc-100 w-44 rotate-2 relative overflow-hidden aspect-[9/10] sm:rounded-2xl sm:w-72 dark:bg-zinc-800"><img alt="" loading="lazy" width="2400" height="3000" decoding="async" data-nimg="1" class="h-full object-cover w-full inset-0 absolute" sizes="(min-width: 640px) 18rem, 11rem" src="https://images.unsplash.com/photo-1615474286632-e31ac3633d58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRpZ2VyfGVufDB8fDB8fHww" style="color: transparent;"></div>
        <div class="rounded-xl flex-none bg-zinc-100 w-44 -rotate-2 relative overflow-hidden aspect-[9/10] sm:rounded-2xl sm:w-72 dark:bg-zinc-800"><img alt="" loading="lazy" width="4240" height="2384" decoding="async" data-nimg="1" class="h-full object-cover w-full inset-0 absolute" sizes="(min-width: 640px) 18rem, 11rem" src="https://images.unsplash.com/photo-1573476492143-70270ca42661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRpZ2VyfGVufDB8fDB8fHww" style="color: transparent;"></div>
      </div>
    </div>

    <ULandingSection v-for="(section, index) in page.sections" :key="index" :title="section.title" :description="section.description" :align="section.align" :features="section.features" :links="section.links">
      <div class="border border-dashed rounded-lg border-gray-900/10 relative overflow-hidden aspect-w-16 aspect-h-9 dark:border-white/10">
        <img class="h-full object-cover w-full inset-0 absolute" :src="section.img" />
      </div>
    </ULandingSection>

    <!-- <ULandingSection :title="page.features.title" :description="page.features.description">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection :headline="page.testimonials.headline" :title="page.testimonials.title" :description="page.testimonials.description">
      <UPageColumns class="xl:columns-4">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" class="bg-gray-100/50 dark:bg-gray-800/50" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection> -->
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>