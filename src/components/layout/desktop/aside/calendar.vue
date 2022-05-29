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
  import { useStores } from '/@/stores'
  import { humanDateToYMD, HumanDate } from '/@/transforms/moment'
  import { getDateFlowRoute } from '/@/transforms/route'
  import Calendar from '/@/components/widget/calendar.vue'

  export default defineComponent({
    name: 'DesktopAsideCalendar',
    components: { Calendar },
    setup() {
      const { articleCalendar } = useStores()
      const articlesIn = (targetDate: HumanDate) => {
        const ymd = humanDateToYMD(targetDate)
        return articleCalendar.data.find((item) => item.date === ymd)?.count || 0
      }

      const getDateRoute = (humanDate: HumanDate) => {
        return getDateFlowRoute(humanDateToYMD(humanDate))
      }

      onMounted(() => articleCalendar.fetch())

      return {
        articlesIn,
        getDateRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .calendar {
    padding: $gap;

    .date-link {
      position: relative;
      display: block;
      border-radius: 100%;
      font-weight: bold;
      color: $primary;
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
        background-color: $primary;
        color: $text-reversal;
        &::before {
          background-color: $text-reversal;
        }
      }
    }
  }
</style>
