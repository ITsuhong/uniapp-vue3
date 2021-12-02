import Vue from 'vue'
import { createStore } from 'vuex'
import createLoadingPlugin from "@/utils/vuex-loading.js";

import oss from './oss.js'
import global from './global.js'
import sys from './sys.js'

import home from './index/home.js'

const store = createStore({
  plugins: [createLoadingPlugin()],
  modules: {
    oss,
    global,
    sys,
    
    home,
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {},
})

export default store
