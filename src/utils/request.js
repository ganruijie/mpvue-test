import wx from './wx'
// 运行时报错（flyio）
// fs in ./~/flyio/src/node/index.js, ./~/request/lib/har.js and 2 others
// dgram in ./~/sntp/lib/index.js, ./~/native-dns/lib/server.js and 2 others
// webpack.base.conf.js文件里面配置
//  alias: {
//       'vue': 'mpvue',
//       '@': resolve('src'),
//       'flyio': 'flyio/dist/npm/wx'
//     },
import Fly from 'flyio'

const request = new Fly()

request.config.timeout = 10*1000
console.log(process.env.METHOD,'process.env.METHOD')
if(process.env.METHOD === 'proxy1'){
     request.config.baseURL = 'http://localhost:3008/douban' // 本地代理1(100次/小时)
} else if (process.env.METHOD === 'proxy2') {
  request.config.baseURL = 'http://localhost:3009' // 本地代理2(100次/小时)
} else if (process.env.METHOD === 'nginx') {
  request.config.baseURL = 'https://movie.douban.gusaifei.com/v2/movie' // nginx 代理(100次/小时)
}else{
  request.config.baseURL = 'http://localhost:3008/douban' // 本地代理1(100次/小时)
}

request.interceptors.request.use((request) => {
  wx.showLoading({ title: '拼命加载中...' })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request