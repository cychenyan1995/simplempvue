<template>
  <div class="page">
    <div v-if="loading" style="margin-top: 50%;">
      <i-spin custom>
        <div class="loading"></div>
        <div>正在提取图片…</div>
      </i-spin>
    </div>
    <div v-if="!loading">
      <div class="pic-block" v-for="(showPicInfo, outLineIndex) in showPicInfos" :key="outLineIndex">
        <div class="time-showPic">{{showPicInfo.remindtime}}</div>
        <div class="card-showPic" v-for="(pic, innerIndex) in showPicInfo.pics" :key="innerIndex">
          <img :src="pic" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: true,
        showPicInfos: [
          { remindtime: "今天 18:06", pics: [`http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg`, `http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg`] },
          { remindtime: "今天 18:06", pics: [`http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg`] }
        ]
      }
    },

    components: {},

    methods: {

    },

    mounted() {
      setTimeout(_ => {
        this.loading = false;
      }, 2000)
    }
  }

</script>
<style scoped lang="less">

  .pic-block {
    margin: 10px 0 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .showPic-center-div {
    width: 150px;
    height: 150px;
    position: fixed;
    top: 20%;
    left: 0px;
    right: 0px;
    margin: auto;
  }

  .showPic-center-span {
    color: #7A7A7A;
    font-size: 14px;
    text-align: center;
  }

  .time-showPic {
    width: 130px;
    padding: 3px 0;
    margin: 10px auto;
    border-radius: 15px;
    background-color: #DAE3F1;
    text-align: center;
  }

  .card-showPic {
    width: 100%;
    height: 200px;
    margin-top: 10px;
  }



  .loading {
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 20px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: transparent;
    border-radius: 50%;
    border: 2px solid #2d8cf0;
    border-color: #2d8cf0 #2d8cf0 #2d8cf0 transparent;
    animation: loading-spin 0.6s linear;
    animation-iteration-count: infinite;
  }

  @keyframes loading-spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
