/* eslint-disable */
import axios from 'axios'
import QS from 'qs'

const service = axios.create({
  baseURL: 'http://120.76.73.203:2001/ura/qiniu/file/',
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json; charset=utf-8'
  // },
  timeout: 16000
})

service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(({data}) => {
  return data
}, error => {
  return Promise.reject(error)
})

service.getRequestUrl = (url) => {
  const baseURL = process.env.BASE_API
  return baseURL + url
}

const request = {
  getRequestUrl (url) {
    const baseURL = process.env.BASE_API
    return baseURL + url
  },
  get (url, params) {
    return service({
      method: 'get',
      url,
      params
    })
  },
  // url, data, json = false, serials = true
  post (params) {
    let config = {
      method: 'post',
      url: params.url,
      data: params.data
    }
    if (params.json) {
      config.headers = {
        'Content-Type': 'application/json; charset=utf-8'
      }
      config.transformRequest = [function (data) {
        // 对 data 进行任意转换处理
        // 后台使用@RequestParam接收参数时，post请求需要接收 username=xxx&password=xxx的格式
        return JSON.stringify(data)
      }]
    } else {
      config.transformRequest = [function (data) {
        // 对 data 进行任意转换处理
        // 后台使用@RequestParam接收参数时，post请求需要接收 username=xxx&password=xxx的格式
        return QS.stringify(data)
      }]
    }
    return service(config)
    // return service({
    //   method: 'post',
    //   url,
    //   data: data,
    //   // `transformRequest` 允许在向服务器发送前，修改请求数据
    //   // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    //   // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    //   transformRequest: [function (data) {
    //     // 对 data 进行任意转换处理
    //     // 后台使用@RequestParam接收参数时，post请求需要接收 username=xxx&password=xxx的格式
    //     return serials ? (json ? JSON.stringify(data) : QS.stringify(data)) : data
    //   }]
    // })
  }
}
export default request
