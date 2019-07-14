const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    clipboard: './src/index.js'
  },
  output: {
    // filename: '[name].[hash:5].js',
    filename: '[name].min.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@const': path.resolve(__dirname, './src/const'),
      '@api': path.resolve(__dirname, './src/api'),
      '@exts': path.resolve(__dirname, './src/extend')
    } 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 version']
                }
              }]
            ],
            plugins: [
              '@babel/plugin-proposal-optional-chaining'
            ]
          },
        },
        exclude: '/node_module/'
      }
    ]
  }
}