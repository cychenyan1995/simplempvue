<template>
  <div class="page page-pd">
    <div class="order-detail" v-for="(orderInfo,index) in orderInfoList" :key="index">
      <div class="order-header">
        <span class="order-time">{{orderInfo.orderTime}}</span>
        <span class="order-status">{{orderInfo.orderStatus}}</span>
      </div>
      <div class="order-body">
        <div>
          <label>订单编号：</label>
          <span>{{orderInfo.orderNo}}</span>
        </div>
        <div>
          <label>设备编号：</label>
          <span>{{orderInfo.deviceNo}}</span>
        </div>
        <div>
          <label>商品名称：</label>
          <span>{{orderInfo.productName}}</span>
        </div>
        <div>
          <label>商品数量：</label>
          <span>{{orderInfo.productNum}}</span>
        </div>
        <div>
          <label>商品价格：</label>
          <span>{{orderInfo.productPrice}}</span>
        </div>
        <div class="charge-btn-p">
          <vi-button v-if="orderInfo.isPaid == 0" vi-class="btn-naive btn-pay" @click="toCharge(index)" type="naive">付款</vi-button>
          <div class="order-price pull-right">
            <label>订单金额：</label>
            <span>{{orderInfo.productPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
// 引入插件
import viButton from '@/components/button';

export default {
  data() {
    return {
      /*orderInfoList: [],*/
      /*status: ''*/
    }

  },
  components: {
    viButton
  },
  computed: {
    ...mapState('mine', [
      'orderInfoList'
    ])
  },
  methods: {
    ...mapActions('mine', [
      'setOrderInfoList',
      'getOrderInfoList',
    ]),
    toCharge(index) {
      let url = '../charge/confirmOrder?index='+index;
      wx.navigateTo({ url });
    }
  },
  mounted() {

  },
  onShow() {

    let { status } = this.$root.$mp.query;
    /*this.status = status;*/
    this.getOrderInfoList({ status }).then(data => {
      this.setOrderInfoList(data);
    })
  }
}

</script>
<style>
  .btn-pay{
    margin: 0 !important;
    float: left !important;
  }
</style>
<style scoped>
.order-block {
  /*margin: 10px;*/
}

.order-detail {
  padding: 20px;
  background-color: #fff;
  margin: 20px 0;
}

.order-header {
  margin-bottom: 10px;
}

.order-time {
  font-size: 14px;
  color: #7A7A7A;
}

.order-status {
  font-size: 14px;
  color: #017AFF;
  float: right;
}

.order-body {
  font-size: 14px;
  color: #3A3A3A;
  line-height: 1.5em;
}

.order-price {
  margin-top: 2px;
}

.charge-btn-p {
  overflow: hidden;
  margin-top: 15px;
}

</style>
