import * as services_sys from "@/services/sys.js"
export default {
  namespaced: true,
  state: {
    apkInfo: {},
    haveNew: false
  },
  getters: {},
  actions: {
    async checkAndroidUpdate({ dispatch, state, commit, getters }, { payload }) {
      const response = await services_sys.checkAndroidUpdate({ ...payload })
      if(response?.code == 200) {
        commit({
          type: 'save',
          payload: {
            apkInfo: response.data
          }
        })
        plus.runtime.getProperty(plus.runtime.appid, res => {
          // console.log(res.version);
          if(res.version != response.data?.newVersion){
            setTimeout(() => uni.getSubNVueById('appUpdate').show(),500); 
            commit({ type: 'save', payload: { haveNew: true } })
          }
        });
      }
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
