<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { isZhLang } = useEnhancer()
  const { goLinksStore, githubStatisticsStore } = useStores()
  const isFetching = ref(true)

  onMounted(() => {
    githubStatisticsStore.fetch().finally(() => {
      isFetching.value = false
    })
  })
</script>

<template>
  <statistic-base
    brand="github"
    icon="icon-github"
    :fetching="isFetching"
    :data="githubStatisticsStore.data"
    :href="goLinksStore.map.github"
    :platform="isZhLang ? '我在 GitHub' : 'GitHub'"
  >
    <p>
      <i class="iconfont icon-star-outlined"></i>
      <span v-if="isZhLang">共获得</span>
      <statistic-count large primary split :count="githubStatisticsStore.data?.totalStarCount" />
      <span v-if="isZhLang">个 star</span>
      <span v-else>stars earned</span>
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
  </statistic-base>
</template>
