/* eslint-disable @typescript-eslint/no-var-requires */
// const CracoAlias = require('craco-alias');

// module.exports = {
//   plugins: [
//     {
//       plugin: CracoAlias,
//       options: {
//         source: 'options',
//         baseUrl: './',
//         aliases: {
//           '@api': './src/api',
//           '@components': './src/components',

//           '@reuse_button': './src/components/Buttons',
//           '@reuse_modal': './src/components/Modals',

//           '@constants': './src/constants',
//           '@data': './src/data',
//           '@page': './src/pages',

//           '@auth': './src/pages/Auth',

//           '@board': './src/pages/Board',
//           '@board_component': './src/pages/Board/components',

//           '@main': './src/pages/Main',
//           '@main_component': './src/pages/Main/components',

//           '@user': './src/pages/UserProfile',

//           '@store': './src/store',
//           '@styles': './src/styles',
//           '@utils': './src/utils',
//         },
//       },
//     },
//   ],
//   jest: {
//     configure: {
//       globals: {
//         CONFIG: true,
//         collectCoverage: true,
//       },
//       roots: ['<rootDir>/src'],
//     },
//   },
// };
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
