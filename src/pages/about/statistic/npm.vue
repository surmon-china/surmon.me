<template>
  <statistic-base
    brand="npm"
    icon="icon-npm"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.NPM_HOMEPAGE"
    :platform="isZhLang ? '我在 NPM' : 'NPM'"
  >
    <p class="line-1">
      <i class="iconfont icon-package"></i>
      <i18n>
        <template #zh>
          <span>发布了</span>
          <statistic-count :count="store.totalPackages" />
          <span>个软件包</span>
        </template>
        <template #en>
          <statistic-count :count="store.totalPackages" />
          <span>packages</span>
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-download"></i>
      <i18n>
        <template #zh>
          <span>共</span>
          <statistic-count large primary split :count="store.totalDownloads" />
          <span>次下载</span>
        </template>
        <template #en>
          <statistic-count large primary split :count="store.totalDownloads" />
          <span>downs</span>
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-score"></i>
      <i18n>
        <template #zh>
          <span>平均评分</span>
          <statistic-count :count="store.averageScore" />
          <span>分</span>
        </template>
        <template #en>
          <statistic-count :count="store.averageScore" />
          <span>average score</span>
        </template>
      </i18n>
    </p>
  </statistic-base>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useNPMStatisticStore } from '/@/stores/statistic'
  import { useEnhancer } from '/@/app/enhancer'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  export default defineComponent({
    name: 'AboutPageNPMStatistic',
    components: { StatisticBase, StatisticCount },
    setup() {
      const { isZhLang } = useEnhancer()
      const fetching = ref(true)
      const store = useNPMStatisticStore()
      onMounted(() => {
        store.fetch().finally(() => {
          fetching.value = false
        })
      })

      return {
        VALUABLE_LINKS,
        isZhLang,
        fetching,
        store
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .line-1 {
    margin-top: $gap;
    margin-bottom: $gap;
  }
</style>
