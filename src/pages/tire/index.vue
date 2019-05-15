<template>
  <div class="page">
    <div class="check-tire">
      <img class="bg-tire" src="../../assets/images/bg-tire.png" alt="">
      <img class="bg-tire-car" src="../../assets/images/bg-tire-car.png" alt="">
      <div class="car">
        <div class="tire leftup">
          {{checkResult.leftup.temper}}℃
          <br>{{checkResult.leftup.power}}bar
          <i-icon type="play_fill"></i-icon>
        </div>
        <div class="tire rightup">
          {{checkResult.rightup.temper}}℃
          <br>{{checkResult.rightup.power}}bar
          <i-icon type="play_fill"></i-icon>
        </div>
        <div class="tire leftdown">
          {{checkResult.leftdown.temper}}℃
          <br>{{checkResult.leftdown.power}}bar
          <i-icon type="play_fill"></i-icon>
        </div>
        <div class="tire rightdown" :class="true?'tire-warn':''">
          {{checkResult.rightdown.temper}}℃
          <br>{{checkResult.rightdown.power}}bar
          <i-icon type="play_fill" :class="true?'tire-warn':''"></i-icon>
        </div>
      </div>
    </div>
    <div class="check-result text-center">
      <div class="flex">
        <label class="flex-item">左前轮转速</label>
        <span class="flex-item">{{checkResult.leftup.speed}} 转分钟</span>
      </div>
      <div class="flex">
        <label class="flex-item">右前轮转速</label>
        <span class="flex-item">{{checkResult.rightup.speed}} 转分钟</span>
      </div>
      <div class="flex">
        <label class="flex-item">左后轮转速</label>
        <span class="flex-item">{{checkResult.leftdown.speed}} 转分钟</span>
      </div>
      <div class="flex">
        <label class="flex-item">右后轮转速</label>
        <span class="flex-item">{{checkResult.rightdown.speed}} 转分钟</span>
      </div>
      <div class="prompt-block">你的汽车右后轮胎胎压异常，可能出现了漏气的情况，请及时查看。</div>
    </div>
    <div class="text-center page-footer">*车辆图像仅为示意用途，与用户车辆实际颜色和车型无关</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checkResult: {
          leftup: {},
          leftdown: {},
          rightup: {},
          rightdown: {},
        },
      }
    },

    methods: {
      check() {
        this.checkResult = {
          leftup: { temper: 30, power: 2.3, speed: 434 },
          leftdown: { temper: 30, power: 2.3, speed: 434 },
          rightup: { temper: 30, power: 2.3, speed: 434 },
          rightdown: { temper: 30, power: 2.3, speed: 434 },
        };
      }
    },

    mounted() {
      this.check();
    }
  }

</script>
<style lang="less">
  .tire-warn {
    color: #FEE029;
  }
</style>
<style scoped lang="less">
  @import url(../../assets/less/variable.less);
  @import url(../../assets/less/mixin.less);

  .page {
    padding-bottom: 20px;
  }

  .check-tire {
    position: relative;
    box-sizing: border-box;
    height: 262px;
    padding-top: 60px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background-color: #000;
    .bg-tire {
      position: absolute;
      top: 0;
      left: 3px;
      width: 100%;
      height: 100%;
    }
    .bg-tire-car {
      position: absolute;
      top: 66px;
      left: 50%;
      margin-left: -33px;
      width: 66px;
      height: 152px;
    }

    .car {
      position: relative;
      width: 70px;
      height: 160px;
      margin: 0 auto;
      background-color: transparent;

      @w: 50px;
      @h: 40px;
      @off: 20px;
      @ioff: 17px;

      .leftup,
      .rightup,
      .leftdown,
      .rightdown {
        position: absolute;
        width: @w;
        height: @h;
        text-align: left;
      }
      .leftup {
        top: @off;
        left: -@w - 20px;
        i-icon {
          right: -@ioff;
        }
      }
      .rightup {
        top: @off;
        right: -@w - 20px;
        i-icon {
          left: -@ioff;
          transform: scaleX(-1);
        }
      }
      .leftdown {
        bottom: @off;
        left: -@w - 20px;
        i-icon {
          right: -@ioff;
        }
      }
      .rightdown {
        bottom: @off;
        right: -@w - 20px;
        i-icon {
          left: -@ioff;
          transform: scaleX(-1);
        }
      }
      i-icon {
        display: inline-block;
        position: absolute;
        top: 10px;
      }
    }
  }


  .check-result {
    padding: 20px 40px;
  }

  .flex {
    margin-bottom: 25px;
  }

  .prompt-block {
    position: relative;
    border: 1px solid @color-primary;
    padding: 20px 30px;
    text-align: left;

    &:before {
      content: '小ｉ提醒';
      display: block;
      padding: 5px;
      position: absolute;
      top: -16px;
      left: 50%;
      margin-left: -30px;
      background-color: @color-page;
    }
  }

</style>
