module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // transformIgnorePatterns: ['/node_modules/(?!culori).+\\.js$'],
  // transform: {
  //   '^.+\\.[t|j]sx?$': 'babel-jest',
  // },
};
