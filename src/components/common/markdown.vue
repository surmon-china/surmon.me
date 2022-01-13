<template>
  <div
    :class="[
      plain ? 'global-markdown-plain' : 'global-markdown-html',
      { compact, dark: isDarkTheme }
    ]"
    v-html="markdownHTML"
  ></div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { TagMap } from '/@/store/tag'
  import { markdownToHTML } from '/@/transforms/markdown'

  export default defineComponent({
    name: 'Markdown',
    props: {
      markdown: String,
      html: String,
      tagMap: Object as PropType<TagMap>,
      relink: {
        type: Boolean,
        default: false
      },
      sanitize: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { isDarkTheme } = useEnhancer()
      const markdownHTML = computed<string>(() => {
        if (!props.markdown) {
          return props.html || ''
        }
        return markdownToHTML(props.markdown, {
          sanitize: props.sanitize,
          relink: props.relink,
          tagMap: props.tagMap
        })
      })

      return {
        isDarkTheme,
        markdownHTML
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/styles/init.scss';

  .global-markdown-plain {
    p {
      margin: 0;
      max-width: 100%;
      @include text-overflow();
    }

    a {
      border-bottom: 1px solid;
    }
  }

  .global-markdown-html {
    font-size: $font-size-base * 1.05;

    /* for google adsense */
    .google-auto-placed {
      margin-bottom: $sm-gap;
    }

    p {
      line-height: 2.2em;
      text-indent: 2em;
      margin-bottom: 1em;

      &.text-center {
        text-align: center;
      }

      &.text-right {
        text-align: right;
      }
    }

    a {
      margin: 0;
      border-bottom: 1px solid;
      font-weight: bold;
      &:hover {
        text-decoration: none;
      }

      &.image-link {
        margin: 0;
        border: 0;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.8em;
      font-weight: 700;
      text-indent: 0;
    }

    blockquote {
      border-radius: $xs-radius;
      p {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    ul {
      list-style-type: square;
    }

    ul:not(.code-lines),
    ol {
      > li {
        line-height: 2em;
        padding: 0.5em 0.8em;
        border-radius: $xs-radius;
        &:hover {
          background-color: $module-bg-darker-1;
        }

        > p {
          text-indent: 0;
        }

        > ol {
          list-style: lower-alpha;
        }

        > ul,
        > ol {
          list-style: circle;
          padding-left: 2em;
          margin-top: $sm-gap;
          &:last-child {
            margin-bottom: 0;
          }
        }

        &:last-child {
          > ul,
          > ol {
            margin-bottom: -$sm-gap;
          }
        }
      }
    }

    table {
      border-radius: $xs-radius;
      overflow: hidden;
    }

    img {
      max-width: 100%;
      position: relative;
      margin: 0 auto;
      display: block;
      text-align: center;
      border-radius: $xs-radius;
      border: $sm-gap solid $module-bg-darker-1;
      opacity: 0.9;
      cursor: pointer;
      &:hover {
        opacity: 1;
        transition: all $transition-time-normal;
      }
    }

    iframe {
      width: 100%;
      margin-bottom: 1em;
      border: $sm-gap solid $module-bg-darker-1;
      border-radius: $xs-radius;
      background-color: $theme-black;
    }

    .checkbox {
      margin: 0 $xs-gap;
      &.checked {
        color: $theme-black;
      }
    }

    code {
      vertical-align: middle;
      padding: 0.3em 0.4em 0.2em;
      margin: 0;
      border-radius: $sm-radius;
      color: $link-color;
      font-size: 95%;
    }

    pre {
      $code-header-height: 2.8rem;
      $code-number-width: 3rem;
      $code-row-line-height: 1.8rem;
      $code-padding: 1rem;
      $code-font-size: $font-size-h6;
      position: relative;
      display: flex;
      margin-bottom: 1em;
      padding-top: $code-header-height;
      padding-left: $code-number-width;
      border-radius: $xs-radius;
      overflow: hidden;
      font-size: $code-font-size;

      &::before {
        content: attr(data-lang) ' CODE';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: $code-header-height;
        line-height: $code-header-height;
        text-transform: uppercase;
        text-align: center;
        z-index: $z-index-normal + 2;
      }

      .code-lines {
        user-select: none;
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        display: block;
        padding-top: $code-header-height + $code-padding;
        width: $code-number-width;
        height: 100%;
        text-align: center;
        z-index: $z-index-normal + 1;

        .code-line-number {
          padding: 0;
          border-radius: 0;
          position: relative;
          list-style-type: none;
          height: $code-row-line-height;
          line-height: $code-row-line-height;
          transition: none;
          &:hover {
            &::before {
              @include visible();
            }
          }

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 66em;
            height: 100%;
            background-color: rgba(154, 154, 154, 0.2);
            @include hidden();
          }
        }
      }

      code {
        margin: 0;
        padding: $code-padding;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        line-height: $code-row-line-height;
        font-size: $font-size-base;
        cursor: text;
      }
    }

    &.compact {
      line-height: 2em;
      word-wrap: break-word;
      font-size: $font-size-base;

      p,
      pre {
        margin-bottom: $gap;
      }

      p {
        text-indent: 0;
        line-height: 2em;
        &:last-child {
          margin: 0;
        }
      }

      a {
        text-decoration: none;
        border-bottom: 1px solid;
      }

      img {
        margin: 0.5rem 0;
        max-width: 100%;
        border-color: $module-bg-darker-2;
      }

      ul,
      ol {
        padding-left: 2em;

        > li {
          padding: 0.2em 0.5em;
        }
      }

      pre {
        $code-header-height: 2.5rem;
        margin-top: 1rem;
        padding-left: 0;
        padding-top: $code-header-height;
        &::before {
          height: $code-header-height;
          line-height: $code-header-height;
        }

        .code-lines {
          display: none;
        }

        code {
          line-height: 1.8;
        }
      }
    }
  }

  .global-markdown-html {
    code {
      background-color: $module-bg-darker-1;
    }

    pre {
      background-color: #f3f3f3;
      &::before {
        background-color: $module-bg-darker-2;
      }
      .code-lines {
        background-color: $module-bg-darker-1;
        color: $text-disabled;
      }
      code {
        color: #444;
        border-radius: 0;
        border-width: 0 1px 1px 0;
        border-color: $module-bg-darker-1;
        background-color: transparent;
      }
    }

    &.dark {
      pre {
        background-color: #1e1e1e;
        &::before {
          background-color: $module-bg-darker-1;
        }
        .code-lines {
          background-color: $module-bg-darker-3;
        }
        code {
          color: #c9d1d9;
          border-color: transparent;
        }
      }
    }

    &.compact {
      code {
        background-color: $module-bg-darker-2;
      }

      pre {
        border: 1px solid $module-bg-darker-3;
        code {
          border-color: transparent;
          background-color: transparent;
        }
      }
    }
  }
</style>
