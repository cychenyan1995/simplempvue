<template>
  <div class="page page-white">
    <form>
      <div class="flex form-item form-item-mult">
        <vi-picker mode="object" vi-class="flex-item" label="品牌" :data-list="pickerList" v-model="valuation.brand"></vi-picker>
        <vi-picker mode="object" vi-class="flex-item" label="车系" :data-list="pickerList" v-model="valuation.carCategory"></vi-picker>
      </div>
      <vi-picker mode="object" label="车型" :data-list="pickerList" v-model="valuation.carStyle"></vi-picker>
      <vi-picker mode="object" label="上牌城市" :data-list="pickerList" v-model="valuation.carCity"></vi-picker>
      <vi-picker mode="object" label="上牌时间" :data-list="pickerList" v-model="valuation.carTime"></vi-picker>
      <vi-input type="number" v-model="valuation.carMiles" label="行驶里程" unit="万公里"></vi-input>
      <vi-input type="tel" v-model="valuation.tel" label="电话号码"></vi-input>
      <div class="form-item" style="flex-wrap:wrap;">
        <label class="form-label">接受合作商精准报价</label>
        <div class="form-value">
          <i-radio-group i-class="flex pull-right" :current="acceptQuote" @change="acceptQuoteChange">
            <i-radio i-class="vi-radio" v-for="(item,index) in acceptQuoteList" :key="index" :value="item.value" :label="item.label"></i-radio>
          </i-radio-group>
        </div>
        <div class="block-desc"> 允许合作拍卖平台与您取得电话联系 </div>
      </div>
      <div class="block-desc text-center" style="margin: 15px 0 35px;">请完整填写信息，以便准确估计</div>
      <div class="btn-bar">
        <vi-button vi-class="sum-btn" @click="goValuation" type="primary">立即估值</vi-button>
      </div>
      <div class="agreement">提交代表我同意，<a href="/pages/login/userTreaty">《ifollowing用户协议》</a></div>
    </form>
  </div>
  </div>
</template>
<script>
  import viButton from '@/components/button';
  import viInput from '@/components/input';
  import viPicker from '@/components/picker';
  export default {
    components: { viButton, viInput, viPicker, },
    data() {
      return {
        acceptQuote: '',
        acceptQuoteList: [{ 'value': 1, 'label': '是' }, { 'value': 2, 'label': '否' }],
        valuation: {
          brand: '',
          carCategory: '',
          carStyle: '',
          carCity: '',
          carTime: '',
          carMiles: '100',
          tel: 15211375026,
        },
        pickerList: [{
          label: '奥迪',
          value: 1,
        },{
          label: '奔驰',
          value: 2,
        }]
      }
    },

    methods: {
      goValuation() {
        let url = '../valuation/result';
        wx.navigateTo({ url });
      },
      acceptQuoteChange({ mp: { detail = {} } }) {
        this.acceptQuote = detail.value;
      },
    },

    mounted() {

    }
  }

</script>
<style lang="less">
  .page-valuation {
    i-radio {
      display: inline-block;
      width: 55px;
      overflow: hidden;
    }
    .vi-radio {
      display: inline-block;
      margin: -12px -15px;
    }
  }

</style>
<style scoped lang="less">


</style>
