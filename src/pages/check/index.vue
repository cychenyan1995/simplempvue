<template>
  <div class="page page-white">
    <div class="check-action text-center">
      <img class="bg-check" src="../../assets/images/bg-check.png" alt="">
      <div class="score-panel relative">
        <canvas canvas-id="scorePanel"></canvas>
        <div class="check-ani">
          <div class="ani-score checking" v-if="isChecking">正在体检</div>
          <div class="ani-score" v-else>{{checkResult.score}}分</div>
        </div>
      </div>
      <div class="btn-bar">
        <i-button i-class="check-btn loading" type="naive" @click="check()" :disabled="isChecking" shape="circle">立即体检</i-button>
      </div>
      <div v-if="isChecking">
        <div class="check-bar">正在检测：{{checkingPart}}...</div>
      </div>
      <div class="check-bar">{{checkResult.scoreText}}次体检得分:<span class="score">{{checkResult.score}}分</span></div>
      <div v-if="!isChecking">
        <div class="check-bar">超过全国{{checkResult.percent}}的车主！</div>
        <div class="check-time">检测时间：{{checkResult.time}}</div>
      </div>
      <div class="check-prompt icon icon-info" hover-class="active" @click="promptVisible = true"></div>
    </div>
    <div class="check-result">
      <div class="flex">
        <label class="flex-item">车身系统 ({{checkResult.body}})</label>
        <span class="flex-basis">{{checkResult.body < 10000 ? '正常' : '异常'}}</span>
      </div>
      <div class="flex">
        <label class="flex-item">网络通讯 ({{checkResult.net}})</label>
        <span class="flex-basis">{{checkResult.net < 10000 ? '正常' : '异常'}}</span>
      </div>
      <div class="flex">
        <label class="flex-item">动力总成 ({{checkResult.power}})</label>
        <span class="flex-basis">{{checkResult.power < 10000 ? '正常' : '异常'}}</span>
      </div>
      <div class="flex">
        <label class="flex-item">底盘系统 ({{checkResult.frame}})</label>
        <span class="flex-basis">{{checkResult.frame < 10000 ? '正常' : '异常'}}</span>
      </div>
      <div class="flex">
        <label class="flex-item">车辆损耗 ({{checkResult.loss}})</label>
        <span class="flex-basis">{{checkResult.loss < 10000 ? '正常' : '异常'}}</span>
      </div>
    </div>
    <!-- 体检信息提示 -->
    <vi-dialog :visible="promptVisible" @close="dialogClose">
      <div class="text-left" style="margin-top: 24px;">车况检测必须是在设备通电情况下进行，如果设备已拔出，则当前检测结果为最后一次通电时车况。</div>
    </vi-dialog>
  </div>
