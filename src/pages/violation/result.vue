<!-- 违章查询结果 -->
<template>
  <div class="page page-pd">
    <div class="panel panel-long">
      <form>
        <div class="flex form-item">
          <div class="form-item flex-item">
            <label class="form-label">车牌号</label>
            <div class="form-value">{{carInfo.carNo}}</div>
          </div>
          <div class="form-item flex-item">
            <label class="form-label">查询地</label>
            <div class="form-value">{{carInfo.address}}</div>
          </div>
        </div>
        <div class="form-item">
          <div class="form-value">未处理违章3次，计6分，罚款1500元</div>
        </div>
      </form>
    </div>
    <div class="panel" v-for="(item,index) in resultList" :key="index">
      <div class="panel-header flex">
        <div class="flex-item text-left">{{item.date}}</div>
        <div class="flex-auto">{{item.point}}</div>
      </div>
      <div class="panel-body" style="padding-top:0;">
        <form class="form-vio">
          <div class="form-item">
            <div class="form-label">违章地点</div>
            <div class="form-value">{{item.address}}</div>
          </div>
          <div class="form-item">
            <div class="form-label">违章行为</div>
            <div class="form-value">{{item.detail}}</div>
          </div>
        </form>
      </div>
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
        resultList: [{
          date: this.$iBox.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
          point: '计6分，罚款1500元',
          address: '违章地点违章地点违章地点违章地点',
          detail: '违章行为违章行为违章行为违章行为违章行为违章行为违章行为',
        },{
          date: this.$iBox.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
          point: '计6分，罚款1500元',
          address: '违章地点违章地点违章地点违章地点',
          detail: '违章行为违章行为违章行为违章行为违章行为违章行为违章行为',
        },{
          date: this.$iBox.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
          point: '计6分，罚款1500元',
          address: '违章地点违章地点违章地点违章地点',
          detail: '违章行为违章行为违章行为违章行为违章行为违章行为违章行为',
        },{
          date: this.$iBox.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
          point: '计6分，罚款1500元',
          address: '违章地点违章地点违章地点违章地点',
          detail: '违章行为违章行为违章行为违章行为违章行为违章行为违章行为',
        }],
        carInfo: {
          address: '',
          carNo: '',
        },
      }
    },

    methods: {

    },

    mounted() {

    }
  }

</script>
<style scoped lang="less">
  @import url('../../assets/less/variable.less');
  @import url('../../assets/less/mixin.less');
  .form-vio {
    padding: 0;
    .form-item {
      align-items: start;
      border-bottom: none;
      margin-top: 0;
    }

    .form-label {
      margin-right: 15px;
      color: @color-desc;
    }
  }

  .panel-header.flex {
    padding: 10px;
  }

</style>
