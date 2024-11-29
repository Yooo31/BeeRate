export default {
  projects: [
    '<rootDir>/apps/frontend/jest.config.ts',
    '<rootDir>/apps/backend/jest.config.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
