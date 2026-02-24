<script lang="ts" setup>
  import { shallowRef, computed, nextTick, PropType } from 'vue'
  import { APP_CONFIG } from '/@/configs/app.config'
  import { Article } from '/@/interfaces/article'
  import { useEnhancer } from '/@/app/enhancer'
  import { numberSplit } from '/@/transforms/text'
  import { getMarkdownSplitIndex } from '/@/transforms/markdown'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getOriginalProxyURL, getPageURL } from '/@/transforms/url'
  import { renderTextToQRCodeDataURL } from '/@/transforms/qrcode'
  import BaseShare, { SocialMedia } from '/@/components/common/share.vue'
  import Markdown from '/@/components/common/markdown.vue'

  const props = defineProps({
    article: {
      type: Object as PropType<Article>,
      required: true
    },
    socials: {
      type: Array as PropType<SocialMedia[]>,
      default: () => []
    },
    disabledImageShare: {
      type: Boolean,
      default: false
    }
  })

  const { theme } = useEnhancer()

  // article content
  const isLongArticle = computed(
    () => props.article.content.length > APP_CONFIG.article_image_share_long_threshold
  )
  const templateMarkdown = computed(() => {
    const content = props.article.content
    if (!isLongArticle.value) {
      return content
    }
    const splitIndex = getMarkdownSplitIndex(content, APP_CONFIG.article_image_share_long_threshold)
    return content.slice(0, splitIndex)
  })

  // share template states
  const shareTemplateElementRef = shallowRef<HTMLElement | null>(null)
  const shareTemplateQRCode = shallowRef<string | null>(null)

  // share image states
  const shareImageVisibility = shallowRef(false)
  const shareImageUrl = shallowRef<string | null>(null)
  const isRenderedShareImage = computed(() => Boolean(shareImageUrl.value))

  const resolveShareTemplateImages = (element: HTMLElement) => {
    return Promise.all(
      Array.from(element.querySelectorAll('img')).map((image) => {
        if (image.complete) return Promise.resolve()
        return new Promise((resolve) => {
          image.addEventListener('load', resolve)
          image.addEventListener('error', resolve)
        })
      })
    )
  }

  const resolveShareImage = async (element: HTMLElement) => {
    const htmlToImage = await import('html-to-image')
    const blob = await htmlToImage.toBlob(element, {
      quality: 1,
      skipAutoScale: true,
      skipFonts: true,
      fetchRequestInit: { mode: 'no-cors', cache: 'no-cache' },
      filter: (element) => !['IFRAME', 'VIDEO', 'AUDIO'].includes(element.tagName)
    })

    if (!blob) {
      throw new Error('Failed to generate share image')
    } else {
      return URL.createObjectURL(blob)
    }
  }

  const closeImageSharePopup = () => {
    shareImageVisibility.value = false
    shareTemplateQRCode.value = null
    shareImageUrl.value = null
  }
  const openImageSharePopup = () => {
    shareImageVisibility.value = true
    nextTick(async () => {
      if (shareTemplateElementRef.value) {
        // Generate QRcode
        shareTemplateQRCode.value = await renderTextToQRCodeDataURL(
          getPageURL(getArticleDetailRoute(props.article.id)),
          { errorCorrectionLevel: 'M' }
        )
        // Ensure all images loaded
        await resolveShareTemplateImages(shareTemplateElementRef.value)
        // Render share image from template
        shareImageUrl.value = await resolveShareImage(shareTemplateElementRef.value)
      }
    })
  }
</script>

