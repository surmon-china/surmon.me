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
          class="markdown-preview markdown-content comment"
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
                v-for="(emoji, index) in EMOJIS"
                :key="index"
                class="item"
                @click="insertEmoji(emoji)"
              >{{ emoji }}</li>
            </ul>
          </div>
        </span>
        <button
          class="image"
          title="image"
          @click.prevent="insertImage"
        >
          <i class="iconfont icon-image" />
        </button>
        <button
          class="link"
          title="link"
          @click.prevent="insertLink"
        >
          <i class="iconfont icon-link-horizontal" />
        </button>
        <button
          class="code"
          title="code"
          @click.prevent="insertCode"
        >
          <i class="iconfont icon-code-comment" />
        </button>
        <button
          class="preview"
          title="preview"
          :class="{ actived: preview }"
          @click.prevent="handleTogglePreview"
        >
          <i class="iconfont icon-eye" />
        </button>
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
  import { CommentEvent, EMOJIS } from './helper'

  export enum Events {
    Update = 'update:modelValue'
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
      Events.Update,
      CommentEvent.TogglePreview,
      CommentEvent.Submit
    ],
    setup(props, context) {
      const { i18n } = useEnhancer()
      const content = ref(props.modelValue)
      const inputElement = ref<HTMLElement>()
      const previewContent = computed(() => {
        return props.preview
          ? content.value
          // ? marked(content.value)
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
          context.emit(Events.Update, text)
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
  @import 'src/assets/styles/init.scss';

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
        padding: .5em;
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
          content:none;
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
      background-color: $module-bg-darker-3;

      .stationery {
        &.disabled {
          opacity: .7;
          pointer-events: none;
        }

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

          &.actived,
          &:hover {
            background-color: $module-bg-darker-4;
          }
        }

        .emoji {
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
                padding: 0 .4em;
                cursor: pointer;
                @include background-transition();

                &:hover {
                  background-color: $module-bg-hover;
                }
              }
            }
          }

          &:hover {
            .emoji-box {
              display: block;
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
