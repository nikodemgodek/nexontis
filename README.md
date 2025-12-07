# CodeceptJS Tests

> End-to-end test project built with [CodeceptJS](https://codecept.io/), using Playwright, TypeScript, and Allure for reporting.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Demo and UI](#demo-and-ui)
- [Test Reporting](#test-reporting)
- [Contact](#contact)

---

## Project Overview
This repository contains example automated tests for web applications using CodeceptJS.  
It is configured to run tests in headless mode or with UI, and integrates with Allure for detailed test reporting.

---

## Technologies
- [CodeceptJS](https://codecept.io/) – end-to-end testing framework  
- [Playwright](https://playwright.dev/) – browser automation  
- [TypeScript](https://www.typescriptlang.org/) – typed JavaScript  
- [Allure](https://docs.qameta.io/allure/) – test reporting  
- [Chai](https://www.chaijs.com/) – assertions  

---

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/nikodemgodek/nexontis.git
    cd codeceptjs-tests
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

---

## Running Tests
This project includes ready-to-use npm scripts in `package.json`.

- Run all tests in interactive mode:
    ```bash
    npm run codeceptjs
    ```
- Run tests in headless mode (no browser UI):
    ```bash
    npm run codeceptjs:headless
    ```
- Run tests in multiple browsers:
    ```bash
    npm run codeceptjs run-multiple firefox chromium webkit
    ```

---

## Demo and UI
You can also run example tests and the UI demo:

- Run demo tests:
    ```bash
    npm run codeceptjs:demo
    ```
- Run demo tests in headless mode:
    ```bash
    npm run codeceptjs:demo:headless
    ```
- Open interactive test UI:
    ```bash
    npm run codeceptjs:ui
    ```
- Demo UI:
    ```bash
    npm run codeceptjs:demo:ui
    ```

---

## Test Reporting
This project supports Allure reporting:

1. Install Allure CLI:
    ```bash
    npm install -g allure-commandline
    ```
2. Run tests with Allure plugin:
    ```bash
    npx codeceptjs run --plugins allure
    ```
3. Generate and serve the report:
    ```bash
    allure serve output
    ```

---

## Contact
This project is intended for educational and demonstration purposes.  
Questions or suggestions? Reach out via [linkedin](https://linked.in/in/nikodemgodek).
