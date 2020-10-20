// https://github.com/michael-ciniawsky/postcss-load-config

// module.exports = {
//   "plugins": {
//     "postcss-import": {},
//     "postcss-url": {},
//     // to edit target browsers: use "browserslist" field in package.json
//     "autoprefixer": {}
//   }
// }
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": { 
      "viewportWidth": 1280,    // 设计稿的视口宽度 
      viewportHeight: 720,
      "minPixelValue": 1 ,  // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: true,
    }

  }
}
