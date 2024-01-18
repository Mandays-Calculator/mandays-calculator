# 📊 Mandays Calculator

A software tool designed to assist project managers and team leaders in estimating and tracking the manpower required to complete a project.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage & Contributing](#usage--contributing)
- [Tech Stack](#tech-stack)
- [VS Code Extensions](#vs-code-extensions)

## Overview

It is particularly useful in industries where projects are planned and executed based on the number of working days required (mandays) for completion.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   `git clone https://github.com/Mandays-Calculator/mandays-calculator.git`

2. Navigate to the project directory:
   `cd mandays-calculator`

3. Install the project dependencies:
   `npm install`

4. Update your configuration by adding .env file (you can ask your lead for the reference file):

VITE_ENVIRONMENT=""
VITE_KEY=""
VITE_IV=""

5. Start the development server:
   `npm run dev`

> **Note**: The environment can be changed in the `.env` file. Use the `VITE_ENVIRONMENT` variable to set your desired environment.

### Creating and Running Tests

1. Create a test file for page or component under `src/__tests__`
   example: ComponentToBeTest.test.tsx

2. Test your test file via:
   `npm run test` or `npm run test-dev` [Generates a coverage]

## Usage & Contributing

Before making any contributions, please read our [coding standards](./CODING_STANDARDS.md).

- Components: `/src/components`
- Pages: `/src/pages`
- Internationalization: Use i18n for all text and labels. Refer to [src/i18n].
- Testing: Ensure >80% coverage for all features/components/screens.
- Development: Use [dev] as the base branch.
- Branch Naming: Follow the pattern `[feature/${feature-name}]`.

## Tech Stack

#### Core Technologies

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/)
- [Jest](https://jestjs.io/)
- [Redux](https://redux.js.org/)

#### **Routing:**

- [react-router-dom](https://reactrouter.com/web/guides/quick-start)

#### **API Integration:**

- [react-query](https://tanstack.com/query/v3/)
- [axios](https://axios-http.com/)

#### **Utilities:**

- [lodash](https://lodash.com/)
- [moment](https://momentjs.com/)

#### **Validations and Form Handling:**

- [yup](https://github.com/jquense/yup)
- [formik](https://formik.org/)

#### **State Management:**

- [react-redux](https://react-redux.js.org/)

#### **Translation & Internationalization:**

- [i18next](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

#### **UI & Styling:**

- [MUI](https://mui.com/)
- [@emotion/react](https://emotion.sh/docs/@emotion/react)
- [@emotion/styled](https://emotion.sh/docs/@emotion/styled) or [styled-components](https://styled-components.com/)

#### **Unit testing**

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## VS Code Extensions

To enhance your development experience, consider using these VS Code extensions:

- [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Integrates ESLint JavaScript into VS Code.
- [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code formatter using prettier.
- [**React**](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native): Provides IntelliSense, debugging, and more for React.
- [**GitLens**](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): Supercharge the Git capabilities built into Visual Studio Code.
- [**ES7+ React/Redux/React-Native snippets**](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets): Provides JavaScript and React/Redux snippets in ES7 with Babel plugin features

By using these extensions, you can ensure code consistency and enhance productivity when working on the project.
