<template>
  <statistic-base
    class="github"
    brand="github"
    icon="icon-github"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.GITHUB"
    :platform="isZhLang ? '我在 GitHub' : 'GitHub'"
  >
    <p>
      <i class="iconfont icon-star-outline"></i>
      <i18n>
        <template #zh>
          <span>共获得</span>
          <statistic-count large primary split :count="store.data?.statistics.stars" />
          <span>个 star</span>
        </template>
        <template #en>
          <statistic-count large primary split :count="store.data?.statistics.stars" />
          <span>stars</span>
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-repository"></i>
      <i18n>
        <template #zh>
          <span>共维护</span>
          <statistic-count :count="store.data?.repositories.length" />
          <span>个开源项目</span>
        </template>
        <template #en>
          <statistic-count :count="store.data?.repositories.length" />
          <span>repositories</span>
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-organization"></i>
      <i18n>
        <template #zh>
          <span>维护/发起</span>
          <statistic-count :count="store.data?.organizations.length" />
          <span>个开源组织</span>
        </template>
        <template #en>
          <statistic-count :count="store.data?.organizations.length" />
          <span>organizations</span>
        </template>
      </i18n>
    </p>
  </statistic-base>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useGitHubStatisticStore } from '/@/stores/statistic'
  import { useEnhancer } from '/@/app/enhancer'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  export default defineComponent({
    name: 'AboutPageGitHubStatistic',
    components: { StatisticBase, StatisticCount },
    setup() {
      const { isZhLang } = useEnhancer()
      const fetching = ref(true)
      const store = useGitHubStatisticStore()
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
