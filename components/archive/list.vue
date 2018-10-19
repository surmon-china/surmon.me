<template>
  <div class="articles">

    <!-- 非首页列表头 -->
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
          <slot>{{ $i18n.text.article.empty || 'No Result Article.' }}</slot>
        </empty-box>
      </transition>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <color-block-box :left="btnColorBlockLeft" border="left" color="red" />
      <button class="btn-loadmore" @click="$emit('loadmore')" :disabled="article.fetching || !canLoadMore">
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <span v-if="!article.fetching && canLoadMore" v-text="$i18n.text.article.loadmore"></span>
        <span v-else-if="article.fetching && canLoadMore" v-text="$i18n.text.article.loading"></span>
        <span v-else-if="!canLoadMore" v-text="$i18n.text.article.nomore"></span>
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
      btnColorBlockLeft() {
        return this.mobileLayout ? 60 : 75
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
        font-family: webfont;
        background-color: $module-bg;
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;

        &[disabled] {
          opacity:  .9;
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

        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
  }
</style>
