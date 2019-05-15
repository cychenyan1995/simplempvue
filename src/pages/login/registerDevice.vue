<template>
  <div class="page-login">
    <div class="login-title">
      <span class="icon icon-logo"></span>
      <div>i随行</div>
    </div>
    <form>
      <div class="qrcode">
        <span class="icon icon-qrcode qrcode-btn"></span>
        <vi-input v-model="userInfo.deviceNo" placeholder="设备号" />
      </div>
      <vi-input v-model="userInfo.cardNo" placeholder="车牌号" />
    </form>
    <vi-button vi-class="login-btn" @click="signUp" type="primary">绑定</vi-button>
    <a class="login-a" href="#" @click.prevent="loginIn">登&nbsp;&nbsp;&nbsp;录</a>
  </div>
</template>
<script>
import viButton from '@/components/button';
import viInput from '@/components/input';

export default {
  data() {
    return {
      userInfo: {
        deviceNo: '',
        cardNo: ''
      },
    }
  },
  methods: {
    signUp() {
      let url = '../index/index';
      wx.switchTab({ url });
    },
    loginIn() {
      let url = '../login/index';
      wx.redirectTo({ url });
    },
  },
  components: {
    viButton,
    viInput
  },
}

</script>
<style>
.getvalicode-btn {
  width: 65px;
  height: 30px !important;
  line-height: 30px !important;
  position: absolute !important;
  right: 50px;
  z-index: 1;
  border-radius: 18px !important;
}

.login-btn {
  margin: 65px 0 30px !important;
}

</style>
<style scoped>
.page-login {
  width: 500rpx;
  text-align: center;
  margin: 0 auto;
}

.user-treaty {
  margin: 25px;
}

.login-title {
  margin: 100rpx 0rpx 80rpx;
}

.checkbox {
  display: inline-block;
}

.login-a {
  font-size: 16px;
  color: #01458E;
  letter-spacing: 5px;
}

.treaty-a {
  font-size: 14px;
  color: #01458E;
}

.qrcode {
  position: relative;
}

.qrcode-btn {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 5px;
}

</style>
