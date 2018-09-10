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
      },
      {
        test: /\.less$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'less-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=4096&name=[name].[ext]']
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=100000&name=[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(mp4|m4v)$/,
        loader: 'file-loader'
      },
      {
        test: /\.md$/,
        loader: 'markdown-with-front-matter-loader'
      },
    ]
  }
};
