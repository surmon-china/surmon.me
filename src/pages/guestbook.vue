<template>
  <div class="guestbook-page" :class="{ dark: isDarkTheme }">
    <!-- mobile-banner -->
    <page-banner
      v-if="isMobile"
      class="mobile-banner"
      :is-mobile="true"
      :position="70"
      :blur="false"
      :image="bannerImage"
    >
      <template #title>
        <i18n :lkey="LANGUAGE_KEYS.PAGE_GUESTBOOK" />
      </template>
      <template #description>
        <i18n :lkey="LANGUAGE_KEYS.GUESTBOOK_SLOGAN" />
      </template>
    </page-banner>
    <!-- desktop-banner -->
    <div class="desktop-banner" v-else>
      <uimage cdn class="image" :src="bannerImage" />
      <button class="like" :class="{ liked: isLiked }" :disabled="isLiked" @click="handleLike">
        <i class="icon iconfont icon-heart"></i>
        <span class="count">{{ isLiked ? `${siteLikes - 1} + 1` : siteLikes }}</span>
      </button>
      <span class="slogan">
        <span class="text">
          <i18n :lkey="LANGUAGE_KEYS.GUESTBOOK_SLOGAN" />
        </span>
      </span>
    </div>
    <div class="comment">
      <comment :post-id="0" :plain="isMobile" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalFetch } from '/@/universal'
  import { useMetaStore } from '/@/store/meta'
  import { useCommentStore } from '/@/store/comment'
  import { GAEventCategories } from '/@/constants/gtag'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { firstUpperCase } from '/@/transforms/text'
  import { usePageLike } from '/@/transforms/state'
  import { META } from '/@/config/app.config'
  import Comment from '/@/components/comment/index.vue'
  import PageBanner from '/@/components/common/banner.vue'

  export default defineComponent({
    name: 'GuestbookPage',
    components: {
      PageBanner,
      Comment
    },
    props: {
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const { i18n, meta, gtag, isDarkTheme, isZhLang } = useEnhancer()
      const metaStore = useMetaStore()
      const commentStore = useCommentStore()
      const { isLiked, like } = usePageLike(0)
      const siteLikes = computed(() => metaStore.appOptions.data?.meta.likes || 0)
      const bannerImage = `/images/page-guestbook/banner.jpg`

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_GUESTBOOK, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_GUESTBOOK), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `给 ${META.author} 留言` }
      })

      const fetchAllData = () => {
        return Promise.all([
          metaStore.fetchAppOptions(true),
          commentStore.fetchList({ post_id: 0 })
        ])
      }

      const handleLike = async () => {
        if (isLiked.value) {
          return false
        }
        gtag?.event('like_site', {
          event_category: GAEventCategories.Universal
        })

        try {
          await metaStore.postSiteLike()
          await metaStore.fetchAppOptions(true)
          like()
        } catch (error) {
          const message = i18n.t(LANGUAGE_KEYS.POST_ACTION_ERROR)
          console.warn(message, error)
          alert(message)
        }
      }

      useUniversalFetch(() => fetchAllData())

      return {
        LANGUAGE_KEYS,
        bannerImage,
        isDarkTheme,
        isLiked,
        siteLikes,
        handleLike
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .guestbook-page {
    .mobile-banner {
      margin-bottom: $lg-gap;
    }

    .desktop-banner {
      position: relative;
      margin-bottom: $lg-gap;
      width: 100%;
      height: 19rem;
      border: 0;
      background-color: $module-bg;
      @include radius-box($lg-radius);

      .image {
        margin-top: -($gap * 6);
        transition: all $transition-time-slow;

        &:hover {
          transform: rotate(2deg) scale(1.1);
        }
      }

      .like {
        position: absolute;
        left: $lg-gap * 2;
        bottom: $gap * 2;
        display: inline-flex;
        align-items: center;

        &.liked,
        &:hover {
          .icon {
            color: $red;
          }
        }

        .icon {
          margin-right: $sm-gap;
          color: rgba($red, 0.6);
          font-size: $font-size-h2;
          @include color-transition();
        }

        .count {
          color: rgba($white, 0.8);
          font-weight: bold;
        }
      }

      .slogan {
        $size: 2em;
        display: block;
        position: absolute;
        right: $lg-gap * 2;
        bottom: $gap * 2;
        height: $size;
        line-height: $size;
        padding: 0 $sm-gap;
        padding-left: 3rem;
        border-top-right-radius: $mini-radius;
        border-bottom-right-radius: $mini-radius;
        opacity: 0.8;
        font-weight: 700;
        cursor: progress;
        background: linear-gradient(to left, $module-bg-lighter, $module-bg, transparent);

        .text {
          letter-spacing: 0.3px;
          font-weight: bold;
          color: $text;
          background-clip: text;
          background-image: cdn-url('/images/page-guestbook/banner.jpg');
          background-position: 100% 80%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    &.dark {
      .desktop-banner {
        .slogan {
          .text {
            -webkit-text-fill-color: $text !important;
          }
        }
      }
    }
  }
</style>
