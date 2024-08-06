var path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      _constants: path.resolve(__dirname, './src/_constants'),
      api: path.resolve(__dirname, './src/api'),
      assets: path.resolve(__dirname, './src/assets'),
      contexts: path.resolve(__dirname, './src/contexts'),
      components: path.resolve(__dirname, './src/components'),
      hooks: path.resolve(__dirname, './src/hooks'),
      screens: path.resolve(__dirname, './src/screens'),
      store: path.resolve(__dirname, './src/store'),
      theme: path.resolve(__dirname, './src/theme'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
}
