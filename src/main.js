import '@/mock'
import Vue from 'vue'
import App from '@/App'
import store from '@/store'

// 加载 tabbar 的图片
['home', 'message', 'mine'].forEach(item => {
  require(`@/assets/images/tab_${item}.png`);
  require(`@/assets/images/tab_${item}-active.png`);
});
['0','1','2','3'].forEach(item => {
  require(`@/assets/images/tab_ycar${item}.png`);
});

Vue.config.productionTip = false

import IboxPlugin from '@/plugins/ibox'
Vue.use(IboxPlugin)

const app = new Vue({
  store,
  ...App
})

app.$mount()

export default {
  config: {
    pages: ['^pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
    },
    tabBar: {
      color: '#7A7A7A',
      selectedColor: '#017AFF',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'static/images/tab_home.png',
        selectedIconPath: 'static/images/tab_home-active.png',
      }, {
        pagePath: 'pages/message/index',
        text: '信息中心',
        iconPath: '/static/images/tab_message.png',
        selectedIconPath: '/static/images/tab_message-active.png',
      }, {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: '/static/images/tab_mine.png',
        selectedIconPath: '/static/images/tab_mine-active.png',
      }]
    }
  }
}
