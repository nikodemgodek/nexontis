import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
require('dotenv').config();

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './tests/*/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: process.env.BASE_URL,
      show: true
    },
    REST: {
      endpoint: process.env.API_BASE_URL,
      defaultHeaders: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY
      },
      timeout: process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 3000
    },
  },
  include: {
    I: './steps_file'
  },
  plugins: {
    htmlReporter: {
      enabled: true
    },
    allure: {
    enabled: true,
    require: "allure-codeceptjs",
    outputDir: "allure-results",
    },
  },
  name: 'nexontis'
}