<script lang="ts" setup>
  import { useLozad } from '/@/composables/lozad'
  import { markdownToHTML, MarkdownRenderOption } from '/@/transforms/markdown'

  const props = defineProps<{
    html?: string
    markdown?: string
    compact?: boolean
    renderOptions?: MarkdownRenderOption
  }>()

  const { element } = useLozad()
</script>

<template>
  <section
    ref="element"
    :class="['global-markdown-html', { compact }]"
    v-html="props.markdown ? markdownToHTML(props.markdown, props.renderOptions) : props.html || ''"
  ></section>
</template>

<style lang="scss">
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .global-markdown-html {
    font-size: $font-size-base * 1.05;

    p {
      text-indent: 2em;
      line-height: 2.2em;
    }

    a {
      margin: 0;
      @include mix.text-underline();
      &.code-link {
        text-underline-offset: 0.1em;
      }
      &.image-link {
        margin: 0;
        border: 0;
      }
    }

    u {
      text-underline-offset: 0.5em;
      text-decoration-thickness: from-font;
      text-decoration-style: dashed;
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
      &:hover {
        .anchor.static {
          color: $color-text;
        }
        .anchor.link {
          color: $primary;
          cursor: pointer;
        }
      }

      .anchor {
        margin-right: $gap-tiny;
        color: $color-text-secondary;
        text-decoration: none;
        user-select: none;
      }
    }

    blockquote {
      border-radius: $radius-xs;
      p {
        text-indent: 0;
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
        border-radius: $radius-xs;
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
          margin-top: $gap-tiny;
          &:last-child {
            margin-bottom: 0;
          }
        }

        &:last-child {
          > ul,
          > ol {
            margin-bottom: -$gap-tiny;
          }
        }
      }
    }

    table {
      $border-color: $module-bg-darker-2;
      $border-radius: $radius-sm;
      border-collapse: separate !important;
      border-spacing: 0;
      overflow: hidden;
      border-top: 1px solid $border-color;
      border-left: 1px solid $border-color;
      border-radius: $border-radius;

      th,
      td {
        border: none;
        background: none;
        border-right: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
      }

      tr:last-child th:last-child {
        border-top-right-radius: $border-radius;
      }

      tr:last-child td:first-child {
        border-bottom-left-radius: $border-radius;
      }

      tr:last-child td:last-child {
        border-bottom-right-radius: $border-radius;
      }
    }

    iframe {
      width: 100%;
      min-height: 320px;
      margin-bottom: 1em;
      padding: $gap-tiny;
      border-radius: $radius-xs;
      border: 1px solid $module-bg-darker-1;
    }

    .figure-wrapper {
      width: 100%;
      margin-bottom: 1em;
      display: flex;
      justify-content: center;
      overflow: hidden;
      text-align: center;
      > figure {
        display: block;
      }
    }

    figure.image {
      position: relative;
      border-radius: $radius-sm;
      border: 1px solid $module-bg-darker-1;
      text-indent: 0;
      text-align: center;

      .placeholder {
        visibility: hidden;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
      }

      img {
        cursor: pointer;
        display: block;
        max-width: 100%;
        padding: $gap-xs;
        color: transparent;
        transition: opacity $motion-duration-fast;
        &:hover {
          opacity: 0.9;
        }
      }

      figcaption {
        display: block;
        border-top: 1px dashed $module-bg-darker-1;
        text-align: center;
        line-height: 2.6;
        font-size: $font-size-tertiary;
        font-weight: bold;
        user-select: none;
        pointer-events: none;
      }

      &[data-status='loaded'] {
        width: auto;
        img {
          min-width: auto;
          min-height: auto;
        }
      }

      &[data-status='loading'],
      &[data-status='error'] {
        width: 100%;

        /* image size */
        img {
          height: 6rem;
        }

        /* placeholder size */
        &.caption {
          .placeholder {
            padding-bottom: $gap-sm * 3;
          }
        }
      }

      &[data-status='error'] {
        /* show custom failed icon */
        .placeholder.error {
          visibility: visible;
          font-size: $font-size-h1 * 1.8;
          color: $color-text-divider;
        }
        /* hide original image failed icon when error */
        img {
          width: 100%;
          opacity: 0;
        }
      }

      /* loading animation */
      &[data-status='loading'] {
        .placeholder.loading {
          visibility: visible;
        }
      }
    }

    .checkbox {
      margin: 0 $gap-tiny;
      &.checked {
        color: $theme-black;
      }
    }

    code {
      vertical-align: middle;
      margin: 0;
      padding: 0.2em 0.4em 0.14em;
      border-radius: $radius-xs * 1.5;
      border: 1px solid $module-bg-darker-2;
      background-color: $module-bg-darker-1;
      color: $color-link;
      font-size: 95%;
    }

    pre {
      $pre-border-color: $module-bg-darker-2;
      $code-numbers-width: 2.5rem;
      $code-row-line-height: 1.6em;
      $code-font-size: $font-size-secondary;
      position: relative;
      margin-bottom: 1em;
      border: 1px solid $pre-border-color;
      border-radius: $radius-sm;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      @include mix.background-transition($motion-duration-mid);
      background-color: #f3f3f3;
      @include mix.dark-theme {
        background-color: $module-bg-darker-1;
      }

      .language-header {
        width: 100%;
        height: 2rem;
        padding-inline: 1em;
        display: flex;
        justify-content: space-between;
        line-height: 2rem;
        border-bottom: 1px solid $pre-border-color;

        .name {
          display: inline-flex;
          user-select: none;

          .iconfont {
            margin-right: $gap-sm;
          }
          .text {
            font-size: $font-size-h6;
          }
        }

        .copy {
          color: $color-text-secondary;
          &:hover {
            color: $color-link-hover;
          }
        }
      }

      .code-wrapper {
        display: flex;
        padding: $gap-xs 0;

        .code-lines {
          display: block;
          margin: 0;
          padding: 0;
          width: $code-numbers-width;
          text-align: center;
          user-select: none;
          font-size: $code-font-size;
          color: $color-text-divider;

          .code-line-number {
            padding: 0;
            list-style-type: none;
            line-height: $code-row-line-height;
          }

          & + code {
            padding-block: 0;
            padding-inline: 0.2em;
          }
        }

        code {
          flex: 1;
          margin: 0;
          padding-inline: 1em;
          display: block;
          line-height: $code-row-line-height;
          border-radius: 0;
          border: none;
          font-size: $code-font-size;
          background-color: transparent !important;
          cursor: text;
          // desktop only x scroll
          overscroll-behavior-x: contain;
        }
      }
    }

    &.compact {
      line-height: 2em;
      word-wrap: break-word;
      font-size: $font-size-base;

      > p:last-child,
      > ul:last-child,
      > ol:last-child,
      > pre:last-child,
      > div.figure-wrapper:last-child {
        margin-bottom: 0;
      }

      p {
        margin-bottom: 0.8em;
        text-indent: 0;
        line-height: 2em;
        &:last-child {
          margin-bottom: 0;
        }
      }

      a {
        @include mix.text-underline();
      }

      .figure-wrapper {
        margin: 0.5rem 0;
        justify-content: initial;
      }

      figure.image {
        border-color: $module-bg-darker-2;
        figcaption {
          border-color: $module-bg-darker-2;
        }
      }

      ul,
      ol {
        margin-bottom: 0.8em;
        padding-left: 1.4em;

        > li {
          padding: 0.2em 0.5em;
        }
      }

      blockquote {
        margin-block: 0.8em;
        border-color: $module-bg-darker-3;
        background-color: $module-bg-darker-2;
      }

      code {
        border-color: $module-bg-darker-3;
        background-color: $module-bg-darker-2;
      }

      pre {
        code {
          // line-height: 1.8;
        }
      }
    }
  }
</style>
