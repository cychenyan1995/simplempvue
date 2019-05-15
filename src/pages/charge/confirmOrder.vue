<template>
  <div>
    <div class="detail-block">
      <div class="detail-content">
        <div>
          <label>订单编号</label>
          <span>{{orderDetail.orderNo}}</span>
        </div>
        <div>
          <label>设备信息</label>
          <span>{{orderDetail.deviceNo}}</span>
        </div>
        <div>
          <label>商品名称</label>
          <span>{{orderDetail.productName}}</span>
        </div>
        <div>
          <label>商品价格</label>
          <span>{{orderDetail.productPrice}}</span>
        </div>
        <div>
          <label>商品数量</label>
          <span>{{orderDetail.productNum}}</span>
        </div>
        <div>
          <label>应付总额</label>
          <span class="detail-price">￥{{orderDetail.productPrice}}</span>
        </div>
      </div>
      <div>
        <div class="detail-paytype">
          <label>支付方式</label>
          <span class="pay-type pull-right">
            <span class="icon icon-wxpay"></span>
            微信支付
        </span>
        </div>
        <vi-button :disabled="isButtonDisabled" @click="toPay" type="primary">付款</vi-button>
      </div>
    </div>
    <vi-dialog :visible="visibleChargeSuc" @close="chargeOk">
      <div class="modal-info" style="margin-top: 18px;">
        <div class="modal-status">充值成功!</div>
        <div class="modal-desinfo">请至用户信息查看有效期信息</div>
      </div>
    </vi-dialog>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import viButton from '@/components/button';
  import viDialog from '@/components/dialog';
  export default {
    data() {
      return {
        /*orderInfo: { orderNo: '2018072720180728', deviceNo: '682303240', productName: '12个月数据流量包', productNum: 1, productPrice: '60元' },*/
        visibleChargeSuc: false,
      }
    },
    components: {
      viButton,
      viDialog
    },
    computed: {
      ...mapState('mine', [
        'orderDetail'
      ])
    },
    methods: {
      ...mapActions('mine', [
        'setOrderDetail',
        'getOrderDetail',
      ]),
      toPay() {
        this.visibleChargeSuc = true;
      },
      chargeOk() {
        let url = '../mine/index';
        wx.switchTab({ url });
      }
    },
    onShow() {
      // let { index } = this.$root.$mp.query;
      let id = 11;
      this.getOrderDetail({ id }).then(data => {
        this.setOrderDetail(data);
      })
    }
  }

</script>
<style scoped lang="less">
  .detail-block {
    padding: 30px 60px;
  }

  .detail-block div {
    margin: 20px 0;
  }

  .detail-content {
    border-bottom: solid 1px #7A7A7A;
  }

  .detail-price {
    float: right;
    font-size: 20px !important;
    color: #F60707 !important;
  }

  .detail-paytype {
    overflow: hidden;
    padding-bottom: 40px;
    padding-top: 30px;
  }

  .modal-status {
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 10px;
  }

  .modal-desinfo {
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }

  .delete-icon {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .pay-type {
    .icon-wxpay {
      margin-bottom: -10px;
    }
  }

  label {
    font-size: 16px;
    color: #3A3A3A;
    margin-right: 20px;
  }

  span {
    font-size: 14px;
    color: #3A3A3A;
  }

</style>
