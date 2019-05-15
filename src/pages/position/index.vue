<template>
  <div class="page page-white">
    <map id="map" class="map" :longitude="mapCenter.longitude" :latitude="mapCenter.latitude" scale="14" :controls="controls" @controltap="controltap" :markers="markers" @markertap="markertap" :polyline="polyline" @regionchange="regionchange" show-location></map>
    <cover-image class="pull-left icon icon-car" :src="tabCar" @touchstart="touchStart('tabCar',0)" @touchend="touchEnd('tabCar',0)"></cover-image>
    <cover-image class="pull-right icon icon-zoomout" :src="tabZoomout" @touchstart="touchStart('tabZoomout',1)" @touchend="touchEnd('tabZoomout',1)"></cover-image>
    <cover-image class="pull-left icon icon-locus" :src="tabLocus" @touchstart="touchStart('tabLocus',2)" @touchend="touchEnd('tabLocus',2)"></cover-image>
    <cover-image class="pull-right icon icon-zoomin" :src="tabZoomin" @touchstart="touchStart('tabZoomin',3)" @touchend="touchEnd('tabZoomin',3)"></cover-image>
    <div class="abs-bottom text-left">
      <div>
        <div class="posi-info">
          <div class="text-ellipsis">最后位置：广东省 深圳市 南山区 </div>
          <div class="clearfix">
            <div class="pull-left">状态：离线</div>
            <div class="pull-right">速度：0 km/h</div>
          </div>
        </div>
        <div class="posi-time">更新时间：2018-04-12 12:12</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mapCenter: {
          longitude: 113.324520,
          latitude: 23.099994
        },
        markers: [],
        // 当前车的位置
        carPosition: {
          longitude: 113.324520,
          latitude: 23.099994,
        },

        // tab icon 切换
        tabCar: '',
        tabLocus: '',
        tabZoomout: '',
        tabZoomin: '',
        tabUrls: [{
          active: 'https://img01.sogoucdn.com/app/a/100520021/3ADFEB47E2EDE5FA20BEA1103196DBFE',
          normal: 'https://img04.sogoucdn.com/app/a/100520021/EBD4DD100AAF0C05B980DDB25A4F45E4',
        }, {
          active: 'https://img01.sogoucdn.com/app/a/100520021/3ADFEB47E2EDE5FA20BEA1103196DBFE',
          normal: 'https://img04.sogoucdn.com/app/a/100520021/EBD4DD100AAF0C05B980DDB25A4F45E4',
        }, {
          active: 'https://img01.sogoucdn.com/app/a/100520021/3ADFEB47E2EDE5FA20BEA1103196DBFE',
          normal: 'https://img04.sogoucdn.com/app/a/100520021/EBD4DD100AAF0C05B980DDB25A4F45E4',
        }, {
          active: 'https://img01.sogoucdn.com/app/a/100520021/3ADFEB47E2EDE5FA20BEA1103196DBFE',
          normal: 'https://img04.sogoucdn.com/app/a/100520021/EBD4DD100AAF0C05B980DDB25A4F45E4',
        }],
        // 小车动画运行 id
        timeoutid: '',
      }
    },

    methods: {
      touchStart(tabName, index) {
        this[tabName] = this.tabUrls[index].active;
        switch (tabName) {
          case 'tabCar':
            this.localCar();
            break;
          case 'tabLocus':
            this.locus();
            break;
          case 'tabZoomout':
            this.zoomout();
            break;
          case 'tabZoomin':
            this.zoomin();
            break;
        }
      },
      touchEnd(tabName, index) {
        this[tabName] = this.tabUrls[index].normal;
      },
      localCar() {

      },
      locus() {
        let url = `../position/locus`;
        wx.navigateTo({ url });
      },
      zoomin() {

      },
      zoomout() {

      },
      // 当前车的位置动画
      aniMarker(index = 0) {
        let off = index % 4;
        while (off + 1 != this.markers.length) {
          if (off + 1 > this.markers.length) {
            this.markers.push(Object.assign({
              iconPath: `/static/images/tab_ycar${off}.png`,
              width: 60,
              height: 60,
              anchor: { x: 0.5, y: 0.5 }
            }, this.carPosition));
          } else {
            this.markers.pop();
          }
        }

        this.timeoutid = setTimeout(_ => {
          this.aniMarker(index + 1);
        }, 500);
      },
    },
    // page hide 时停止小车动画
    onUnload() {
      clearTimeout(this.timeoutid);
    },
    onHide() {
      clearTimeout(this.timeoutid);
    },
    // page show 时开始小车动画
    onShow() {
      this.markers = [];
      this.aniMarker();
    },
    mounted() {
      this.tabCar = this.tabUrls[0].normal;
      this.tabLocus = this.tabUrls[1].normal;
      this.tabZoomout = this.tabUrls[2].normal;
      this.tabZoomin = this.tabUrls[3].normal;
    }
  }

</script>
<style scoped lang="less">
  @import url(../../assets/less/variable.less);
  @import url(../../assets/less/mixin.less);

  .map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 82px;
    width: 100%;
    height: initial;
  }

  .abs-bottom {
    height: 82px;
    padding: 0 18px;
    background-color: #FFF;
    line-height: 18px;
    display: flex;
    align-items: center;
  }

  .posi-info {
    .font();

    .text-ellipsis {
      width: 100%;
    }
  }

  .posi-time {
    .font(desc);
  }

  .icon {
    position: absolute;
    z-index: 11;
  }

  .icon-car,
  .icon-locus {
    top: 30px;
    left: 30px;
  }

  .icon-locus {
    margin-top: 20px + 30px;
  }

  .icon-zoomout,
  .icon-zoomin {
    top: 30px;
    right: 30px;
  }

  .icon-zoomin {
    margin-top: 20px + 30px;
  }

</style>
