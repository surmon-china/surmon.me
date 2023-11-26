<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useTwitterStore } from '/@/stores/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import StatisticBase, { StatisticCount } from './base.vue'

  const { isZhLang } = useEnhancer()
  const store = useTwitterStore()
  const fetching = ref(true)
  onMounted(() => {
    store.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

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
      <span v-if="isZhLang">发布了</span>
      <statistic-count large primary split :count="store.data?.userinfo.tweetCount || '-'" />
      <span v-if="isZhLang">条推文</span>
      <span v-else>tweets</span>
    </p>
    <p>
      <i class="iconfont icon-following"></i>
      <span v-if="isZhLang">关注了</span>
      <statistic-count split :count="store.data?.userinfo.followingCount || '-'" />
      <span v-if="isZhLang">位推友</span>
      <span v-else>followings</span>
    </p>
    <p>
      <i class="iconfont icon-follower"></i>
      <span v-if="isZhLang">获得了</span>
      <statistic-count split :count="store.data?.userinfo.followerCount || '-'" />
      <span v-if="isZhLang">位关注者</span>
      <span v-else>followers</span>
    </p>
  </statistic-base>
</template>
