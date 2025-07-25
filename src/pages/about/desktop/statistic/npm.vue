<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { useNpmStatisticStore } from '/@/stores/statistic'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { goLink } = useStores()
  const { isZhLang } = useEnhancer()
  const store = useNpmStatisticStore()
  const fetching = ref(true)
  onMounted(() => {
    store.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

<template>
  <statistic-base
    brand="npm"
    icon="icon-npm"
    :data="store.data"
    :fetching="fetching"
    :href="goLink.map.npm"
    :platform="isZhLang ? '我在 NPM' : 'NPM'"
  >
    <p class="line-1">
      <i class="iconfont icon-package"></i>
      <span v-if="isZhLang">发布了</span>
      <statistic-count :count="store.data?.totalPackages" />
      <span v-if="isZhLang">个公共软件包</span>
      <span v-else>packages</span>
    </p>
    <p>
      <i class="iconfont icon-download"></i>
      <span v-if="isZhLang">被下载</span>
      <statistic-count large primary split :count="store.data?.totalDownloads" />
      <span v-if="isZhLang">次</span>
      <span v-else>downs</span>
    </p>
    <p>
      <i class="iconfont icon-score"></i>
      <span v-if="isZhLang">平均评分</span>
      <statistic-count :count="store.data?.averageScore" />
      <span v-if="isZhLang">分</span>
      <span v-else>average score</span>
    </p>
  </statistic-base>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .line-1 {
    margin-top: $gap-lg;
    margin-bottom: 0.7em;
  }
</style>
