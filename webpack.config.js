'use strict';

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取 css 到单独文件

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].[id].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].css',
    }),
  ],
  mode: 'production',
};