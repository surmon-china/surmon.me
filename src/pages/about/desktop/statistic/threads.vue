<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useThreadsProfileStore } from '/@/stores/media'
  import { VALUABLE_LINKS } from '/@/configs/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { isZhLang } = useEnhancer()
  const store = useThreadsProfileStore()
  const fetching = ref(true)

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
    store.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

<template>
  <statistic-base
    brand="threads"
    icon="icon-threads"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.THREADS"
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
      <statistic-count split :count="store.data?.followersCount || '-'" />
      <span v-if="isZhLang">位关注者</span>
      <span v-else>followers</span>
    </p>
  </statistic-base>
</template>
