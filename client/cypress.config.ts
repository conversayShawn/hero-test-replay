import { defineConfig } from "cypress";
import { createHero, deleteHero } from "./cypress/support/data";
import fs from "fs";
import del = require("del");

export default defineConfig({
  retries: {
    runMode: 2,
  },
  video: true,
  projectId: "yrin2w",
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        createHero,
        deleteHero,
      });
      // on("after:spec", (spec, results) => {
      //   if (results && results.video) {
      //     // Do we have failures for any retry attempts?
      //     const failures = results.tests.some((test) =>
      //       test.attempts.some((attempt) => attempt.state === "failed")
      //     );
      //     if (!failures) {
      //       // delete the video if the spec passed and no tests retried
      //       fs.unlinkSync(results.video);
      //     }
      //   }
      // });
      on("after:spec", async (spec, results) => {
        if (results && results.video) {
          const failures = results.tests?.some(test =>
            test.attempts.some(attempt => attempt?.state === "failed")
          );
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            return del(results.video);
          }
        }
      });
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      // on("after:spec", (spec, results) => {
      //   if (results && results.video) {
      //     // Do we have failures for any retry attempts?
      //     const failures = results.tests.some((test) =>
      //       test.attempts.some((attempt) => attempt.state === "failed")
      //     );
      //     if (!failures) {
      //       // delete the video if the spec passed and no tests retried
      //       fs.unlinkSync(results.video);
      //     }
      //   }
      // });
      // Delete the recorded video for specs that had no retry attempts
      // https://github.com/cypress-io/cypress/issues/16377
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          const failures = results.tests?.some((test) =>
            test.attempts.some((attempt) => attempt?.state === "failed")
          );
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            return del(results.video);
          }
        }
      });
    },
  },
});
