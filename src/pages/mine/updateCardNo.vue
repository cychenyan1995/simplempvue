<template>
  <div class="page text-center">
    <form>
      <div class="updateCardNo-header">
        已绑定的车牌号：{{cardNo}}
      </div>
      <div class="form-item">
        <div class="form-label">
          <vi-picker mode="string" :data-list="sendList" v-model="carIdFirst" @change="change"></vi-picker>
        </div>
        <div class="form-value">
          <vi-input v-model="newCardNo" />
        </div>
      </div>
      <div class="btn-bar abs-bottom">
        <vi-button vi-class="updateCardNo-btn" @click="updateCardNo" type="primary">确认</vi-button>
      </div>
    </form>
    <vi-dialog :visible="visibleUpCardNoSuc" @close="iconUpdate">
      <div style="margin-top: 18px;">
        <h3 class="dialog-title">更新成功!</h3>
        <div>您已成功更新了车牌号，请返回“我的”页面查看。</div>
      </div>
    </vi-dialog>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import { carIdFirstList } from '@/assets/js/data-dict';
  // 引入插件
  import viButton from '@/components/button';
  import viInput from '@/components/input';
  import viPicker from '@/components/picker';
  import viDialog from '@/components/dialog';
  export default {
    data() {
      return {
        cardNo: '粤 B0X888',
        sendList: carIdFirstList,
        visibleUpCardNoSuc: false,
        newCardNo: '',
        carIdFirst: '粤',
      }
    },
    components: {
      viButton,
      viInput,
      viPicker,
      viDialog,
    },
    methods: {
      change(e) {
        console.log(e)
      },
      updateCardNo() {
        this.visibleUpCardNoSuc = true;
      },
      iconUpdate() {
        let url = '../mine/index';
        //switchTab 跳到对应的tab(底部)
        wx.switchTab({ url });
      }
    }
  }

</script>
<style scoped lang="less">
  @import url('../../assets/less/variable.less');
  @import url('../../assets/less/mixin.less');
  .updateCardNo-header {
    .font(title);
  }

  form {
    margin-top: 115px;

    .form-item {
      margin-top: 53px;
    }
  }

  .btn-bar {
    bottom: 90px;
    padding: 0 60px;
  }

</style>
