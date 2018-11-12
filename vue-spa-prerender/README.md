# vue-spa-prerender

## router配置
```javascript
const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? 'prerender' : '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    name: 'home',
    path: '/',
    desc: '首页',
    component: () => import('@/views/dashboard/index')
  },
  ...
  ]
})
```

```javascript
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
      // For example: /dist/dir/special/index.html -> /dist/dir/special.html
      if (renderedRoute.route.endsWith('.html')) {
        renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
      }

      return renderedRoute
    },
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({

    })
  })
]

```

## nginx 配置
```
location /prerender {
	alias  html/prerender;
	index  index.html index.htm;
	try_files $uri $uri/ /prerender/index.html;
}
```


[prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)
[history-mode](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)
[how-to-pre-render-vue-powered-websites-with-webpack](https://markus.oberlehner.net/blog/how-to-pre-render-vue-powered-websites-with-webpack/)
[how-to-pre-render-vue-powered-websites-with-webpack|github](https://github.com/maoberlehner/how-to-pre-render-vue-powered-websites-with-webpack)
[vue-js-seo-prerender-example](https://snipcart.com/blog/vue-js-seo-prerender-example)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
