<template>
  <div class="articles">

    <!-- 列表头 -->
    <transition name="module">
      <div class="article-list-header" v-if="!$route.name.includes('index')">
        <list-header></list-header>
      </div>
    </transition>

    <!-- 列表 -->
    <div class="article-list">
      <transition name="module" mode="out-in">
        <transition-group name="fade" tag="div" v-if="article.data.data && article.data.data.length">
          <list-item :key="index"
                     :article="item"
                     @click.native="toDetail(item)"
                     v-for="(item, index) in article.data.data"></list-item>
        </transition-group>
        <empty-box class="article-empty-box" v-else>
          <slot v-text="$i18n.text.article.empty">No Result Article.</slot>
        </empty-box>
      </transition>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore" @click="$emit('loadmore')"
              :disabled="article.fetching || !canLoadMore">
        <span v-if="!article.fetching && canLoadMore"
              v-text="$i18n.text.article.loadmore">或许有更多</span>
        <span v-else-if="article.fetching && canLoadMore"
              v-text="$i18n.text.article.loading">加载中</span>
        <span v-else-if="!canLoadMore"
              v-text="$i18n.text.article.nomore">这是底线</span>
      </button>
    </div>
  </div>
</template>

<script>
  import ListItem from './item.vue'
  import ListHeader from './header.vue'

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
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      canLoadMore() {
        const { current_page, total_page } = this.article.data.pagination
        const hasArticles = this.article.data.pagination
        return hasArticles ? (current_page < total_page) : false
      }
    },
    methods: {
      toDetail(article) {
        if (this.mobileLayout) {
          this.$router.push(`/article/${article.id}`)
        }
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
      background-color: $module-bg;
    }

    > .article-list {
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;

      > .article-empty-box {
        background-color: $module-bg;
      }

      > .article-loading {
        height: 10em;
        background-color: $module-bg;
        display: flex;
      }

      > .article-errmsg {
        height: 10em;
        line-height: 10em;
        background-color: $module-bg;
        text-align: center;
        color: rgba(0, 0, 0, 0.38);
      }
    }

    > .article-load {

      > .btn-loadmore {
        width: 100%;
        display: block;
        height: 3em;
        line-height: 3em;
        background-color: $module-bg;
        text-transform: uppercase;

        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
  }
</style>
