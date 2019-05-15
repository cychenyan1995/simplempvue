<template>
  <div class="page page-white text-center" catchtouchmove="true">
    <div class="login-header">
      <img class="icon icon-logo" src="/static/images/logo.png" alt="" />
      <div class="login-title">i随行</div>
    </div>
    <form class="form-login">
      <div v-if="curView === '绑定'">
        <div class="form-item relative">
          <div class="icon icon-scan" hover-class="active"></div>
          <vi-input v-model="loginForm.deviceNo" type="number" placeholder="设备号" />
        </div>
        <vi-input type="number" v-model="loginForm.carNo" placeholder="车牌号" />
      </div>
      <div v-else>
        <vi-input v-model="loginForm.userphone" type="tel" maxlength="11" placeholder="手机号" />
        <div class="form-item relative input-btn-group">
          <vi-input type="number" v-model="loginForm.valicode" placeholder="验证码" />
          <vi-button vi-class="vali-btn btn-naive" @click="getValiCode" type="naive" :disabled="valiTimeout" :value="valiTimeout || '获取'"></vi-button>
        </div>
      </div>
      <div class="user-treaty">
        <i-checkbox-group v-if="curView === '注册'" :current="checkboxList" @change="acceptChange">
          <i-checkbox i-class="vi-checkbox" position="left" :value="'accept'">
          </i-checkbox> 同意
          <a class="treaty-a a-underline" href="/pages/login/userTreaty">隐私条款</a>
        </i-checkbox-group>
      </div>
      <vi-button vi-class="login-btn" :disabled="!submitEnable" @click="sign(curView)" type="primary" :value="curView"></vi-button>
      <a class="a-underline a-rigister" href="#" @click.prevent="switchView(curView)" v-html="switchlabel"></a>
    </form>
    <!-- 绑定设备 -->
    <i-modal i-class="modal-bind" i-class-mask="modal-bind-mask" size="lg" :radius="false" :top="100" :visible="bindDeviceVisible" :show-ok="false" :show-cancel="false">
      <div class="form-device">
        <div class="loginDevice-title">请选择要登录的设备</div>
        <div class="loginDevice-body">
          <div class="device-detail" v-for="(device,index) in deviceList" :key="index" @click="selectDevice(index)">
            <div class="device-title">{{device.text}}</div>
            <div class="device-img">
              <img v-if="!!device.icon" class="icon icon-device" :src="device.icon" alt="" />
              <i-icon v-if="!device.text" type="add" i-class="device-add"></i-icon>
              <i-icon v-if="currIndex === index" type="success_fill" i-class="check-primary text-primary"></i-icon>
            </div>
          </div>
        </div>
      </div>
    </i-modal>
    <form class="form-bind">
      <vi-button v-if="bindDeviceVisible" vi-class="login-btn bind-btn" @click="sign('绑定')" type="primary" value="登录"></vi-button>
    </form>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import viButton from '@/components/button';
  import viInput from '@/components/input';
  export default {
    data() {
      return {
        curView: '登录',
        loginForm: {
          userphone: '',
          verifcode: '',
          deviceNo: '',
          carNo: '',
        },
        accept: '',
        bindDeviceVisible: false,
        currIndex: 0,
        deviceList: [
          { num: '1111', text: '1111', icon: `/static/images/tab_device.png` },
          { num: '2222', text: '2222', icon: `/static/images/tab_device.png` },
          { num: '3333', text: '3333', icon: `/static/images/tab_device.png` },
          { num: '4444', text: '4444', icon: `/static/images/tab_device.png` },
          {}
        ],
        valiTimeout: '',
        submitEnable: true,
        checkboxList: [],
      }
    },
    computed: {
      switchlabel() {
        let label = '';
        switch (this.curView) {
          case '登录':
            label = '注&nbsp;&nbsp;册';
            break;
          case '注册':
            label = '登&nbsp;&nbsp;录';
            break;
          case '绑定':
            label = '登&nbsp;&nbsp;录';
            break;
        }

        return label;
      }
    },
    methods: {
      ...mapActions([
        'setToken',
        'setRefreshToken',
        'login',
      ]),
      // checkboxgroup 处理
      checkboxChange(detail) {
        const index = this.checkboxList.indexOf(detail.value)
        index === -1 ? this.checkboxList.push(detail.value) : this.checkboxList.splice(index, 1)
      },
      acceptChange({ mp: { detail = {} } }) {
        this.checkboxChange(detail);
        this.accept = detail.current;
      },
      sign(curView) {
        switch (curView) {
          case '登录':
            this.login({
              userphone: this.loginForm.userphone,
              verifcode: this.loginForm.verifcode
            }).then(data => {
              this.setToken(data.jwt);
              this.setRefreshToken(data.jwt);

              this.bindDeviceVisible = true;
            })
            break;
          case '注册':
            this.switchView('注册');
            break;
          case '绑定':
            // 存储绑定设备号
            let deviceInfo = this.deviceList[this.currIndex];
            wx.setStorageSync('deviceNum', deviceInfo.num);
            let url = '../index/index';
            wx.switchTab({ url });
            break;
        }
      },
      switchView(curView) {
        let title = '';
        switch (curView) {
          case '登录':
            title = 'i随行登录';
            this.curView = '注册';
            break;
          case '注册':
            title = 'i随行注册';
            this.curView = '绑定';
            break;
          case '绑定':
            title = '用户注册:设备绑定';
            this.curView = '登录';
            break;
        }
        wx.setNavigationBarTitle({ title })
      },
      selectDevice(index) {
        this.currIndex = index;
      },
      getValiCode() {
        let timeout = 3;
        // 点击后马上会显示，而不会有1s的延迟
        this.valiTimeout = timeout + 's';
        let timeoutId = setInterval(_ => {
          if (!--timeout) {
            this.valiTimeout = '';
            return clearInterval(timeoutId);
          }

          this.valiTimeout = timeout + 's';
        }, 1000)
      }
    },
    components: {
      viButton,
      viInput
    },
    mounted() {
      let { type } = this.$root.$mp.query;
      this.bindDeviceVisible = type === 'bind';
    },
  }

