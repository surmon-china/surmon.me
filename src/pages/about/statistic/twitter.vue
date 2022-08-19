<template>
  <statistic-base
    brand="twitter"
    icon="icon-twitter"
    :data="store.data"
    :fetching="fetching"
    :href="VALUABLE_LINKS.TWITTER"
    :platform="isZhLang ? '我在推特' : 'Twitter'"
  >
    <p>
      <i class="iconfont icon-edit"></i>
      <i18n>
        <template #zh>
          <span>发布了</span>
          <statistic-count large primary split :count="store.data?.public_metrics.tweet_count" />
          <span>条推文</span>
        </template>
        <template #en>
          <statistic-count large primary split :count="store.data?.public_metrics.tweet_count" />
          <span>tweets</span>
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-following"></i>
      <i18n>
        <template #zh>
          <span>关注了</span>
          <statistic-count split :count="store.data?.public_metrics.following_count" />
          <span>个人</span>
        </template>
        <template #en>
          <statistic-count split :count="store.data?.public_metrics.following_count" />
          <span>following</span>
        </template>
      </i18n>
    </p>
    <p>
      <i class="iconfont icon-follower"></i>
      <i18n>
        <template #zh>
          <span>收获了</span>
          <statistic-count split :count="store.data?.public_metrics.followers_count" />
          <span>个粉丝</span>
        </template>
        <template #en>
          <statistic-count split :count="store.data?.public_metrics.followers_count" />
          <span>followers</span>
        </template>
      </i18n>
    </p>
  </statistic-base>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useTwitterUserinfoStore } from '/@/stores/media'
  import { useEnhancer } from '/@/app/enhancer'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  export default defineComponent({
    name: 'AboutPageTwitterStatistic',
    components: { StatisticBase, StatisticCount },
    setup() {
      const { isZhLang } = useEnhancer()
      const fetching = ref(true)
      const store = useTwitterUserinfoStore()
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
