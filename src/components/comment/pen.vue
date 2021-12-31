<template>
  <div class="pen" :class="{ bordered }">
    <div class="markdown">
      <div
        ref="inputElement"
        class="markdown-input"
        :contenteditable="!disabled"
        :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_PLACEHOLDER)"
      />
      <transition name="list-fade">
        <div
          class="markdown-preview markdown-html comment"
          v-if="preview"
          v-html="previewContent"
        />
      </transition>
    </div>
    <div class="pencilbox">
      <div class="stationery">
        <ulink class="markdown" title="markdown" :href="VALUABLE_LINKS.MARKDOWN">
          <i class="iconfont icon-markdown" />
        </ulink>
        <template v-if="!hiddenStationery">
          <button class="emoji" title="emoji" type="button" :disabled="disabled || preview">
            <i class="iconfont icon-emoji" />
            <div class="emoji-box">
              <ul class="emoji-list">
                <li
                  v-for="(emoji, index) in EMOJIS"
                  v-once
                  :key="index"
                  class="item"
                  @click="insertEmoji(emoji)"
                >
                  {{ emoji }}
                </li>
              </ul>
            </div>
          </button>
          <button
            class="image"
            title="image"
            :disabled="disabled || preview"
            @click.prevent="insertImage"
          >
            <i class="iconfont icon-image" />
          </button>
          <button
            class="link"
            title="link"
            :disabled="disabled || preview"
            @click.prevent="insertLink"
          >
            <i class="iconfont icon-link" />
          </button>
          <button
            class="code"
            title="code"
            :disabled="disabled || preview"
            @click.prevent="insertCode"
          >
            <i class="iconfont icon-code" />
          </button>
          <button
            class="preview"
            title="preview"
            :class="{ actived: preview }"
            :disabled="disabled"
            @click.prevent="handleTogglePreview"
          >
            <i class="iconfont" :class="preview ? 'icon-eye-close' : 'icon-eye'" />
          </button>
        </template>
      </div>
      <button type="submit" class="submit" :disabled="disabled" @click="handleSubmit">
        <i18n zh="发布中..." en="Posting..." v-if="posting" />
        <i18n v-else-if="user.type === UserType.Local">
          <template #zh>以 {{ user.localProfile?.name }} 的身份发布</template>
          <template #en>Post as {{ user.localProfile?.name }}</template>
        </i18n>
        <i18n v-else-if="user.type === UserType.Disqus">
          <template #zh>以 {{ user.disqusProfile?.name }} 的身份发布</template>
          <template #en>Post as {{ user.disqusProfile?.name }}</template>
        </i18n>
        <i18n zh="发布" en="Publish" v-else />
        <i class="iconfont icon-mail-plane"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useUniversalStore, UserType } from '/@/store/universal'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { insertContent } from '/@/utils/editable'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { focusPosition } from '/@/utils/editable'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { CommentEvents, EMOJIS } from './helper'

  export enum PenEvents {
    Update = 'update:modelValue',
    UpdatePreview = 'update:preview'
  }

  export default defineComponent({
    name: 'CommentPen',
    props: {
      modelValue: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      preview: {
        type: Boolean,
        default: false
      },
      posting: {
        type: Boolean,
        required: true
      },
      bordered: {
        type: Boolean,
        required: false
      },
      autoFocus: {
        type: Boolean,
        default: false
      },
      hiddenStationery: {
        type: Boolean,
        default: false
      }
    },
    emits: [PenEvents.Update, PenEvents.UpdatePreview, CommentEvents.Submit],
    setup(props, context) {
      const { i18n } = useEnhancer()
      const universalStore = useUniversalStore()
      const content = ref(props.modelValue || '')
      const preview = ref(props.preview || false)
      const inputElement = ref<HTMLElement>()
      let inputElementObserver: MutationObserver | null = null
      const previewContent = computed(() => {
        return props.preview ? markdownToHTML(content.value, { sanitize: true }) : null
      })
      const handleTogglePreview = () => {
        preview.value = !preview.value
        context.emit(PenEvents.UpdatePreview, preview.value)
      }
      const handleInputChange = () => {
        const text = inputElement.value?.innerText as string
        if (text !== content.value) {
          content.value = text
          context.emit(PenEvents.Update, text)
        }
      }
      const handleSubmit = (event) => {
        event.preventDefault()
        context.emit(CommentEvents.Submit, content.value)
      }
      const insertContentToInput = (before: string, after = '') => {
        insertContent({
          element: inputElement.value,
          content: [before, after]
        })
        handleInputChange()
      }
      const insertEmoji = (emoji: any) => {
        insertContentToInput(` ${emoji} `)
      }
      const insertImage = () => {
        insertContentToInput(` ![`, `](https://) `)
      }
      const insertLink = () => {
        insertContentToInput(` [`, `](https://) `)
      }
      const insertCode = () => {
        insertContentToInput('\n```javascript\n', '\n```\n')
      }
      watch(
        () => props.modelValue,
        (value = '') => {
          if (value !== content.value) {
            content.value = value
            if (inputElement.value) {
              inputElement.value.innerText = value
            }
          }
        }
      )
      watch(
        () => props.preview,
        (_preview) => {
          if (_preview !== preview.value) {
            preview.value = _preview
          }
        }
      )
      onMounted(() => {
        // auto focus
        if (props.autoFocus) {
          nextTick().then(() => {
            if (inputElement.value) {
              focusPosition(inputElement.value)
            }
          })
        }
        // watch element
        inputElementObserver = new MutationObserver((mutations) => {
          handleInputChange()
        })
        inputElementObserver.observe(inputElement.value!, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true
        })
      })
      onBeforeUnmount(() => {
        inputElementObserver?.disconnect()
      })
      return {
        t: i18n.t,
        user: universalStore.user,
        UserType,
        EMOJIS,
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        inputElement,
        previewContent,
        preview,
        insertEmoji,
        insertImage,
        insertLink,
        insertCode,
        handleInputChange,
        handleTogglePreview,
        handleSubmit
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .pen {
    position: relative;
    @include radius-box($xs-radius);
    &.bordered {
      border: 1px solid $module-bg-darker-3;
      .pencilbox {
        border-top: 1px solid $module-bg-darker-3;
      }
    }

    .markdown {
      position: relative;
      overflow: hidden;

      .markdown-input {
        min-height: 6em;
        max-height: 36em;
        overflow: auto;
        outline: none;
        padding: 0.5em;
        cursor: auto;
        font-size: $font-size-h6;
        line-height: 1.8em;
        background-color: $module-bg-darker-1;
        @include background-transition();

        &:empty:before {
          content: attr(placeholder);
          color: $text-disabled;
        }
        &:focus {
          content: none;
        }
        &:hover {
          background-color: $module-bg-hover;
        }
      }

      .markdown-preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        margin: 0;
        padding: 0.5em;
        background-color: $module-bg-darker-1;
      }
    }

    .pencilbox {
      $size: 30px;
      height: $size;
      line-height: $size;
      display: flex;
      justify-content: space-between;
      background-color: $module-bg-darker-2;

      .stationery {
        display: flex;

        .emoji,
        .image,
        .link,
        .code,
        .preview {
          width: $size;
          height: $size;
          text-align: center;
          display: block;
          @include background-transition();

          &[disabled] {
            opacity: 0.7;
          }

          &:not([disabled]) {
            &.actived,
            &:hover {
              background-color: $module-bg-darker-4;
            }
          }
        }

        .markdown {
          width: 4rem;
          text-align: center;
          background-color: $module-bg-darker-3;
        }

        .emoji {
          &:not([disabled]):hover {
            .emoji-box {
              display: block;
            }
          }

          .emoji-box {
            display: none;
            position: absolute;
            bottom: $size;
            left: 0;
            top: 0;
            width: 100%;
            overflow-y: auto;
            background-color: $module-bg;

            .emoji-list {
              list-style: none;
              padding: 0;
              margin: 0;
              font-size: $font-size-h3;
              display: grid;
              grid-template-columns: repeat(auto-fill, 45px);

              .item {
                cursor: pointer;
                padding: $xs-gap 0;
                font-size: $font-size-h2;
                border-radius: $sm-radius;
                @include background-transition();
                &:hover {
                  background-color: $module-bg-hover;
                }
              }
            }
          }
        }
      }

      .submit {
        min-width: 8rem;
        height: $size;
        padding: 0 $gap;
        font-weight: bold;
        font-size: $font-size-small;
        color: $text-disabled;
        background-color: $module-bg-darker-3;
        @include background-transition();
        &:hover {
          color: $text-secondary;
          background-color: $module-bg-darker-4;
        }

        .iconfont {
          margin-left: $sm-gap;
        }
      }
    }
  }
</style>
