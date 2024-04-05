export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', '~/assets/css/icons.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module'],
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',
    // Public keys that are exposed to the client
    public: {
      apiKey: process.env.FIRE_API_KEY,
      authDomain: process.env.FIRE_AUTH_DOMAIN,
      databaseURL: process.env.FIRE_DATABASE_URL,
      projectId: process.env.FIRE_PROJECT_ID,
      storageBucket: process.env.FIRE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
      appId: process.env.FIRE_APP_ID,
    },
  }
})
