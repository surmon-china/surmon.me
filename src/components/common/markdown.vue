<script lang="ts" setup>
  import { computed } from 'vue'
  import { useLozad } from '/@/composables/lozad'
  import { markdownToHTML, MarkdownRenderOption } from '/@/transforms/markdown'

  interface Props {
    markdown?: string
    html?: string
    plain?: boolean
    compact?: boolean
    renderOptions?: MarkdownRenderOption
  }

  const props = defineProps<Props>()
  const { element } = useLozad()
  const markdownHTML = computed<string>(() => {
    if (props.markdown) {
      return markdownToHTML(props.markdown, {
        ...props.renderOptions
      })
    }

    return props.html || ''
  })
</script>

<template>
  <section
    ref="element"
    v-html="markdownHTML"
    :class="[plain ? 'global-markdown-plain' : 'global-markdown-html', { compact }]"
  ></section>
</template>

<style lang="scss">
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .global-markdown-plain {
    p {
      margin: 0;
      max-width: 100%;
      @include mix.text-overflow();
    }

    a {
      @include mix.text-underline();
    }
  }

  .global-markdown-html {
    font-size: $font-size-base * 1.05;

    p {
      text-indent: 2em;
      line-height: 2.2em;
    }

    a {
      margin: 0;
      @include mix.text-underline();
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
        margin-right: $gap-xs;
        color: $color-text-secondary;
        text-decoration: none;
        user-select: none;
      }
    }

    blockquote {
      border-radius: $radius-xs;
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
          margin-top: $gap-sm;
          &:last-child {
            margin-bottom: 0;
          }
        }

        &:last-child {
          > ul,
          > ol {
            margin-bottom: -$gap-sm;
          }
        }
      }
    }

    table {
      border-radius: $radius-xs;
      overflow: hidden;
    }

    iframe {
      width: 100%;
      min-height: 320px;
      margin-bottom: 1em;
      padding: $gap-sm;
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
      border-radius: $radius-xs;
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
        display: block;
        max-width: 100%;
        padding: $gap-sm;
        color: transparent;
        cursor: pointer;
        transition: opacity $motion-duration-fast;
        &:hover {
          opacity: 0.9;
        }
      }

      figcaption {
        display: block;
        border-top: 1px dashed $module-bg-darker-1;
        text-align: center;
        line-height: $gap * 3;
        font-size: $font-size-small;
        font-weight: bold;
        /* font-style: italic; */
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
          min-height: 6rem;
        }

        /* placeholder size */
        &.caption {
          .placeholder {
            padding-bottom: $gap * 3;
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
      margin: 0 $gap-xs;
      &.checked {
        color: $theme-black;
      }
    }

    code {
      vertical-align: middle;
      margin: 0;
      padding: 0.2em 0.4em 0.14em;
      border-radius: $radius-sm;
      border: 1px solid $module-bg-darker-2;
      background-color: $module-bg-darker-1;
      color: $color-link;
      font-size: 95%;
    }

    pre {
      $code-header-height: 2.8rem;
      $code-number-width: 3rem;
      $code-row-line-height: 1.68em;
      $code-padding: 0.8rem;
      $code-font-size: $font-size-base;
      position: relative;
      display: flex;
      margin-bottom: 1em;
      padding-top: $code-header-height;
      border-radius: $radius-xs;
      overflow: hidden;
      font-size: $code-font-size;
      background-color: #f3f3f3;
      @include mix.background-transition($motion-duration-mid);
      @include mix.dark-theme {
        background-color: #1e1e1e;
        &::before {
          background-color: $module-bg-darker-1;
        }
        .code-lines {
          background-color: $module-bg-darker-2;
        }
        code {
          color: #c9d1d9;
          border-color: transparent;
        }
      }

      &.with-line-numbers {
        padding-left: $code-number-width;
        code {
          border-left: none;
        }
      }

      &::before {
        content: attr(data-lang) ' CODE';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: $code-header-height;
        line-height: $code-header-height;
        background-color: $module-bg-darker-2;
        text-transform: uppercase;
        text-align: center;
        z-index: $z-index-normal + 2;
      }

      .code-lines {
        z-index: $z-index-normal + 1;
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        margin: 0;
        padding: 0;
        padding-top: $code-header-height + $code-padding;
        width: $code-number-width;
        height: 100%;
        text-align: center;
        user-select: none;
        font-size: $code-font-size;
        background-color: $module-bg-darker-1;
        color: $color-text-divider;

        .code-line-number {
          padding: 0;
          list-style-type: none;
          line-height: $code-row-line-height;
        }
      }

      code {
        margin: 0;
        padding: $code-padding 1em !important;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        line-height: $code-row-line-height;
        border-radius: 0;
        border-width: 0 1px 1px 1px;
        border-color: $module-bg-darker-1;
        font-size: $code-font-size;
        background-color: transparent !important;
        color: #444;
        cursor: text;
      }
    }

    &.compact {
      line-height: 2em;
      word-wrap: break-word;
      font-size: $font-size-base;

      p {
        margin-bottom: $gap;
        text-indent: 0;
        line-height: 2em;
        &:last-child {
          margin: 0;
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
        padding-left: 2em;

        > li {
          padding: 0.2em 0.5em;
        }
      }

      blockquote {
        border-color: $module-bg-darker-3;
        background-color: $module-bg-darker-2;
      }

      code {
        border-color: $module-bg-darker-3;
        background-color: $module-bg-darker-2;
      }

      pre {
        $code-header-height: 2.5rem;
        margin-top: $gap;
        margin-bottom: $gap;
        padding-top: $code-header-height;
        border: 1px solid $module-bg-darker-3;
        &::before {
          height: $code-header-height;
          line-height: $code-header-height;
        }

        code {
          line-height: 1.8;
          border-color: transparent;
        }
      }
    }
  }
</style>
