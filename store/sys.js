import * as services_sys from "@/services/sys.js"
import { setUnionuser, setToken } from "@/utils/config.js"
export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    async login({ dispatch, state, commit, getters }, { payload }) {
      const response = await services_sys.login({ ...payload })
      if(response?.code == 200) {
        setUnionuser(response.data)
        setToken(response.data.token)
        dispatch('shopCar/refreshShopCarCount', {}, { root: true }) //刷新购物车数据
        uni.navigateBack()
      } else {
        uni.showToast({ title: res.msg, icon: 'none', mask: true })
      }
      return response
    },
    async service({ dispatch, state, commit, getters }, { payload, service }) {
      const response = await services_sys[service]({ ...payload })
      return response
    },
  },
  mutations: {
    save(state, { payload }) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    }
  }
}
