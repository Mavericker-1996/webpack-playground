'use strict';

const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取 css 到单独文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html，并进行压缩
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') //提取外部资源

// console.log(path.resolve(__dirname, './dist')); // /Users/zuoqi/Desktop/Codes/postcss-test-project/dist
// console.log(path.join(__dirname, './dist')); // /Users/zuoqi/Desktop/Codes/postcss-test-project/dist
// console.log(path.resolve(__dirname, '/dist')); // /dist
// console.log(path.join(__dirname, '/dist')); // /Users/zuoqi/Desktop/Codes/postcss-test-project/dist
// console.log(path.resolve(__dirname, 'dist')); // /Users/zuoqi/Desktop/Codes/postcss-test-project/dist
// console.log(path.join(__dirname, 'dist')); // /Users/zuoqi/Desktop/Codes/postcss-test-project/dist

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  // 找到符合条件的路径
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  console.log('entryFiles', entryFiles);

  entryFiles.forEach(entryFile => {
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          removeComments: true,
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins,
  }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
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
              limit: 10240, // 小于 10kb 采用 base64 编码，减少 http 请求次数
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[id].css',
    }),
  ].concat(htmlWebpackPlugins).concat([
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: '//cdn.jsdelivr.net/npm/react@16.12.0/umd/react.development.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: '//cdn.jsdelivr.net/npm/react-dom@16.12.0/umd/react-dom.development.js',
          global: 'ReactDOM',
        },
      ],
    })
  ]),
  mode: 'development',
};