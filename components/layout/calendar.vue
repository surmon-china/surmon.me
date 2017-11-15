<template>
  <div class="calendar-box">
    <!-- 年份 月份 -->
    <div class="months">
      <ul class="month-list">
        <li class="arrow prev" @click="pickPre(currentYear, currentMonth)">❮</li>
        <li class="year-month">
          <span class="choose-year">
            <span>{{ currentYear }}</span>
            <span>年</span>
            <span>{{ currentMonth }}</span>
            <span>月</span>
            <span>{{ currentDay }}</span>
            <span>日</span>
          </span>
        </li>
        <li class="arrow next" @click="pickNext(currentYear, currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <loading-box v-if="!days.length" class="loading-box"></loading-box>
      <li v-for="day in days">
        <!--本月-->
        <span v-if="day.getMonth() + 1 != currentMonth" 
              class="other-month">{{ day.getDate() }}</span>
        <span v-else class="item" 
              :class="{ 'active': day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate() }">
          <!--today-->
          <router-link :to="`/date/${ formatDate(day.getFullYear(), day.getMonth() + 1, day.getDate())}`">{{ day.getDate() }}</router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'aside-calendar',
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: []
      }
    },
    mounted() {
      this.initData(null)
    },
    methods: {
      initData(cur) {
        const date = cur ? new Date(cur) : new Date()
        this.currentDay = date.getDate()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1
        this.currentWeek = date.getDay()
        if (this.currentWeek == 0) this.currentWeek = 7
        const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
        // console.log("today:" + str + "," + this.currentWeek)
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个
        for (let i = this.currentWeek - 1; i >= 0; i--) {
          const d = new Date(str)
          d.setDate(d.getDate() - i)
          // console.log("y:" + d.getDate())
          this.days.push(d)
        }
        for (let i = 1; i <= 35 - this.currentWeek; i++) {
          const d = new Date(str)
          d.setDate(d.getDate() + i)
          this.days.push(d)
        }
      },
      pick(date) {
        alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
      },
      pickPre(year, month) {
        //  setDate(0); 上月最后一天
        //  setDate(-1); 上月倒数第二天
        //  setDate(dx) 参数dx为 上月最后一天的前后dx天
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },
      pickNext(year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(35)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },
      pickYear(year, month) {
        alert(year + "," + month)
      },
      // 返回 类似 2016-01-02 格式的字符串
      formatDate(year, month, day) {
        const y = year
        let m = month
        if (m < 10) m = "0" + m
        let d = day
        if (d < 10) d = "0" + d
        return y + "-" + m + "-" + d
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  .calendar-box {
    min-height: 17em;

    > .months {
      margin-bottom: .5em;

      > .month-list {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;

        > li {
          float: left;
          height: 2em;
          line-height: 2em;
          text-align: center;

          &.year-month {
            width: 11.4em;
          }

          &.arrow {
            width: 2em;
            background-color: $module-hover-bg;
            cursor: pointer;

            &:hover {
              background-color: darken($module-hover-bg, 15%);
            }

            &.prev {
              margin-right: 1em;
            }

            &.next {
              margin-left: 1em;
            }
          }
        }
      }
    }

    > .days,
    > .weekdays {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      margin-bottom: .5em;

      > li {
        display: inline-block;
        float: left;
        width: calc(100% / 7);
        text-align: center;
      }
    }

    > .weekdays {
      height: 2em;
      line-height: 2em;
    }

    > .days {
      min-height: 10em;
      margin-bottom: 0;
      position: relative;

      > .loading-box {
        transform: translateY(100%);
      }

      > li {
        line-height: 2.5em;

        > .other-month {
          opacity: .3;
          cursor: initial;
        }

        > .item {
          display: block;
          border-radius: 100%;

          > a {
            display: block;
            // cursor: pointer;
          }

          &:hover {
            background-color: lighten($module-hover-bg, 10%);
          }

          &.active {
            background-color: $module-hover-bg;
          }
        }
      }
    }
  }
</style>
