'use strict';

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取 css 到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩 css 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 构建前清空构建目录
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html，并进行压缩

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader, //使用 MiniCssExtractPlugin 就不用 style-loader 了，作用冲突
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // 结合resolve-url-loader使用必填，详见https://www.npmjs.com/package/resolve-url-loader
              prependData: '@import "~@txdfe/at-theme/teambition/scss/index.scss";\n',
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        removeComments: true,
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: ['search'],
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        removeComments: true,
      }
    })
  ],
  mode: 'production',
};