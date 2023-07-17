import { defineConfig } from 'cypress';
import { createHero, deleteHero } from './cypress/support/data';
const fs = require("fs");

export default defineConfig({
  retries: {
    runMode: 2
  },
  projectId: 'yrin2w',
  e2e: {
    testIsolation: false, //disable to see api results screen
    specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(cypressOn, config) {
      const on = require('cypress-on-fix')(cypressOn)
      on('task', {
        createHero,
        deleteHero,
      });
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
    },
  },
});