</template>
<script>
  import viDialog from '@/components/dialog';
  export default {
    components: { viDialog },
    data() {
      return {
        checkingPart: '',
        isChecking: false,
        checkResult: {},
        promptVisible: false,
      }
    },

    methods: {
      dialogClose() {
        this.promptVisible = false;
      },
      getLastCheckInfo() {
        this.checkResult = {
          body: 138,
          net: 79,
          power: 3540,
          frame: 532,
          loss: 2,
          time: this.$iBox.formatDate(new Date()),
          score: 90,
          percent: '89%',
        };
        this.checkResult.scoreText = `上次`;
      },
      check() {
        // 0 清除 canvas 动画
        this.render(0);
        this.isChecking = true;

        let checkParts = ['车身系统', '网络通讯', '动力总成', '底盘系统', '车辆损耗'];
        this.checkingPart = checkParts.shift();

        let loopId = setInterval(_ => {
          this.checkingPart = checkParts.shift();

          if (!this.checkingPart) {
            clearInterval(loopId);
            this.isChecking = false;
            this.checkResult = {
              body: 138,
              net: 79,
              power: 3540,
              frame: 532,
              loss: 2,
              time: this.$iBox.formatDate(new Date()),
              score: 95,
              percent: '90%',
            };
            this.checkResult.scoreText = `本次`;
            //  重新渲染canvas动画
            this.render(this.checkResult.score);
          }
        }, 500);
      },
      render(score) {
        let rate = this.rate;
        let final = score / 100;
        let ctx = wx.createCanvasContext('scorePanel')

        let grd = ctx.createLinearGradient(0, 0, 100 * rate, 0)
        grd.addColorStop(0, '#FCA764')
        grd.addColorStop(1, '#E8708F')

        function raf(percent){
          let percentAngle = (percent - 0.25) * 2 * Math.PI;
          ctx.beginPath()
          ctx.setLineCap('round');
          ctx.arc(85 * rate, 85 * rate, 70 * rate, -Math.PI * 2 * 0.25, percentAngle)
          ctx.setStrokeStyle(grd)
          ctx.setLineWidth(4 * rate)
          ctx.stroke()
          ctx.closePath()

          ctx.beginPath()
          ctx.setFillStyle('#F5A623')
          ctx.setShadow(2, 2, 6, '#F5A623')
          ctx.arc((85+70*Math.cos(percentAngle)) * rate, (85+70*Math.sin(percentAngle)) * rate, 6 * rate, 0, 2 * Math.PI)
          ctx.fill()
          ctx.closePath()

          ctx.beginPath()
          ctx.setFillStyle('#F5A623')
          ctx.setShadow(-2, -2, 6, '#F5A623')
          ctx.arc((85+70*Math.cos(percentAngle)) * rate, (85+70*Math.sin(percentAngle)) * rate, 6 * rate, 0, 2 * Math.PI)
          ctx.fill()
          ctx.closePath()

          ctx.beginPath()
          ctx.setFillStyle('#F5A623')
          ctx.setShadow(2, -2, 6, '#F5A623')
          ctx.arc((85+70*Math.cos(percentAngle)) * rate, (85+70*Math.sin(percentAngle)) * rate, 6 * rate, 0, 2 * Math.PI)
          ctx.fill()
          ctx.closePath()

          ctx.beginPath()
          ctx.setFillStyle('#F5A623')
          ctx.setShadow(-2, 2, 6, '#F5A623')
          ctx.arc((85+70*Math.cos(percentAngle)) * rate, (85+70*Math.sin(percentAngle)) * rate, 6 * rate, 0, 2 * Math.PI)
          ctx.fill()
          ctx.closePath()

          ctx.draw()



          if (percent < final) {
            percent += 0.02;
            percent = percent < final ? percent : final;
            setTimeout(_ => raf(percent),16)
          }
        }

        final ? raf(0) : ctx.draw();
      },
    },

    mounted() {
      this.getLastCheckInfo();
      let self = this;
      wx.getSystemInfo({
        success: function(res) {
          self.rate = res.windowWidth / 375;
          // 延迟 100ms 为了渲染完页面时再开始动画
          setTimeout(function(){
            self.render(self.checkResult.score);
          },100)
        }
      });
    }
  }

</script>
<style lang="less">
  @import url(../../assets/less/variable.less);
  .check-btn {
    display: inline-block;
    height: 30px !important;
    line-height: 30px !important;
    margin: 0 !important;
  }

</style>
<style scoped lang="less">
  @import url(../../assets/less/variable.less);
  @import url(../../assets/less/mixin.less);

  .check-action {
    position: relative;
    height: 323px;
    padding-bottom: 5px;
    box-sizing: border-box;
    background-color: #000;
    .bg-check {
      position: absolute;
      top: 155px;
      left: 50%;
      width: 250px;
      height: 100px;
      margin-left: -125px;
    }
    .score-panel {
      @size: 170px;

      display: inline-block;
      width: @size;
      height: @size;
      margin-bottom: 26px;

      canvas {
        width: 100%;
        height: 100%;
      }
    }
    .check-ani {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 31px;
      box-sizing: border-box;
      .ani-score {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 28px;
        line-height: 1;
        margin-top: -14px;
        color: #FFF;

        &.checking {
          font-size: 20px;
          margin-top: -10px;
        }
      }

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100%; // background-color: #53CED9;        
        background-image: linear-gradient(0deg, #51C5E3 0%, #58DEC9 100%);
      }
    }
    .btn-bar {
      margin-bottom: 15px;
      padding-bottom: 0;
    }
    .check-bar {
      position:relative;
      font-size: 16px;
      color: #fff;
      margin-bottom: 5px;

      .score {
        color: #4DDA64;
      }
    }

    .check-time {
      margin-top: 7px;
      font-size: 14px;
      color: @f-desc-color;
    }

    .check-prompt {
      display: inline-block;
      position: absolute;
      top: 20px;
      right: 25px;
    }
  }

  .check-result {
    padding: 15px 50px;
  }

  .flex {
    margin-bottom: 26px;
    .flex-item {
      .font(title);
    }
    .flex-basis {
      text-align: right;
      width: 3em;
      font-size: 14px;
      color: @color-primary;
    }
  }

</style>
