<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { isZhLang } = useEnhancer()
  const { goLinksStore, threadsProfileStore } = useStores()
  const isFetching = ref(true)

  // MARK: hard code
  const joinedDate = new Date('2024-07-06')
  const now = new Date()
  const years = now.getFullYear() - joinedDate.getFullYear()
  const months = now.getMonth() - joinedDate.getMonth()
  let totalYears = years
  let totalMonths = months
  if (months < 0) {
    totalYears -= 1
    totalMonths += 12
  }

  onMounted(() => {
    threadsProfileStore.fetch().finally(() => {
      isFetching.value = false
    })
  })
</script>

<template>
  <statistic-base
    brand="threads"
    icon="icon-threads"
    :fetching="isFetching"
    :data="threadsProfileStore.data"
    :href="goLinksStore.map.threads"
    :platform="isZhLang ? '我在 Threads' : 'Threads'"
  >
    <p>
      <i class="iconfont icon-calendar"></i>
      <i18n>
        <template #zh>
          <span>活跃了<statistic-count :count="totalYears" />年</span>
          <span>零<statistic-count :count="totalMonths" />个月</span>
        </template>
        <template #en>
          Joined {{ joinedDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-threads"></i>
      <span v-if="isZhLang">发布了</span>
      <statistic-count large primary split count="NaN" />
      <span v-if="isZhLang">篇帖子</span>
      <span v-else>threads</span>
    </p>
    <p>
      <i class="iconfont icon-follower"></i>
      <span v-if="isZhLang">获得了</span>
      <statistic-count split :count="threadsProfileStore.data?.followersCount || '-'" />
      <span v-if="isZhLang">位关注者</span>
      <span v-else>followers</span>
    </p>
  </statistic-base>
</template>
