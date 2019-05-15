<template>
  <div class="time-line">
    <div class="time-summary">
      <div class="summary-ball">
        驾驶里程
        <br>{{tlData.timeSummary}}
        <br>km
      </div>
    </div>
    <div class="time-block" v-for="(tl,tlindex) in tlData.timeblocks" :key="tlindex">
      <div class="time">{{tl.time}}</div>
      <div class="line"></div>
      <div class="event">
        <div class="event-title"> {{tl.event}}</div>
        <div class="event-detail" :class="{'detail-block': tl.details.length >2}">
          <div class="detail" v-for="(detail,index) in tl.details" :key="index">{{detail}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      tlData: Object,
    },
    data() {
      return {}
    },

    methods: {},

    mounted() {}
  }

</script>
<style lang="less" scoped>
  @import url(../assets/less/variable.less);
  @import url(../assets/less/mixin.less);

  @line-left: 100px;
  @line-w: 30px;
  @line-center: @line-left + @line-w / 2;
  @evt-left: @line-left + @line-w;

  @l-ball-size: 4px;
  @sumball-offset: 40px;

  .time-summary {
    position: relative;
    .summary-ball {
      @size: 64px;
      width: @size;
      height: @size;
      padding: 10px 0;
      margin-left: (@line-left + @size) / 2;
      margin-bottom: @sumball-offset - @l-ball-size;
      box-sizing: border-box;
      border-radius: 100%;
      text-align: center;
      background-image: linear-gradient(45deg, #D877F8 0%, #61C5FA 100%);
      font-size: 12px;
      color: #fff;
    }
    &:before {
      position: absolute;
      bottom: -@sumball-offset - 3;
      left: @line-center;
      display: block;
      content: '';
      width: 2px;
      height: @sumball-offset + 4;
      margin-left: -1px;
      background-color: #333;
    }
  }

  .time-block {
    display: flex;
    position: relative;

    &:last-child {
      .line:before {
        display: none
      }
    }
    &:nth-child(2) {
      .line:after {
        background-color: #0079FF !important;
        box-shadow: 0px 0px 5px 2px #0079FF, -0px -0px 5px 2px #0079FF !important;
      }
    }

    .time {
      flex-basis: auto;
      width: 100px;
      text-align: right;
    }
    .line {
      position: absolute;
      flex-basis: auto;
      left: @line-left;
      width: @line-w;
      height: 100%; // line
      &:before {
        position: absolute;
        top: @l-ball-size / 2 + 7;
        bottom: 0;
        left: 50%;
        display: block;
        content: '';
        width: 2px;
        height: 100%;
        margin-left: -1px;
        background-color: #333;
      } // ball
      &:after {
        position: absolute;
        top: @l-ball-size / 2 + 6;
        left: 50%;
        display: block;
        content: '';
        width: @l-ball-size;
        height: @l-ball-size;
        margin-left: -@l-ball-size / 2;
        border-radius: 100%;
        background-color: #FB27F3;
        box-shadow: 0px 0px 5px 2px #FB27F3, -0px -0px 5px 2px #FB27F3;
      }
    }
    .event {
      flex: 1;
      margin-left: @line-w;
      &-title {}
      .detail {
        .font(desc);
      }
      &-detail {
        margin: 15px 0;
      }
      .detail-block {
        @lb-size: 18px;
        position: relative;
        margin: 25px 0;
        line-height: 2;

        &:before {
          display: block;
          content: '';
          position: absolute;
          top: 0;
          left: -@line-w / 2;
          width: @lb-size;
          height: 100%;
          border-radius: @lb-size;
          background-image: linear-gradient(0deg, #D877F8 0%, #74E7FB 100%);
          margin-left: -@lb-size / 2;
          z-index: 1;
        }

         &:after {
          @bw: 8px;
          display: block;
          content: '';
          position: absolute;
          top: 50%;
          left: -@line-w / 2;
          width: 0;
          height: 0;
          border: @bw solid transparent;
          border-bottom: @bw / 2 solid #FFF;
          margin-top: -@bw - 2;
          margin-left: -@lb-size / 2 + 1;
          z-index: 10;
        } 
      }
    }
  }

</style>
