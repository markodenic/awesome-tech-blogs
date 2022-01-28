export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en',
      prefix: 'og: http://ogp.me/ns#',
    },
    title: 'Awesome Tech Blogs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This is a list of Awesome Tech Blogs. Add yourself.' },
      // Open Graph
      { hid: 'og:title',  property: 'og:title', content: 'Awesome Tech Blogs' },
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
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;400&display=swap",
      },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css/normalize.css',
    '@/assets/less/app.less'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
}
