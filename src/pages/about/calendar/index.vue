<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useStores } from '/@/stores'
  import { GAEventCategories } from '/@/constants/gtag'
  import { dateToHuman, HumanDate, humanDateToYMD } from '/@/transforms/moment'
  import CalendarDay from './day.vue'

  const { gtag } = useEnhancer()
  const { articleCalendar, instagramCalendar, githubCalendar } = useStores()
  const githubContributionsMap = computed(() => {
    return new Map(githubCalendar.days.map((day) => [day.date, day]))
  })
  const getDayContributions = (date: string) => {
    return githubContributionsMap.value.get(date)?.count || 0
  }
  const getDayGitHubColor = (date: string) => {
    return githubContributionsMap.value.get(date)?.color
  }
  const getDayInstagrams = (date: string) => {
    return instagramCalendar.data.find((i) => i.date === date)?.count || 0
  }
  const getDayArticles = (date: string) => {
    return articleCalendar.data.find((i) => i.date === date)?.count || 0
  }

  const handleHover = () => {
    gtag?.event('aggregate_calendar', {
      event_category: GAEventCategories.About
    })
  }

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
    getPrevMonthFullDays(todayHuman, 11),
    getPrevMonthFullDays(todayHuman, 10),
    getPrevMonthFullDays(todayHuman, 9),
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

  onMounted(() => {
    articleCalendar.fetch()
    githubCalendar.fetch()
    instagramCalendar.fetch()
  })
</script>

<template>
  <ul class="aggregate-calendar" @mouseenter="handleHover">
    <li class="month" v-for="(month, index) in months" :key="index">
      <calendar-day
        v-for="(day, i) in month"
        :key="i"
        :date="day"
        :tweets="0"
        :articles="getDayArticles(day)"
        :instagrams="getDayInstagrams(day)"
        :contributions="getDayContributions(day)"
        :github-color="getDayGitHubColor(day)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .aggregate-calendar {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;

    .month {
      width: auto;
      display: grid;
      grid-template-rows: repeat(7, 1fr);
      grid-auto-flow: column;
      grid-auto-columns: min-content;
      grid-gap: 5px;
      @include scroll-snap-item();
    }
  }
</style>
