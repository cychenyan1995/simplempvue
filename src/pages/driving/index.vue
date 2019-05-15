<template>
  <div class="page">
    <div class="panel flex">
      <div class="flex-basic">
        <div class="score-panel relative">
          <canvas canvas-id="scorePanel"></canvas>
          <div class="score-detail">
            <div class="score">{{percent*100}}分</div>
            <div class="score-desc">驾驶评分</div>
          </div>
        </div>
      </div>
      <div class="drive-infos flex-item">
        <div class="drive-item">
          <label>今日行驶里程：</label>
          <span>{{drive.kilometers}}</span>
        </div>
        <div class="drive-item">
          <label>油耗总量：</label>
          <span>{{drive.oilNum}}</span>
        </div>
        <div class="drive-item">
          <label>平均油耗：</label>
          <span>{{drive.avgOil}}</span>
        </div>
        <div class="drive-item">
          <label>平均车速：</label>
          <span>{{drive.avgSpeed}}</span>
        </div>
        <div class="drive-item">
          <label>急刹次数：</label>
          <span>{{drive.brakeNum}}</span>
        </div>
        <div class="drive-item">
          <label>超速次数：</label>
          <span>{{drive.overSpeedNum}}</span>
        </div>
      </div>
    </div>
    <div class="panel panel-timeline">
      <vi-timeline :tl-data="tlData"></vi-timeline>
    </div>
    <div class="fixed-bottom">
      <vi-calendar align="bottom" :m-date="mDate" :m-data="mData" @m-change="mChange"></vi-calendar>
    </div>
  </div>
</template>
<script>
  import viTimeline from '@/components/timeline';
  import viCalendar from '@/components/calendar';
  export default {
    components: { viTimeline, viCalendar, },
    data() {
      return {
        percent: 0.87,
        drive: {
          kilometers: '500km',
          oilNum: '42升',
          avgOil: '8.5升/百公里',
          avgSpeed: '83.3km/小时',
          brakeNum: '2次',
          overSpeedNum: '3次'
        },
        mData: [4, 5, 8, 12],
        mDate: '2018-08-04',
        tlData: {
          timeSummary: 78,
          timeblocks: [{
            time: '08:00',
            event: '广深高速西乡段',
            details: [
              111111111111,
            ],
          }, {
            time: '12:00',
            event: '广深高速西乡段',
            details: [
              111111111111,
            ],
          }, {
            time: '13:00',
            event: '广深高速西乡段',
            details: [
              111111111111,
              222222222,
              33333333
            ],
          }, {
            time: '18:00',
            event: '广深高速西乡段',
            details: [],
          }]
        }
      }
    },

    methods: {
      render() {
        var ctx = wx.createCanvasContext('scorePanel')

        const grd = ctx.createLinearGradient(0, 0, 100*this.rate, 0)
        grd.addColorStop(0, '#D877F8')
        grd.addColorStop(1, '#42EBFB')

        // Fill with gradient
        ctx.beginPath();
        ctx.setLineCap('round');
        ctx.arc(52*this.rate, 52*this.rate, 50*this.rate, -Math.PI * 2 * 0.25, Math.PI * 2 * (this.percent - 0.25));
        ctx.setStrokeStyle(grd)
        ctx.setLineWidth(4*this.rate)
        ctx.stroke()
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(52*this.rate, 52*this.rate, 50*this.rate, Math.PI * 2 * (this.percent - 0.25), Math.PI * 2 * 0.75);
        ctx.setStrokeStyle('#d5d5d5')
        ctx.setLineWidth(1)
        ctx.stroke()
        ctx.closePath();

        ctx.draw()

      },
      mChange(date, render) {
        render([4, 5, 8, 12]);
      },

    },

    mounted() {
      let self = this;
      wx.getSystemInfo({
        //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
        success: function(res) {
          self.rate = res.windowWidth / 375;
          self.render();
        }
      });
    }
  }

</script>
<style scoped lang="less">
  @import url('../../assets/less/variable.less');
  @import url('../../assets/less/mixin.less');
  .flex {
    align-items: center;
  }

  @score-size: 104px;
  .score-panel {
    width: @score-size;
    height: @score-size; // padding: 20px;
    // box-sizing: border-box;
    // border: 4px solid pink;
    // border-radius: 100px;
    margin: 30px;

    canvas,
    .score-detail {
      width: 100%;
      height: 100%;
    }

    .score {
      color: @color-primary;
      font-size: 24px;
    }
    .score-detail {
      position: absolute;
      top: 0;
      left: 0;
      padding: 15px 0;
      text-align: center;
      z-index: 1;
      line-height: 1.8;
    }
  }

  .drive-infos {
    padding: 20px 0;

    .drive-item {
      line-height: 2;
    }
  }

  .panel-timeline {
    padding: 40px 0;
  }

</style>
