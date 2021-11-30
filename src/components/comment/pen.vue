<template>
  <div class="pen">
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
          <i class="iconfont icon-link-horizontal" />
        </button>
        <button
          class="code"
          title="code"
          :disabled="disabled || preview"
          @click.prevent="insertCode"
        >
          <i class="iconfont icon-code-comment" />
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
      </div>
      <button type="submit" class="submit" :disabled="disabled" @click="handleSubmit">
        <i18n
          :lkey="
            posting ? LANGUAGE_KEYS.COMMENT_POST_SUBMITTING : LANGUAGE_KEYS.COMMENT_POST_SUBMIT
          "
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { isClient } from '/@/app/environment'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { insertContent } from '/@/utils/editable'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { CommentEvent, EMOJIS } from './helper'

  export enum PenEvents {
    Update = 'update:modelValue',
    InputReady = 'input-ready'
  }

  export default defineComponent({
    name: 'CommentPen',
    props: {
      modelValue: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        required: true
      },
      posting: {
        type: Boolean,
        required: true
      },
      preview: {
        type: Boolean,
        required: true
      }
    },
    emits: [
      PenEvents.Update,
      PenEvents.InputReady,
      CommentEvent.TogglePreview,
      CommentEvent.Submit
    ],
    setup(props, context) {
      const { i18n } = useEnhancer()
      const content = ref(props.modelValue)
      const inputElement = ref<HTMLElement>()
      let inputElementObserver: MutationObserver | null = null
      const previewContent = computed(() => {
        return props.preview ? markdownToHTML(content.value) : null
      })

      const handleTogglePreview = () => {
        context.emit(CommentEvent.TogglePreview)
      }

      const handleValueChange = (value: string) => {
        if (value !== content.value) {
          content.value = value
          if (inputElement.value) {
            inputElement.value.innerText = value
          }
        }
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
        context.emit(CommentEvent.Submit, content.value)
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

      watch(() => props.modelValue, handleValueChange)
      onMounted(() => {
        context.emit(PenEvents.InputReady, inputElement.value)
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
        EMOJIS,
        LANGUAGE_KEYS,
        inputElement,
        previewContent,
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
        background-color: $body-bg;
      }
    }

    .pencilbox {
      $size: $font-size-base * 2;
      height: $size;
      line-height: $size;
      display: flex;
      justify-content: space-between;
      background-color: $module-bg-darker-3;

      .stationery {
        .emoji,
        .image,
        .link,
        .code,
        .preview {
          width: $size;
          height: $size;
          text-align: center;
          display: block;
          float: left;
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
              display: flex;
              flex-wrap: wrap;

              .item {
                padding: 0 0.4em;
                cursor: pointer;
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
        width: 8rem;
        height: $size;
        background-color: $module-bg-darker-4;
        @include background-transition();

        &:hover {
          background-color: $module-bg-darker-5;
        }
      }
    }
  }
</style>
