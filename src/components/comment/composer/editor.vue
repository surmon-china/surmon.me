<script lang="ts" setup>
  import { shallowRef, onMounted, nextTick } from 'vue'
  import { LocalesKey } from '/@/locales'
  import { useEnhancer } from '/@/app/enhancer'
  import { enableCopyrighter, disableCopyrighter } from '/@/effects/copyright'
  import { APP_CONFIG, RESOURCE_LINKS } from '/@/configs/app.config'
  import CommentMarkdown from '../markdown.vue'
  import EditorEmojiBox from './emoji.vue'

  const content = defineModel<string>({
    default: ''
  })

  const preview = defineModel<boolean>('preview', {
    default: false
  })

  const props = defineProps<{
    disabled?: boolean
    bordered?: boolean
    autoFocus?: boolean
    hiddenTools?: boolean
  }>()

  const { i18n: _i18n } = useEnhancer()
  const textareaRef = shallowRef<HTMLTextAreaElement>()

  const handleTogglePreview = () => {
    preview.value = !preview.value
  }

  const insertToContent = (before: string, after = '', singleCursorOffset = 0) => {
    const textarea = textareaRef.value
    if (!textarea) return

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#instance_properties
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const value = textarea.value
    const selected = value.slice(start, end)

    let nextValue: string
    let nextCursorStart: number
    let nextCursorEnd: number

    if (start === end) {
      // If no character is selected by the cursor,
      // the behavior is: insert content at the cursor position and position the cursor to the inserted position
      const newCursorPosition = start + before.length + after.length + singleCursorOffset
      nextValue = value.slice(0, start) + before + after + value.slice(end)
      nextCursorStart = newCursorPosition
      nextCursorEnd = newCursorPosition
    } else if (after) {
      // If the user selects part of the content, the behavior should be:
      // - If after contains content, the behavior should be: wrap the content and position the cursor to the location of the wrapped content.
      nextValue = value.slice(0, start) + before + selected + after + value.slice(end)
      nextCursorStart = start
      nextCursorEnd = start + before.length + selected.length + after.length
    } else {
      // - If after does not contain content, the behavior is: replace the selection with before
      nextValue = value.slice(0, start) + before + value.slice(end)
      nextCursorStart = start
      nextCursorEnd = start + before.length
    }

    content.value = nextValue

    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(nextCursorStart, nextCursorEnd)
    })
  }

  const tools = [
    {
      id: 'image',
      icon: 'icon-image',
      execute: () => insertToContent(` ![`, `](https://) `, -2)
    },
    {
      id: 'link',
      icon: 'icon-link',
      execute: () => insertToContent(` [`, `](https://) `, -2)
    },
    {
      id: 'code',
      icon: 'icon-code',
      execute: () => insertToContent('\n```javascript\n', '\n```', -4)
    }
  ]

  onMounted(() => {
    if (props.autoFocus) {
      textareaRef.value?.focus()
    }
  })
</script>

<template>
  <div class="composer-editor" :class="{ bordered }">
    <div class="editor">
      <div class="input-wrapper" :data-replicated-value="content">
        <textarea
          ref="textareaRef"
          class="editor-input"
          required
          v-model="content"
          :disabled="disabled"
          :autofocus="props.autoFocus"
          :minlength="APP_CONFIG.comment_content_min_length"
          :maxlength="APP_CONFIG.comment_content_max_length"
          :placeholder="_i18n.t(LocalesKey.COMMENT_POST_PLACEHOLDER)"
          @focus="disableCopyrighter"
          @blur="enableCopyrighter"
        ></textarea>
      </div>
      <transition name="module">
        <div class="preview-content" v-if="preview">
          <comment-markdown :content="content" />
        </div>
      </transition>
    </div>
    <div class="toolbar">
      <div class="left">
        <ulink class="markdown" title="markdown" :href="RESOURCE_LINKS.MARKDOWN_DOC">
          <i class="iconfont icon-markdown" />
        </ulink>
        <template v-if="!hiddenTools">
          <button class="emoji" title="emoji" type="button" :disabled="disabled || preview">
            <i class="iconfont icon-emoji" />
            <editor-emoji-box class="emoji-box" @click="insertToContent($event)" />
          </button>
          <button
            v-for="tool in tools"
            :key="tool.id"
            :class="tool.id"
            :title="tool.id"
            :disabled="disabled || preview"
            @click.prevent="tool.execute"
          >
            <i class="iconfont" :class="tool.icon" />
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
      <div class="right">
        <slot name="toolbar-right-extra"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .composer-editor {
    position: relative;
    width: 100%;
    border-radius: $radius-xs;
    overflow: hidden;

    &.bordered {
      border: 1px solid $module-bg-darker-3;
      .toolbar {
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
          overflow-wrap: anywhere;
          grid-area: 1 / 1 / 2 / 2;
        }

        .editor-input {
          resize: none;
          outline: none;
          overflow: auto;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          background-color: $module-bg-darker-1;
          @include mix.background-transition();
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
        margin: 0;
        padding: 0.5em;
        overflow: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        background-color: $module-bg-darker-1;
      }
    }

    .toolbar {
      $size: 30px;
      height: $size;
      line-height: $size;
      display: flex;
      justify-content: space-between;
      background-color: $module-bg-darker-2;

      .left,
      .right {
        display: inline-flex;
      }

      .left {
        .emoji,
        .image,
        .link,
        .code,
        .preview {
          width: $size;
          height: $size;
          text-align: center;
          display: block;
          @include mix.background-transition();
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
          width: 3rem;
          text-align: center;
          background-color: $module-bg-darker-3;
        }

        .emoji {
          &:not([disabled]):hover {
            .emoji-box {
              @include mix.visible();
            }
          }

          .emoji-box {
            @include mix.hidden();
            position: absolute;
            left: 0;
            bottom: $size;
          }
        }
      }
    }
  }
</style>
