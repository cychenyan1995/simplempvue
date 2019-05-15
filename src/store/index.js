// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let tokenPromise, refreshTokenTimeoutID;

const store = new Vuex.Store({
  getters: {
    token(state) {
      let tokenName = 'token';
      let tokenId = wx.getStorageSync(tokenName);
      return tokenId;
    },
    refreshToken() {
      let tokenName = 'refreshToken';
      let tokenId = wx.getStorageSync(tokenName);
      return tokenId;
    }
  },
  actions: {
    tokenReady({ getters }) {
      if (getters.token) {
        return Promise.resolve();
      } else {
        tokenPromise = tokenPromise || new Promise();
        return tokenPromise;
      }
    },
    // set access_token
    setToken({ commit, dispatch }, params) {
      let tokenName = 'token';
      wx.setStorageSync(tokenName, params.access_token);

      if (tokenPromise) {
        tokenPromise.resolve();
        tokenPromise = null;
      }

      // 提前60秒刷新 token
      clearTimeout(refreshTokenTimeoutID);
      refreshTokenTimeoutID = setTimeout(_ => {                                                    
        dispatch('getTokenByRefreshId').then(data => {
          dispatch("setToken",data);
        });
      },(params.expires_in - 60)*1000);
    },
    // set refresh_token
    setRefreshToken({ commit }, params) {
      let tokenName = 'refreshToken';
      wx.setStorageSync(tokenName, params.refresh_token);
    },
    // get access_token by refresh_token
    async getTokenByRefreshId({ commit, getters }, params = {}) {
      let refreshId = getters['refreshToken'];
      params.refresh_token = refreshId;

      let result = await Vue.iBox.http('getTokenByRefreshId', params)({ method: 'post' }, { errorAction: true }).catch(err => {
        // 获取失败，无效 refresh_token，
        wx.showToast({
          title: '登录过期，请重新登录!',
          icon: 'none',
          mask: true
        });

        if (tokenPromise) {
          tokenPromise.reject();
          tokenPromise = null;
        }

        setTimeout(_ => wx.redirectTo({ url: '/pages/login/index' }));
      });

      return result;
    },
    // login, get access_token & refresh_token
    login({ commit, getters }, params = {}) {
      return Vue.iBox.http('login', params)({ method: 'post' })
    },
    // logout, 清除本地缓冲 access_token & refresh_token
    logout({ commit, getters }, params = {}) {
      let token = 'token';
      let refreshToken = 'refreshToken';

      wx.removeStorageSync(token);
      wx.removeStorageSync(refreshToken);
      wx.redirectTo({ url: '/pages/login/index' });
    },
  },
})

const storeContext = require.context('@/store/modules', true, /\.js$/)

storeContext.keys().forEach((modules) => {
  store.registerModule(modules.replace(/(^\.\/)|(\.js$)/g, ''), storeContext(modules).default)
})

Vue.prototype.$store = store
export default store
