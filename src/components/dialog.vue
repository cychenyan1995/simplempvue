<template>
  <i-modal :visible="visible" :actions="[]" :show-ok="false" :show-cancel="false">
    <div class="dialog-body">
      <div class="icon icon-close" hover-class="active" @click="close"></div>
      <slot></slot>
    </div>
  </i-modal>
</template>
<script>
  export default {
    props: {
      'visible': Boolean,
    },
    data() {
      return {};
    },
    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    }
  }

</script>
<style lang="less">
  .dialog-title {
    font-size: 16px;
    margin-bottom: 4px;
  }

  .dialog-body {
    font-size: 14px;
  }
</style>
<style lang="less" scoped>
  .dialog-body {
    position: relative;
    line-height: 1.4;
    padding: 25px;
    color: #fff;
    text-align: center;

    .icon-close {
      position: absolute;
      top: 2px;
      right: 2px;
      display: block;
    }
  }
</style>
