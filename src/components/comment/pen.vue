<template>
  <div class="pen">
    <div class="markdown">
      <div
        ref="inputElement"
        class="markdown-input"
        :contenteditable="!disabled"
        :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_PLACEHOLDER)"
        @keyup="handleInputChange"
      />
      <transition name="module">
        <div
          class="markdown-preview"
          v-if="preview"
          v-html="previewContent"
        />
      </transition>
    </div>
    <div class="pencilbox">
      <div class="stationery" :class="{ disabled }">
        <span class="emoji" title="emoji">
          <i class="iconfont icon-emoji" />
          <div class="emoji-box">
            <ul class="emoji-list">
              <li
                v-for="(emoji, index) in ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻']"
                :key="index"
                class="item"
                @click="insertEmoji(emoji)"
                v-text="emoji"
              />
            </ul>
          </div>
        </span>
        <a href class="image" title="image" @click.stop.prevent="insertImage">
          <i class="iconfont icon-image" />
        </a>
        <a href class="link" title="link" @click.stop.prevent="insertLink">
          <i class="iconfont icon-link-horizontal" />
        </a>
        <a href class="code" title="code" @click.stop.prevent="insertCode">
          <i class="iconfont icon-code-comment" />
        </a>
        <a href class="preview" title="preview" @click.stop.prevent="handleTogglePreview">
          <i class="iconfont icon-eye" />
        </a>
      </div>
      <button
        type="submit"
        class="submit"
        :disabled="disabled"
        @click="handleSubmit"
        v-i18n="posting ? LANGUAGE_KEYS.COMMENT_POST_SUBMITTING : LANGUAGE_KEYS.COMMENT_POST_SUBMIT"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { isClient } from '/@/vuniversal/env'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { focusPosition, insertContent } from '/@/utils/editable'
  import marked from '/@/services/marked'
  import { CommentEvent } from './helper'

  export default defineComponent({
    name: 'CommentPen',
    props: {
      value: {
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
    setup(props, context) {
      const { i18n } = useEnhancer()
      const content = ref('')
      const inputElement = ref<HTMLElement>()
      const previewContent = computed(() => {
        return props.preview
          ? marked(content.value)
          : null
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
          context.emit('input', text)
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

      watch(() => props.value, handleValueChange)

      return {
        t: i18n.t,
        LANGUAGE_KEYS,
        inputElement,
        previewContent,
        handleInputChange,
        handleSubmit
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .pen {
    position: relative;

    .markdown {
      position: relative;
      overflow: hidden;

      > .markdown-input {
        min-height: 6em;
        max-height: 36em;
        overflow: auto;
        outline: none;
        padding: .5em;
        cursor: auto;
        font-size: $font-size-h6;
        line-height: 1.8em;
        background-color: $module-hover-bg;
        @include background-transition();

        &:empty:before {
          content: attr(placeholder);
          color: $text-disabled;
        }

        &:focus {
          content:none;
        }

        &:hover {
          background-color: $module-hover-bg-darken-10;
        }
      }

      > .markdown-preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        margin: 0;
        padding: .5em;
        background-color: $body-bg;
      }
    }

    .pencilbox {
      $size: $font-size-base * 2;
      height: $size;
      line-height: $size;
      display: flex;
      justify-content: space-between;
      background-color: $module-hover-bg-opacity-9;

      .stationery {
        &.disabled {
          opacity: .7;
          pointer-events: none;
        }

        > .emoji,
        > .image,
        > .link,
        > .code,
        > .preview {
          width: $size;
          height: $size;
          text-align: center;
          display: inline-block;
          @include background-transition();

          &:hover {
            background-color: $module-hover-bg-darken-20;
          }
        }

        > .emoji {
          .emoji-box {
            display: none;
            position: absolute;
            bottom: $size;
            left: 0;
            top: 0;
            width: 100%;
            overflow-y: auto;
            background-color: $module-bg;

            > .emoji-list {
              list-style: none;
              padding: 0;
              margin: 0;
              font-size: $font-size-h3;
              display: flex;
              flex-wrap: wrap;

              > .item {
                padding: 0 .4em;
                cursor: pointer;
                @include background-transition();

                &:hover {
                  background-color: $module-hover-bg;
                }
              }
            }
          }

          &:hover {
            > .emoji-box {
              display: block;
            }
          }
        }
      }

      > .submit {
        width: 8rem;
        height: $size;
        background-color: $module-hover-bg-darken-20;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg-darken-40;
        }
      }
    }
  }
</style>
