<template>
  <div>
    <form class="charge-form">
      <div class="form-item">
        <vi-input v-model="deviceNum" vi-class="charge-deviceNo" type="number" placeholder="请输入充值的设备号" />
      </div>
    </form>
    <div class="charge">
      <div class="charge-type">选择充值类型</div>
      <div class="charge-block clearfix">
        <div class="charge-content" v-for="(chargeInfo,index) in chargeInfoList" :key="index" @click="selectType(index)">
          <div class="charge-chargetype">{{chargeInfo.type}}</div>
          <div class="charge-price-des">
            <div class="price-item">
              价格<span class="charge-price" :class="{'del-price':!!chargeInfo.promotion}">{{chargeInfo.price}}</span>元
            </div>
            <div class="price-item" v-if="!!chargeInfo.promotion">
              促销价<span class="promotion-price">{{chargeInfo.promotion}}</span>元
            </div>
          </div>
          <div class="charge-mention">说明：{{chargeInfo.mention}}</div>
          <i-icon class="select-icon" type="success_fill" size="28" color="#F24622" v-if="index === curIndex"></i-icon>
          <span v-if="currIndex === index" class="icon icon-select-type select-icon"></span>
        </div>
      </div>
    </div>
    <div class="text-center">
      <vi-button vi-class="charge-btn" :disabled="isButtonDisabled" @click="toCharge" type="primary" value="立即充值"></vi-button>
    </div>
  </div>
</template>
<script>
  // 引入插件
  import viButton from '@/components/button';
  import viInput from '@/components/input';
  export default {
    data() {
      return {
        chargeInfoList: [{ type: '12个月数据流量包', price: 60, mention: '此流量包充值成功后，可延长12个月i随行服务有效期', isSelected: false },
          { type: '24个月数据流量包', promotion: 120, price: 100, mention: '此流量包充值成功后，可延长24个月i随行服务有效期', isSelected: false }
        ],
        curIndex: '',
        deviceNum: '',
      }
    },
    // 注册插件
    components: {
      viButton,
      viInput,
    },
    methods: {
      toCharge() {
        let url = '../charge/confirmOrder';
        wx.navigateTo({ url });
      },
      selectType(index) {
        this.curIndex = index;
      }
    },
    mounted(){
      // deviceNum 存的位置在login绑定的时候
      this.deviceNum = wx.getStorageSync('deviceNum') || '';
    },
  }

</script>
<style>
  .charge-btn {
    width: 245px;
    margin: 0 auto !important;
  }

  .charge-deviceNo {
    font-size: 14px;
    margin: 0 50px;
    border-bottom: 1px solid;
    padding: 0px 0 5px;
    text-align: center;
  }

</style>
<style scoped>
  .charge {
    overflow: hidden;
  }

  .charge-form {
    margin-top: 65px;
  }

  .charge-type {
    font-size: 14px;
    color: #3A3A3A;
    padding: 65px 145px 20px;
  }

  .charge-block {
    padding: 0px 45px;
  }

  .charge-content {
    border: 1px solid;
    border-bottom-right-radius: 2em;
    background-color: #24BBFB;
    font-size: 12px;
    color: #FFFFFF;
    width: 132px;
    float: left;
    margin: 0px 5px 50px;
    padding: 10px 8px 20px;
    position: relative;
    text-align: left;
    box-sizing: border-box;
  }

  .charge-chargetype {
    margin-bottom: 10px;
  }

  .charge-price-des {
    height: 60px;
    padding: 5px 0;
    box-sizing: border-box;
  }

  .price-item {
    margin-bottom: 8px;
  }

  .promotion-price,
  .charge-price {
    font-size: 16px;
    padding: 0px 6px;
  }

  .promotion-price {
    color: #F8E71C;
  }

  .del-price {
    font-size: 12px;
    text-decoration: line-through;
  }

  .charge-chargetype,
  .charge-mention {
    display: inline-bolck !important;
  }

  .select-icon {
    position: absolute;
    right: -8px;
    bottom: -8px;
  }

</style>
