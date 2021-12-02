import * as service_oss from '@/services/oss.js';

export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    async getSTSInfo({ dispatch, state, commit, getters }, { payload }) {
      const response = await service_oss.getSTSInfo()
      return response
    }
  },
  mutations: {
    save(state, { payload }) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    }
  }
}

