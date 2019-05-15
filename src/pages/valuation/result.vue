<template>
  <div>
    <div class="result-title">
      {{resultInfo.resultTitle}}
    </div>
    <div class="result-main">
      <div class="result-header">{{resultInfo.resultInnerTitle}}</div>
      <div class="result-content clearfix" v-for="(resultInfoList, innerLineIndex) in resultInfos" :key="innerLineIndex">
        <label class="content-label">{{resultInfoList.assess}}</label>
        <span class="content-value">{{resultInfoList.price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        resultInfo: {
          resultTitle: '奥迪Q5(进口) 2013款40 TFSI Hybird',
          resultInnerTitle: '估价工具评估结果'
        },
        resultInfos: [
          { assess: '公平价', price: '26.76万' },
          { assess: '汽车之家', price: '31.83万' },
          { assess: '精估价', price: '18.10万' }
        ]

      }
    },

    components: {},

    methods: {},

    mounted() {}
  }

</script>
<style scoped lang="less">
  @import url(../../assets/less/variable.less);
  @import url(../../assets/less/mixin.less);

  .page {
    line-height: 1;
  }
  .result-title {
    margin-top: 55px;
    text-align: center;
    .font(title);
  }

  .result-header {
    margin-bottom: 25px;
    font-size: 12px;
    color: @color-title;
    text-align: center;
  }

  .result-main {
    margin-top: 30px;
    padding: 0 70px;
    font-size: 14px;

    .result-content {
      margin-bottom: 20px;
    }

    .content-label {
      float: left;
      width: 175px;
      color: @color-title;
    }

    .content-value {
      float: left;
      color: #F24622;
    }
  }

</style>
