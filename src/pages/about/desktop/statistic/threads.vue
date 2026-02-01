<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useThreadsProfileStore } from '/@/stores/socials'
  import StatisticCard, { StatisticCount } from './_card.vue'
  import { IDENTITIES } from '/@/configs/app.config'

  const { goLinks, isZhLang } = useEnhancer()
  const threadsProfileStore = useThreadsProfileStore()
  const isFetching = ref(true)

  // MARK: hard code
  const joinedDate = new Date(IDENTITIES.THREADS_JOINED_DATE)
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
  <statistic-card
    class="threads-statistic"
    icon="icon-threads"
    :loading="isFetching"
    :has-data="!!threadsProfileStore.data"
    :href="goLinks.threads"
    :platform="isZhLang ? '我在 Threads' : 'Threads'"
  >
    <p class="line-1">
      <i class="iconfont icon-calendar"></i>
      <i18n>
        <template #zh>
          <span>活跃了<statistic-count :count="totalYears" />年</span>
          <span>零<statistic-count :count="totalMonths" />个月</span>
        </template>
        <template #en>
          Joined {{ joinedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-heart-outlined"></i>
      <span v-if="isZhLang">共收到</span>
      <statistic-count large primary split :count="threadsProfileStore.data?.totalLikes || '-'" />
      <span v-if="isZhLang">个按赞</span>
      <span v-else> likes earned</span>
    </p>
    <p>
      <i class="iconfont icon-follower"></i>
      <span v-if="isZhLang">获得了</span>
      <statistic-count split :count="threadsProfileStore.data?.followersCount || '-'" />
      <span v-if="isZhLang">位关注者</span>
      <span v-else>followers</span>
    </p>
  </statistic-card>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-statistic {
    #{--brand-primary-color}: $color-link;

    .line-1 {
      margin-top: $gap;
      margin-bottom: 0.7em;
    }
  }
</style>
