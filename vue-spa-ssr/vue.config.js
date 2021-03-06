const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const clientConfig = require('./config/webpack.dev')
// const serverConfig = require('./config/webpack.server')

// node or browser
const NODE_END = process.env.VUE_ENV === 'server'
const target = NODE_END ? 'server' : 'client'

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // configureWebpack: target === 'server' ? serverConfig : clientConfig
  configureWebpack: {
    entry: `./src/entry-${target}.js`,
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: NODE_END ? 'node' : 'web',

    node: NODE_END ? undefined : false,

    // 对 bundle renderer 提供 source map 支持
    devtool: NODE_END ? 'source-map' : false,

    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
      libraryTarget: NODE_END ? 'commonjs2' : undefined
    },
    externals: NODE_END ? nodeExternals({
      // 不要外置化 webpack 需要处理的依赖模块。
      // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
      // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
      whitelist: /\.css$/
    }) : undefined,

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
      NODE_END ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ]
  }
}
