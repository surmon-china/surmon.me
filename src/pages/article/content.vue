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
            class="markdown-html"
            :id="contentElementIds.default"
            v-text="content.default"
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

    .skeleton {
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

    .oirigin {
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

    .knowledge {
      user-select: text;

      .title {
        margin: 1em 0 1.5em 0;
        text-align: center;
        font-weight: 700;
        font-size: $font-size-h2 * .95;
      }

      .markdown-html {
        .google-auto-placed {
          margin-bottom: $sm-gap;
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
