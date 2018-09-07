const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve('./src/index.js')
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    hotOnly: true,
    compress: true,
    https: false,
    proxy: {
      '/preview': 'http://localhost:4000',
      '/share': 'http://localhost:4000',
      '/result': 'http://localhost:4000',
    }
  },
  optimization: {
    noEmitOnErrors: false,
    nodeEnv: 'development',
    // minimizer: [
    //   new UglifyJsPlugin()
    // ],
    // splitChunks: {
    //   chunks: 'async',
    //   maxAsyncRequests: 3,
    //   maxInitialRequests: 3,
    //   name: true,
    //   automaticNameDelimiter: '.',
    //   cacheGroups: {
    //     node_vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: 'initial',
    //       maxSize: 1000000,
    //       minSize: 300000,
    //       priority: 1
    //     }
    //   },
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      './data/lang.json',
      './data/map.json'
    ]),
    new BundleAnalyzerPlugin({
      analyzerPort: '3001',
      openAnalyzer: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.png$/,
        use: 'url-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=4000&name=[name].[ext]'
      }
    ]
  }
};
