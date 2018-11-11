const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: ['/', '/fashionWeek.html', '/table.html', '/carousel.html', '/progress.html'],
    postProcess (renderedRoute) {
      // Ignore any redirects.
      renderedRoute.route = renderedRoute.originalRoute
      // Basic whitespace removal. (Don't use this in production.)
      renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')
      // Remove /index.html from the output path if the dir name ends with a .html file extension.
      // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
      // console.log('------ ', renderedRoute)
      if (renderedRoute.route.endsWith('.html')) {
        // console.log('------ ', renderedRoute)
        renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
      }

      return renderedRoute
    },
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      // We need to inject a value so we're able to
      // detect if the page is currently pre-rendered.
      // inject: {},
      // Our view component is rendered after the API
      // request has fetched all the necessary data,
      // so we create a snapshot of the page after the
      // `data-view` attribute exists in the DOM.
      // renderAfterElementExists: '[data-view]',
    })
  })
]

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  }
}
