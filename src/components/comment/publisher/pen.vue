<script lang="ts" setup>
  import { ref, watch, onBeforeMount, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import { useIdentityStore, UserType } from '/@/stores/identity'
  import { enableCopyrighter, disableCopyrighter } from '/@/effects/copyright'
  import { CommentEvents, EMOJIS, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../helper'
  import Markdown from '/@/components/common/markdown.vue'

  enum PenEvents {
    Update = 'update:modelValue',
    UpdatePreviewed = 'update:previewed'
  }

  const props = defineProps<{
    posting: boolean
    modelValue?: string
    disabled?: boolean
    previewed?: boolean
    bordered?: boolean
    autoFocus?: boolean
    hiddenStationery?: boolean
  }>()

  const emit = defineEmits<{
    (e: PenEvents.Update, text: string): void
    (e: PenEvents.UpdatePreviewed, previewed: boolean): void
    (e: CommentEvents.Submit, text: string): void
  }>()

  const { i18n: _i18n } = useEnhancer()
  const { user } = storeToRefs(useIdentityStore())
  const content = ref(props.modelValue ?? '')
  const isPreviewed = ref(props.previewed ?? false)
  const textareaRef = ref<HTMLTextAreaElement>()

  const handleTogglePreview = () => {
    isPreviewed.value = !isPreviewed.value
    emit(PenEvents.UpdatePreviewed, isPreviewed.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    emit(CommentEvents.Submit, content.value)
  }

  const handleInputChange = () => {
    const newValue = textareaRef.value?.value ?? ''
    content.value = newValue
    emit(PenEvents.Update, newValue)
  }

  const insertContentToInput = (before: string, after = '', singleCursorOffset = 0) => {
    const textarea = textareaRef.value
    if (!textarea) {
      return
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#instance_properties
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectCount = end - start
    const startPart = textarea.value.slice(0, start)
    const endPart = textarea.value.slice(end)
    const selectedPart = textarea.value.slice(start, end)
    if (start === end) {
      // If no character is selected by the cursor,
      // the behavior is: insert content at the cursor position and position the cursor to the inserted position
      const newCursorPosition = start + before.length + after.length + singleCursorOffset
      textarea.value = startPart + before + after + endPart
      textarea.focus()
      textarea.selectionStart = newCursorPosition
      textarea.selectionEnd = newCursorPosition
    } else {
      // If the user selects part of the content, the behavior should be:
      // - If after contains content, the behavior should be: wrap the content and position the cursor to the location of the wrapped content.
      // - If after does not contain content, the behavior is: replace the selection with before
      if (after) {
        textarea.value = startPart + before + selectedPart + after + endPart
        textarea.focus()
        textarea.selectionStart = start
        textarea.selectionEnd = start + before.length + selectCount + after.length
      } else {
        textarea.value = startPart + before + endPart
        textarea.focus()
        textarea.selectionStart = start
        textarea.selectionEnd = start + before.length
      }
    }
    handleInputChange()
  }

  const insertEmoji = (emoji: any) => {
    insertContentToInput(` ${emoji} `)
  }
  const insertImage = () => {
    insertContentToInput(` ![`, `](https://) `, -2)
  }
  const insertLink = () => {
    insertContentToInput(` [`, `](https://) `, -2)
  }
  const insertCode = () => {
    insertContentToInput('\n```javascript\n', '\n```', -4)
  }

  onBeforeMount(() => {
    watch(
      () => props.modelValue,
      (value = '') => {
        content.value = value
        if (textareaRef.value) {
          textareaRef.value.value = value
        }
      }
    )
  })

  onBeforeMount(() => {
    watch(
      () => props.previewed,
      (value) => {
        if (value !== isPreviewed.value) {
          isPreviewed.value = value
        }
      }
    )
  })

  onMounted(() => {
    if (props.autoFocus) {
      textareaRef.value?.focus()
    }
  })
</script>

<template>
  <div class="pen" :class="{ bordered }">
    <div class="editor">
      <div class="input-wrapper" :data-replicated-value="content">
        <textarea
          ref="textareaRef"
          class="editor-input"
          required
          :disabled="disabled"
          :autofocus="props.autoFocus"
          :minlength="MIN_COMMENT_LENGTH"
          :maxlength="MAX_COMMENT_LENGTH"
          :placeholder="_i18n.t(LanguageKey.COMMENT_POST_PLACEHOLDER)"
          @input="handleInputChange"
          @focus="disableCopyrighter"
          @blur="enableCopyrighter"
        ></textarea>
      </div>
      <transition name="list-fade">
        <div class="preview-content" v-if="isPreviewed">
          <markdown :markdown="content" :compact="true" :render-options="{ sanitize: true }" />
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
                <li v-for="(emoji, index) in EMOJIS" v-once class="item" :key="index" @click="insertEmoji(emoji)">
                  <span>{{ emoji }}</span>
                </li>
              </ul>
            </div>
          </button>
          <button class="image" title="image" :disabled="disabled || isPreviewed" @click.prevent="insertImage">
            <i class="iconfont icon-image" />
          </button>
          <button class="link" title="link" :disabled="disabled || isPreviewed" @click.prevent="insertLink">
            <i class="iconfont icon-link" />
          </button>
          <button class="code" title="code" :disabled="disabled || isPreviewed" @click.prevent="insertCode">
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

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .pen {
    position: relative;
    border-radius: $xs-radius;
    &.bordered {
      border: 1px solid $module-bg-darker-3;
      .pencilbox {
        border-top: 1px solid $module-bg-darker-3;
      }
    }

    .editor {
      position: relative;
      overflow: hidden;

      /* https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
      .input-wrapper {
        display: grid;
        &::after {
          content: attr(data-replicated-value) ' ';
          white-space: pre-wrap;
          visibility: hidden;
        }

        &::after,
        .editor-input {
          margin: 0;
          padding: 0.5em;
          line-height: 1.8em;
          width: 100%;
          min-height: 6em;
          max-height: 32em;
          font-size: $font-size-h6;
          overflow-wrap: anywhere;
          grid-area: 1 / 1 / 2 / 2;
        }

        .editor-input {
          resize: none;
          outline: none;
          overflow: auto;
          background-color: $module-bg-darker-1;
          @include background-transition();
          &:focus {
            content: none;
          }
          &:hover {
            background-color: $module-bg-hover;
          }
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
            left: 0;
            top: 100%;
            width: 100%;
            padding: $xs-gap;
            z-index: $z-index-normal + 1;
            background-color: $module-bg-darker-4;

            .emoji-list {
              list-style: none;
              padding: 0;
              margin: 0;
              font-size: $font-size-h3;
              display: grid;
              grid-template-columns: repeat(12, 1fr);

              .item {
                cursor: pointer;
                padding: $xs-gap 0;
                > span {
                  display: block;
                  font-size: $font-size-h2;
                  opacity: 0.8;
                }
                &:hover {
                  > span {
                    opacity: 1;
                    transform: scale(1.4);
                  }
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
