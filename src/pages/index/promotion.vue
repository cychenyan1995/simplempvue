<template>
  <div class="page page-pd page-white">
    <div class="article">
      <h4 class="article-title">标题标题标题 标题标题标题</h4>
      <div class="article-content">
        <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
        <image src="http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg" />
        <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
        <image src="http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg" />
      </div>
      <div class="article-footer">
        {{rightArrow+'更多详情咨询经销商'+leftArrow}}
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      leftArrow: '<<',
      rightArrow: '>>',
    }
  },

  methods: {
    
  },

  mounted() {
  },
  onShow(){
    wx.setNavigationBarTitle({
      title: '夏日大促：速度与激情' 
    })
    let {id} = this.$root.$mp.query;
  }
}

</script>
<style scoped lang="less">
@import url(../../assets/less/variable.less);
@import url(../../assets/less/mixin.less);
.article {
  .article-title {
    .font(title);
    margin-top: 25px;
  }
  p {
    margin: 15px 0;
  }
  image {
    display: block;
    width: 375px;
    height: 304px;
    margin: 20px -@page-pd 15px;
  }
  .article-footer {
    text-align: center;
    margin: 30px 0 25px;
  }
}
</style>
