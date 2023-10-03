<script lang="ts" setup>
  import { shallowRef, computed, nextTick, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useStores } from '/@/stores'
  import { DEFAULT_DELAY, IMAGE_SHARE_LONG_ARTICLE_THRESHOLD } from '/@/config/app.config'
  import { Article } from '/@/interfaces/article'
  import { numberSplit } from '/@/transforms/text'
  import { getMarkdownSplitIndex } from '/@/transforms/markdown'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import { getOriginalProxyURL, getPageURL } from '/@/transforms/url'
  import { renderTextToQRCodeDataURL } from '/@/transforms/qrcode'
  import BaseShare, { SocialMedia } from '/@/components/widget/share.vue'
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
  const { articleDetail } = useStores()

  // article content
  const isLongArticle = computed(() => props.article.content.length > IMAGE_SHARE_LONG_ARTICLE_THRESHOLD)
  const templateMarkdown = computed(() => {
    const content = props.article.content
    if (!isLongArticle.value) {
      return content
    }
    const splitIndex = getMarkdownSplitIndex(content, IMAGE_SHARE_LONG_ARTICLE_THRESHOLD)
    return content.slice(0, splitIndex)
  })

  // share template states
  const shareTemplateElementRef = shallowRef<HTMLElement | null>(null)
  const shareTemplateQRCode = shallowRef<string | null>(null)

  // share image states
  const shareImageVisibility = shallowRef(false)
  const shareImageUrl = shallowRef<string | null>(null)
  const isRenderedShareImage = computed(() => Boolean(shareImageUrl.value))

  const renderShareTemplate = async (element: HTMLElement) => {
    // generate qrcode
    const url = getPageURL(getArticleDetailRoute(props.article.id))
    shareTemplateQRCode.value = await renderTextToQRCodeDataURL(url, { errorCorrectionLevel: 'M' })
    // ensure all images loaded
    const images = element.querySelectorAll('img')
    await Promise.all(
      Array.from(images).map((image) => {
        return new Promise((resolve) => {
          image.addEventListener('load', resolve)
          image.addEventListener('error', resolve)
        })
      })
    )
    // wait for browser render
    await new Promise((resolve) => setTimeout(resolve, DEFAULT_DELAY))
  }

  const renderShareImage = async (element: HTMLElement) => {
    const htmlToImage = await import('html-to-image')
    const blob = await htmlToImage.toBlob(element, {
      quality: 1,
      skipAutoScale: true,
      cacheBust: true,
      fetchRequestInit: { mode: 'no-cors', cache: 'no-cache' },
      filter: (element) => !['IFRAME', 'VIDEO', 'AUDIO'].includes(element.tagName)
    })

    if (!blob) {
      throw new Error('Failed to generate share image')
    } else {
      shareImageUrl.value = URL.createObjectURL(blob)
    }
  }

  const closeImageSharePopop = () => {
    shareImageVisibility.value = false
    shareTemplateQRCode.value = null
    shareImageUrl.value = null
  }
  const openImageSharePopop = () => {
    shareImageVisibility.value = true
    nextTick(async () => {
      if (shareTemplateElementRef.value) {
        await renderShareTemplate(shareTemplateElementRef.value)
        await renderShareImage(shareTemplateElementRef.value)
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
      @share-as-image="openImageSharePopop"
    />
    <popup :visible="shareImageVisibility" :scroll-close="false" @close="closeImageSharePopop">
      <div class="share-as-image-modal" :class="{ rendered: isRenderedShareImage }">
        <div
          v-if="!isRenderedShareImage"
          ref="shareTemplateElementRef"
          class="share-template"
          :class="theme.theme.value"
        >
          <div class="content">
            <div class="header">
              <h1 class="title">{{ props.article.title }}</h1>
              <p class="meta-info">
                <udate to="YMDm" :date="article.created_at" separator="/" />
                <divider type="vertical" size="sm" />
                <i18n
                  :zh="`共 ${numberSplit(articleDetail.contentLength)} 字，需阅读 ${
                    articleDetail.readMinutes
                  } 分钟`"
                  :en="`${numberSplit(articleDetail.contentLength)} characters, ${
                    articleDetail.readMinutes
                  } min read`"
                />
              </p>
              <uimage v-if="shareTemplateQRCode" class="qrcode" :src="shareTemplateQRCode" />
            </div>
            <markdown
              class="markdown"
              :markdown="templateMarkdown"
              :render-options="{ lazyLoadImage: false, imageSourceGetter: getOriginalProxyURL }"
            />
            <div class="readmore-mask" v-if="isLongArticle"></div>
          </div>
          <div class="footer">
            <p class="tip">
              <i18n zh="长按识别二维码，阅读全文，参与评论" en="Long-press the QR code to read and discuss" />
            </p>
            <uimage v-if="shareTemplateQRCode" class="qrcode" :src="shareTemplateQRCode" />
            <uimage class="logo" src="/images/logo.svg" />
          </div>
        </div>
        <transition name="module">
          <div v-if="!isRenderedShareImage" class="share-rendering">
            <indicator width="1.8rem" height="1.2rem" />
          </div>
        </transition>
        <div v-if="isRenderedShareImage" class="share-image">
          <img class="image" :src="shareImageUrl!" :alt="props.article.title" />
        </div>
      </div>
    </popup>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .share-box {
    padding: $gap;
    $share-size: 3rem;

    .share {
      width: 100%;
      opacity: 0.8;
      display: flex;
      justify-content: space-between;
      &:hover {
        opacity: 1;
      }

      ::v-deep(.share-ejector) {
        flex-grow: 1;
        width: auto;
        height: $share-size;
        line-height: $share-size;
        margin-right: $gap;
        font-size: $font-size-h4;
        border-radius: $xs-radius;
        background-color: $module-bg-darker-1;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .share-as-image-modal {
    position: relative;
    width: 460px;
    &.rendered {
      overflow-y: auto !important;
    }

    .share-template {
      &.light {
        .content {
          background-color: $white;
        }
        .footer {
          background-color: $module-bg-darker-1;
        }
        .readmore-mask {
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
        .readmore-mask {
          background: linear-gradient(to bottom, transparent, $black);
        }
      }

      .content {
        padding: $gap * 2;
        position: relative;

        .header {
          position: relative;
          margin-bottom: $gap * 2;

          .qrcode {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            border: 1px solid $module-bg-darker-1;
            border-radius: $xs-radius;
          }

          .title {
            margin-top: 0;
            margin-bottom: $sm-gap;
            max-width: 80%;
            @include text-overflow();
          }

          .meta-info {
            font-size: $font-size-h6;
            color: $text-secondary;
          }
        }

        .markdown {
          font-size: $font-size-h4;
        }

        .readmore-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20rem;
          z-index: $z-index-toolbox + 1;
        }
      }

      .footer {
        padding: $gap * 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .tip {
          font-weight: bold;
          font-size: $font-size-h4;
          margin-bottom: $gap * 2;
        }

        .qrcode {
          width: 42%;
          border: 1px solid;
          border-radius: $lg-radius;
        }

        .logo {
          margin-top: $gap * 2;
          width: 30%;
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
