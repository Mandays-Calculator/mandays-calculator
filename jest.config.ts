import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "js", "node"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "^~/(.*)": "<rootDir>/src/$1",
    "@mui/system/(.*)": "<rootDir>/node_modules/@mui/system/$1",
  },
  forceCoverageMatch: ["**/*.ts", "**/*.tsx"],
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "src/components/common/**/*.(ts|tsx)",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/*.json",
    "!**/*.d.ts",
    "!vite.config.ts",
  ],
};

export default config;
