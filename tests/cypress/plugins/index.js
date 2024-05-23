// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = on => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
            },
          },
          {
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        extensionAlias: {
          '.js': ['.js', '.ts'],
        },
      },
    },
  }

  on('file:preprocessor', webpackPreprocessor(options))
}
