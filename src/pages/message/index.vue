<template>
  <div class="page page-pd page-message">
    <div class="remind-block" v-for="(msg, index) in messageList" :key="index">
        <div class="time-remind">{{msg.remindtime}}</div>
      <div class="card-remind">
        <div class="card-remind-header">
          <span class="icon icon-prompt-nicked"></span>
          <span class="title-remind text-ellipsis">{{msg.text}}</span>
        </div>
        <div class="card-remind-body">
          <div class="msg-detail">
            <label>{{msg.message}}</label>
            <div v-if="!!msg.carNum">
              <label class="detail-item">车牌：</label>
              <span>{{msg.carNum}}</span>
            </div>
            <div v-if="!!msg.device">
              <label class="detail-item">设备号：</label>
              <span>{{msg.device}}</span>
            </div>
            <div v-if="!!msg.problem">
              <label class="detail-item">问题现象：</label>
              <span>{{msg.problem}}</span>
            </div>
            <div v-if="!!msg.erroCode">
              <label class="detail-item">故障代码：</label>
              <span>{{msg.erroCode}}</span>
            </div>
            <div v-if="!!msg.parkingTime">
              <label class="detail-item">停车时间：</label>
              <span>{{msg.parkingTime}}</span>
            </div>
            <div v-if="!!msg.tips">
              <label class="detail-item">小ｉ建议：</label>
              <span>{{msg.tips}}</span>
            </div>
          </div>
          <div class="btn-bar clearfix">
            <vi-button type="naive" vi-class="btn-naive" @click="positionDetail" v-if="!!msg.position" :value="msg.position"></vi-button>
            <vi-button type="naive" vi-class="btn-naive btn-off" @click="consultDetail" v-if="!!msg.consult" :value="msg.consult"></vi-button>
            <vi-button type="naive" vi-class="btn-naive btn-off" @click="emergNumDetail" v-if="!!msg.emergNum" :value="msg.emergNum"></vi-button>
            <vi-button type="naive" vi-class="btn-naive btn-off" @click="obtainPicDetail" v-if="!!msg.obtainPic" :value="msg.obtainPic"></vi-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import viButton from '@/components/button';

  export default {
    components: { viButton },
    data() {
      return {
        remindInfo: {},
      }
    },

    computed: {
      ...mapState('message', [
        'messageList',
      ])
    },

    methods: {
      ...mapActions('message', [
        'setMessageList',
        'getMessageList',
      ]),
      consultDetail() {
        let phoneNum = '12355849387';
        wx.makePhoneCall({ phoneNumber: phoneNum });
      },
      positionDetail() {
        let url = '../position/index';
        wx.navigateTo({ url });
      },
      emergNumDetail() {
        let url = '../call/index';
        wx.navigateTo({ url });
      },
      obtainPicDetail() {
        let url = '../message/showPic';
        wx.navigateTo({ url });
      }
    },
    mounted() {
      this.getMessageList().then(data => {
        this.setMessageList(data);
      });
    }

  }

</script>
<style lang="less">
  .page-message {
    .btn-naive {
      float: left;
    }
    .btn-off {
      margin-left: 37px !important;
    }
  }

</style>
<style scoped lang="less">
  @import url('../../assets/less/variable.less');
  @import url('../../assets/less/mixin.less');

  .page {
    padding-bottom: @page-pd;
  }
  .remind-block {
    margin: 10px 0 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .card-remind {
    background-color: #FFFFFF;
    border-radius: 10px;
  }

  .card-remind-header {
    padding: 7px 30px 0;
    border-bottom: 1px solid #979797;
    overflow: hidden;
    margin-top: 10px;


    .title-remind {
      .font(title);
      width: 225px;
      margin-left: 8px;
      vertical-align: middle;
    }
    .icon {
      vertical-align: middle;
      margin-bottom: -5px;
    }
  }

  .time-remind {
    width: 130px;
    padding: 3px 0;
    margin: 0 auto;
    border-radius: 15px;
    background-color: #DAE3F1;
    text-align: center;
  }

  .card-remind-body {
    padding: 15px 38px 5px;
    .detail-item {
      font-weight: 400;
    }

    .btn-bar {
      padding: 15px 0 5px;
    }
  }

</style>
