<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useDoubanMoviesStore } from '/@/stores/socials'
  import StatisticCard, { StatisticCount } from './_card.vue'

  const { goLinks, isZhLang } = useEnhancer()
  const doubanMoviesStore = useDoubanMoviesStore()

  const isFetching = ref(true)
  const totalSpent = computed(() => Math.trunc(doubanMoviesStore.data?.total_spent ?? 0))
  const weeklyAvg = computed(() => (doubanMoviesStore.data?.weekly_avg ?? 0).toFixed(2))

  onMounted(() => {
    doubanMoviesStore.fetch().finally(() => {
      isFetching.value = false
    })
  })
</script>

<template>
  <statistic-card
    class="douban-statistic"
    icon="icon-douban"
    :loading="isFetching"
    :has-data="!!doubanMoviesStore.data"
    :href="goLinks['douban-movie']"
    :platform="isZhLang ? '我在豆瓣' : 'Douban Movie'"
  >
    <p>
      <i class="iconfont icon-video-outlined"></i>
      <span v-if="isZhLang">标记看过</span>
      <statistic-count large primary split :count="doubanMoviesStore.data.total_collections" />
      <span v-if="isZhLang">部影片</span>
      <span v-else> films marked</span>
    </p>
    <p>
      <i class="iconfont icon-clock-outlined"></i>
      <span v-if="isZhLang">累计花费</span>
      <statistic-count split :count="totalSpent" />
      <span v-if="isZhLang">小时</span>
      <span v-else>hours watching</span>
    </p>
    <p>
      <i class="iconfont icon-week"></i>
      <i18n>
        <template #zh>平均每周 <statistic-count :count="weeklyAvg" /> 部影片</template>
        <template #en><statistic-count :count="weeklyAvg" /> films per week</template>
      </i18n>
    </p>
  </statistic-card>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .douban-statistic {
    #{--brand-primary-color}: $douban-primary;
  }
</style>
