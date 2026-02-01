<script lang="ts" setup>
  import { ref } from 'vue'
  import { useUniversalFetch } from '/@/app/universal'
  import { useEnhancer } from '/@/app/enhancer'
  import { usePageSeo } from '/@/composables/head'
  import { useCommentStore } from '/@/stores/comment'
  import { APP_PROFILE } from '/@/configs/app.config'
  import { Language, LocalesKey } from '/@/locales'
  import { CommentPostId } from '/@/constants/comment-id'
  import { firstUpperCase } from '/@/transforms/text'
  import { isClient } from '/@/configs/app.env'
  import MobileBanner from '/@/components/mobile/widgets/page-banner.vue'
  import Comment from '/@/components/comment/index.vue'

  const props = defineProps<{
    isMobile?: boolean
  }>()

  const { globalState, isZhLang, i18n: _i18n } = useEnhancer()
  const commentStore = useCommentStore()

  // MARK: Only for client-side routing to navigate to this page
  const isLoading = ref(isClient && globalState.isHydrated)
  const bannerImage = '/images/page-guestbook/banner.webp'

  const fetchComments = () => {
    return commentStore.fetchList({ post_id: CommentPostId.Guestbook }).then(() => {
      isLoading.value = false
    })
  }

  usePageSeo(() => {
    const enTitle = firstUpperCase(_i18n.t(LocalesKey.PAGE_GUESTBOOK, Language.English)!)
    const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_GUESTBOOK)!, enTitle] : [enTitle]
    const description = isZhLang.value ? `给 ${APP_PROFILE.author} 留言` : 'Leave a comment'
    return {
      pageTitles: titles,
      description,
      ogType: 'website',
      ogImage: bannerImage,
      ogImageWidth: 620,
      ogImageHeight: 350
    }
  })

  useUniversalFetch(() => fetchComments())
</script>

<template>
  <div class="guestbook-page">
    <responsive>
      <template #desktop>
        <div class="desktop-banner">
          <uimage class="image" :src="bannerImage" cdn />
          <span class="slogan">
            <webfont class="text">
              <i18n :k="LocalesKey.GUESTBOOK_SLOGAN" />
            </webfont>
          </span>
        </div>
      </template>
      <template #mobile>
        <mobile-banner class="mobile-banner" :background-image="bannerImage" :background-image-y="70" cdn>
          <template #title>
            <webfont bolder><i18n :k="LocalesKey.PAGE_GUESTBOOK" /></webfont>
          </template>
          <template #description>
            <webfont><i18n :k="LocalesKey.GUESTBOOK_SLOGAN" /></webfont>
          </template>
        </mobile-banner>
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
      margin-bottom: $gap;
    }

    .desktop-banner {
      position: relative;
      margin-bottom: $gap;
      width: 100%;
      height: 14rem;
      border: 0;
      background-color: $module-bg;
      @include mix.radius-box($radius-sm);

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

      .slogan {
        $size: 2em;
        display: block;
        position: absolute;
        right: 2rem;
        bottom: 2rem;
        height: $size;
        line-height: $size;
        padding-left: 3rem;
        padding-right: $gap-xs;
        border-top-right-radius: $radius-xs;
        border-bottom-right-radius: $radius-xs;
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
