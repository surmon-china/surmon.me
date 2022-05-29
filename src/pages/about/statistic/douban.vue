<template>
  <statistic-base
    class="douban"
    brand="douban"
    icon="icon-douban"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.DOUBAN_MOVIE"
    :platform="isZhLang ? '我在豆瓣' : 'Douban Movie'"
  >
    <p>
      <i class="iconfont icon-video-outline"></i>
      <i18n>
        <template #zh>
          <span>标记看过</span>
          <statistic-count large primary :count="store.data.total_collections" />
          <span>部影片</span>
        </template>
        <template #en>
          <statistic-count large primary :count="store.data.total_collections" />
          <span>films marked</span>
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-clock-outline"></i>
      <i18n>
        <template #zh>
          <span>累计花费</span>
          <statistic-count split :count="totalSpent" />
          <span>小时</span>
        </template>
        <template #en>
          <statistic-count split :count="totalSpent" />
          <span>hrs watching</span>
        </template>
      </i18n>
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

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useDoubanMoviesStore } from '/@/stores/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import StatisticBase, { StatisticCount } from './base.vue'

  export default defineComponent({
    name: 'AboutPageDoubanStatistic',
    components: { StatisticBase, StatisticCount },
    setup() {
      const { isZhLang } = useEnhancer()
      const store = useDoubanMoviesStore()
      const fetching = ref(true)
      const totalSpent = computed(() => Math.trunc(store.data?.total_spent ?? 0))
      const weeklyAvg = computed(() => (store.data?.weekly_avg ?? 0).toFixed(2))
      onMounted(() => {
        store.fetch().finally(() => {
          fetching.value = false
        })
      })

      return {
        VALUABLE_LINKS,
        isZhLang,
        fetching,
        store,
        totalSpent,
        weeklyAvg
      }
    }
  })
</script>
