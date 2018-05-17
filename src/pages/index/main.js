import Vue from 'vue'
import App from './index'
import store from '@/store'

const app = new Vue({
    store,
    ...App
})
app.$mount()
// 顶部标题
export default {
  config: {
    navigationBarTitleText: '本地看看'
  }
}