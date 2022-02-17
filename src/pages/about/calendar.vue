<template>
  <div class="calendar" :class="{ dark: isDarkTheme }">
    <ul class="months">
      <li class="month" v-for="(month, index) in months" :key="index">
        <div
          class="day"
          v-for="(day, i) in month"
          :key="i"
          :data-date="day"
          :data-count="getDayCount(day)"
        >
          <div class="point"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleCalendarStore } from '/@/store/aggregate'
  import { dateToHuman, HumanDate, humanDateToYMD } from '/@/transforms/moment'

  export default defineComponent({
    name: 'ArticleCalendar',
    setup() {
      const { isDarkTheme } = useEnhancer()
      const store = useArticleCalendarStore()

      // current month | day
      const today = new Date()
      const todayHuman = dateToHuman(today)
      const currentMonthDays = Array.from({ length: todayHuman.day }).map((_, i) => {
        return humanDateToYMD({ ...todayHuman, day: i + 1 })
      })

      const getPrevMonthFullDays = (date: HumanDate, prevMonths: number) => {
        const targetMonth = new Date(date.year, date.month - prevMonths, 0)
        const daysCount = targetMonth.getDate()
        return Array.from({ length: daysCount }).map((d, i) => {
          return humanDateToYMD({ ...dateToHuman(targetMonth), day: i + 1 })
        })
      }

      const months = [
        getPrevMonthFullDays(todayHuman, 8),
        getPrevMonthFullDays(todayHuman, 7),
        getPrevMonthFullDays(todayHuman, 6),
        getPrevMonthFullDays(todayHuman, 5),
        getPrevMonthFullDays(todayHuman, 4),
        getPrevMonthFullDays(todayHuman, 3),
        getPrevMonthFullDays(todayHuman, 2),
        getPrevMonthFullDays(todayHuman, 1),
        currentMonthDays
      ]

      const getDayCount = (day: string) => {
        return store.data.find((ac) => ac.day === day)?.count || 0
      }

      onMounted(() => store.fetch())

      return {
        getDayCount,
        months,
        isDarkTheme
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .calendar {
    .months {
      display: flex;
      padding: 0;
      margin: 0;

      .month {
        width: auto;
        display: grid;
        grid-template-rows: repeat(7, 1fr);
        grid-auto-flow: column;
        grid-auto-columns: min-content;
        grid-gap: 4px;
        margin-right: $lg-gap;
        &:last-child {
          margin-right: 0;
        }

        .day {
          position: relative;
          $size: 10px;
          width: $size;
          height: $size;
          background-color: $module-bg-darker-2;

          .point {
            display: block;
            width: $size;
            height: $size;
          }

          &:not([data-count='0']) {
            .point {
              background-color: $primary;
              opacity: 1;
              filter: brightness(1.3);
            }

            &:hover:after {
              content: attr(data-count) ' articles on ' attr(data-date);
              position: absolute;
              left: -14px;
              bottom: 14px;
              white-space: nowrap;
              z-index: $z-index-normal + 1;
              height: 2rem;
              line-height: 2rem;
              padding: 0 6px;
              font-weight: bold;
              background: $primary-lighter;
              color: $text-reversal;
              border-radius: $xs-radius;
            }
          }

          &[data-count='1'] {
            .point {
              opacity: 0.5;
              filter: brightness(0.8);
            }
          }
          &[data-count='2'] {
            .point {
              opacity: 0.8;
              filter: brightness(0.9);
            }
          }
          &[data-count='3'] {
            .point {
              opacity: 1;
              filter: brightness(1);
            }
          }
          &[data-count='4'] {
            .point {
              opacity: 1;
              filter: brightness(1.1);
            }
          }
        }
      }
    }
  }
</style>
