import Vue from 'vue'
const state = {
  messageList: {}
}

const mutations = {
  messageList: (state, params) => {
    state.messageList = params;
  },
}

const actions = {
  setMessageList ({commit}, params) {
    commit('messageList',params)
  },
  getMessageList ({commit}, params = {}) {
    return Vue.iBox.http('getMessageList')({method: 'get'})
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
