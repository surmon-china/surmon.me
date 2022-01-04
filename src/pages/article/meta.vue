<template>
  <div class="meta" :class="{ plain }">
    <div class="bridge left"></div>
    <div class="bridge right"></div>
    <div class="actions">
      <span class="button views">
        <i class="icon iconfont icon-eye"></i>
        <span class="text">{{ article.meta.views }}</span>
      </span>
      <button class="button like" :disabled="isLiked" @click="handleLike">
        <i class="icon iconfont icon-like"></i>
        <span class="text">
          <i18n zh="写得好！" :en="`Well!&nbsp;`" />
          {{ likes }}
        </span>
      </button>
      <button class="button sponsor" @click="handleSponsor">
        <i class="icon iconfont icon-heart"></i>
        <span class="text"><i18n zh="赏" en="Sponsor" /></span>
      </button>
      <client-only>
        <popup v-model:visible="isVisibleSponsor" :border="false">
          <iframe class="sponsor-modal" :src="VALUABLE_LINKS.SPONSOR" />
        </popup>
      </client-only>
    </div>
    <div class="line">
      <i18n zh="本文于 " en="Published at " />
      <router-link
        class="date-link"
        :title="getDateTitle(article.create_at)"
        :to="getDateLink(article.create_at)"
      >
        {{ getDateTitle(article.create_at) }}
      </router-link>
      <i18n zh="发布在 " en="in category " />
      <span class="category-link" v-for="(category, index) in article.category" :key="index">
        <router-link
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
      <divider type="vertical" />
      <span class="tag-link" v-for="(tag, index) in article.tag" :key="index">
        <router-link :to="getTagFlowRoute(tag.slug)" :title="tag.description || tag.name">
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
          <ulink href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
            >自由转载 - 署名 - 非商业性使用</ulink
          >
        </template>
        <template #en>
          <ulink href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.en"
            >Creative Commons BY-NC 3.0 CN</ulink
          >
        </template>
      </i18n>
      <divider type="vertical" />
      <i class="icon iconfont icon-copy"></i>
      <span class="site-url" @click="copy(articleURL)">
        {{ articleURL }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
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
      const { i18n, gtag } = useEnhancer()
      const universalStore = useUniversalStore()
      const articleDetailStore = useArticleDetailStore()
      const isLiked = computed(() => universalStore.isLikedPage(props.article.id))
      const articleURL = computed(() => getPageURL(getArticleDetailRoute(props.article.id)))
      const likes = computed(() => props.article.meta.likes)

      const isVisibleSponsor = ref(false)
      const handleSponsor = () => {
        isVisibleSponsor.value = true
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
        isVisibleSponsor,
        handleLike,
        handleSponsor,
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

  .sponsor-modal {
    width: 600px;
    height: 200px;
    border-radius: $sm-radius !important;
  }

  .meta {
    position: relative;
    padding: $lg-gap;
    text-align: center;
    &.plain {
      .line {
        height: auto;
      }
    }

    .bridge {
      $distance: 3rem;
      position: absolute;
      top: -$lg-gap;
      width: $lg-gap;
      height: $lg-gap;
      background: linear-gradient(to bottom, $module-bg, $module-bg-darker-1);

      &::before {
        content: '';
        position: absolute;
        top: 3rem;
        display: block;
        width: 1em;
        height: 1em;
        background-color: $module-bg-darker-1;
        border-radius: $sm-radius;
      }

      &.left {
        left: $distance;
      }
      &.right {
        right: $distance;
      }
    }

    .actions {
      margin-top: $sm-gap;
      padding-bottom: 2rem;
      margin-bottom: $lg-gap;
      display: flex;
      justify-content: center;
      border-bottom: 1px dashed $module-bg-darker-1;

      .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        min-width: 6rem;
        padding: 0 $gap;
        border-radius: $sm-radius;

        .icon {
          font-size: $font-size-h2;
        }
        .text {
          margin-left: $sm-gap;
          font-weight: bold;
        }

        &.views {
          color: $text-disabled;
        }

        &.like {
          color: $white;
          min-width: 8rem;
          margin: 0 2rem;
          background-color: rgba($red, 0.8);
          &:hover {
            background-color: rgba($red, 1);
          }
        }

        &.sponsor {
          color: $text-disabled;
          &:hover {
            color: rgba($red, 0.8);
          }
        }
      }
    }

    .line {
      $size: 2rem;
      height: $size;
      line-height: $size;
      margin-bottom: $lg-gap;
      &:last-child {
        margin: 0;
      }

      a {
        border-bottom: 1px solid transparent;
        &:hover {
          text-decoration: none;
          border-color: initial;
        }
      }

      .icon {
        font-size: $font-size-small;
        color: $text-secondary;
        margin-right: $xs-gap;
      }

      .date-link,
      .tag-link {
        margin-right: $xs-gap;
      }

      .date-link {
        text-transform: uppercase;
      }

      .category-link,
      .tag-link {
        text-transform: capitalize;
      }

      .site-url {
        border-bottom: 1px solid;
        cursor: pointer;
        color: $link-color;
        &:hover {
          color: $link-color-hover;
        }
      }
    }
  }
</style>
