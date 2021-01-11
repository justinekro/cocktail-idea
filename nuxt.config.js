export default {
  server: {
    port: 8600
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    htmlAttrs: {
      lang: 'en'
    },
    title: 'AppHero - Random cocktail',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'whisky, run, champagne, vodka, gin'},
      { hid: 'description', name: 'description', content: 'Random cocktail' },
      { hid: 'og:description', property: 'og:description', name: 'og:description', content: 'Random cocktail' },
      { hid: 'twitter:description', property: 'twitter:description', name: 'twitter:description', content: 'Random cocktail' },
      { hid: 'og:type', property: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', name: 'og:url', content: 'http://apphero.rakura.fr/' },
      { hid: 'og:title', property: 'og:title', name: 'og:title', content: 'AppHero - Random cocktail' },
      { hid: 'twitter:site', name: 'twitter:site', content: 'apphero.rakura.fr' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: 'AppHero' },
      { hid: 'twitter:title', property: 'twitter:title', name: 'twitter:title', content: 'AppHero - Random cocktail' },
      { hid: 'og:site_name', property: 'og:site_name', name: 'og:site_name', content: 'apphero.rakura.fr' },
      { hid: 'og:locale', property: 'og:locale', name: 'og:locale', content: 'fr' },
      { hid: 'og:image', property: 'og:image', name: 'og:image', content: 'http://apphero.rakura.fr/favicon.ico' },
      { hid: 'twitter:image', property: 'twitter:image', name: 'twitter:image', content: 'http://apphero.rakura.fr/favicon.ico' },
      { hid: 'twitter:card', property: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { name: 'msapplication-TileColor', content: '#F5F5F5' },
      { name: 'theme-color', content: '#F5F5F5' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#252525' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/vuetify'],

  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Poppins'
      }
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
