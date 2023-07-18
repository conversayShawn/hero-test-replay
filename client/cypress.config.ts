import { defineConfig } from "cypress";
import { createHero, deleteHero } from './cypress/support/data';

export default defineConfig({
  retries: {
    runMode: 2
  },
  video: true,
  projectId: 'yrin2w',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        createHero,
        deleteHero,
      });
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
