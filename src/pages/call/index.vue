<template>
  <div class="page">
    <div class="flex" v-for="(item,index) in callList" :key="index">
      <div class="flex-item">
        <label class="label-text">{{item.label}}</label>
        <div class="text-num">{{item.call}}</div>
      </div>
      <div class="flex-basis">
        <div class="icon icon-call" hover-class="active" @click="call(item.call)"></div>
      </div>
    </div>
    <div class="panel panel-intro">
      <div class="panel-header">关联4S店信息</div>
      <div class="panel-body">
        <div class="name">公司名称：深圳至尊宝汽车服务集团</div>
        <div>地址：深圳市 南山区 深南大道 9789 号</div>
        <div>公司简介</div>
        <div class="intro">4S全称为汽车销售服务4S店（Automobile Sales Servicshop 4S），是一种集整车销售（Sale）、零配件（Sparepart）、售后服务（Service）、信息反馈（Survey）四位一体的汽车销...</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        callList: [{
          label: '交通事故报警',
          call: '112',
        }, {
          label: '咨询技术专家',
          call: '13888888888',
        }, {
          label: '4S 售后电话',
          call: '0755-26720033',
        }, {
          label: '4S 商务电话',
          call: '13800001111',
        }],
      }
    },

    methods: {
      call(tel) {
        wx.makePhoneCall({ phoneNumber: tel });
      }
    },

    mounted() {

    }
  }

</script>
<style scoped lang="less">
  @import url(../../assets/less/variable.less);
  @import url(../../assets/less/mixin.less);

  .flex {
    background-color: #fff;
    margin: 20px 0;
    padding: 15px 40px;
    align-items: center;
    .font(title);

    .label-text {
      display: inline-block;
      width: 7em;
    }
    .text-num {
      display: inline-block;
    }
  }

  .panel-intro {
    padding: 0 40px;

    .panel-header {
      .font(title);
      border-bottom: 2px solid #E3E3E3;
      padding-bottom: 10px;
    }
    .panel-body {
      padding: 5px 0 40px;
      line-height: 30px;
      .name {
        .font(title);
      }
      .address {}
      .intro {
        .font(desc);
        line-height: 1.4;
      }
    }
  }

</style>
