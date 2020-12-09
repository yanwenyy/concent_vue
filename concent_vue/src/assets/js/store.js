import Vue from 'vue'
import Vuex from 'vuex'
import { _const } from './axios.js'
import axios from 'vuex'
Vue.use(Vuex)

const state = {
  optiondata:[],
  dialogState: 'edit',
  num: 0,
  postGrade: '',
  collapsed: true,
  topNavState: '',
  leftNavState: '',
  account: '',
  route: '',
  projectroute: '',
  _const: _const,
  // curProjectId: '1d8283451c7b8b4e56fc62744e74f7ba'
  curProjectId: '11484beb7ca57f78b1773381547ec24d ',
  messageCount: []
}

const getters = {
  getToolData(state) {
    return state.toolBarData
  }

}
const mutations = {
  setToolData(state, data) {
    // 添加标签按钮，如果当前路由已经打开，则不再重复添加
    Vue.prototype.$http.post('http://36.112.155.134:9901/System/system/category/v1.0/wholetreeNew').then(res => {
      state.optiondata = res.data.data
        })
  },

}


const actions = {
  getConfig({ commit }, data) {
    commit('setToolData', data)

  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
