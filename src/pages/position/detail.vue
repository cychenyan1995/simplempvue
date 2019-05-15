<template>
  <div class="page page-white">
    <div class="panel">
      <div class="detail-block flex">
        <div class="flex-item">
          <label>开始时间</label>
          <div>2018-03-05 10:10:10 </div>
        </div>
        <div class="flex-item">
          <label>结束时间</label>
          <div>2018-03-05 16:10:10 </div>
        </div>
      </div>
      <div class="detail-block flex">
        <div class="flex-item">
          <label>行车时长</label>
          <div>0小时20分钟3秒</div>
        </div>
        <div class="flex-item">
          <label>行驶里程</label>
          <div>9.8公里</div>
        </div>
      </div>
      <div class="detail-block flex">
        <div class="flex-item">
          <label>最高时速</label>
          <div>80公里/小时</div>
        </div>
        <div class="flex-item">
          <label>平均油耗</label>
          <div>28公升/百公里</div>
        </div>
      </div>
      <div class="detail-block">
        <div class="text-ellipsis">起始位置：广东省 深圳市 南山区</div>
        <div class="text-ellipsis">结束位置：广东省 深圳市 南山区 深南大道多源路口北路口北路口北路口北路口北路口北</div>
      </div>
    </div>
    <map id="map" class="map" :longitude="mapCenter.longitude" :latitude="mapCenter.latitude" scale="14" :controls="controls" @controltap="controltap" :markers="markers" :include-points="polyline[0].points" @markertap="markertap" :polyline="polyline" @regionchange="regionchange" show-location></map>
    <cover-image class="pull-right icon icon-play" :src="tabPlay" @touchstart="touchStart('tabPlay',0)" @touchend="touchEnd('tabPlay',0)"></cover-image>
    <cover-image class="pull-right icon icon-stop" :src="tabStop" @touchstart="touchStart('tabStop',1)" @touchend="touchEnd('tabStop',1)"></cover-image>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    data() {
      return {
        mapCtx: null,
        mapCenter: {
          longitude: (114.0595600000 + 113.9332866669) / 2,
          latitude: (22.5428600000 + 22.5399885764) / 2,
        },
        markers: [{ // 小车的点
          id: 11111,
          longitude: 114.0595600000,
          latitude: 22.5428600000,
          iconPath: '/static/images/tab_ycar0.png',
          width: 60,
          height: 60,
          anchor: { x: 0.5, y: 0.5 }
        }, { // 终点
          id: 2,
          longitude: 113.9332866669,
          latitude: 22.5399885764,
          iconPath: '/static/images/tab_marker.png',
          width: 40,
          height: 40,
          anchor: { x: 0.5, y: 0.82 }
        }],
        polyline: [{
          points: [{
            longitude: 114.0595600000,
            latitude: 22.5428600000,
          }, {
            longitude: 113.9332866669,
            latitude: 22.5399885764,
          }],
          color: "#FB22F3",
          width: 2,
          // dottedLine: true
        }],

        // tab icon 切换
        tabPlay: '',
        tabStop: '',
        tabUrls: [{
          active: 'https://img01.sogoucdn.com/app/a/100520021/3ADFEB47E2EDE5FA20BEA1103196DBFE',
          normal: 'https://img04.sogoucdn.com/app/a/100520021/EBD4DD100AAF0C05B980DDB25A4F45E4',
        }, {
          active: 'https://img01.sogoucdn.com/app/a/100520021/3ADFEB47E2EDE5FA20BEA1103196DBFE',
          normal: 'https://img04.sogoucdn.com/app/a/100520021/EBD4DD100AAF0C05B980DDB25A4F45E4',
        }]
      }
    },

    computed: {
      ...mapState('position', [
        'locusDetail'
      ])
    },

    methods: {
      ...mapActions('position', [
        'setLocusDetail',
        'getLocusDetail'
      ]),
      touchStart(tabName, index) {
        this[tabName] = this.tabUrls[index].active;
        tabName == "tabPlay" && setTimeout(_ => this.translateMarker(), 300);
      },
      touchEnd(tabName, index) {
        this[tabName] = this.tabUrls[index].normal;
      },
      translateMarker() {
        this.mapCtx.translateMarker({
          markerId: 11111,
          autoRotate: false,
          rotate: 0,
          duration: 1000,
          destination: {
            longitude: 113.9332866669,
            latitude: 22.5399885764,
          },
          animationEnd: () => {
            // 动画结束时将小车固定在终点
            Object.assign(this.markers[0], {
              longitude: 113.9332866669,
              latitude: 22.5399885764,
            });
            this.markers = [...this.markers];
          }
        })
      },

    },

    mounted() {
      this.tabPlay = this.tabUrls[0].normal;
      this.tabStop = this.tabUrls[1].normal;
      let { id } = this.$root.$mp.query;
      this.getLocusDetail({ id }).then(data => {
        this.setLocusDetail(data);
      });
    },
    onReady() {
      this.mapCtx = wx.createMapContext('map');
    }
  }

</script>
<style scoped lang="less">
  @import url(../../assets/less/variable.less);
  @import url(../../assets/less/mixin.less);

  .map {
    position: absolute;
    top: 230px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: initial;
  }

  .panel {
    padding: 10px 30px 20px;
  }

  .detail-block {
    line-height: 1.6;
    padding: 5px 0;
    font-size: @f-desc-size;

    .flex-item:last-child {
      padding-left: 35px;
      border-left: 2px solid @color-border-desc;
    }

    +.detail-block {
      border-top: 2px solid @color-border-desc;
    }

    .text-ellipsis {
      width: 100%;
      display: block;
    }
  }

  .controls {
    position: absolute;
    top: 230px;
    left: 0;
    right: 0;
    padding: 30px;
    height: 100px;

    .clearfix {
      margin-bottom: 20px;
    }

    .icon {
      z-index: 11;
    }
  }

  .icon {
    position: absolute;
    z-index: 11;
  }

  .icon-play,
  .icon-stop {
    top: 260px;
    right: 30px;
  }

  .icon-stop {
    margin-top: 20px + 30px;
  }

</style>