<template>
  <div class="share-box">
    <base-share
      class="share"
      :socials="props.socials"
      :disabled-image-share="disabledImageShare"
      @share-as-image="openImageSharePopup"
    />
    <client-only>
      <popup :visible="shareImageVisibility" :body-scrollable="false" @close="closeImageSharePopup">
        <div class="share-as-image-modal" :class="{ rendered: isRenderedShareImage }">
          <div
            v-if="!isRenderedShareImage"
            ref="shareTemplateElementRef"
            class="share-template"
            :class="theme.theme.value"
          >
            <div class="content">
              <div class="header">
                <h1 class="title">{{ article.title }}</h1>
                <p class="meta-info">
                  <i18n zh="发布于 " en="Created at " />
                  <udate to="YMDm" :date="article.created_at" separator="/" />
                  <divider type="vertical" size="sm" />
                  <i18n
                    :zh="`全文共 ${numberSplit(article.content.length)} 字`"
                    :en="`${numberSplit(article.content.length)} characters`"
                  />
                </p>
                <uimage v-if="shareTemplateQRCode" class="qrcode" :src="shareTemplateQRCode" />
              </div>
              <markdown
                class="markdown"
                :markdown="templateMarkdown"
                :render-options="{
                  lazyLoadImage: false,
                  codeLineNumbers: false,
                  imageSourceGetter: getOriginalProxyURL
                }"
              />
              <div class="read-more-mask" v-if="isLongArticle"></div>
            </div>
            <div class="footer">
              <p class="tip">
                <i18n
                  zh="长按识别二维码，阅读全文，参与评论"
                  en="Long-press the QR code to read and discuss"
                />
              </p>
              <uimage v-if="shareTemplateQRCode" class="qrcode" :src="shareTemplateQRCode" />
              <uimage class="logo" src="/images/logo.svg" />
            </div>
          </div>
          <transition name="module">
            <div v-if="!isRenderedShareImage" class="share-rendering">
              <loading-indicator width="1.8rem" height="1.2rem" gap="lg" />
            </div>
          </transition>
          <div v-if="isRenderedShareImage" class="share-image">
            <img class="image" :src="shareImageUrl!" :alt="article.title" />
          </div>
        </div>
      </popup>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .share-box {
    padding: $gap-sm;
    $share-size: 2.3rem;

    .share {
      width: 100%;
      opacity: 0.8;
      display: flex;
      justify-content: space-between;
      column-gap: $gap-sm;
      &:hover {
        opacity: 1;
      }

      ::v-deep(.share-ejector) {
        flex-grow: 1;
        width: auto;
        height: $share-size;
        line-height: $share-size;
        font-size: $font-size-h4;
        border-radius: $radius-xs;
        background-color: $module-bg-darker-1;
      }
    }
  }

  .share-as-image-modal {
    position: relative;
    width: 460px;
    height: 86vh;
    background-color: $module-bg-opaque;
    &.rendered {
      overflow-y: auto;
      overscroll-behavior-y: contain;
      scrollbar-width: thin;
    }

    .share-template {
      font-family: system-ui, sans-serif;

      &.light {
        .content {
          background-color: $white;
        }
        .footer {
          background-color: $module-bg-darker-1;
        }
        .read-more-mask {
          background: linear-gradient(to bottom, transparent 10%, $module-bg 30%, $white);
        }
      }

      &.dark {
        .content {
          background-color: $black;
        }
        .footer {
          background-color: $module-bg-darker-3;
        }
        .read-more-mask {
          background: linear-gradient(to bottom, transparent, $black);
        }
      }

      .content {
        padding: $gap-lg;
        position: relative;

        .header {
          position: relative;
          margin-bottom: $gap-lg;

          .qrcode {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            border: 1px solid $module-bg-darker-1;
            border-radius: $radius-xs;
          }

          .title {
            margin-top: 0;
            margin-bottom: $gap-tiny;
            max-width: 80%;
            @include mix.text-overflow();
          }

          .meta-info {
            font-size: $font-size-h6;
            color: $color-text-secondary;
          }
        }

        .markdown {
          font-size: $font-size-h4;
        }

        .read-more-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20rem;
          z-index: $z-index-toolbox + 1;
        }
      }

      .footer {
        padding: $gap-lg 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .tip {
          font-weight: bold;
          font-size: $font-size-h4;
          margin-bottom: $gap-lg;
        }

        .qrcode {
          width: 13rem;
          border: 1px solid;
          border-radius: $radius-sm;
        }

        .logo {
          filter: $theme-logo-rotate;
          width: 9rem;
          margin-right: $gap-tiny;
          margin-top: $gap-lg;
        }
      }
    }

    .share-image {
      .image {
        width: 100%;
      }
    }

    .share-rendering {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $module-bg;
      z-index: $z-index-normal + 1;
    }
  }
</style>
