// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
  ssr: true, // Enable server-side rendering
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      link: [{ rel: 'icon', href: 'mlmupc-logo.ico' }],
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          property: 'og:site_name',
          content: 'ក្រសូងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់',
        },
        {
          property: 'og:url',
          content: process.env.NUXT_PUBLIC_SITE_URL || '/',
        },
        {
          property: 'og:image',
          content: `${process.env.NUXT_PUBLIC_SITE_URL ? process.env.NUXT_PUBLIC_SITE_URL + '/' : '/'}mlmupc-logo.ico`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'google-site-verification',
          content: 'googlef630275bc5432983.html', // Replace with your actual verification code
        },
      ],
    },
  },
  nitro: {
    preset: 'node-server',
    static: true,
    ssr:true,
    prerender: {
      crawlLinks: true,
      routes: ['/', 'sitemap.xml'],
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: `${process.env.NUXT_PUBLIC_SITE_URL}'/sitemap.xml'`
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URL,
      webBaseUrl: process.env.NUXT_PUBLIC_SITE_URL || '/',
    },
  },
  plugins: [
    '~/plugins/api.ts',
    '~/plugins/auto-animate.ts',
    '~/plugins/fontawesome.ts',
  ],
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-aos'
  ],
  imports: {
    dirs: ['store'],
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 30, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 300, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling ast them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  },
});