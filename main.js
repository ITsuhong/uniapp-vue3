import App from './App'
import { createSSRApp } from 'vue'
const app = createSSRApp(App)

// 使用Vuex
import store from './store'
app.use(store)


// 自定义全局方法
import { getUnionuser } from "@/utils/config.js"
app.config.globalProperties.$isLogin = () => {
  if(!getUnionuser()) {
    uni.showModal({
      title: '温馨提示',
      content: '请先登录/注册！',
      confirmText: '确定',
      success: res => {
        if(res.confirm) {
          uni.navigateTo({ url: '/pages/login' })
        }
      }
    })
    return true
  }
}

import moment from 'moment'
app.config.globalProperties.$format = (value, format = 'YYYY-MM-DD') => value ? moment(value).format(format) : ''
// // 距离格式化
app.config.globalProperties.$distance = value => Number(value) > 1000 ? (Number(value) / 1000).toFixed(2) + 'km' : Number(value) + 'm'
// // 金额格式化
app.config.globalProperties.$decimal = (value,precision = 2) => Number(value).toFixed(precision)

export function createApp() {
  return {
    app
  }
}
