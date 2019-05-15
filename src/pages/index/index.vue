<template>
  <div class="page page-white">
    <swiper :indicator-dots="true" :autoplay="true" :interval="interval" :duration="duration">
      <block v-for="(item,index) in bannerList" :key="index">
        <swiper-item @click="bannerClick(item)">
          <img :src="item.url" class="slide-image" width="355" height="150" />
        </swiper-item>
      </block>
    </swiper>
    <div class="card-simple">
      <div class="card-header">
        <i-badge count="3">
          <div class="icon icon-prompt" hover-class="active" @click="viewMsgDetail"></div>
        </i-badge>
        <div>小ｉ提醒</div>
      </div>
      <div class="card-body">
        <div class="header clearfix">
          <div class="title">{{message.title}} </div>
          <div class="timeoff pull-right">{{message.timeoff}}分钟前</div>
        </div>
        <div class="content">
          {{message.content}}
        </div>
        <a href="#" role="button" class="pull-right" @click.prevent="viewMsgDetail">点击查看详情</a>
      </div>
    </div>
    <i-grid i-class="vi-grid">
      <i-row v-for="(gridLine, gridLineIndex) in grids" :key="gridLineIndex">
        <i-grid-item i-class="vi-grid-item" v-for="(grid, gridIndex) in gridLine" :key="gridIndex" @click="gridClick(grid)">
          <div class="text-center">
            <div class="icon" hover-class="active" :class="'icon-grid_'+grid.url"></div>
            <div>{{grid.text}}</div>
          </div>
        </i-grid-item>
      </i-row>
    </i-grid>
  </div>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        interval: 5000,
        duration: 1000,

        grids: [
          [
            { text: '爱车体检', url: 'check' },
            { text: '位置服务', url: 'position' },
            { text: '驾驶行为', url: 'driving' },
          ],
          [
            { text: '应急电话', url: 'call' },
            { text: '充值中心', url: 'charge' },
            { text: '胎压监测', url: 'tire' },
          ],
          [
            { text: '车险计算', url: 'insurance' },
            { text: '爱车估值', url: 'valuation' },
            { text: '违章查询', url: 'violation' },
          ]
        ],

        current: 'homepage',
      }
    },

    computed: {
      ...mapState('index', [
        'message',
        'bannerList'
      ]),
    },

    methods: {
      ...mapActions('index', [
        'setMessage',
        'getMessage',
        'setBannerList',
        'getBannerList',
      ]),
      ...mapActions([
        'tokenReady',
      ]),
      viewMsgDetail() {
        let url = '../message/index';
        wx.switchTab({ url });
      },
      gridClick(grid) {
        let url = `../${grid.url}/index`;
        wx.navigateTo({ url });
      },
      bannerClick(banner) {
        let url = `../index/promotion?id=${banner.id}`;
        wx.navigateTo({ url });
      },

      tabChange({ detail }) {
        this.current = detail.key;
      },
    },

    created() {
      // 调用应用实例的方法获取全局数据
    },
    mounted() {
      wx.showLoading({
        title: '检查登录……',
        mask: true
      });
      // 当 token 准备好时再加载数据
      this.tokenReady().then(_ => {
        this.getMessage().then(data => {
          data.timeoff = 30;
          this.setMessage(data);
        });
        this.getBannerList().then(data => {
          this.setBannerList(data);
        });
      }).finally(_ => {
        wx.hideLoading();
      });
    }
  }

</script>
<style scoped lang="less">
  @import url('../../assets/less/variable.less');
  @import url('../../assets/less/mixin.less');

  .card-simple {
    display: flex;
    padding: 10px 20px 10px 15px;
    align-items: start;
    border-bottom: 2px solid #E3E3E3;
    line-height: 1.4;

    .card-header {
      width: 60px;
      margin-right: 22px;
      text-align: center;
      flex-basis: auto;

      i-badge {
        margin: 7px 0 6px;
        display: block;
      }
      .font(desc);
    }
    .card-body {
      flex: 1; // padding-right: 15px;
      font-size: 14px;

      .header {
        .title {
          .font(title);
          display: inline-block;
          width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .timeoff {
          .font(desc);
          margin-top: 4px;
        }
      }

      .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 2.9em;
      }
    }
  }

</style>
