export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'e-commerce',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/vueselect.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/http'
  ],

  http: {
    // proxyHeaders: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
    { path: '/api', handler: '~/api/product.js' },
    { path: '/api', handler: '~/api/product_inventory.js' },
    { path: '/api', handler: '~/api/product_version.js' }
  ],

  router: {
    middleware: 'load_tables'
  }
}
