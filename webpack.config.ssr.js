const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  devtool: 'eval',
  name: 'server',
  target: 'node',
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
  },
  optimization: {
    noEmitOnErrors: true,
    nodeEnv: 'production'
  },
  // externals: ['react-helmet'],
  externals: [nodeExternals()],
  entry: './server/server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.join(__dirname, 'server'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
