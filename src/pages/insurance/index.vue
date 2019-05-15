<template>
  <div class="page">
    <div class="panel">
      <form>
        <div class="flex form-item form-item-mult">
          <vi-picker mode="string" label="品牌" :data-list="pickerList" v-model="insuCalcBasic.brand"></vi-picker>
          <vi-picker mode="string" label="车系" :data-list="pickerList" v-model="insuCalcBasic.carCategory"></vi-picker>
        </div>
        <vi-picker mode="string" label="车型" :data-list="pickerList" v-model="insuCalcBasic.carStyle"></vi-picker>
        <vi-input v-model="insuCalcBasic.carPrice" placeholder="价格（元）"></vi-input>
      </form>
    </div>
    <div class="panel  panel-thin panel-ins">
      <div class="panel-header">交通事故责任强制保险</div>
      <div class="panel-body">
        <i-radio-group :current="tranficInsSelected" @change="tranficInsChange">
          <div class="flex" style="align-items: center;" v-for="(trafficIns, index) in trafficInsList" :key="index">
            <label class="flex-basis">{{trafficIns.label}}</label>
            <span class="flex-item text-center">{{trafficIns.price}}</span>
            <i-radio i-class="vi-radio" class="flex-basis" :value="trafficIns.id"></i-radio>
          </div>
        </i-radio-group>
      </div>
    </div>
    <div class="panel panel-thin panel-ins">
      <div class="panel-header">商业保险</div>
      <div class="panel-body">
        <div class="busiIns-item">
          <div class="busiIns-title">
            <i-checkbox-group :current="checkboxList" @change="thiPartyChange">
              <i-checkbox :value="'thiPartySelected'" i-class="vi-checkbox" label="第三者责任险"></i-checkbox>
            </i-checkbox-group>
          </div>
          <div class="busiIns-body">
            <div class="form-item">
              <label class="form-label">赔付额度</label>
              <div class="form-value">
                <i-radio-group :current="thiParty.pfed" i-class="flex" @change="thiPartyPfedChange">
                  <i-radio v-for="(pfed, index) in thiParty.pfedList" :key="index" i-class="vi-radio ins-radio" :label="pfed+'万'" :value="pfed"></i-radio>
                </i-radio-group>
              </div>
            </div>
            <div class="form-item">
              <label class="form-label">保费</label>
              <div class="form-value">
                <i-radio-group :current="thiParty.bf" i-class="flex" @change="thiPartyBfChange">
                  <i-radio v-for="(bf, index) in thiParty.bfList" :key="index" i-class="vi-radio ins-radio" :label="bf+'元'" :value="bf"></i-radio>
                </i-radio-group>
              </div>
            </div>
          </div>
        </div>
        <div class="busiIns-item" v-for="(businessIns, index) in businessInsList" :key="index">
          <div class="busiIns-title">
            <i-checkbox-group :current="checkboxList" @change="businessInsChange($event,index)">
              <i-checkbox :value="businessIns.name" i-class="vi-checkbox" :label="businessIns.name"></i-checkbox>
            </i-checkbox-group>
          </div>
          <div class="busiIns-body">
            <div class="form-item">
              <label class="form-label">保费</label>
              <div class="form-value text-right">{{businessIns.price}}</div>
            </div>
          </div>
        </div>
        <div class="busiIns-item">
          <div class="busiIns-title">
            <i-checkbox-group :current="checkboxList" @change="nickChange">
              <i-checkbox :value="'nickSelected'" i-class="vi-checkbox" label="车身划痕险"></i-checkbox>
            </i-checkbox-group>
          </div>
          <div class="busiIns-body">
            <div class="form-item">
              <label class="form-label">赔付额度</label>
              <div class="form-value">
                <i-radio-group :current="nick.pfed" i-class="flex" @change="nickPfedChange">
                  <i-radio v-for="(pfed, index) in nick.pfedList" :key="index" i-class="vi-radio ins-radio" :label="pfed+'万'" :value="pfed"></i-radio>
                </i-radio-group>
              </div>
            </div>
            <div class="form-item">
              <label class="form-label">保费</label>
              <div class="form-value">
                <i-radio-group :current="nick.bf" i-class="flex" @change="nickBfChange">
                  <i-radio v-for="(bf, index) in nick.bfList" :key="index" i-class="vi-radio ins-radio" :label="bf+'元'" :value="bf"></i-radio>
                </i-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ins-summary block-desc text-center">
        <div>新车保险指导价：<span class="summary-price">{{insuCalcBasic.sum}}</span>元</div>
        <div>此结果仅供参考，实际费用以当地缴费为准</div>
      </div>
      <div class="btn-bar">
        <vi-button vi-class="vi-btn-md" @click="sumClick" type="primary">立即计算</vi-button>
      </div>
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
        checkboxList: [],
        pickerList: [],
        businessInsList: [
          { name: '车辆损失险', price: 459, checked: false },
          { name: '全车盗抢险', price: 102, checked: false },
          { name: '不计免赔特约险', price: 418, checked: false },
          { name: '无过责任险', price: 326, checked: false },
          { name: '车上人员责任险', price: 50, checked: false }
        ],
        businessInsSelected: false,
        thiParty: {
          checked: false,
          pfed: 5,
          bf: '',
          pfedList: [5, 10, 20, 50, 100],
          bfList: [516, 746, 924, 1250, 1630, ],
        },
        nick: {
          checked: false,
          pfed: '',
          bf: '',
          pfedList: [5, 10, 20, 50, 100],
          bfList: [516, 746, 924, 1250, 1630, ],
        },
        insuCalcBasic: {
          sum: 3267,
          brand: '品牌',
          carCategory: '车系',
          carStyle: '车型',
          carPrice: 2000000
        },
        trafficInsList: [
          { label: '家用6座以下', price: '950元', id: 1 },
          { label: '家用6座以上', price: '1100元', id: 2 }
        ],
        tranficInsSelected: 1,
      }
    },

    methods: {
      tranficInsChange({ mp: { detail = {} } }) {
        this.tranficInsSelected = detail.value;
      },
      thiPartyPfedChange({ mp: { detail = {} } }) {
        this.thiParty.pfed = detail.value;
      },
      thiPartyBfChange({ mp: { detail = {} } }) {
        this.thiParty.bf = detail.value;
      },
      nickPfedChange({ mp: { detail = {} } }) {
        this.nick.pfed = detail.value;
      },
      nickBfChange({ mp: { detail = {} } }) {
        this.nick.bf = detail.value;
      },
      checkboxChange(detail) {
        const index = this.checkboxList.indexOf(detail.value)
        index === -1 ? this.checkboxList.push(detail.value) : this.checkboxList.splice(index, 1)
      },
      thiPartyChange({ mp: { detail = {} } }) {
        this.checkboxChange(detail);
        this.thiParty.checked = detail.current;
      },
      businessInsChange({ mp: { detail = {} } }, index) {
        this.checkboxChange(detail);
        this.businessInsList.splice(index, 1, Object.assign({}, this.businessInsList[index], { checked: detail.current }))
      },
      nickChange({ mp: { detail = {} } }, index) {
        this.checkboxChange(detail);
        this.nick.checked = detail.current;
      },
    },

    mounted() {

    }
  }

</script>
<style lang="less">
  .ins-radio {
    font-size: 16px;
    white-space: nowrap;
    overflow: visible;
  }

</style>
<style scoped lang="less">
  .busiIns {
    &-title {
      text-align: center;
    }
  }

  .summary-price {
    font-size: 16px;
    color: #f24622;
  }

  .btn-bar {
    padding-top: 20px;
    padding-bottom: 40px;
  }

</style>
