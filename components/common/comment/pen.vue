<template>
  <div class="pen">
    <div class="markdown">
      <div
        ref="input"
        class="markdown-input"
        :contenteditable="!disabled"
        :placeholder="$i18n.text.comment.placeholder"
        @keyup="handleInputChange"
      />
      <transition name="module">
        <div v-if="enabledPreviewMode" class="markdown-preview" v-html="previewContent" />
      </transition>
    </div>
    <div class="pencilbox">
      <div class="stationery" :class="{ disabled: disabled }">
        <a href class="emoji" title="emoji" @click.stop.prevent>
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
        </a>
        <a href class="image" title="image" @click.stop.prevent="insertImage">
          <i class="iconfont icon-image" />
        </a>
        <a href class="link" title="link" @click.stop.prevent="insertLink">
          <i class="iconfont icon-link-horizontal" />
        </a>
        <a href class="code" title="code" @click.stop.prevent="insertCode">
          <i class="iconfont icon-code-comment" />
        </a>
        <a href class="preview" title="preview" @click.stop.prevent="handleTogglePreviewMode">
          <i class="iconfont icon-eye" />
        </a>
      </div>
      <button
        type="submit"
        class="submit"
        :disabled="disabled"
        @click="handleSubmit"
      >{{ isPosting ? $i18n.text.comment.submiting : $i18n.text.comment.submit }}</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { isBrowser } from '~/environment'
  import marked from '~/plugins/marked'

  export default {
    name: 'CommentPen',
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isPosting: {
        type: Boolean,
        default: false
      },
      enabledPreviewMode: Boolean
    },
    data() {
      return {
        content: '',
      }
    },
    computed: {
      previewContent() {
        return this.enabledPreviewMode
          ? marked(this.content)
          : null
      }
    },
    methods: {
      focus() {
        const input = this.$refs.input
        const selection = window.getSelection()
        const range = document.createRange()
        const index = input.childNodes.length
        range.setStart(input, index)
        range.setEnd(input, index)
        selection.removeAllRanges()
        selection.addRange(range)
      },
      getInputText() {
        return this.$refs.input.innerText
      },
      setInputText(content) {
        this.$refs.input.innerText = content
      },
      insertContent([start = '', end = '']) {
        if (!start && !end) {
          return false
        }
        // 如果选中了内容，则把选中的内容替换，否则追加新内容
        const currentText = this.getInputText()
        const selection = (window.getSelection || document.getSelection)()
        const selectedText = selection.toString()
        if (selectedText) {
          // TODO: 正则可能会匹配到重复的前面的字符，故不可靠
          this.setInputText(currentText.replace(selectedText, start + selectedText + end))
        } else {
          const newText = start + end
          const selectedPoint = selection.getRangeAt(0)
          const startPoint = selectedPoint && selectedPoint.startOffset
          const endPoint = selectedPoint && selectedPoint.endOffset
          // 若拿到了光标，则在光标位置插入新内容，否则末端追加内容
          this.setInputText(
            selectedPoint && startPoint === endPoint && startPoint > 0
              ? currentText.slice(0, startPoint) + newText + currentText.slice(startPoint)
              : currentText + newText
          )
          this.$refs.input.scrollTop = this.$refs.input.scrollHeight
        }
        this.focus()
        this.handleInputChange()
      },
      insertEmoji(emoji) {
        this.insertContent([emoji])
      },
      insertImage() {
        this.insertContent([` ![`, `](https://) `])
      },
      insertLink() {
        this.insertContent([` [`, `](https://) `])
      },
      insertCode() {
        this.insertContent(['\n```javascript\n', '\n```\n'])
      },
      handleTogglePreviewMode() {
        this.$emit('togglePreviewMode')
      },
      handleInputChange() {
        const text = this.getInputText()
        if (text !== this.content) {
          this.content = text
          this.$emit('input', text)
        }
      },
      handleSubmit(event) {
        event.preventDefault()
        this.$emit('submit', this.content)
      }
    },
    watch: {
      value(newContent) {
        if (newContent !== this.content) {
          this.setInputText(newContent)
          this.content = newContent
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
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
