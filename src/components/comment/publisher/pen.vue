<template>
  <div class="pen" :class="{ bordered }">
    <div class="markdown">
      <div
        ref="inputElement"
        class="markdown-input"
        :contenteditable="!disabled"
        :placeholder="t(LanguageKey.COMMENT_POST_PLACEHOLDER)"
        @focus="disableCopyrighter"
        @blur="enableCopyrighter"
      />
      <transition name="list-fade">
        <div class="preview-content" v-if="isPreviewed">
          <markdown :markdown="content" :sanitize="true" :compact="true" />
        </div>
      </transition>
    </div>
    <div class="pencilbox">
      <div class="stationery">
        <ulink class="markdown" title="markdown" :href="VALUABLE_LINKS.MARKDOWN">
          <i class="iconfont icon-markdown" />
        </ulink>
        <template v-if="!hiddenStationery">
          <button class="emoji" title="emoji" type="button" :disabled="disabled || isPreviewed">
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
            :disabled="disabled || isPreviewed"
            @click.prevent="insertImage"
          >
            <i class="iconfont icon-image" />
          </button>
          <button
            class="link"
            title="link"
            :disabled="disabled || isPreviewed"
            @click.prevent="insertLink"
          >
            <i class="iconfont icon-link" />
          </button>
          <button
            class="code"
            title="code"
            :disabled="disabled || isPreviewed"
            @click.prevent="insertCode"
          >
            <i class="iconfont icon-code" />
          </button>
          <button
            class="preview"
            title="preview"
            :class="{ actived: isPreviewed }"
            :disabled="disabled"
            @click.prevent="handleTogglePreview"
          >
            <i class="iconfont" :class="isPreviewed ? 'icon-eye-close' : 'icon-eye'" />
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
  import { defineComponent, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { storeToRefs } from 'pinia'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { useIdentityStore, UserType } from '/@/stores/identity'
  import { enableCopyrighter, disableCopyrighter } from '/@/effects/copyright'
  import { focusPosition } from '/@/utils/editable'
  import { insertContent } from '/@/utils/editable'
  import { CommentEvents, EMOJIS } from '../helper'
  import Markdown from '/@/components/common/markdown.vue'

  export enum PenEvents {
    Update = 'update:modelValue',
    UpdatePreviewed = 'update:previewed'
  }

  export default defineComponent({
    name: 'CommentPen',
    components: {
      Markdown
    },
    props: {
      modelValue: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      previewed: {
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
    emits: [PenEvents.Update, PenEvents.UpdatePreviewed, CommentEvents.Submit],
    setup(props, context) {
      const { i18n } = useEnhancer()
      const { user } = storeToRefs(useIdentityStore())
      const content = ref(props.modelValue || '')
      const isPreviewed = ref(props.previewed || false)
      const inputElement = ref<HTMLElement>()
      let inputElementObserver: MutationObserver | null = null

      const handleTogglePreview = () => {
        isPreviewed.value = !isPreviewed.value
        context.emit(PenEvents.UpdatePreviewed, isPreviewed.value)
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
        () => props.previewed,
        (_preview) => {
          if (_preview !== isPreviewed.value) {
            isPreviewed.value = _preview
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
        inputElementObserver = new MutationObserver(() => handleInputChange())
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
        user,
        UserType,
        EMOJIS,
        VALUABLE_LINKS,
        LanguageKey,
        inputElement,
        content,
        isPreviewed,
        insertEmoji,
        insertImage,
        insertLink,
        insertCode,
        handleInputChange,
        handleTogglePreview,
        handleSubmit,
        enableCopyrighter,
        disableCopyrighter
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

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

      .preview-content {
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
