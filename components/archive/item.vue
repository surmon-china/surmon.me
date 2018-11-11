<template>
  <div class="article-list-item">
    <div class="item-content" :class="{ mobile: mobileLayout }">
      <div class="item-thumb" v-if="!mobileLayout">
        <nuxt-link :to="`/article/${article.id}`">
          <span
            class="item-oirigin"
            :class="{
              self: !article.origin,
              other: article.origin === constants.ORIGIN_STATE.reprint,
              hybrid: article.origin === constants.ORIGIN_STATE.hybrid
            }">
            <span
              v-if="!article.origin"
              v-text="$i18n.text.origin.original">原创</span>
            <span
              v-else-if="article.origin === constants.ORIGIN_STATE.reprint"
              v-text="$i18n.text.origin.reprint">转载</span>
            <span
              v-else-if="article.origin === constants.ORIGIN_STATE.hybrid"
              v-text="$i18n.text.origin.hybrid">混撰</span>
          </span>
          <img 
            class="item-thumb-img" 
            :src="buildThumb(article.thumb)"
            :alt="article.title"
            :title="article.title" />
        </nuxt-link>
      </div>
      <div class="item-body">
        <h4 class="item-title">
          <nuxt-link :to="`/article/${article.id}`" :title="article.title" v-text="article.title"></nuxt-link>
        </h4>
        <p class="item-description" style="-webkit-box-orient: vertical;" v-html="article.description"></p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ article.create_at | toYMD(language) }}</span>
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ article.meta.views || 0 }}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ article.meta.comments || 0 }}</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-like" :class="{ liked: isLiked }"></i>
            <span>{{ article.meta.likes || 0 }}</span>
          </span>
          <span class="categories">
            <i class="iconfont icon-list"></i>
            <nuxt-link
              :key="index"
              :to="`/category/${category.slug}`"
              v-if="article.category && article.category.length"
              v-for="(category, index) in article.category"
              v-text="$i18n.nav[category.slug]">{{ category.name }}</nuxt-link>
            <span v-else v-text="$i18n.text.category.empty">未分类</span>
          </span>
          <span class="tags" v-show="false">
            <i class="iconfont icon-tag"></i>
            <span v-if="!article.tag.length" v-text="$i18n.text.tag.empty">无</span>
            <nuxt-link
              :key="index" 
              :to="`/tag/${tag.slug}`" 
              v-for="(tag, index) in article.tag">{{ tag.name }}</nuxt-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { localUser, localHistoryLikes } from '~/utils/local-storage'
  export default {
    name: 'article-list-item',
    props: {
      article: Object
    },
    data() {
      return {
        isLiked: false
      }
    },
    computed: {
      ...mapState('option', ['imgExt', 'language', 'mobileLayout', 'constants'])
    },
    methods: {
      buildThumb(thumb) {
        if (!thumb) return `${this.cdnUrl}/images/thumb-article.jpg`
        return `${thumb}?imageView2/1/w/350/h/238/format/${this.imgExt}/interlace/1/q/75|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/460/fill/I0ZGRkZGRg==/dissolve/23/gravity/SouthWest/dx/15/dy/7|imageslim`
      }
    },
    mounted() {
      const historyLikes = localHistoryLikes.get()
      this.isLiked = historyLikes && historyLikes.pages.includes(this.article.id)
    }
  }
</script>

<style lang="scss" scoped>
  .article-list-item {
    margin-bottom: 1em;
    background-color: $module-bg;

    &:last-child {
      margin: 0;
    }

    &:hover {
      background-color: $module-hover-bg;
    }

    > .item-content {
      display: block;
      overflow: hidden;
      height: 9.5em;
      padding: .5em;

      &:hover {

        > .item-thumb {

          .item-oirigin {
            opacity: 1;
          }

          .item-thumb-img {
            @include css3-prefix(opacity, .95);
            @include css3-prefix(transform, translateX(-.5em));
          }
        }
      }

      > .item-thumb {
        float: left;
        width: 12em;
        height: 8.5em;
        overflow: hidden;
        position: relative;

        .item-oirigin {
          height: 2.1rem;
          line-height: 2.1rem;
          left: 0;
          top: 0;
          position: absolute;
          z-index: 9;
          font-size: $font-size-small;
          text-align: center;
          color: $white;
          border-bottom-right-radius: 1px;
          opacity: .4;
          padding: 0 .8rem;
          text-transform: uppercase;

          &.self {
            background-color: rgba($accent, .5);
          }

          &.other {
            background-color: rgba($red, .5);
          }

          &.hybrid {
            background-color: rgba($primary, .5);
          }
        }

        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + .5em);
          max-width: calc(100% + .5em);
          height: auto;
          min-height: 8.5em;
          border-color: transparent;
          background-color: $module-hover-bg;
          @include css3-prefix(opacity, 1);
          @include css3-prefix(transform, translateX(0));
        }
      }

      > .item-body {
        float: right;
        width: 28.5em;
        height: 8.5em;

        > .item-title {
          font-size: 1em;
          font-weight: bold;
          color: $link-hover-color;
          margin-top: .2em;
          margin-bottom: .5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          > a {
            margin-left: 0;

            &:hover {
              display: inline-block;
              text-decoration: underline;
              margin-left: .5em;
            }
          }
        }

        > .item-description {
          height: 5em;
          margin: 0;
          margin-bottom: 0.3em;
          overflow: hidden;
          font-size: .9em;
          line-height: 1.8em;
          text-overflow: ellipsis;
          @include clamp(3);
        }

        > .item-meta {
          height: 2em;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          overflow: hidden;
          font-size: .9em;
          line-height: 2em;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;

          > .date {
            text-transform: uppercase;
          }

          > .views {
            min-width: 4rem;
          }

          > .likes {

            > .liked {
              color: $red;
            }
          }

          > .likes,
          > .comments {
            min-width: 3em;
          }

          > .date,
          > .views,
          > .comments,
          > .likes,
          > .tags,
          > .categories {
            margin-right: 1em;

            > .iconfont {
              font-size: 1em;
              margin-right: .4em;
            }
          }

          > .tags,
          > .categories {

            a {
              text-transform: capitalize;
              margin-right: .5em;
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }

       &.mobile {
        height: auto;
        padding: 1rem 1em;

        > .item-body {
          width: 100%;
          height: auto;

          > .item-description {
            height: auto;
            margin-bottom: .5em;
          }

          > .item-meta {

            > .date,
            > .views,
            > .comments,
            > .likes,
            > .tags,
            > .categories {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>
