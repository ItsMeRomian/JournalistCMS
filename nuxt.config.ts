// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "nl",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Freelance journalist gevestigd in Zwolle",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "robots", content: "index, follow" },
      ],
      link: [
        // { rel: "icon", type: "image/x-icon", href: "/imgs/favicon.ico" },
        {
          href: "https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap",
          rel: "stylesheet",
        },
      ],
      style: [{ children: "html, body { background: #dcd7d0 }" }],
    },
  },

  css: ["~/assets/css/main.css"],
  ssr: true,
  robots: {
    disallow: ["/admin/**"],
  },
  sitemap: {
    sources: ["/api/__sitemap__/sitemap"],
  },
  routeRules: {
    "/admin/**": { index: false },
  },
  modules: [
    "nuxt-vuefire",
    "@vueuse/nuxt",
    "@tailvue/nuxt",
    "@zadigetvoltaire/nuxt-gtm",
    "nuxt-jsonld",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
  ],
  build: {
    transpile: ["lru-cache"],
  },
  gtm: {
    id: "GTM-XXXXX",
    defer: false,
    compatibility: false,
    nonce: "2726c7f26c",
    enabled: true,
    debug: false,
    loadScript: true,
    enableRouterSync: true,
    ignoredViews: ["homepage"],
    trackOnNextTick: false,
    devtools: true,
  },
  runtimeConfig: {
    public: {
      PROD_BASE_URL: "journalist.co",
      JOURNALIST: {
        NAME: "Annemiek Janse",
        YEAR: "2024",
        EMAIL: "hello@journalist.co",
        TEL: "+12 3 45 678 90",
        DESC: "Freelance journalist gevestigd in Zwolle"
      },
      google_analytics_id: "G-XXXXX",
      production_mode: true,
    },
  },
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyDLL7hJCbqCIzXFZZZcXbOlZzsu2mnnUrE",
      authDomain: "itsmeromian.firebaseapp.com",
      projectId: "itsmeromian",
      storageBucket: "itsmeromian.appspot.com",
      messagingSenderId: "480243215917",
      appId: "1:480243215917:web:2f8396d0ce1cfaef4ad2a4",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
