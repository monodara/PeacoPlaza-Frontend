// jest.config.js
module.exports = {
    setupFiles: ['./jest.polyfills.js'],
}
// module.exports = {
// //   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   setupFiles: ['./jest.polyfills.js'],
//   globals: {
//     Uint8Array: Uint8Array,
//   },
//   transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
//   transform: {
//     '^.+.[tj]sx?$': [
//       'babel-jest',
//     ],
//   },
// };