import Vue from 'vue'
const state = {
  message: {},
  bannerList: [],
}

const mutations = {
  message: (state, params) => {
    state.message = params;
  },
  bannerList: (state, params) => {
    state.bannerList = params;
  },
}

const actions = {
  setMessage ({commit}, params) {
    commit('message',params)
  },
  getMessage ({commit}, params = {}) {
    return Vue.iBox.http('getLastMessage')({method: 'get'})
  },
  setBannerList ({commit}, params) {
    commit('bannerList',params)
  },
  getBannerList ({commit}, params = {}) {
    return Vue.iBox.http('getBannerList')({method: 'get'})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
