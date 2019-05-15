<!-- 违章查询 -->
<template>
  <div class="page page-white">
    <form>
      <div class="form-item">
        <label class="form-label">选择车型</label>
        <div class="form-value">
          <i-radio-group i-class="flex" :current="violationForm.carType" @change="carTypeChange">
            <i-radio i-class="vi-radio" v-for="(item,index) in carTypeList" :key="index" :value="item.value" :label="item.label"></i-radio>
          </i-radio-group>
        </div>
      </div>
      <vi-picker mode="string" label="车牌号码" :data-list="pickerList" v-model="violationForm.carNo"></vi-picker>
      <vi-input v-model="violationForm.engineNo" placeholder="发动机后6位"></vi-input>
      <vi-input v-model="violationForm.frameNo" placeholder="车架号后6位"></vi-input>
      <div class="btn-bar">
        <vi-button @click="sumClick" type="primary">查询</vi-button>
      </div>
    </form>
    <div class="agreement abs-bottom">提交代表我同意，<a href="/pages/login/userTreaty">《ifollowing用户协议》</a></div>
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
        carTypeList: [{
          value: 1,
          label: '大型车',
        }, {
          value: 2,
          label: '小型车',
        }],
        violationForm: {
          carType: '1',
          engineNo: '',
          frameNo: '',
          carNo: '',
        },
      }
    },

    methods: {
      carTypeChange({ mp: { detail = {} } }) {
        this.violationForm.carType = detail.value;
      },
    },

    mounted() {

    }
  }

</script>
<style scoped lang="less">
  form {
    padding-top: 65px;
  }

  .btn-bar {
    margin-top: 50px;
  }

</style>
