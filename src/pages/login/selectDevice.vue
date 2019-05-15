<template>
  <div class="page page-white text-center">
    <div class="login-header">
      <img class="icon icon-logo" src="/static/images/logo.png" alt="" />
      <div class="login-title">i随行</div>
    </div>
    <!-- 绑定设备 -->
    <i-modal i-class="modal-bind" i-class-mask="modal-bind-mask" size="lg" :radius="false" :top="110" :visible="false" :show-ok="false" :show-cancel="false">
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
    <vi-button v-if="bindDeviceVisible" vi-class="login-btn bind-btn" @click="signUp" type="primary" value="登录"></vi-button>
  </div>
</template>
<script>
  import viButton from '@/components/button';
  export default {
    data() {
      return {
        currIndex: 0,
        deviceList: [
          { text: '1111', icon: `/static/images/tab_device.png` },
          { text: '2222', icon: `/static/images/tab_device.png` },
          { text: '3333', icon: `/static/images/tab_device.png` },
          { text: '4444', icon: `/static/images/tab_device.png` },
          {}
        ],
        submitEnable: false,
      }
    },
    methods: {
      signUp() {
        let url = '../index/index';
        wx.switchTab({ url });
      },
      selectDevice(index) {
        this.currIndex = index;
      },
    },
    components: {
      viButton,
    },
  }

</script>
<style lang="less">
  .login-btn {
    margin: 0 0 25px !important;
  }

  .bind-btn {
    z-index: 10000;
    margin-top: -95px !important;
  }

  .device-add {
    font-size: 22px !important;
    font-weight: bold !important;
    margin-top: 7px !important;
  }

  .modal-bind {
    border-radius: 0 !important;

    &-mask {
      background-color: rgba(255, 255, 255, 0.7) !important;
    }
  }

</style>
<style scoped lang="less">
  @import url('../../assets/less/variable.less');
  @import url('../../assets/less/mixin.less');

  
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


</style>
