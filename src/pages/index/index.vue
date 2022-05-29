<template>
  <div class="index-page">
    <carrousel
      class="carrousel"
      :articles="articleList.list.data"
      :fetching="articleList.list.fetching"
    />
    <twitter
      class="twitter"
      :userinfo="twitterUserinfo.data ?? void 0"
      :tweets="twitterTweets.data ?? void 0"
      :fetching="twitterUserinfo.fetching || twitterTweets.fetching || articleList.list.fetching"
    />
    <article-list
      :mammon="false"
      :fetching="articleList.list.fetching"
      :articles="articleList.list.data"
      :pagination="articleList.list.pagination"
      @loadmore="loadmoreArticles"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch, onClient } from '/@/universal'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { LanguageKey } from '/@/language'
  import { META } from '/@/config/app.config'
  import ArticleList from '/@/components/flow/desktop/list.vue'
  import Carrousel from './carrousel.vue'
  import Twitter from './twitter.vue'

  export default defineComponent({
    name: 'IndexPage',
    components: {
      Carrousel,
      Twitter,
      ArticleList
    },
    setup() {
      const { meta, i18n } = useEnhancer()
      const { articleList, appOption, twitterUserinfo, twitterTweets } = useStores()
      meta(() => ({
        title: `${META.title} - ${i18n.t(LanguageKey.APP_SLOGAN)}`,
        description: appOption.data?.description,
        keywords: appOption.data?.keywords.join(',')
      }))

      const loadmoreArticles = async () => {
        const targetPage = articleList.list.pagination?.current_page + 1
        await articleList.fetchList({ page: targetPage })
        if (targetPage > 1) {
          onClient(scrollToNextScreen)
        }
      }

      useUniversalFetch(() => {
        return Promise.all([
          articleList.fetchList(),
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          twitterUserinfo.fetch().catch(() => {}),
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          twitterTweets.fetch().catch(() => {})
        ])
      })

      return {
        twitterUserinfo,
        twitterTweets,
        articleList,
        loadmoreArticles
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .index-page {
    .carrousel,
    .twitter {
      margin-bottom: $lg-gap;
    }
  }
</style>
