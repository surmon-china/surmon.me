<template>
  <div class="articles">

    <!-- 非首页列表头 -->
    <div class="article-list-header" v-if="!isIndexRoute">
      <list-header />
    </div>

    <!-- 广告啦 -->
    <transition name="module">
      <component :is="isMobile ? 'adsense-archive-mobile' : 'adsense-archive'" v-if="renderAd" />
    </transition>

    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <transition-group key="list" name="fade" tag="div" v-if="article.data.data && article.data.data.length">
          <list-item
            :key="articleItem.id"
            :article="articleItem"
            @click.native="toDetail(articleItem)"
            v-for="articleItem in article.data.data"
          />
        </transition-group>
        <empty-box key="empty" class="article-empty-box" v-else>
          <slot>{{ $i18n.text.article.empty }}</slot>
        </empty-box>
      </transition>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <color-block-box :left="btnColorBlockLeft" border="left" color="red" />
      <button class="btn-loadmore" @click="$emit('loadmore')" :disabled="article.fetching || !isCanLoadMore">
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <span class="text">
          <span v-if="!article.fetching && isCanLoadMore" v-text="$i18n.text.article.loadmore"></span>
          <span v-else-if="article.fetching && isCanLoadMore" v-text="$i18n.text.article.loading"></span>
          <span v-else-if="!isCanLoadMore" v-text="$i18n.text.article.nomore"></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
  import ListItem from './item.vue'
  import ListHeader from './header.vue'
  import underscore from '~/utils/underscore-simple'
  import { isIndexRoute } from '~/utils/route'
  export default {
    name: 'article-list',
    components: {
      ListItem,
      ListHeader
    },
    props: {
      article: {
        type: Object
      }
    },
    data() {
      return {
        renderAd: true
      }
    },
    computed: {
      isMobile() {
        return this.$store.state.global.isMobile
      },
      isCanLoadMore() {
        const { current_page, total_page } = this.article.data.pagination
        const hasArticles = this.article.data.pagination
        return hasArticles ? (current_page < total_page) : false
      },
      isIndexRoute() {
        return isIndexRoute(this.$route.name)
      },
      btnColorBlockLeft() {
        return this.isMobile ? 60 : 75
      }
    },
    activated() {
      this.updateAd()
    },
    methods: {
      toDetail(article) {
        if (this.isMobile) {
          this.$router.push(`/article/${article.id}`)
        }
      },
      updateAd() {
        this.renderAd = false
        this.$nextTick(() => {
          this.renderAd = true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .articles {

    > .article-list-header {
      margin-bottom: 1em;
      position: relative;
      overflow: hidden;
      background-color: $module-bg-opacity-5;
    }

    > .article-list {
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;

      > .article-empty-box {
        background-color: $module-bg;
      }

      > .article-loading {
        display: flex;
        height: 10em;
        background-color: $module-bg;
      }

      > .article-errmsg {
        height: 10em;
        line-height: 10em;
        text-align: center;
        background-color: $module-bg;
        color: rgba(0, 0, 0, 0.38);
      }
    }

    > .article-load {
      position: relative;
      overflow: hidden;

      > .btn-loadmore {
        width: 100%;
        height: 3em;
        padding: 0 2rem;
        line-height: 3em;
        color: $white;
        background-color: $module-bg;
        display: flex;
        justify-content: space-between;

        &:hover {
          background-color: $module-hover-bg;
        }

        &[disabled] {
          opacity: .9;
          background-color: $module-bg-opacity-5;
        }

        @keyframes loadmore-btn-icon-color {
          0% { color: $red }
          100% { color: $accent }
        }

        > .icon {
          > .iconfont {
            animation: loadmore-btn-icon-color 2s infinite;
          }
        }

        > .text {
          text-transform: uppercase;
          font-family: 'webfont-bolder', 'DINRegular';
        }
      }
    }
  }
</style>
