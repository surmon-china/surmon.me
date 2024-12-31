<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'

  const props = defineProps<{
    date: string
    threads: number
    instagrams: number
    articles: number
    contributions: number
    githubColor?: string
  }>()

  const { isDarkTheme } = useEnhancer()
  const total = computed(() => props.articles + props.threads + props.contributions + props.instagrams)
  const getPointHeightStyle = (value: number) => {
    return isNaN(value) ? 0 : `${Math.floor(value * 100)}%`
  }
</script>

<template>
  <div
    class="day"
    :class="{ dark: isDarkTheme }"
    :data-date="date"
    :data-total-count="total"
    :data-article-count="articles"
    :data-thread-count="threads"
    :data-instagram-count="instagrams"
    :data-contribution-count="contributions"
  >
    <div class="point">
      <div class="item article" :style="{ height: getPointHeightStyle(articles / total) }" />
      <div class="item threads" :style="{ height: getPointHeightStyle(threads / total) }" />
      <div class="item instagram" :style="{ height: getPointHeightStyle(instagrams / total) }" />
      <div
        class="item contribution"
        :style="{
          height: getPointHeightStyle(contributions / total),
          backgroundColor: githubColor
        }"
      />
    </div>
    <div class="tooltip" v-if="total">
      <p class="date">{{ date }}</p>
      <ul class="counts">
        <li class="item article">
          <i class="iconfont icon-quill"></i>
          <span class="count">{{ articles }}</span>
          articles
        </li>
        <li class="item thread">
          <i class="iconfont icon-threads"></i>
          <span class="count">{{ threads }}</span>
          threads
        </li>
        <li class="item instagram">
          <i class="iconfont icon-instagram"></i>
          <span class="count">{{ instagrams }}</span>
          instagrams
        </li>
        <li class="item contribution">
          <i class="iconfont icon-github"></i>
          <span class="count">{{ contributions }}</span>
          contributions
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .day {
    $size: 11px;
    $radius: 2px;
    position: relative;
    width: $size;
    height: $size;
    border-radius: $radius;
    background-color: $module-bg-darker-2;
    &.dark {
      background-color: $module-bg-darker-1;
      .point {
        filter: brightness(86%);
      }
      .tooltip {
        color: $color-text-reversal;
        #{--background}: rgba($white, 0.9);
      }
    }

    &:not([data-total-count='0']) {
      &:hover {
        outline: 1px solid $theme-black;
      }
      .point:hover {
        & + .tooltip {
          @include mix.visible();
        }
      }
    }

    .point {
      display: block;
      width: $size;
      height: $size;
      border-radius: $radius;
      overflow: hidden;

      .item {
        width: 100%;
        &.article {
          background-color: $surmon;
        }
        &.thread {
          background-color: $threads-primary;
        }
        &.instagram {
          background-color: $instagram-primary;
        }
      }
    }

    .tooltip {
      #{--background}: rgba($black, 0.9);
      position: absolute;
      left: 22px;
      top: 0;
      transform: translateY(-50%);
      white-space: nowrap;
      z-index: $z-index-normal + 1;
      padding: $gap-sm $gap;
      padding-right: $gap-lg;
      background-color: var(--background);
      border-radius: $radius-sm;
      color: $color-text-reversal;
      @include mix.hidden();
      &::before {
        $size: 4px;
        content: '';
        position: absolute;
        left: -$size * 2;
        top: 50%;
        margin-top: -1px;
        width: 0;
        height: 0;
        border-top: $size * 1.5 solid transparent;
        border-right: $size * 2 solid var(--background);
        border-bottom: $size * 1.5 solid transparent;
      }

      .date {
        font-weight: bold;
        margin-bottom: $gap-xs;
      }

      .counts {
        margin: 0;
        padding: 0;
        list-style: none;

        .item {
          line-height: 1.8em;
          font-size: $font-size-small;
          &.article {
            color: $surmon;
          }
          &.thread {
            color: $color-text-reversal;
            /* TODO: threads API data */
            text-decoration: line-through;
          }
          &.instagram {
            color: $instagram-primary;
          }

          .count {
            margin-left: $gap-sm;
            font-weight: bold;
          }
        }
      }
    }

    /* articles */
    /* 5+ */
    &:not([data-article-count='0']) {
      .point {
        .article {
          background-color: $surmon;
        }
      }
    }
    /* 1 */
    &[data-article-count='1'] {
      .point {
        .article {
          background-color: funs.lighten($surmon, 20%);
        }
      }
    }
    /* 2-4 */
    &[data-article-count='2'],
    &[data-article-count='3'],
    &[data-article-count='4'] {
      .point {
        .article {
          background-color: funs.lighten($surmon, 10%);
        }
      }
    }

    /* instagrams */
    /* 3+ */
    &:not([data-instagram-count='0']) {
      .point {
        .instagram {
          background-color: $instagram-primary;
        }
      }
    }
    /* 1 */
    &[data-instagram-count='1'] {
      .point {
        .instagram {
          background-color: funs.lighten($instagram-primary, 20%);
        }
      }
    }
    /* 2 */
    &[data-instagram-count='2'],
    &[data-instagram-count='3'] {
      .point {
        .instagram {
          background-color: funs.lighten($instagram-primary, 10%);
        }
      }
    }

    /* threads */
    /* 8+ */
    &:not([data-thread-count='0']) {
      .point {
        .thread {
          background-color: $threads-primary;
        }
      }
    }
    /* 1 */
    &[data-thread-count='1'] {
      .point {
        .thread {
          background-color: funs.lighten($threads-primary, 22%);
        }
      }
    }
    /* 2-4 */
    &[data-thread-count='2'],
    &[data-thread-count='3'],
    &[data-thread-count='4'] {
      .point {
        .thread {
          background-color: funs.lighten($threads-primary, 16%);
        }
      }
    }
    /* 5-8 */
    &[data-thread-count='5'],
    &[data-thread-count='6'],
    &[data-thread-count='7'],
    &[data-thread-count='8'] {
      .point {
        .thread {
          background-color: funs.lighten($threads-primary, 8%);
        }
      }
    }
  }
</style>
