<template>
  <div class="page">
    <i-cell-group class="i-cellblock">
      <div v-for="(cell,cellIndex) in titleList" :key="cellIndex">
        <div>
          <i-cell i-class="cell-switch" :title='cell.title'>
            <i-switch :value="cell.switch" @change="onChange($event,cellIndex)" slot="footer"></i-switch>
          </i-cell>
        </div>
        <span>{{cell.discribe}}</span>
      </div>
    </i-cell-group>
  </div>
</template>
<script>
export default {
  data() {

    return {
      titleList: [
        { title: "驻车提醒", discribe: "关闭后将不再收到驻车提醒", switch: false },
        { title: "驻车异常提醒", discribe: "关闭后将不再收到驻车异常提醒,关闭后将不再收到驻车异常提醒,关闭后将不再收到驻车异常提醒", switch: false },
        { title: "车辆碰撞提醒", discribe: "关闭后将不再收到车辆碰撞提醒", switch: false },
        { title: "车辆侧翻提醒", discribe: "关闭后将不再收到车辆侧翻提醒", switch: false },
        { title: "胎压监测提醒", discribe: "关闭后将不再收到胎压监测提醒", switch: false },
      ]
    }
  },
  methods: {
    onChange({ mp: { detail } }, index) {
      this.titleList[index].switch = detail.value;
      //$set()  vue.js
      this.$set(this.titleList, index, this.titleList[index]);
    },
  }
}

</script>
<style>
.cell-switch {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
span {
  display: block;
  height: 65px;
  padding: 10px 30px;
  box-sizing: border-box;
}

.i-cellblock {
  padding-top:38px;
  display:block;
}

</style>
