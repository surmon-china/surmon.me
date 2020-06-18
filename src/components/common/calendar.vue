<template>
  <div class="calendar">
    <!-- header -->
    <div class="months">
      <span class="item arrow" @click="toPrevMonth">❮</span>
      <span class="item year-month">
        <strong class="choose-year">
          <span>{{ state.year }}</span>
          <i18n zh="年" en="Y" />
          <span>{{ state.month }}</span>
          <i18n zh="月" en="M" />
          <span>{{ state.day }}</span>
          <i18n zh="日" en="D" />
        </strong>
      </span>
      <span class="item arrow" @click="toNextMonth">❯</span>
    </div>
    <!-- weekdays -->
    <ul class="weekdays">
      <li v-for="(day, index) in weekDayTexts" :key="index">{{ day }}</li>
    </ul>
    <!-- days -->
    <ul class="days">
      <li v-for="(item, index) in state.table" :key="index">
        <span
          class="item"
          :class="{
            today: isToday(item),
            active: isActive(item),
            other: item.month !== state.month
          }"
        >
          <slot v-bind="item">{{ item.day }}</slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, reactive } from 'vue'
  import { useI18n } from '/@/services/i18n'
  import { Language } from '/@/language/data'
  import { dateToHuman, standardizationHumanDate, textHumanizer, HumanDate, TEXT_MAP } from '/@/transformers/moment'

  export default defineComponent({
    name: 'PcAsideCalendar',
    setup(_, context) {
      const i18n = useI18n()
      const today = dateToHuman(new Date())
      const state = reactive({
        day: 1,
        month: 1,
        year: 1970,
        week: 1,
        table: [] as Array<HumanDate>
      })

      const weekDayTexts = computed(() => {
        return textHumanizer(i18n.language.value as any)(TEXT_MAP.WEEKDAYS)
      })

      const setDate = (targetDate: Date | HumanDate) => {
        const table: HumanDate[] = []
        const humanDate = targetDate instanceof Date
          ? dateToHuman(targetDate)
          : standardizationHumanDate(targetDate)

        // weekend -> first line: 7 | current month
        for (let i = humanDate.week; i >= 1; i--) {
          table.push(standardizationHumanDate({
            ...humanDate,
            day: humanDate.day - 1
          }))
        }
        // current month | last line: 0
        for (let i = 1; i <= 35 - humanDate.week; i++) {
          table.push(standardizationHumanDate({
            ...humanDate,
            day: humanDate.day + 1
          }))
        }

        Object.assign(state, {
          ...humanDate,
          table
        })
      }

      const toPrevMonth = () => {
        setDate({
          ...state,
          month: state.month - 1,
          day: 1
        })
      }

      const toNextMonth = () => {
        setDate({
          ...state,
          month: state.month + 1,
          day: 1
        })
      }

      const isSameDay = (target: HumanDate, target2: HumanDate) => {
        return (
          target.day === target2.day &&
          target.month === target2.month &&
          target.year === target2.year
        )
      }

      // init state
      setDate(new Date())

      return {
        state,
        weekDayTexts,
        toPrevMonth,
        toNextMonth,
        isActive: target => isSameDay(target, state),
        isToday: target => isSameDay(target, today)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .calendar {
    min-height: 17em;

    > .months {
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
          background-color: $module-hover-bg;
          @include background-transition();
          cursor: pointer;

          &:hover {
            background-color: $module-hover-bg-darken-10;
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

        > .other-month {
          opacity: .3;
          cursor: initial;
        }

        > .item {
          display: block;
          border-radius: 100%;
          @include background-transition();

          > a {
            display: block;
          }

          &:hover {
            background-color: $module-hover-bg-opacity-3;
          }

          &.active {
            background-color: $module-hover-bg;
          }
        }
      }
    }
  }
</style>
