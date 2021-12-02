import * as services_home from "@/services/home.js"

export default {
  namespaced: true,
  state: {
    bannerList: [],
    noticeList: [],
    rushGoodsList: [],
    typeList: [],
    homeData: {},
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    goodsList: []
  },
  getters: {},
  actions: {
    async query({ dispatch, state, commit, getters }, { payload }) {
      const response = await services_home.query({ ...payload })
      if(response?.code == 200) {
        commit({
          type: 'save',
          payload: {
            bannerList: response.data.bannerList,
            noticeList: response.data.noticeList,
            rushGoodsList: response.data.rushGoodsList,
            typeList: response.data.typeList,
            homeData: response.data
          }
        })
      }
      return response
    },
    async queryGoodsList({ dispatch, state, commit, getters }, { payload }) {
      const { pagination: { current, pageSize }, goodsList } = state;
      const response = await services_home.queryGoodsList({ type: 1, pageSize, pageNum: current, ...payload })
      // console.log(response)
      if(response?.code == 200) {
        commit({
          type: 'save',
          payload: {
            goodsList: payload?.pageNum > 1 ? goodsList.concat(response.data.list) : response.data.list,
            pagination: {
              current: response.data.pageNum,
              pageSize: response.data.pageSize,
              total: response.data.total
            }
          }
        })
      }
      return response
    },
    async service({ dispatch, state, commit, getters }, { payload, service }) {
      const response = await services_home[service]({ ...payload })
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
