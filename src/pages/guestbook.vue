<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useStores } from '/@/stores'
  import { APP_META } from '/@/configs/app.config'
  import { Language, LocaleKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { CommentPostId } from '/@/constants/biz-state'
  import { firstUpperCase } from '/@/transforms/text'
  import { isClient } from '/@/configs/app.env'
  import logger from '/@/utils/logger'
  import PageBanner from '/@/components/common/banner.vue'
  import Comment from '/@/components/comment/index.vue'

  const props = defineProps<{
    isMobile?: boolean
  }>()

  const { i18n: _i18n, gtag, globalState, isZhLang } = useEnhancer()
  const { identity, appOption, comment: commentStore } = useStores()
  const isLiked = computed(() => identity.isLikedPage(CommentPostId.Guestbook))
  const siteLikes = computed(() => appOption.data?.meta.likes || 0)
  // MARK: Only for client-side routing to navigate to this page
  const isLoading = ref(isClient && globalState.isHydrated)
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
      const message = _i18n.t(LocaleKey.POST_ACTION_ERROR)
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

  usePageSeo(() => {
    const enTitle = firstUpperCase(_i18n.t(LocaleKey.PAGE_GUESTBOOK, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LocaleKey.PAGE_GUESTBOOK)!, enTitle] : [enTitle]
    const description = isZhLang.value ? `给 ${APP_META.author} 留言` : 'Leave a comment'
    return {
      pageTitles: titles,
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
              <i18n :k="LocaleKey.GUESTBOOK_SLOGAN" />
            </webfont>
          </span>
        </div>
      </template>
      <template #mobile>
        <page-banner class="mobile-banner" :is-mobile="true" :image="bannerImage" :image-position="70" cdn>
          <template #title>
            <i18n :k="LocaleKey.PAGE_GUESTBOOK" />
          </template>
          <template #description>
            <i18n :k="LocaleKey.GUESTBOOK_SLOGAN" />
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .guestbook-page {
    .mobile-banner {
      margin-bottom: $gap-lg;
    }

    .desktop-banner {
      position: relative;
      margin-bottom: $gap-lg;
      width: 100%;
      height: 19rem;
      border: 0;
      background-color: $module-bg;
      @include mix.radius-box($radius-lg);

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 0% 60%;
        transition: all $motion-duration-slow;
        &:hover {
          transform: rotate(2deg) scale(1.1);
        }
      }

      .like {
        position: absolute;
        left: $gap-lg * 2;
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
          margin-right: $gap-sm;
          color: rgba($red, 0.6);
          font-size: $font-size-h2;
          @include mix.color-transition();
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
        right: $gap-lg * 2;
        bottom: $gap * 2;
        height: $size;
        line-height: $size;
        padding: 0 $gap-sm;
        padding-left: 3rem;
        border-top-right-radius: $radius-mini;
        border-bottom-right-radius: $radius-mini;
        background: linear-gradient(to left, $module-bg-lighter, $module-bg, transparent);
        mix-blend-mode: screen;
        opacity: 0.8;
        cursor: none;

        .text {
          letter-spacing: 0.3px;
          color: $color-text-darker;
        }
      }
    }
  }
</style>
