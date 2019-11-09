<template>
  <div class="article-list-item" :class="{ mobile: isMobile }">
    <div class="item-content">
      <div class="item-thumb" v-if="!isMobile">
        <nuxt-link :to="`/article/${article.id}`">
          <span
            class="item-oirigin"
            :class="{
              self: !article.origin,
              other: article.origin === constants.OriginState.Reprint,
              hybrid: article.origin === constants.OriginState.Hybrid
            }"
          >
            <span v-if="!article.origin" v-text="$i18n.text.origin.original"></span>
            <span v-else-if="article.origin === constants.OriginState.Reprint" v-text="$i18n.text.origin.reprint"></span>
            <span v-else-if="article.origin === constants.OriginState.Hybrid" v-text="$i18n.text.origin.hybrid"></span>
          </span>
          <img
            class="item-thumb-img"
            :src="buildThumb(article.thumb)"
            :alt="article.title"
            :title="article.title"
          />
        </nuxt-link>
      </div>
      <div class="item-body">
        <h5 class="item-title">
          <nuxt-link :to="`/article/${article.id}`" :title="article.title" v-text="article.title" />
        </h5>
        <p
          class="item-description"
          style="-webkit-box-orient: vertical;"
          v-html="article.description"
        ></p>
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
          <span class="categories" v-if="!isMobile">
            <i class="iconfont icon-list"></i>
            <template v-if="article.category.length">
              <nuxt-link
                :key="index"
                :to="`/category/${category.slug}`"
                v-for="(category, index) in article.category"
                v-text="isEnLang ? category.slug : category.name"
              />
            </template>
            <span v-else v-text="$i18n.text.category.empty"></span>
          </span>
          <span class="tags" v-if="false">
            <i class="iconfont icon-tag"></i>
            <template v-if="article.tag.length">
              <nuxt-link
                :key="index"
                :to="`/tag/${tag.slug}`"
                v-for="(tag, index) in article.tag"
                v-text="isEnLang ? tag.slug : tag.name"
              />
            </template>
            <span v-else v-text="$i18n.text.tag.empty"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getFileCDNUrl } from '~/transforms/url'
  import { localHistoryLikes } from '~/services/local-storage'

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
      ...mapState('global', ['imageExt', 'language', 'isMobile', 'constants']),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
    },
    methods: {
      buildThumb(thumb) {
        return thumb
          ? `${thumb}?x-oss-process=style/blog.list.item.pc`
          : getFileCDNUrl('/images/thumb-article.jpg')
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
    margin-bottom: $lg-gap;
    @include module-blur-bg();

    &:last-child {
      margin: 0;
    }

    &:hover {
      background-color: $module-hover-bg;
    }

    > .item-content {
      $height: $gap * 11;
      $padding: $sm-gap;
      $content-height: $height - ($padding * 2);
      display: block;
      overflow: hidden;
      height: $height;
      padding: $padding;

      &:hover {
        > .item-thumb {
          .item-oirigin {
            opacity: 1;
          }

          .item-thumb-img {
            opacity: .95;
            transform: translateX(-3px);
          }
        }
      }

      > .item-thumb {
        float: left;
        width: 12em;
        height: $content-height;
        overflow: hidden;
        position: relative;

        .item-oirigin {
          position: absolute;
          left: 0;
          top: 0;
          height: 2.1rem;
          line-height: 2.1rem;
          z-index: 1;
          padding: 0 $sm-gap;
          border-bottom-right-radius: 1px;
          opacity: .4;
          font-size: $font-size-small;
          color: $text-reversal;
          text-align: center;
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
          width: calc(100% + 3px);
          max-width: calc(100% + 3px);
          height: auto;
          min-height: $content-height;
          border-color: transparent;
          background-color: $module-hover-bg;
          opacity: 1;
          transform: translateX(0);
        }
      }

      > .item-body {
        float: right;
        width: 28.5em;
        height: $content-height;

        > .item-title {
          margin-top: 3px;
          margin-bottom: $sm-gap;
          font-weight: bold;
          color: $link-hover-color;
          @include text-overflow();

          > a {
            margin-left: 0;
            transition: margin $transition-time-normal linear;

            &:hover {
              display: inline-block;
              text-decoration: underline;
              margin-left: $sm-gap;
            }
          }
        }

        > .item-description {
          height: 5rem;
          margin: 0;
          margin-bottom: $xs-gap;
          line-height: 1.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: $font-size-h6;
          @include clamp(3);
        }

        > .item-meta {
          height: 2em;
          line-height: 2em;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          overflow: hidden;
          font-size: $font-size-small;
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

            > .iconfont {
              margin-right: $xs-gap;
            }
          }

          > .tags,
          > .categories {

            a {
              text-transform: capitalize;
              margin-right: $sm-gap;
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }
    }


    &.mobile {
      margin-bottom: $gap;

      &:last-child {
        margin: 0;
      }

      > .item-content {
        height: auto;
        padding: $sm-gap $gap;

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
