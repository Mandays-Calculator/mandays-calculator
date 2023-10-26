# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Mandays Calculator

The Mandays Calculator is a software tool designed to assist project managers and team leaders in estimating and tracking the manpower required to complete a project. It is particularly useful in industries where projects are planned and executed based on the number of working days required (mandays) for completion.

## Getting Started

To get started with this project on your local machine, follow these steps:

### Prerequisites

- [Node.js] (https://nodejs.org/)
- [npm] comes with nodejs.

### Installation

1. Clone the repository to your local machine:

   git clone https://github.com/Mandays-Calculator/mandays-calculator.git   

2. Navigate to the project directory:
   
   cd mandays-calculator

3. Install the project dependencies:

   npm install   

4. Start the development server:
   
   npm run dev
   

The application will be running at [http://127.0.0.1:5173](http://127.0.0.1:5173).

**Note**: The environment can be changed in [<rootDirectory>/.env]

## Usage and Contributing

- [/src/components] : All reusable React components 

- [/src/pages]      : Components that represents individual pages

- Use [i18n]Internalization for all text and labels (refer to [src/i18n])

- Make sure to create a test file with a >80% coverage for all feature/component/screen development

- For development branch, make sure to use [dev] branch as a base branch

- Use the standard branch naming in creating a new feature branch [feature/${feature-name}]

- Make sure you have two or more approvers on your PR before merging your branch to [dev]

## Tech Stack

- [React]
- [TypeScript]
- [MUI]
- [Jest]
- [Redux]

## VS Code Extensions

- [ESLint]
- [Prettier]
- [React]
- [GitLens]
