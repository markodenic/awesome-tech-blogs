// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'static',
    output: {
      publicDir: 'dist'
    }
  },
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      // Fixed per build so the server-rendered order matches on hydration
      shuffleSeed: Date.now() % 2147483647,
    },
  },
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        prefix: 'og: http://ogp.me/ns#',
      },
      title: 'Awesome Tech Blogs',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'saashub-verification', content: 'bi3elh9bv2hz' },
        { hid: 'description', name: 'description', content: 'This is a list of Awesome Tech Blogs. Add yourself.' },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'Awesome Tech Blogs' },
        { hid: 'og:description', property: 'og:description', content: 'This is a list of Awesome Tech Blogs. Add yourself.' },
        { property: 'og:type', content: 'website' },
        { name: 'msapplication-TileColor', content: '#2b5797' },
        { name: 'theme-color', content: '#ffffff' },
        {
          hid: 'image',
          property: 'image',
          content: '/social-media-card-atb.jpg',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://tech-blogs.dev/social-media-card-atb.jpg',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
          href: '/favicon-16x16.png',
        },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon.png' },
        { rel: 'mask-icon', color: '#a3e635', href: '/safari-pinned-tab.svg' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
          href: '/fonts/inter-latin.woff2',
        },
      ],
      style: [
        {
          innerHTML: `@font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/inter-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`,
        },
      ],
    }
  },

  css: [
    'normalize.css/normalize.css',
    '@/assets/less/app.less'
  ]
})
