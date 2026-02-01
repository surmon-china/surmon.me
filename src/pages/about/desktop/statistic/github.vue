<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useGitHubStatisticsStore } from '/@/stores/statistics'
  import StatisticCard, { StatisticCount } from './_card.vue'

  const { goLinks, isZhLang } = useEnhancer()
  const githubStatisticsStore = useGitHubStatisticsStore()
  const isFetching = ref(true)

  onMounted(() => {
    githubStatisticsStore.fetch().finally(() => {
      isFetching.value = false
    })
  })
</script>

<template>
  <statistic-card
    class="github-statistic"
    icon="icon-github"
    :loading="isFetching"
    :has-data="!!githubStatisticsStore.data"
    :href="goLinks.github"
    :platform="isZhLang ? '我在 GitHub' : 'GitHub'"
  >
    <p>
      <i class="iconfont icon-star-outlined"></i>
      <span v-if="isZhLang">共获得</span>
      <statistic-count large primary split :count="githubStatisticsStore.data?.totalStarCount" />
      <span v-if="isZhLang">个 star</span>
      <span v-else> stars earned</span>
    </p>
    <p>
      <i class="iconfont icon-repository"></i>
      <span v-if="isZhLang">共维护</span>
      <statistic-count :count="githubStatisticsStore.data?.repositoryCount" />
      <span v-if="isZhLang">个开源项目</span>
      <span v-else>open-source repos</span>
    </p>
    <p>
      <i class="iconfont icon-organization"></i>
      <span v-if="isZhLang">维护/发起</span>
      <statistic-count :count="githubStatisticsStore.data?.organizationCount" />
      <span v-if="isZhLang">个开源组织</span>
      <span v-else>organizations</span>
    </p>
  </statistic-card>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .github-statistic {
    #{--brand-primary-color}: $github-primary;
    @include mix.dark-theme {
      #{--brand-primary-color}: white;
    }
  }
</style>
