<script lang="ts" setup>
  import { reactive, computed } from 'vue'
  import { Language } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import {
    cloneDate,
    dateToHuman,
    humanToDate,
    isSameHumanDay,
    humanDateToYMD,
    HumanDate
  } from '/@/transforms/moment'

  const today = dateToHuman(new Date())
  const isToday = (target) => isSameHumanDay(target, today)

  const { i18n: _i18n, isZhLang } = useEnhancer()
  const tableView = reactive({
    month: 0,
    year: 1970,
    table: [] as Array<HumanDate>
  })

  const WEEKDAYS = {
    [Language.English]: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [Language.Chinese]: ['一', '二', '三', '四', '五', '六', '日']
  }

  const weekDayTexts = computed(() => WEEKDAYS[_i18n.language.value])
  const headerText = computed(() => {
    const isSameYear = tableView.year === today.year
    const isSameMonth = tableView.month === today.month
    const isSameTodayTable = isSameYear && isSameMonth
    if (isZhLang.value) {
      const yearText = `${tableView.year} 年`
      const monthText = ` ${tableView.month} 月`
      const dayText = isSameTodayTable ? ` ${today.day} 日` : ''
      return yearText + monthText + dayText
    }
    return humanDateToYMD(isSameTodayTable ? today : tableView, ' / ')
  })

  const setTable = (humanDate: Omit<HumanDate, 'day' | 'week'>) => {
    const table: HumanDate[] = []
    const firstDayDate = humanToDate({ ...humanDate, day: 1 })
    const firstDayWeek = dateToHuman(firstDayDate).week

    // before days
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const date = cloneDate(firstDayDate)
      date.setDate(date.getDate() - i)
      table.push(dateToHuman(date))
    }

    // after days
    const todoDays = 35 - table.length
    for (let i = 1; i <= todoDays; i++) {
      const date = cloneDate(firstDayDate)
      date.setDate(date.getDate() + i)
      table.push(dateToHuman(date))
    }

    Object.assign(tableView, {
      year: humanDate.year,
      month: humanDate.month,
      table
    })
  }

  const toPrevMonth = () => {
    const isPrevYear = tableView.month - 1 <= 0
    setTable({
      year: tableView.year - (isPrevYear ? 1 : 0),
      month: isPrevYear ? 12 : tableView.month - 1
    })
  }

  const toNextMonth = () => {
    const isNextYear = tableView.month + 1 >= 13
    setTable({
      year: tableView.year + (isNextYear ? 1 : 0),
      month: isNextYear ? 1 : tableView.month + 1
    })
  }

  const handleDayClick = (date: HumanDate) => {
    if (date.month < tableView.month) {
      toPrevMonth()
    } else if (date.month > tableView.month) {
      toNextMonth()
    }
  }

  // init table
  setTable({
    year: today.year,
    month: today.month
  })
</script>

<template>
  <div class="calendar">
    <!-- header -->
    <div class="header">
      <button class="item arrow" @click="toPrevMonth">
        <i class="iconfont icon-prev"></i>
      </button>
      <span class="item year-month">{{ headerText }}</span>
      <button class="item arrow" @click="toNextMonth">
        <i class="iconfont icon-next"></i>
      </button>
    </div>
    <!-- weekdays -->
    <ul class="weekdays">
      <li v-for="(day, index) in weekDayTexts" :key="index">{{ day }}</li>
    </ul>
    <!-- days -->
    <ul class="days">
      <li v-for="(item, index) in tableView.table" :key="index">
        <div
          class="item"
          :class="{ today: isToday(item), other: item.month !== tableView.month }"
          @click="handleDayClick(item)"
        >
          <slot name="day" v-bind="item">{{ item.day }}</slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .calendar {
    min-height: 17em;

    > .header {
      padding: 0;
      margin-bottom: $gap;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      .item {
        height: 2em;
        line-height: 2em;
        text-align: center;

        &.arrow {
          width: 2em;
          background-color: $module-bg-darker-1;
          border-radius: $xs-radius;
          cursor: pointer;
          @include background-transition();

          &:hover {
            background-color: $module-bg-hover;
          }
        }

        &.year-month {
          font-weight: bold;
        }
      }
    }

    > .days,
    > .weekdays {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin: 0;
      margin-bottom: $sm-gap;
      padding: 0;
      overflow: hidden;

      > li {
        display: block;
        text-align: center;
      }
    }

    > .weekdays {
      height: 2em;
      line-height: 2em;
    }

    > .days-loading {
      width: 100%;
      height: 14rem;
    }

    > .days {
      min-height: 10em;
      margin-bottom: 0;
      position: relative;

      > li {
        line-height: 2.5em;

        > .item {
          display: block;
          border-radius: 100%;

          &:hover {
            background-color: $module-bg-darker-1;
          }

          &.today {
            background-color: $module-bg-hover;
          }

          &.active {
            color: $text-reversal;
            background-color: $primary;
          }

          &.other {
            opacity: 0.3;
            cursor: initial;
          }
        }
      }
    }
  }
</style>
