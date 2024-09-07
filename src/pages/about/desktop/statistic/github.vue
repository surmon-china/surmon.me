<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useGitHubStatisticStore } from '/@/stores/statistic'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { isZhLang } = useEnhancer()
  const store = useGitHubStatisticStore()
  const fetching = ref(true)
  onMounted(() => {
    store.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

<template>
  <statistic-base
    brand="github"
    icon="icon-github"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.GITHUB"
    :platform="isZhLang ? '我在 GitHub' : 'GitHub'"
  >
    <p>
      <i class="iconfont icon-star-outlined"></i>
      <span v-if="isZhLang">共获得</span>
      <statistic-count large primary split :count="store.data?.totalStarCount" />
      <span v-if="isZhLang">个 star</span>
      <span v-else>stars earned</span>
    </p>
    <p>
      <i class="iconfont icon-repository"></i>
      <span v-if="isZhLang">共维护</span>
      <statistic-count :count="store.data?.repositoryCount" />
      <span v-if="isZhLang">个开源项目</span>
      <span v-else>open-source repos</span>
    </p>
    <p>
      <i class="iconfont icon-organization"></i>
      <span v-if="isZhLang">维护/发起</span>
      <statistic-count :count="store.data?.organizationCount" />
      <span v-if="isZhLang">个开源组织</span>
      <span v-else>organizations</span>
    </p>
  </statistic-base>
</template>
