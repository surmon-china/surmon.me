<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useArticlesCalendarStore } from '/@/stores/calendar'
  import { humanDateToYMD, HumanDate } from '/@/transforms/moment'
  import { getDateFlowRoute } from '/@/transforms/route'
  import Calendar from '/@/components/desktop/widgets/calendar.vue'

  const articlesCalendarStore = useArticlesCalendarStore()

  const hasArticlesIn = (targetDate: HumanDate) => {
    const ymd = humanDateToYMD(targetDate)
    return articlesCalendarStore.data.find((item) => item.date === ymd)?.count || 0
  }

  onMounted(() => articlesCalendarStore.fetch())
</script>

<template>
  <calendar class="calendar">
    <template #day="humanDate">
      <router-link
        class="date-link"
        v-if="hasArticlesIn(humanDate) > 0"
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .calendar {
    padding: $gap-sm;

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
        color: $color-text-reversal;
        &::before {
          background-color: $color-text-reversal;
        }
      }
    }
  }
</style>
