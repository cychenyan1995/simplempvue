import Vue from 'vue'
const state = {
  myInfo: {},
  orderInfoList :[],
  orderDetail: {},
}

const mutations = {
  myInfo: (state, params) => {
    state.myInfo = params;
  },
  orderDetail: (state, params) => {
    state.orderDetail = params;
  },
  orderInfoList: (state, params) => {
    state.orderInfoList = params;
  },
}

const actions = {
  setMyInfo ({commit}, params) {
    commit('myInfo',params)
  },
  getMyInfo ({commit}, params = {}) {
    return Vue.iBox.http('getMyInfo')({method: 'get'})
  },
  setOrderInfoList ({commit}, params) {
    commit('orderInfoList',params)
  },
  getOrderInfoList ({commit}, params = {}) {
    return Vue.iBox.http('getOrderInfoList',params)({method: 'get'})
  },
  setOrderDetail ({commit}, params) {
    commit('orderDetail',params)
  },
  getOrderDetail ({commit}, params = {}) {
    return Vue.iBox.http('getOrderDetail',params)({method: 'get'})
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
