<template>
  <div class="form-item">
    <label class="form-label" v-if="!!label">{{label}}</label>
    <i-input :placeholder="placeholder" :type="type" :maxlength="maxlength" :value="value" :i-class="iClass" @change="change" @input="input" @blur="blur" />
    <span class="form-unit" v-if="!!unit">{{unit}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      label: String,
      unit: String,
      'placeholder': String,
      'vi-class': String,
      value: [String, Number],
      'type': String,
      'maxlength': {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
      }
    },
    data() {
      return {
        className: 'vi-input form-value',
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
      change({ mp: { detail } }) {
        this.$emit('change', detail.detail.value);
        this.$emit('input', detail.detail.value);
      },
      blur({ mp: { detail } }) {
        this.$emit('blur', detail.detail.value);
      },
      focus({ mp: { detail } }) {
        this.$emit('focus', detail.detail.value);
      },
    },
    mounted() {
    }
  }

</script>
<style lang="less">
  @import url(../assets/less/variable.less);
  @import url(../assets/less/mixin.less);

  // input 
  .vi-input {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin: -6.5px 0 -7px !important;
    // border-bottom: @input-border;
    text-align: center;
    background-color: transparent !important;

    @h: 32px;
    @pd: 5px;
    >.i-input-input {
      height: @h - @pd*2;
      line-height: @h - @pd*2;
      padding: @pd 5px;
    }
  }

  i-input {
    display: block;
    overflow: hidden;
    flex: 1;
    form &+& {
      margin-top: 24px;
    }
  }

</style>
