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
    --markdown-font-size: #{$font-size-base * 1.05};
    --markdown-line-text-indent: 2em;
    --markdown-line-line-height: 2.2;
    --markdown-heading-line-height: #{$line-height-loose};
    --markdown-list-left-padding: 3em;
    --markdown-list-li-block-gap: 0.5em;
    --markdown-block-gap: 1em;

    font-size: var(--markdown-font-size);

    p,
    ul,
    ol,
    pre,
    table,
    blockquote,
    iframe,
    .figure-wrapper {
      margin-bottom: var(--markdown-block-gap);
    }

    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }

    hr {
      margin-block: var(--markdown-block-gap);
    }

    p {
      text-indent: var(--markdown-line-text-indent);
      line-height: var(--markdown-line-line-height);
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
      text-decoration-style: dashed;
      text-decoration-thickness: from-font;
    }

    del {
      color: $color-text-secondary;
      a {
        color: $color-text-secondary;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: var(--markdown-heading-line-height);

      &:hover {
        .anchor {
          color: $color-text;
        }
      }

      .anchor {
        margin-right: $gap-tiny;
        color: $color-text-secondary;
        text-decoration: none;
        user-select: none;
        @include mix.color-transition();
        &.link {
          cursor: pointer;
        }

        .iconfont {
          font-weight: normal;
        }
      }
    }

    blockquote {
      padding-left: 1.5em;
      padding-right: 1em;
      border-left: 0.5em solid $module-bg-darker-1;
      font-style: italic;

      p {
        text-indent: 0;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    > ul {
      list-style: none;

      > li {
        position: relative;
        &:hover {
          &::before {
            color: $color-text;
          }
        }

        &::before {
          content: '■';
          font-size: 8px;
          position: absolute;
          left: calc(-2em + 2px);
          top: 0;
          line-height: inherit;
          color: $color-text-secondary;
          @include mix.color-transition();
        }
      }
    }

    ul:not(.code-lines),
    ol {
      padding-left: var(--markdown-list-left-padding);

      > li {
        line-height: 2em;
        padding-left: 0.25em;
        margin-bottom: var(--markdown-list-li-block-gap);
        &:last-child {
          margin-bottom: 0;
        }

        > p {
          text-indent: 0;
        }

        > ul {
          list-style: circle;
        }

        > ol {
          list-style: lower-alpha;
        }

        > ul,
        > ol {
          padding-left: 1em;
          margin-top: 0.5em;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    table {
      $border-color: $module-bg-darker-2;
      $border-radius: $radius-sm;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border-top: 1px solid $border-color;
      border-left: 1px solid $border-color;
      border-radius: $border-radius;
      overflow: hidden;

      th,
      td {
        border: none;
        background: none;
        border-right: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        padding: 0.35em 0.5em;
        &:not([align]) {
          text-align: left;
        }
      }

      tr:first-child th:first-child {
        border-top-left-radius: $border-radius;
      }

      tr:first-child th:last-child {
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
      padding: $gap-tiny;
      border-radius: $radius-xs;
      border: 1px solid $module-bg-darker-1;
    }

    code {
      margin: 0;
      padding-block: 1px;
      padding-inline: 0.2em;
      border-radius: $radius-xs * 1.5;
      border: 1px solid $module-bg-darker-2;
      background-color: $module-bg-darker-1;
      color: $color-link;
      font-size: 95%;
    }

    pre {
      $pre-border-color: $module-bg-darker-2;
      $code-numbers-width: 2.5rem;
      $code-row-line-height: 1.3rem;
      $code-font-size: $font-size-secondary;
      width: 100%;
      position: relative;
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
          font-size: 90%;
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
          color: $color-text-divider;

          .code-line-number {
            padding: 0;
            font-size: $code-font-size - 1;
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
          background-color: transparent;
          cursor: text;
          overflow: auto;
          scrollbar-width: thin;
          // desktop only x scroll
          overscroll-behavior-x: contain;
        }
      }
    }

    .checkbox {
      margin: 0 $gap-tiny;
      &.checked {
        color: $theme-black;
      }
    }

    .figure-wrapper {
      width: 100%;
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
        line-height: 2;
        font-size: $font-size-tertiary;
        font-style: italic;
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

        /* hide original image when loading or error */
        img {
          width: 100%;
          height: 6rem;
          opacity: 0;
        }

        /* placeholder size */
        &.caption {
          .placeholder {
            padding-bottom: $gap-sm * 3;
          }
        }
      }

      /* loading animation */
      &[data-status='loading'] {
        .placeholder.loading {
          visibility: visible;
        }
      }

      /* show custom failed icon */
      &[data-status='error'] {
        .placeholder.error {
          visibility: visible;
          font-size: $font-size-h1 * 1.8;
          color: $color-text-divider;
        }
      }
    }
  }

  .global-markdown-html.compact {
    --markdown-font-size: #{$font-size-base};
    --markdown-line-text-indent: 0;
    --markdown-line-line-height: 2;
    --markdown-list-left-padding: 2em;
    --markdown-block-gap: 0.75em;

    word-wrap: break-word;

    blockquote {
      padding-left: 1em;
      padding-right: 0.5em;
    }

    .figure-wrapper {
      justify-content: start;
    }
  }
</style>
