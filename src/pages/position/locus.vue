<template>
  <div class="page">
    <vi-calendar :m-data="mData" :m-date="mDate" @d-change="dChange" @m-change="mChange"></vi-calendar>
    <div class="panel flex" v-for="(item,index) in locusList" :key="index">
      <div class="flex-item">
        <div class="locus-point flex" v-for="(detail,detailIndex) in item.detail" :key="detailIndex">
          <span class="flex-basis" :class="'icon icon-' + (detailIndex ? 'end' : 'start')"></span>
          <div class="point-detail flex-item">
            <div class="locus-time">{{detail.time}}</div>
            <div class="locus-address text-ellipsis">{{detail.address}}</div>
          </div>
        </div>
      </div>
      <div class="flex-basis text-center locus-sum">
        <div class="sum-view">
          <label>总里程</label>
          <div>{{item.total}}km</div>
        </div>
        <div class="locusQuery" @click="query(item)">
          <div class="icon icon-search" hover-class="active"></div>
          <div><a href="javascript:;">查看</a></div>
        </div>
      </div>
    </div>
    <div class="text-center scroll-loading" v-if="loadingMore">
      <i-spin custom>加载中...</i-spin>
    </div>
  </div>
</template>
<script>
  import viCalendar from '@/components/calendar';
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        mData: [4, 5, 8, 12],
        // mDate 为 mData中的某一天，默认显示
        mDate: '2018-08-04',
        loadingMore: false,
      }
    },

    computed: {
      ...mapState('position', [
        'locusList'
      ])
    },

    methods: {
      ...mapActions('position', [
        'setLocusList',
        'getLocusList'
      ]),
      query(item) {
        let url = `../position/detail?id=${item.id}`;
        wx.navigateTo({ url });
      },
      mChange(date, render) {
        render([4, 5, 8, 12]);
      },
      dChange(date) {
        this.getLocusList().then(data => {
          this.setLocusList(data);
        });
      }
    },
    components: { viCalendar },

    mounted() {
      this.getLocusList().then(data => {
        this.setLocusList(data);
      });
    },

    onReachBottom() {
      this.loadingMore = true;
      this.getLocusList().then(data => {
        this.loadingMore = false;
        this.setLocusList(this.locusList.concat(...data));
      });
    },

    onPullDownRefresh() {
      this.getLocusList().then(data => {
        this.setLocusList(data);
        wx.stopPullDownRefresh();
      });
    }
  }

</script>
<style scoped lang="less">
  @import url(../../assets/less/variable.less);
  @import url(../../assets/less/mixin.less);

  .panel {
    width: 100%;
    margin: 20px 0;

    &:first-child {
      margin-bottom: 30px;
    }
  }

  .locus-point {
    padding: 10px;
    line-height: 1;

    &:first-child {
      border-bottom: @input-border;
    }
    .point-detail {
      margin-left: 10px;
    }

    .locus-address {
      margin-top: 5px;
      width: 250px;
    }
  }

  .locus-sum {
    width: 80px;
    padding: 10px 0;
    border-left: @input-border;

    .sum-view {
      margin-bottom: 10px;
    }
    .icon-search {
      margin-bottom: -6px;
    }
  }

</style>
