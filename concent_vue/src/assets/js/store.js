import Vue from 'vue'
import Vuex from 'vuex'
import { _const } from './const.js'
Vue.use(Vuex)

const state = {
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

const mutations = {
  reduceCount(state, index) {
    let newVal = state.messageCount[index] - 1
    newVal = newVal < 0 ? 0 : newVal
    state.messageCount.splice(index, 1, newVal)
  },
  // 设置行政工作，待阅，消息的未读数量
  setMessageCount(state, data) {
    state.messageCount.splice(0, 1, Number(data.todonum))
    state.messageCount.splice(1, 1, Number(data.xztznum))
    state.messageCount.splice(2, 1, Number(data.readnum))
    state.messageCount.splice(3, 1, Number(data.sysmnum))
  }
}

export default new Vuex.Store({
  state,
  mutations
})
