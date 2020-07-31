<template>
  <div class="calendar">
    <!-- header -->
    <div class="header">
      <button class="item arrow" @click="toPrevMonth">❮</button>
      <span class="item year-month">{{ headerText }}</span>
      <button class="item arrow" @click="toNextMonth">❯</button>
    </div>
    <!-- weekdays -->
    <ul class="weekdays">
      <li v-for="(day, index) in weekDayTexts" :key="index">{{ day }}</li>
    </ul>
    <!-- days -->
    <ul class="days">
      <li v-for="(item, index) in tableView.table" :key="index">
        <span
          class="item"
          :class="{
            today: isToday(item),
            other: item.month !== tableView.month
          }"
          @click="handleDayClick(item)"
        >
          <slot v-bind="item">{{ item.day }}</slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue'
  import { useI18n } from '/@/services/i18n'
  import { Language } from '/@/language/data'
  import { dateToHuman, humanToDate, cloneDate, isSameHumanDay, textHumanizer, humanDateToYMD, HumanDate, TEXT_MAP } from '/@/transforms/moment'

  export default defineComponent({
    name: 'PcAsideCalendar',
    setup(_, context) {
      const i18n = useI18n()
      const today = dateToHuman(new Date())
      const tableView = reactive({
        month: 0,
        year: 1970,
        table: [] as Array<HumanDate>
      })

      const weekDayTexts = computed(() => {
        return textHumanizer(i18n.language.value as any)(TEXT_MAP.WEEKDAYS)
      })

      const headerText = computed(() => {
        const isSameTodayTable = (
          tableView.month === today.month &&
          tableView.year === today.year
        )

        if (i18n.language.value === Language.Zh) {
          const yearText = `${tableView.year} 年`
          const monthText = ` ${tableView.month} 月`
          const dayText = isSameTodayTable
            ? ` ${today.day} 日`
            : ''
          return yearText + monthText + dayText
        }

        return humanDateToYMD(isSameTodayTable ? today : tableView)
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
        const isPrevYear = (tableView.month - 1) <= 0
        setTable({
          year: tableView.year - (isPrevYear ? 1 : 0),
          month: isPrevYear ? 12 : tableView.month - 1
        })
      }

      const toNextMonth = () => {
        const isNextYear = (tableView.month + 1) >= 13
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

      return {
        tableView,
        headerText,
        weekDayTexts,
        toPrevMonth,
        toNextMonth,
        handleDayClick,
        isToday: target => isSameHumanDay(target, today)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

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
      padding: 0;
      margin: 0;
      overflow: hidden;
      margin-bottom: $sm-gap;

      > li {
        display: block;
        float: left;
        width: 14.28%;
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
          @include background-transition();

          > a {
            display: block;
          }

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
            opacity: .3;
            cursor: initial;
          }
        }
      }
    }
  }
</style>
