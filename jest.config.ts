module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust this to match your source code directory
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Path to your tsconfig.json file
    },
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/*.d.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/setupTests.ts", // Update this if your setupTests file is named differently
  ],
};
