const fs = require('fs')
const path = require('path')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'

const app = express()

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

const router = isProd ? require('./prod.ssr') : require('./dev.ssr')
app.use(router.routes()).use(router.allowedMethods())

app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
// app.use('/manifest.json', serve('./manifest.json', true))

// function render (req, res) {
//   const s = Date.now()

//   res.setHeader("Content-Type", "text/html")

//   const handleError = err => {
//     if (err.url) {
//       res.redirect(err.url)
//     } else if(err.code === 404) {
//       res.status(404).send('404 | Page Not Found')
//     } else {
//       // Render Error Page or Redirect
//       res.status(500).send('500 | Internal Server Error')
//       console.error(`error during render : ${req.url}`)
//       console.error(err.stack)
//     }
//   }

//   const context = {
//     title: 'Vue HN 2.0', // default title
//     url: req.url
//   }
//   renderer.renderToString(context, (err, html) => {
//     if (err) {
//       return handleError(err)
//     }
//     res.send(html)
//     if (!isProd) {
//       console.log(`whole request: ${Date.now() - s}ms`)
//     }
//   })
// }


const port = process.env.PORT || 9080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
module.exports = app
