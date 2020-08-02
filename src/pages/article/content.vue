<template>
  <div
    ref="element"
    class="detail"
    :class="{ mobile: isMobile }"
  >
    <transition name="module">
      <div
        v-if="!fetching"
        class="oirigin"
        :class="{
          self: _isOriginal,
          other: _isReprint,
          hybrid: _isHybrid
        }"
      >
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_ORIGINAL" v-if="_isOriginal" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_REPRINT" v-else-if="_isReprint" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_HYBRID" v-else-if="_isHybrid" />
      </div>
    </transition>
    <placeholder
      :loading="fetching"
      @after-enter="handleContentAnimateDone"
    >
      <template #loading>
        <div class="skeleton">
          <skeleton-line class="title" />
          <skeleton-paragraph
            class="content"
            :lines="9"
            line-height="1.2em"
          />
        </div>
      </template>
      <template #default>
        <div class="knowledge">
          <h2 class="title">{{ article.title }}</h2>
          <div
            class="content"
            :id="contentElementIds.default"
            v-html="content.default"
          />
          <transition
            name="module"
            mode="out-in"
            @after-enter="handleRenderMoreAnimateDone"
          >
            <div v-if="isRenderMoreEnabled" key="readmore-btn" class="readmore">
              <button
                class="readmore-btn"
                :disabled="longFormRenderState.rendering"
                @click="handleRenderMore"
              >
                <i18n
                  :lkey="longFormRenderState.rendering
                    ? LANGUAGE_KEYS.ARTICLE_RENDERING
                    : LANGUAGE_KEYS.ARTICLE_READ_ALL"
                />
                <i class="iconfont icon-next-bottom"></i>
              </button>
            </div>
            <div
              v-else-if="longFormRenderState.rendered"
              key="more-content"
              class="content"
              :id="contentElementIds.leftover"
              v-html="content.leftover"
            />
          </transition>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, nextTick, onMounted } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'
  import { isClient } from '/@/vuniversal/env'
  import marked from '/@/services/marked'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { isOriginal, isHybrid, isReprint } from '/@/transforms/state'
  import { getArchiveArticleThumbnailUrl } from '/@/transforms/thumbnail'

  export default defineComponent({
    name: 'ArticleContent',
    props: {
      article: {
        type: Object,
        required: true
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props, context) {
      const { store, globalState, isMobile } = useEnhancer()
      const element = ref<HTMLElement>()
      const tags = computed(() => store.state.tag.data)
      const _isHybrid = isHybrid(props.article?.origin)
      const _isReprint = isReprint(props.article?.origin)
      const _isOriginal = !props.article?.origin || isOriginal(props.article.origin)

      const longFormRenderState = reactive({
        rendering: false,
        rendered: false
      })

      const isLongFormContent = computed(() => {
        return props.article?.content.length > 13688
      })
      const isRenderMoreEnabled = computed(() => {
        return isLongFormContent.value && !longFormRenderState.rendered
      })

      const getContentSplitIndex = (content: string) => {
        // 坐标优先级：H4 -> H3 -> Code -> \n\n
        const shortContent = content.substring(0, 11688)
        const lastH4Index = shortContent.lastIndexOf('\n####')
        const lastH3Index = shortContent.lastIndexOf('\n###')
        const lastCodeIndex = shortContent.lastIndexOf('\n\n```')
        const lastLineIndex = shortContent.lastIndexOf('\n\n**')
        const lastReadindex = Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex)
        return lastReadindex
      }

      // article content
      const content = computed(() => {
        const content = props.article?.content
        const result = {
          default: '',
          leftover: ''
        }

        if (!content) {
          return result
        }

        // TODO: markdown
        // return marked(
        //   isLongFormContent.value
        //     // 渲染截断部分前半段
        //     ? content.substring(0, getContentSplitIndex(content))
        //     // 正常长度，正常渲染
        //     : content,
        //   tags.value,
        //   true
        // )

        if (isLongFormContent.value) {
          const index = getContentSplitIndex(content)
          result.default = content.substring(0, index)
          result.leftover = content.substring(index)
        } else {
          result.default = content
          result.leftover = ''
        }

        return result
      })

      const handleRenderMore = () => {
        longFormRenderState.rendering = true
        nextTick(() => {
          setTimeout(() => {
            longFormRenderState.rendered = true
            longFormRenderState.rendering = false
          }, 0)
        })
      }

      const contentElementIds = {
        default: 'article-content',
        leftover: 'more-article-content'
      }

      const observeLozad = (elementId: string) => {
        const contentElement = element.value?.querySelector(`#${elementId}`)
        const lozadElements = contentElement && contentElement.querySelectorAll('.lozad')
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        // console.log('计算出的文档:', this.$refs.detail, contentElement, lozadElements)
        const lozadObserver = window.lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        lozadObserver.observe()
        // console.log('重新监听 observer', lozadObserver)
      }

      const handleContentAnimateDone = () => {
        // console.log('handleContentAnimateDone')
        observeLozad(contentElementIds.default)
      }
      const handleRenderMoreAnimateDone = () => {
        // console.log('handleRenderMoreAnimateDone')
        observeLozad(contentElementIds.leftover)
      }
      onMounted(() => {
        observeLozad(contentElementIds.default)
      })

      return {
        LANGUAGE_KEYS,
        element,
        content,
        _isHybrid,
        _isReprint,
        _isOriginal,
        isMobile,
        isLongFormContent,
        isRenderMoreEnabled,
        longFormRenderState,
        contentElementIds,
        handleRenderMore,
        handleContentAnimateDone,
        handleRenderMoreAnimateDone
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .detail {
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    height: auto;
    transition: height $transition-time-normal;

    > .skeleton {
      .title {
        width: 60%;
        height: 26px;
        margin: 2rem auto;
      }

      .content {
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
    }

    > .oirigin {
      position: absolute;
      top: -11px;
      left: -29px;
      transform: rotate(-45deg);
      width: 7rem;
      height: 4rem;
      line-height: 5.8rem;
      text-align: center;
      text-transform: uppercase;
      transform-origin: center;
      color: $text-reversal;
      font-weight: bold;
      font-size: $font-size-small;
      user-select: none;

      &.self {
        background-color: rgba($accent, .8);
      }
      &.other {
        background-color: rgba($red, .8);
      }
      &.hybrid {
        background-color: rgba($primary, .8);
      }
    }

    > .knowledge {

      > .title {
        margin: 1em 0 1.5em 0;
        text-align: center;
        font-weight: 700;
        font-size: $font-size-h2 * .95;
      }

      > .content {

        > .google-auto-placed {
          margin-bottom: $sm-gap;
        }

        iframe {
          width: 100%;
          margin-bottom: 1em;
          background-color: $theme-black;
        }

        a {
          font-weight: bold;
          margin: 0 .1em;

          &.image-link {
            margin: 0;
          }

          &:hover {
            text-decoration: underline;
          }
        }

        img {
          max-width: 100%;
          position: relative;
          margin: 0 auto;
          display: block;
          text-align: center;
          border-radius: $xs-radius;
          border: $sm-gap solid $module-bg-hover;
          opacity: .9;
          cursor: pointer;

          &:hover {
            opacity: 1;
            transition: all $transition-time-normal;
          }
        }

        p {
          line-height: 2.2em;
          text-indent: 2em;
          margin-bottom: 1em;

          &.text-center {
            text-align: center;
          }

          &.text-right {
            text-align: right;
          }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }

        blockquote {
          p {
            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        ul {
          list-style-type: square;
        }

        ul, ol {
          > li {
            line-height: 1.8em;
            padding: .5em .8em;

            &:hover {
              background-color: $module-bg-hover;
            }

            > p {
              text-indent: 0;
            }

            > ul {
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        code {
          color: #bd4147;
          padding: .3em .5em;
          margin: 0 .5em;
          border-radius: $xs-radius;
          background-color: $module-bg-hover;
        }

        pre {
          $code-header-height: 2.8rem;
          $code-number-width: 3rem;
          $code-row-line-height: 1.8rem;
          $code-font-size: $font-size-h6;
          display: block;
          position: relative;
          overflow: hidden;
          margin-bottom: 1em;
          padding-left: $code-number-width;
          font-size: $code-font-size;
          background-color: rgba($black, 0.8);

          &:before {
            color: $white;
            content: attr(data-lang)" CODE";
            height: $code-header-height;
            line-height: $code-header-height;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-weight: 700;
            background-color: rgba(68, 68, 68, 0.9);
            display: block;
            text-transform: uppercase;
            text-align: center;
          }

          > .code-lines {
            position: absolute;
            left: 0;
            top: $code-header-height;
            margin: 0;
            padding: 1rem 0;
            width: $code-number-width;
            height: calc(100% - #{$code-header-height});
            text-align: center;
            background-color: rgba($black, 0.2);

            > .code-line-number {
              padding: 0;
              position: relative;
              list-style-type: none;
              line-height: $code-row-line-height;
              font-size: $font-size-small;
              user-select: none;
              transition: none;

              &:hover {
                &:before {
                  @include visible();
                }
              }

              &:before {
                content: '';
                position: absolute;
                top: 0;
                left: $code-number-width;
                width: 66em;
                height: 100%;
                background-color: rgba(154, 154, 154, 0.2);
                @include hidden();
              }
            }
          }

          > code {
            margin: 0;
            padding: 1rem;
            float: left;
            width: 100%;
            height: 100%;
            display: block;
            line-height: $code-row-line-height;
            color: rgba($white, 0.87);
            background-color: transparent;
          }
        }
      }

      @keyframes readmorebtn {
        0% {
          transform: translate3d(0, 0, 0);
          background-color: $module-bg-hover;
        }
        25% {
          transform: translate3d(0, $sm-gap, 0);
          background-color: $primary;
          color: $white;
        }
        50% {
          transform: translate3d(0, 0, 0);
          background-color: $module-bg-hover;
        }
        75% {
          transform: translate3d(0, $sm-gap, 0);
          background-color: $primary;
          color: $white;
        }
        100% {
          transform: translate3d(0, 0, 0);
          background-color: $module-bg-hover;
        }
      }

      > .readmore {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: $gap;

        > .readmore-btn {
          width: 80%;
          text-align: center;
          height: 3rem;
          line-height: 3rem;
          background-color: $module-bg-hover;
          animation: readmorebtn 4s linear infinite;

          &[disabled] {
            cursor: no-drop;
          }

          &:hover {
            background-color: $primary !important;
            color: $white !important;
          }

          > .iconfont {
            margin-left: $sm-gap;
          }
        }
      }
    }

    &.mobile {
      padding: $gap $lg-gap;

      > .oirigin {
        font-size: $font-size-base;
      }

      > .knowledge {
        > .content {
          pre {
            padding-left: 0;

            > .code-lines {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
