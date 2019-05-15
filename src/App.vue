<script>
  import { mapState, mapActions } from 'vuex';
  require('./assets/less/reset.wxss')
  require('./assets/less/common.less')

  export default {
    mpType: 'app',
    methods: {
      ...mapActions([
        'setToken',
        'getTokenByRefreshId',
      ]),
    },
    created() {
      // 调用登录接口
      wx.login({
        success: (res) => {
          if (res.code) {
            this.getTokenByRefreshId({ code: res.code }).then(data => {
              this.setToken(data);
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }

</script>
<style lang="less">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /*padding: 200rpx 0;*/
    box-sizing: border-box;
  }

</style>
