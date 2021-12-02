import App from './App'
import { createSSRApp } from 'vue'
const app = createSSRApp(App)

// 使用Vuex
import store from './store'
app.use(store)

// 引入uView
import uView from "./uni_modules/vk-uview-ui"; //vue3不支持uview，所以用了社区的vk-uview-ui https://ext.dcloud.net.cn/plugin?id=6692
app.use(uView);

// 自定义原型链方法
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

//校验权限弹窗提示打开设置
app.config.globalProperties.$checkPermission = ({ iOS, Android, WEIXIN }) => {
  // #ifdef APP-PLUS
  const permision = require('@/static/app-plus/permission.js')
  // #endif
  const modal = () => {
    uni.showModal({
      title: '温馨提示',
      content: '请到设置中打开相关权限',
      confirmText: '确定',
      success: res => {
        if(res.confirm) {
          // #ifdef APP-PLUS
          permision.gotoAppPermissionSetting()
          // #endif
          // #ifdef MP-WEIXIN
          uni.openSetting();
          // #endif
        }
      }
    })
  }
  return new Promise((resolve) => {
    // #ifdef APP-PLUS
    switch (plus.os.name) {
      case 'iOS':
        if(iOS) {
          if(!permision.judgeIosPermission(iOS)) {
            modal()
            resolve(false)
          } else {
            resolve(true)
          }
        }
        break;
      case 'Android':
        if(Android) {
          permision.requestAndroidPermission(Android).then(status => {
            if(status !== 1) {
              modal()
              resolve(false)
            } else {
              resolve(true)
            }
          });
        }
        break;
      default:
        break;
    }
    // #endif
    // #ifdef MP-WEIXIN
    if(WEIXIN) {
      uni.getSetting({
        success: res => {
          if(!res.authSetting[WEIXIN]) {
            modal()
            resolve(false)
          } else {
            resolve(true)
          }
        }
      });
    }
    // #endif
  })
}


// 自定义 Vue 全局方法
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
