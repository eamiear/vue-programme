# vue-spa-history-mode
> vue-router history 模式

## 
1. vue-cli 3.0

## router配置
```javascript
const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? 'cdn' : '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    name: 'home',
    path: '/',
    desc: '首页',
    component: () => import('@/views/dashboard/index')
  }]
})
```

## nginx 配置
```
location /cdn {
	alias  html/cdn;
	index  index.html index.htm;
	try_files $uri $uri/ /cdn/index.html;
}
```


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
