import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  //   collectCoverage: true,
  //   collectCoverageFrom: ["**/*.{js,jsx}", "!**/node_modules/**"],
  //   coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
  //   coverageThreshold: {
  //     global: {
  //       branches: 80,
  //       functions: 80,
  //       lines: 80,
  //       statements: -10,
  //     },
  //   },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
};

export default config;
