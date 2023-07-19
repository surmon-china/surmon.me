<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useStores } from '/@/stores'
  import { humanDateToYMD, HumanDate } from '/@/transforms/moment'
  import { getDateFlowRoute } from '/@/transforms/route'
  import Calendar from '/@/components/widget/calendar.vue'

  const { articleCalendar } = useStores()
  const articlesIn = (targetDate: HumanDate) => {
    const ymd = humanDateToYMD(targetDate)
    return articleCalendar.data.find((item) => item.date === ymd)?.count || 0
  }

  onMounted(() => articleCalendar.fetch())
</script>

<template>
  <calendar class="calendar">
    <template #day="humanDate">
      <router-link
        class="date-link"
        v-if="articlesIn(humanDate) > 0"
        :to="getDateFlowRoute(humanDateToYMD(humanDate))"
      >
        {{ humanDate.day }}
      </router-link>
      <span class="date-span" v-else>{{ humanDate.day }}</span>
    </template>
  </calendar>
</template>

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
