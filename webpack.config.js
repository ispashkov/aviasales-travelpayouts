const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ mode }) => {
  const isProd = mode === 'production'

  return {
    mode,
    target: 'web',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'tpo-widget.js',
      library: 'TpoWidget',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    devServer: {
      static: path.join(__dirname, 'build'),
      compress: true,
      port: 8080,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.([jt])s?$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: [
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                fix: true,
              },
            },
          ],
        },
        {
          test: /\.([jt])s?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: !isProd,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
      }),
      new MiniCssExtractPlugin({
        filename: 'tpo-widget.css',
      }),
    ],
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.ts', '.json', '.css'],
    },
  }
}
