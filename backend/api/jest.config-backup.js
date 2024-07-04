/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: "v8",
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/tests/**/*.spec.(ts|js)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.(ts|js)?$": "ts-jest"
  },
};
