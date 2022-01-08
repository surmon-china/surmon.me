<template>
  <div class="meta" :class="{ plain }">
    <div class="actions">
      <button
        class="button like"
        :class="{ liked: isLiked }"
        :disabled="isLiked"
        @click="handleLike"
      >
        <i class="icon iconfont icon-like"></i>
        <span class="text">
          <i18n>
            <template #zh>真棒！{{ likes }}</template>
            <template #en>{{ isLiked ? 'Upvoted' : 'Upvote' }} ({{ likes }})</template>
          </i18n>
        </span>
      </button>
      <button v-if="!plain" class="button sponsor" @click="handleOpenSponsor">
        <i class="icon iconfont icon-heart"></i>
      </button>
    </div>
    <div class="line">
      <i18n zh="本文于" en="Published at" />
      <router-link
        class="link date"
        :title="getDateTitle(article.create_at)"
        :to="getDateLink(article.create_at)"
      >
        {{ getDateTitle(article.create_at) }}
      </router-link>
      <i18n zh="发布在" en="in category" />
      <span v-for="(category, index) in article.category" :key="index">
        <router-link
          class="link category"
          :to="getCategoryFlowRoute(category.slug)"
          :title="category.description || category.name"
        >
          <i18n :zh="category.name" :en="category.slug" />
        </router-link>
        <span v-if="article.category[index + 1]">
          <i18n zh="、" en="," />
        </span>
      </span>
      <span v-if="!article.category.length">
        <i18n zh="未知分类下" en="(no catgory)" />
      </span>
      <template v-if="plain"><br /></template>
      <template v-else>
        <divider type="vertical" size="sm" />
      </template>
      <span v-for="(tag, index) in article.tag" :key="index">
        <router-link
          class="link tag"
          :to="getTagFlowRoute(tag.slug)"
          :title="tag.description || tag.name"
        >
          <i18n :zh="tag.name" :en="tag.slug" />
        </router-link>
        <span v-if="article.tag[index + 1]">
          <i18n zh="、" en="," />
        </span>
      </span>
    </div>
    <div class="line">
      <i class="icon iconfont icon-copyright"></i>
      <i18n>
        <template #zh>
          <ulink
            class="link copyright"
            href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
            >自由转载 - 署名 - 非商业性使用</ulink
          >
        </template>
        <template #en>
          <ulink
            class="link copyright"
            href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.en"
            >Creative Commons BY-NC 3.0 CN</ulink
          >
        </template>
      </i18n>
      <template v-if="plain"><br /></template>
      <template v-else><divider type="vertical" /></template>
      <span class="link permalink" @click="copy(articleURL)">
        {{ articleURL }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalStore } from '/@/store/universal'
  import { useArticleDetailStore } from '/@/store/article'
  import { Article } from '/@/store/article'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventCategories } from '/@/constants/gtag'
  import { copy } from '/@/utils/clipboard'
  import { humanizeYMD, dateToYMD } from '/@/transforms/moment'
  import { getPageURL } from '/@/transforms/url'
  import {
    getArticleDetailRoute,
    getTagFlowRoute,
    getCategoryFlowRoute,
    getDateFlowRoute
  } from '/@/transforms/route'

  export default defineComponent({
    name: 'ArticleMeta',
    props: {
      article: {
        type: Object as PropType<Article>,
        required: true
      },
      plain: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { i18n, gtag, globalState } = useEnhancer()
      const universalStore = useUniversalStore()
      const articleDetailStore = useArticleDetailStore()
      const isLiked = computed(() => universalStore.isLikedPage(props.article.id))
      const articleURL = computed(() => getPageURL(getArticleDetailRoute(props.article.id)))
      const likes = computed(() => props.article.meta.likes)

      const handleOpenSponsor = () => {
        globalState.switchTogglers.sponsorModal()
        gtag?.event('article_sponsor', {
          event_category: GAEventCategories.Article
        })
      }

      const handleLike = async () => {
        if (isLiked.value) {
          return false
        }

        gtag?.event('article_like', {
          event_category: GAEventCategories.Article
        })

        try {
          await articleDetailStore.postArticleLike(props.article.id)
          universalStore.likePage(props.article.id)
        } catch (error) {
          const message = i18n.t(LANGUAGE_KEYS.POST_ACTION_ERROR)
          console.warn(message, error)
          alert(message)
        }
      }

      const getDateTitle = (date: string) => {
        return humanizeYMD(date, i18n.language.value as Language)
      }

      const getDateLink = (date: string) => {
        return getDateFlowRoute(dateToYMD(new Date(date)))
      }

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        articleURL,
        likes,
        copy,
        isLiked,
        handleLike,
        handleOpenSponsor,
        getDateTitle,
        getDateLink,
        getTagFlowRoute,
        getCategoryFlowRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/init.scss';

  .meta {
    position: relative;
    padding: 2rem;
    text-align: center;
    &.plain {
      .line {
        height: auto;
        line-height: 2;
      }
    }

    .actions {
      margin-top: $sm-gap;
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;

      .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        line-height: 3rem;
        padding: 0 $gap;
        color: $white;
        background-color: mix($white, $red, 10%);
        &:hover {
          background-color: $red;
        }
        &[disabled] {
          opacity: 0.8;
          background-color: mix($black, $red, 18%);
        }
        &:first-child {
          border-top-left-radius: $sm-radius;
          border-bottom-left-radius: $sm-radius;
        }
        &:last-child {
          border-top-right-radius: $sm-radius;
          border-bottom-right-radius: $sm-radius;
        }
        & + button {
          /* https://github.com/ant-design/ant-design/blob/master/components/style/themes/variable.less#L121 */
          border-left: 1px solid mix($white, $red, 26%);
        }

        &.like {
          min-width: 8rem;
          .icon {
            font-size: $font-size-h2;
          }
          .text {
            margin-left: $sm-gap;
            font-weight: bold;
          }
        }

        &.sponsor {
          font-size: $font-size-h4;
        }
      }
    }

    .line {
      $size: 2rem;
      height: $size;
      line-height: $size;
      margin-bottom: $lg-gap;
      font-weight: bold;
      color: $text-secondary;
      &:last-child {
        margin: 0;
      }

      .icon {
        font-weight: normal;
        font-size: $font-size-small;
        margin-right: $xs-gap;
      }

      .link {
        border-bottom: 1px solid transparent;
        &:hover {
          text-decoration: none;
          border-color: initial;
        }

        &.date,
        &.category,
        &.tag {
          margin: 0 $xs-gap;
          color: $text;
          &:hover {
            color: $link-hover;
          }
        }
        &.date {
          text-transform: uppercase;
        }
        &.category,
        &.tag {
          text-transform: capitalize;
        }

        &.copyright,
        &.permalink {
          color: $text-secondary;
          &:hover {
            color: $text;
          }
        }

        &.permalink {
          border-bottom: 1px solid;
          cursor: pointer;
        }
      }
    }
  }
</style>
