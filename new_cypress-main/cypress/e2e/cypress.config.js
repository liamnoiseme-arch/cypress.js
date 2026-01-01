const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://login.qa.studio',
    pageLoadTimeout: 120000, // Увеличиваем до 2 минут
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    
    setupNodeEvents(on, config) {
      // Можно добавить обработку ошибок
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      return config;
    }
  }
});
