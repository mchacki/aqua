const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const nodeModules = path.resolve(path.join(__dirname, 'node_modules'));

module.exports = [
  {
    mode: 'development',
    entry: './src/main.ts',
    target: 'electron-main',
    module: {
      rules: [{test: /\.ts$/, include: /src/, use: [{loader: 'ts-loader'}]}]
    },
    output: {path: __dirname + '/dist', filename: 'electron.js'}
  },
  {
    mode: 'development',
    entry: './src/react.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
      rules: [
        {test: /\.ts(x?)$/, include: /src/, use: [{loader: 'ts-loader'}]}, {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader', {loader: 'css-loader', options: {importLoaders: 1}},
            'sass-loader'
          ],
        }
      ]
    },
    output: {path: __dirname + '/dist', filename: 'queryAnalyzer.js'},
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],
    watch: true,
    resolve: {extensions: ['.js', '.ts', '.tsx']},
  }
];