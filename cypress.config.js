const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5500/0-exercices/1-exercice/correction/src/html',
    viewportHeight: 619,
    viewportWidth: 1304,
    chromeWebSecurity: false
    // experimentalShadowDomSupport: true
  }
})
