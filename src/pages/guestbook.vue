<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { isClient } from '/@/app/environment'
  import { useUniversalFetch } from '/@/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { useStores } from '/@/stores'
  import { Language, LanguageKey } from '/@/language'
  import { GAEventCategories } from '/@/constants/gtag'
  import { CommentPostId } from '/@/constants/state'
  import { firstUpperCase } from '/@/transforms/text'
  import { META } from '/@/config/app.config'
  import logger from '/@/utils/logger'
  import PageBanner from '/@/components/common/banner.vue'
  import Comment from '/@/components/comment/index.vue'

  const props = defineProps<{
    isMobile?: boolean
  }>()

  const { i18n: _i18n, seoMeta, gtag, gState, isZhLang } = useEnhancer()
  const { identity, appOption, comment: commentStore } = useStores()
  const isLiked = computed(() => identity.isLikedPage(CommentPostId.Guestbook))
  const siteLikes = computed(() => appOption.data?.meta.likes || 0)
  // MARK: Only for client-side routing to navigate to this page
  const isLoading = ref(isClient && gState.isHydrated.value)
  const bannerImage = `/images/page-guestbook/banner.webp`

  const handleLike = async () => {
    if (isLiked.value) {
      return false
    }

    gtag?.event('like_site', {
      event_category: GAEventCategories.Universal
    })

    try {
      await appOption.postSiteLike()
      identity.likePage(CommentPostId.Guestbook)
    } catch (error) {
      const message = _i18n.t(LanguageKey.POST_ACTION_ERROR)
      logger.warn(message, error)
      alert(message)
    }
  }

  const fetchAllData = () => {
    const appOptionRequest = appOption.fetch()
    const commentRequest = commentStore.fetchList({ post_id: CommentPostId.Guestbook })
    return Promise.all([appOptionRequest, commentRequest]).then(() => {
      isLoading.value = false
    })
  }

  seoMeta(() => {
    const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_GUESTBOOK, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_GUESTBOOK), enTitle] : [enTitle]
    const description = isZhLang.value ? `给 ${META.author} 留言` : 'Leave a comment'
    return {
      pageTitle: titles.join(' | '),
      description,
      ogType: 'website',
      ogImage: bannerImage,
      ogImageWidth: 620,
      ogImageHeight: 350
    }
  })

  useUniversalFetch(() => fetchAllData())
</script>

<template>
  <div class="guestbook-page">
    <responsive>
      <template #desktop>
        <div class="desktop-banner">
          <uimage class="image" :src="bannerImage" cdn />
          <button class="like" :class="{ liked: isLiked }" :disabled="isLiked" @click="handleLike">
            <i class="icon iconfont icon-heart"></i>
            <span class="count">{{ isLiked ? `${siteLikes - 1} + 1` : siteLikes }}</span>
          </button>
          <span class="slogan">
            <webfont class="text">
              <i18n :k="LanguageKey.GUESTBOOK_SLOGAN" />
            </webfont>
          </span>
        </div>
      </template>
      <template #mobile>
        <page-banner class="mobile-banner" :is-mobile="true" :image="bannerImage" :image-position="70" cdn>
          <template #title>
            <i18n :k="LanguageKey.PAGE_GUESTBOOK" />
          </template>
          <template #description>
            <i18n :k="LanguageKey.GUESTBOOK_SLOGAN" />
          </template>
        </page-banner>
      </template>
    </responsive>
    <div class="comment">
      <comment :post-id="0" :plain="props.isMobile" :fetching="isLoading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

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
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 0% 60%;
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
        background: linear-gradient(to left, $module-bg-lighter, $module-bg, transparent);
        mix-blend-mode: screen;
        opacity: 0.8;
        cursor: none;

        .text {
          letter-spacing: 0.3px;
          color: $text-darker;
        }
      }
    }
  }
</style>
