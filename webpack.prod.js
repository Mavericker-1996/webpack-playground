'use strict';

const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取 css 到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩 css 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 构建前清空构建目录
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成 html，并进行压缩
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') //提取外部资源

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  // 找到符合条件的路径
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  // console.log('entryFiles', entryFiles);
  //entryFiles [ '/Users/zuoqi/Desktop/Codes/postcss-test-project/src/index/index.js', '/Users/zuoqi/Desktop/Codes/postcss-test-project/src/search/index.js' ]

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
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
  },
  externals: {
    '@txdfe/at': 'var AT',
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
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ].concat(htmlWebpackPlugins).concat([
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: '//cdn.jsdelivr.net/npm/react@16.12.0/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: '//cdn.jsdelivr.net/npm/react-dom@16.12.0/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
        {
          module: '@txdfe/at',
          entry: '//cdn.jsdelivr.net/npm/@txdfe/at@1.3.1/build/at.min.js',
          global: 'AT',
        },
      ],
    })
  ]),
  mode: 'production',
};