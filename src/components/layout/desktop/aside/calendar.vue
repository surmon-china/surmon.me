<template>
  <calendar class="calendar">
    <template #day="humanDate">
      <router-link class="date-link" v-if="articlesIn(humanDate) > 0" :to="getDateRoute(humanDate)">
        {{ humanDate.day }}
      </router-link>
      <span class="date-span" v-else>{{ humanDate.day }}</span>
    </template>
  </calendar>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useArchiveStore } from '/@/store/archive'
  import { getDateFlowRoute } from '/@/transforms/route'
  import { humanDateToYMD, HumanDate } from '/@/transforms/moment'
  import Calendar from '/@/components/widget/calendar.vue'

  export default defineComponent({
    name: 'DesktopAsideCalendar',
    components: { Calendar },
    setup() {
      const archiveStore = useArchiveStore()
      const articlesIn = (targetDate: HumanDate) => {
        const months = archiveStore.tree.find((y) => y.year === targetDate.year)?.months
        if (months?.length) {
          const days = months.find((m) => m.month === targetDate.month)?.articles
          if (days?.length) {
            const articles = days.filter((d) => d.createAt.day === targetDate.day)
            return articles.length
          }
        }
        return 0
      }

      const getDateRoute = (humanDate: HumanDate) => {
        return getDateFlowRoute(humanDateToYMD(humanDate))
      }

      onMounted(() => {
        archiveStore.fetchArchive()
      })

      return {
        articlesIn,
        getDateRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/init.scss';

  .calendar {
    padding: $gap;

    .date-link {
      position: relative;
      display: block;
      border-radius: 100%;
      &::before {
        content: '';
        $size: 4px;
        position: absolute;
        top: 0.3em;
        right: 50%;
        width: $size;
        height: $size;
        margin-right: -#{math.div($size, 2)};
        border-radius: 100%;
        background-color: $primary;
      }

      &:hover,
      &.link-active {
        font-weight: bold;
        background-color: $primary;
        color: $text-reversal;
        &::before {
          background-color: $text-reversal;
        }
      }
    }
  }
</style>
