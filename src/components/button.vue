<template>
  <i-button @click="btnClick" :type="type" :disabled="disabled" :i-class="iClass">
    <slot>{{value}}</slot>
  </i-button>
</template>
<script>
export default {
  props: [
    'value',
    'text',
    'vi-class',
    'type',
    'disabled',
  ],
  data() {
    return {
      className: 'vi-btn',
    };
  },
  computed: {
    iClass() {
      let classList = new Set([this.className]);
      this.type && classList.add(`${this.className + '-' + this.type}`);
      this.viClass && classList.add(this.viClass);

      return Array.from(classList).join(' ');
    }
  },
  methods: {
    btnClick() {
      if (this.disabled) return false;
      
      this.$emit('click');
    }
  }
}

</script>
<style lang="less">
  @import url(../assets/less/variable.less);
  @import url(../assets/less/mixin.less);

  .vi-btn {
    border-radius: @btn-border-radius !important;
    margin-left: auto !important;
    margin-right: auto !important;
    font-size: @f-lg !important;

    &.vi-btn-primary {
      background-color: @color-primary !important;
      color: #FFF !important;
    }

    &-md {
      width: 230px;
    }
    &.btn-naive {
      @h: 26px;
      width: 66px !important;
      height: @h !important;
      line-height: @h !important;
      padding: 0;
      border-radius: @h/2 !important;
      font-size: @f-sm !important;
    }
  }

</style>
