<template>
  <div class="article-list-item" :class="{ mobile: isMobile }">
    <div class="item-content">
      <div v-if="!isMobile" class="item-thumb">
        <nuxt-link :to="`/article/${article.id}`">
          <span
            class="item-oirigin"
            :class="{
              self: !article.origin,
              other: article.origin === constants.OriginState.Reprint,
              hybrid: article.origin === constants.OriginState.Hybrid
            }"
          >{{ originText }}</span>
          <img
            class="item-thumb-img"
            :src="getThumb(article.thumb)"
            :alt="article.title"
            :title="article.title"
          >
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
          <span v-if="!isMobile" class="categories">
            <i class="iconfont icon-list"></i>
            <template v-if="article.category.length">
              <nuxt-link
                v-for="(category, index) in article.category"
                :key="index"
                :to="`/category/${category.slug}`"
                v-text="isEnLang ? category.slug : category.name"
              />
            </template>
            <span v-else v-text="$i18n.text.category.empty"></span>
          </span>
          <span v-if="false" class="tags">
            <i class="iconfont icon-tag"></i>
            <template v-if="article.tag.length">
              <nuxt-link
                v-for="(tag, index) in article.tag"
                :key="index"
                :to="`/tag/${tag.slug}`"
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
  import { getFileCDNUrl } from '~/transformers/url'
  import { getArchiveArticleThumbnailUrl } from '~/transformers/thumbnail'
  import { getJSONStorageReader } from '~/services/local-storage'
  import systemConstants from '~/constants/system'

  const localHistoryLikes = getJSONStorageReader(systemConstants.StorageField.UserLikeHistory)

  export default {
    name: 'ArticleListItem',
    props: {
      article: Object
    },
    data() {
      return {
        isLiked: false
      }
    },
    computed: {
      ...mapState('global', [
        'constants',
        'language',
        'isMobile'
      ]),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      originText() {
        if (!this.article.origin) {
          return this.$i18n.text.origin.original
        }
        if (this.article.origin === this.constants.OriginState.Reprint) {
          return this.$i18n.text.origin.reprint
        }
        if (this.article.origin === this.constants.OriginState.Hybrid) {
          return this.$i18n.text.origin.hybrid
        }
        return '-'
      }
    },
    methods: {
      getThumb(thumb) {
        return getArchiveArticleThumbnailUrl(
          thumb,
          this.$store.getters['global/isWebPImage']
        )
      }
    },
    mounted() {
      this.isLiked = localHistoryLikes.get()?.pages.includes(this.article.id)
    }
  }
</script>

<style lang="scss" scoped>
  .article-list-item {
    margin-bottom: $lg-gap;
    @include module-blur-bg();
    @include background-transition();

    &:hover {
      background-color: $module-hover-bg;
    }

    &:last-child {
      margin: 0;
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
        .item-thumb {
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
          z-index:  $z-index-normal + 1;
          padding: 0 $sm-gap;
          border-bottom-right-radius: 1px;
          opacity: .4;
          font-size: $font-size-small;
          color: $text-reversal;
          text-align: center;
          text-transform: uppercase;
          @include visibility-transition();

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
          transition: transform $transition-time-fast, opacity $transition-time-fast;
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
            transition: margin $transition-time-normal;

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
