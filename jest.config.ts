import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",

  // Test Environment Setup
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Modules & Transformations
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Test Matching & Path Resolution
  testMatch: ["<rootDir>/src/**/*.test.tsx"], // Explicitly looking in 'src' directory
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "^~/(.*)": "<rootDir>/src/$1",
    "@mui/system/(.*)": "<rootDir>/node_modules/@mui/system/$1",
  },

  // Coverage Configuration
  collectCoverage: true,
  forceCoverageMatch: ["<rootDir>/src/**/*.test.(ts|tsx|js|jsx)"],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.(ts|tsx)",
    "!<rootDir>/node_modules/**",
    "!<rootDir>/coverage/**",
    "!<rootDir>/**/*.json",
    "!<rootDir>/**/*.d.ts",
    "!<rootDir>/vite.config.ts",
  ],
};

export default config;
