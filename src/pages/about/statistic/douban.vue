<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useDoubanMoviesStore } from '/@/stores/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { isZhLang } = useEnhancer()
  const store = useDoubanMoviesStore()
  const totalSpent = computed(() => Math.trunc(store.data?.total_spent ?? 0))
  const weeklyAvg = computed(() => (store.data?.weekly_avg ?? 0).toFixed(2))
  const fetching = ref(true)
  onMounted(() => {
    store.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

<template>
  <statistic-base
    brand="douban"
    icon="icon-douban"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.DOUBAN_MOVIE"
    :platform="isZhLang ? '我在豆瓣' : 'Douban Movie'"
  >
    <p>
      <i class="iconfont icon-video-outlined"></i>
      <span v-if="isZhLang">标记看过</span>
      <statistic-count large primary split :count="store.data.total_collections" />
      <span v-if="isZhLang">部影片</span>
      <span v-else>films marked</span>
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
  </statistic-base>
</template>
