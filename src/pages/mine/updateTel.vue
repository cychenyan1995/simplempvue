<template>
  <div class="page text-center">
    <form>
      <vi-input v-model="userInfo.userphone" type="tel" maxlength="11" placeholder="手机号" />
      <div class="form-item relative input-btn-group">
        <vi-input type="number" v-model="userInfo.valicode" placeholder="验证码" />
        <vi-button vi-class="vali-btn btn-naive" @click="getValiCode" type="naive" :disabled="valiTimeout" :value="valiTimeout || '获取'"></vi-button>
      </div>
      <div class="btn-bar abs-bottom">
        <vi-button @click="updateTel" type="primary">确认</vi-button>
      </div>
    </form>
    <vi-dialog :visible="visibleUpTelSuc" @close="iconUpdate">
      <div style="margin-top: 18px;">
        <h3 class="dialog-title">更新成功!</h3>
        <div>您已成功更新了手机号，请返回登录页面重新登录。</div>
      </div>
    </vi-dialog>
  </div>
</template>
<script>
  // 引入插件
  import viButton from '@/components/button';
  import viInput from '@/components/input';
  import viDialog from '@/components/dialog';

  export default {
    data() {
      return {
        userInfo: {
          userphone: '111',
          valicode: '222'
        },
        visibleUpTelSuc: false,
      }
    },

    components: {
      viButton,
      viInput,
      viDialog,
    },

    methods: {
      updateTel() {
        this.visibleUpTelSuc = true;
      },
      iconUpdate() {
        let url = '../login/index';
        //跳到非tab的其他页面
        wx.navigateTo({ url });
      }
    }

  }

</script>
<style scoped>
  form {
    margin-top: 130px;
  }
  .btn-bar {
    bottom: 90px;
    padding: 0 60px;
  }

</style>
