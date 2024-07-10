<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useTwitterProfileStore } from '/@/stores/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { isZhLang } = useEnhancer()
  const store = useTwitterProfileStore()
  const fetching = ref(true)

  const joinedDate = computed(() => (store.data?.createdAt ? new Date(store.data.createdAt) : null))
  const joinedDistance = computed(() => {
    if (!joinedDate.value) {
      return null
    }

    const now = new Date()
    const years = now.getFullYear() - joinedDate.value.getFullYear()
    const months = now.getMonth() - joinedDate.value.getMonth()

    let totalYears = years
    let totalMonths = months
    if (months < 0) {
      totalYears -= 1
      totalMonths += 12
    }

    return { years: totalYears, months: totalMonths }
  })

  onMounted(() => {
    store.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

<template>
  <statistic-base
    brand="twitter"
    icon="icon-twitter-x"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.TWITTER"
    :platform="isZhLang ? '我在推特' : 'Twitter'"
  >
    <p>
      <i class="iconfont icon-calendar"></i>
      <i18n>
        <template #zh>
          <span>活跃了<statistic-count :count="joinedDistance?.years || '-'" />年</span>
          <span>零<statistic-count :count="joinedDistance?.months || '-'" />个月</span>
        </template>
        <template #en>
          Joined {{ joinedDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-edit"></i>
      <span v-if="isZhLang">发布了</span>
      <statistic-count large primary split :count="store.data?.tweetCount || '-'" />
      <span v-if="isZhLang">条帖子</span>
      <span v-else>tweets</span>
    </p>
    <p>
      <i class="iconfont icon-follower"></i>
      <span v-if="isZhLang">获得了</span>
      <statistic-count split :count="store.data?.followerCount || '-'" />
      <span v-if="isZhLang">位关注者</span>
      <span v-else>followers</span>
    </p>
  </statistic-base>
</template>
