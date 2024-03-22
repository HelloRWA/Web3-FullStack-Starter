// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-og-image',
    '@nuxt/ui',
    'nuxt-lodash',
    'nuxt-gtag',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@vue-macros/nuxt',
    '@vueuse/nuxt',
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en_US.json',
          },
          {
            code: 'zh',
            file: 'zh_CN.json',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
      },
    ]
  ],
  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devtools: {
    enabled: true
  }
})
