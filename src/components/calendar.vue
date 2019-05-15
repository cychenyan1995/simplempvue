<template>
  <div class="container relative" :class="'align-'+align">
    <div class="calendar-bar">
      <div class="action-bar">
        <i-icon i-class="bold text-primary" class="pull-left" type="return" @click="dChange(-1)"></i-icon>
        <div class="date-bar" @click="toggleShow">
          <i-icon i-class="icon-desc icon-calendar" type="calendar"></i-icon>
          {{dateFullFmt}}</div>
        <i-icon i-class="bold text-primary" class="pull-right" type="enter" @click="dChange(1)"></i-icon>
      </div>
    </div>
    <div class="calendar-panel" v-if="visible">
      <div class="action-bar">
        <i-icon i-class="icon-desc bold" class="pull-left" type="arrowleft" size="20" @click="mChange(-1)"></i-icon>
        <div class="month-bar">{{monthNames[month] + ' ' + year}}</div>
        <i-icon i-class="icon-desc bold" class="pull-right" type="arrowright" size="20" @click="mChange(1)"></i-icon>
      </div>
      <div class="calendar">
        <div class="week">
          <div class="day" v-for="(wDay,index) in weekDays" :key="index">{{wDay}}</div>
        </div>
        <div class="content">
          <div class="day" v-for="(day,index) in dayCells" :key="index" :class="{active: !!mDataMap[day], today: day === today}" @click="dClick(day)">
            {{day}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const dayTime = 1000 * 60 * 60 * 24;
  const weekDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  export default {
    props: {
      // mData 有数据时指定第一个元素代表的日期，否则指定当月第一天，格式：yyyy-MM-dd
      mDate: String,
      mData: {
        type: Array,
        default: [],
      },
      align: 'top',
    },
    data() {
      return {
        visible: false,
        weekDays: weekDays,
        monthNames: monthNames,

        date: new Date(),
        dayCells: [],
        mDataMap: [],
      }
    },

    computed: {
      year() {
        return this.date.getFullYear();
      },
      month() {
        return this.date.getMonth();
      },
      today() {
        return this.date.getDate();
      },
      dateFullFmt() {
        return this.$iBox.formatDate(this.date);
      },
    },

    methods: {
      render(mData) {
        this.dayCells = this.getdayCells();

        this.mDataMap = [this.getMaxDay()].fill('');
        mData.forEach(day => this.mDataMap[day] = day);
      },
      toggleShow() {
        this.visible = !this.visible;
      },
      mChange(off) {
        let date = this.getDateOffMonth(off);
        this.$emit('m-change', date, data => {
          this.date = this.getDateOffDay(data[0] - 1, date);
          this.render(data);
        });
      },
      dChange(off) {
        if (this.mData.length === 0) return;
        let index = this.mData.indexOf(this.today);
        if (!this.mData[index + off]) return;
        let nextDay = this.mData[index + off] - this.today;
        this.setDate(this.getDateOffDay(nextDay));
      },
      dClick(day) {
        if (!this.mData.includes(day)) return;

        this.setDate(new Date(`${this.year}/${this.month+1}/${day}`));
      },
      setDate(date) {
        this.date = date;
        this.$emit('d-change', this.date);
      },
      getdayCells() {
        let maxDay = this.getMaxDay();
        let dayCells = [];

        // 对应 week
        let firstDayOfMonth = this.getDateOffMonth(0);
        let firstDayInWeek = firstDayOfMonth.getDay();
        dayCells = new Array(firstDayInWeek).fill('');

        // 填充当月日期
        for (let i = 0; i < maxDay; i++) {
          dayCells.push(i + 1);
        }

        // 补全最后一行
        let length = dayCells.length;
        dayCells.length = Math.ceil(length / 7) * 7;
        dayCells = dayCells.fill('', length);

        return dayCells;
      },
      // 取当天 off
      getDateOffDay(off, date) {
        date = date || this.date;
        off = off || 0;
        let dateTime = date.getTime() + dayTime * off;

        return new Date(dateTime);
      },
      // 取当月 off
      getDateOffMonth(off, date) {
        date = date || this.date;
        let month = date.getMonth() + 1 + off;
        let year = date.getFullYear() + ((month == 13) ? 1 : ((month == 0) ? -1 : 0));
        month = (month == 13) ? 1 : ((month == 0) ? 12 : month);

        return new Date(`${year}/${month}`);
      },
      // 取当月多少天
      getMaxDay() {
        let d = this.getDateOffMonth(1);
        d = new Date(d.getTime() - dayTime);

        return d.getDate()
      },
    },

    mounted() {
      this.date = this.mDate ? new Date(this.mDate) : this.getDateOffMonth(0, new Date());
      this.render(this.mData);
    },
  }

</script>
<style lang="less">
  .icon-desc {
    color: #b4b5b8;
  }

  .icon-calendar {
    margin-top: -2px;
    font-size: 16px !important;
  }

</style>
<style scoped lang="less">
  @import url(../assets/less/variable.less);
  @import url(../assets/less/mixin.less);
  @color-desc: #b4b5b8;
  @border: 1px solid @color-desc;
  .container {
    width: 100%;

    &.align-bottom {
      .calendar-bar {
        border-top: 1px solid #F7F7F7;
        border-bottom: none;
      }
      .calendar-panel {
        top: auto;
        bottom: 30px;
      }
    }
  }

  .calendar-bar {
    width: 100%;
    border-bottom: 1px solid #F7F7F7;
  }

  .calendar-panel {
    padding-top: 10px;
    width: 314px;
    margin: 10px auto;
    margin-left: -314px / 2;
    background-color: #FFF;
    box-shadow: 2px 2px 10px 1px #ddd, -2px -2px 10px 1px #ddd;
    position: absolute;
    top: 30px;
    left: 50%;
    z-index: 1;

    .action-bar {
      padding: 0 20px;
    }
  }

  .action-bar {
    overflow: hidden;
    width: 100%;
    padding: 5px 25px;
    box-sizing: border-box;
    text-align: center;
    background-color: #FFF;

    .date-bar {
      display: inline-block;
      width: 276px;
      font-size: 14px;
      color: @color-title;
    }
    .month-bar {
      display: inline-block;
      font-size: 16px;
      color: @color-primary;
    }
  }

  .calendar {
    width: 282px;
    margin: 10px auto 20px;

    .day {
      float: left;
      width: 40px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      box-sizing: border-box;
    }

    .week {
      overflow: hidden;
      color: @color-desc;
    }

    .content {
      border: @border;
      overflow: hidden;

      .day {
        border: @border;
        border-left: none;
        border-top: none;

        &.active {
          color: @color-primary;
        }
        &.today {
          color: #fff;
          background-color: red;
        }

        &:nth-child(7n) {
          border-right: none;
        }
        &:nth-last-child(1),
        &:nth-last-child(2),
        &:nth-last-child(3),
        &:nth-last-child(4),
        &:nth-last-child(5),
        &:nth-last-child(6),
        &:nth-last-child(7) {
          border-bottom: none;
        }
      }
    }
  }

</style>
