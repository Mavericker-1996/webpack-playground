'use strict';
module.exports = {
  ident: 'postcss',
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        remove: false,
      },
      // 如果要添加polyfill, 详见https://preset-env.cssdb.org/features#stage-3
      stage: false,
    }),
    require('@txdfe/postcss-at-theme-cssvar'),
  ],
};
