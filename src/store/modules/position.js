import Vue from 'vue'
const state = {
  locusList: [],
  locusDetail: {},
}

const mutations = {
  locusList: (state, params) => {
    state.locusList = params;
  },
  locusDetail: (state, params) => {
    state.locusDetail = params;
  },
}

const actions = {
  setLocusList ({commit}, params) {
    commit('locusList',params)
  },
  getLocusList ({commit}, params = {}) {
    return Vue.iBox.http('getLocusList')({method: 'get'})
  },
  setLocusDetail ({commit}, params) {
    commit('locusDetail',params)
  },
  getLocusDetail ({commit}, params = {}) {
    return Vue.iBox.http('getLocusDetail', params)({method: 'get'})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