</script>
<style lang="less">
  .form-login {
    .form-item+.form-item {
      margin-top: 37px;
    }
  }

  .login-btn {
    margin: 0 0 25px !important;
  }

  .form-bind {
    z-index: 10000;
    margin-top: -112px !important;
    position:relative;
  }

  .device-add {
    font-size: 22px !important;
    font-weight: bold !important;
    margin-top: 7px !important;
  }

  .modal-bind {
    border-radius: 0 !important;

    &-mask {
      background-color: rgba(255, 255, 255, 0.9) !important;
    }
  }

</style>
<style scoped lang="less">
  @import url('../../assets/less/variable.less');
  @import url('../../assets/less/mixin.less');

  .a-rigister {
    font-size: 32rpx;
    margin-top: 40rpx;
  }

  .login-header {
    margin: 60px 0 60px;
    .login-title {
      font-weight: 400;
      line-height: 1;
    }
  }

  .form-device {
    font-size: 14px;
    color: #3A3A3A;
    padding: 20px 40px 0;
  }

  .loginDevice-title {
    text-align: left;
    margin-bottom: 25px;
  }

  .device-detail {
    float: left;
    width: 65px;
    margin-right: 30px;
    margin-bottom: 20px;

    .device-title {
      margin-bottom: 10px;
      line-height: 1;
      height: 1em;
    }
    .device-img {
      position: relative;
      width: 65px;
      height: 35px;
      background-color: #fff;
      font-size: 0;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  .loginDevice-body {
    overflow: hidden;
  }

  .user-treaty {
    height: 65px;
    padding: 12px;
    font-size: 14px;
    color: @color-desc;
    box-sizing: border-box;
    i-checkbox {
      display: inline-block;
      vertical-align: middle;
    }
    .treaty-a {
      margin-left: 0;
      font-size: 14px;
      color: #01458E;
    }
  }

</style>
