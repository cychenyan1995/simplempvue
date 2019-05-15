<template>
  <div class="form-item" :class="iClass">
    <label class="form-label" @click="togglePanel">
      <span class="label-text">{{label || selLabel}}</span>
      <i-icon type="select" i-class="icon-select"></i-icon>
    </label>
    <div v-if="!!label" class="picker-value">{{selLabel}}</div>
    <div class="picker">
      <div v-if="visible" class="picker-panel">
        <div class="picker-action clearfix">
          <a class="pull-left" @click="cancel">取消</a>
          <a class="pull-right" @click="confirm">确定</a>
        </div>
        <picker-view class="picker-view" indicator-style="height: 32px;" :value="[selIndex]" @change="change">
          <picker-view-column>
            <view class="picker-item text-center" v-for="(item,index) in dataList" :key="index">{{isObj?item.label:item}}</view>
          </picker-view-column>
        </picker-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      label: String,
      mode: String,
      viClass: String,
      value: [String, Number],
      'data-list': {
        default: [],
        type: Array,
      },
      className: 'form-item',
    },
    data() {
      return {
        isObj: true,
        visible: false,
        selIndex: 0,
      }
    },
    computed: {
      selLabel() {
        return this.value ? (this.isObj ? this.value.label : this.value) : '';
      },
      iClass() {
        let classList = new Set([this.className]);
        this.type && classList.add(`${this.className + '-' + this.type}`);
        this.viClass && classList.add(this.viClass);

        return Array.from(classList).join(' ');
      }
    },
    methods: {
      change(e) {
        let item = e.mp.detail.value;

        this.selIndex = item[0];
      },
      cancel() {
        this.visible = false;
      },
      confirm() {
        let selItem = this.dataList[this.selIndex];

        this.$emit('change', selItem);
        this.$emit('input', selItem);
        this.cancel();
      },
      togglePanel() {
        this.visible = !this.visible;
      }
    },
    mounted() {
      this.isObj = this.mode === 'object';
      let index = this.dataList.indexOf(this.value);
      index !== -1 && (this.selIndex = index);
    }
  }

</script>
<style lang="less">
  @import url(../assets/less/variable.less);
  @import url(../assets/less/mixin.less);
  .icon-select {
    font-size: 18px !important;
    margin-top: -3px !important;
  }

</style>
<style lang="less" scoped>
  @import url(../assets/less/variable.less);
  @import url(../assets/less/mixin.less);

  .label-text {
    margin-right: 4px;
  }

  @h-item: 32px;
  .picker {
    display: flex;
    // padding: 10px; // border-bottom: @input-border;
    &-value {
      flex: 1;
      padding: 0 5px;
    }
    &-panel {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      height: @h-item * 7;
      background-color: #fff;
      border-top: @hr-border;

      &:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: -1;
        background-color: @color-mask;
      }
    }
    &-action {
      padding: 8px 10px;
      border-bottom: @hr-border;
      background-color: #fff;
      a.pull-left {
        color: @color-desc !important;
      }
      a.pull-right {
        color: @color-primary !important;
      }
    }
    &-view {
      background-color: #fff;
      height: @h-item * 6;
      line-height: @h-item;
    }
    &-item {
      height: @h-item !important;
    }
  }

</style>
