<template>
  <div ref="element" class="detail" :class="{ mobile: isMobile }">
    <transition name="module">
      <div
        v-if="!fetching"
        class="oirigin"
        :class="{
          self: isOriginal,
          other: isReprint,
          hybrid: isHybrid
        }"
      >
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_ORIGINAL" v-if="isOriginal" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_REPRINT" v-else-if="isReprint" />
        <i18n :lkey="LANGUAGE_KEYS.ORIGIN_HYBRID" v-else-if="isHybrid" />
      </div>
    </transition>
    <placeholder :loading="fetching" @after-enter="handleContentAnimateDone">
      <template #loading>
        <div class="skeleton" key="skeleton">
          <skeleton-line class="title" />
          <skeleton-paragraph class="content" :lines="9" line-height="1.2em" />
        </div>
      </template>
      <template #default>
        <div class="knowledge" key="knowledge">
          <h2 class="title">{{ article?.title }}</h2>
          <div
            class="markdown-html"
            :id="contentElementIds.default"
            v-html="content.default"
          />
          <transition
            name="module"
            mode="out-in"
            @after-enter="handleRenderMoreAnimateDone"
          >
            <div v-if="isRenderMoreEnabled" class="readmore">
              <button
                class="readmore-btn"
                :disabled="longFormRenderState.rendering"
                @click="handleRenderMore"
              >
                <i18n
                  :lkey="
                    longFormRenderState.rendering
                      ? LANGUAGE_KEYS.ARTICLE_RENDERING
                      : LANGUAGE_KEYS.ARTICLE_READ_ALL
                  "
                />
                <i class="iconfont icon-next-bottom"></i>
              </button>
            </div>
            <div
              class="markdown-html"
              :id="contentElementIds.leftover"
              v-else-if="longFormRenderState.rendered"
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
  import { useEnhancer } from '../../app/enhancer'
  import { Modules, getNamespace } from '/@/store'
  import { TagModuleGetters } from '/@/store/tag'
  import { ArticleModuleActions } from '/@/store/article'
  import { LOZAD_CLASS_NAME, LOADED_CLASS_NAME } from '/@/services/lozad'
  import ArticleListHeader from '/@/components/archive/header.vue'
  import ArticleList from '/@/components/archive/list.vue'
  import { isClient } from '../../environment'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { isOriginalType, isHybridType, isReprintType } from '/@/transforms/state'
  import { getArchiveArticleThumbnailUrl } from '/@/transforms/thumbnail'

  export default defineComponent({
    name: 'ArticleContent',
    props: {
      article: Object,
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props, context) {
      const { store, globalState, isMobile } = useEnhancer()
      const element = ref<HTMLElement>()
      const tagMap = computed(
        () => store.getters[getNamespace(Modules.Tag, TagModuleGetters.FullNameTags)]
      )
      const isHybrid = isHybridType(props.article?.origin)
      const isReprint = isReprintType(props.article?.origin)
      const isOriginal = isOriginalType(props.article?.origin)

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
        const lastReadindex = Math.max(
          lastH4Index,
          lastH3Index,
          lastCodeIndex,
          lastLineIndex
        )
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

        const parseMarkdown = (content: string) => {
          return markdownToHTML(content, {
            tagMap: tagMap.value,
            relink: true,
            html: true
          })
        }

        if (isLongFormContent.value) {
          const index = getContentSplitIndex(content)
          result.default = parseMarkdown(content.substring(0, index))
          result.leftover = parseMarkdown(content.substring(index))
        } else {
          result.default = parseMarkdown(content)
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
        const lozadElements =
          contentElement && contentElement.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (lozadElements?.length) {
          const lozadObserver = window.$lozad(lozadElements, {
            loaded: (element) => element.classList.add(LOADED_CLASS_NAME)
          })
          lozadObserver.observe()
        }
      }

      const handleContentAnimateDone = () => observeLozad(contentElementIds.default)
      const handleRenderMoreAnimateDone = () => observeLozad(contentElementIds.leftover)

      onMounted(() => {
        handleContentAnimateDone()
      })

      return {
        LANGUAGE_KEYS,
        element,
        content,
        isHybrid,
        isReprint,
        isOriginal,
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
  @import 'src/styles/init.scss';

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
        background-color: rgba($accent, 0.8);
      }
      &.other {
        background-color: rgba($red, 0.8);
      }
      &.hybrid {
        background-color: rgba($primary, 0.8);
      }
    }

    .knowledge {
      user-select: text;

      .title {
        margin: 1em 0 1.5em 0;
        text-align: center;
        font-weight: 700;
        font-size: $font-size-h2 * 0.95;
      }

      .markdown-html {
        .google-auto-placed {
          margin-bottom: $sm-gap;
        }
      }

      .readmore {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: $gap;

        .readmore-btn {
          width: 80%;
          text-align: center;
          line-height: 3rem;
          color: $text-secondary;
          background-color: $module-bg-darker-1;
          @include background-transition();
          @include radius-box($xs-radius);

          &[disabled] {
            cursor: no-drop;
          }

          &:hover {
            background-color: $primary;
            color: $text-reversal;
          }

          .iconfont {
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
