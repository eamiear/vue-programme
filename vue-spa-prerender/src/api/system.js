import service from '@/common/fetch'

const SystemAPI = {
  list () {
    return service.post({
      url: '/list'
    })
  },
  search(keyword) {
    return service.post({
      url: '/search',
      data: {keyword}
    })
  }
}
export default SystemAPI
