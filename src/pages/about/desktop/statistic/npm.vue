<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useNpmStatisticsStore } from '/@/stores/statistics'
  import StatisticCard, { StatisticCount } from './_card.vue'

  const { goLinks, isZhLang } = useEnhancer()
  const npmStatisticsStore = useNpmStatisticsStore()
  const isFetching = ref(true)

  onMounted(() => {
    npmStatisticsStore.fetch().finally(() => {
      isFetching.value = false
    })
  })
</script>

<template>
  <statistic-card
    class="npm-statistic"
    icon="icon-npm"
    :loading="isFetching"
    :has-data="!!npmStatisticsStore.data"
    :href="goLinks.npm"
    :platform="isZhLang ? '我在 NPM' : 'NPM'"
  >
    <p class="line-1">
      <i class="iconfont icon-package"></i>
      <span v-if="isZhLang">发布了</span>
      <statistic-count :count="npmStatisticsStore.data?.totalPackages" />
      <span v-if="isZhLang">个公共软件包</span>
      <span v-else>packages</span>
    </p>
    <p>
      <i class="iconfont icon-download"></i>
      <span v-if="isZhLang">被下载</span>
      <statistic-count large primary split :count="npmStatisticsStore.data?.totalDownloads" />
      <span v-if="isZhLang">次</span>
      <span v-else> downs</span>
    </p>
    <p>
      <i class="iconfont icon-score"></i>
      <span v-if="isZhLang">平均评分</span>
      <statistic-count :count="npmStatisticsStore.data?.averageScore" />
      <span v-if="isZhLang">分</span>
      <span v-else>average score</span>
    </p>
  </statistic-card>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .npm-statistic {
    #{--brand-primary-color}: $npm-primary;

    .line-1 {
      margin-top: $gap;
      margin-bottom: 0.7em;
    }
  }
</style>
