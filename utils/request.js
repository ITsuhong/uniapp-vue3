import { requestUrl, getToken } from '@/utils/config';
import md5 from 'md5';

let isShowModal = false
export default function request(url, option) {
  const { data, method, requestType } = option
  for (let key in data) {
    if (data[key] == undefined) {
      delete data[key]
    }
  }
  if (url.substr(0, 4) != 'http')
    url = requestUrl + url
  console.log(url, data)
  const timestamp = new Date().getTime()
  return uni.request({
    url,
    data,
    method: method?.toUpperCase() || 'GET',
    header: {
      'Content-Type': requestType == 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
      'token': getToken() || '',
      'api-version': 1,
      timestamp,
      apiSecret: md5(md5(timestamp + "ccys")),
      
    },
  }).then(([error,res]) => {
    // console.log(error,res,123)
    if (res.statusCode == 200) {
      return res.data
    } else if (res.statusCode == 401) {
      uni.removeStorageSync('unionuser');
      uni.removeStorageSync('token');
      uni.hideLoading() //清除有可能存在的showLoading效果
      uni.hideToast() //清除有可能存在的showTaost效果
      if (!isShowModal) {
        isShowModal = true
        uni.showModal({
          title: '注意',
          content: '您的账号已在其他设备登录/已被冻结！',
          showCancel: false,
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
              isShowModal = false
            }
          }
        })
      }
      throw res
    } else {
      if (!isShowModal) {
        isShowModal = true
        uni.showModal({
          title: String(res.data.status),
          content: res.data.error,
          showCancel: false,
          confirmText: '知道了',
          success: res => {
            if (res.confirm) {
              isShowModal = false
            }
          }
        })
      }
      throw res
    }
  }).catch(res => {
    console.log(res, 999)
    if (!isShowModal) {
      isShowModal = true
      uni.showModal({
        title: '网络错误',
        content: res.errMsg || 'net::ERR_FAILED',
        showCancel: false,
        confirmText: '知道了',
        success: res => {
          if (res.confirm) {
            isShowModal = false
          }
        }
      })
    }
    throw res
  });
};
