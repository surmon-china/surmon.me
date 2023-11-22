<script lang="ts">
  import { defineComponent, h } from 'vue'
  import { numberToKilo, numberSplit } from '/@/transforms/text'
  export const StatisticCount = defineComponent({
    name: 'StatisticCount',
    props: {
      count: [Number, String],
      primary: Boolean,
      large: Boolean,
      kilo: Boolean,
      split: Boolean
    },
    render() {
      const number = Number(this.$props.count)
      const content = this.kilo ? numberToKilo(number) : this.split ? numberSplit(number) : String(number)
      const classNames = { primary: this.$props.primary, large: this.large }
      return h('span', { class: ['count', classNames] }, content)
    }
  })
</script>

<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'

  interface Props {
    brand?: string
    icon?: string
    platform?: string
    href?: string
    fetching?: boolean
    data?: any
  }

  defineProps<Props>()
  const { isDarkTheme } = useEnhancer()
</script>

<template>
  <div class="statistic" :class="[brand, { dark: isDarkTheme }]">
    <placeholder :loading="fetching" :data="data">
      <template #loading>
        <ul class="skeletons">
          <skeleton-base v-for="i in 3" :key="i" class="item" />
        </ul>
      </template>
      <template #placeholder>
        <empty bold size="large" />
      </template>
      <template #default>
        <div class="content">
          <ulink class="title" :href="href">
            <span class="left">
              <i class="iconfont" :class="icon"></i>
              <span class="text">{{ platform }}</span>
            </span>
            <span class="right">
              <i class="iconfont icon-next"></i>
            </span>
          </ulink>
          <slot></slot>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .statistic {
    width: 100%;
    height: 14rem;
    padding: 1em 1.8em 1.2em 1.8em;
    border-radius: $lg-radius;
    @include common-bg-module();
    position: relative;
    overflow: hidden;
    #{--brand-color}: $white;
    &.douban {
      #{--s-primary}: $douban-primary;
    }
    &.npm {
      #{--s-primary}: $npm-primary;
    }
    &.twitter {
      #{--s-primary}: $twitter-primary;
    }
    &.github {
      #{--s-primary}: $github-primary;
    }
    &.github.dark {
      #{--s-primary}: $link-color;
      #{--brand-color}: $text-reversal;
    }

    .skeletons {
      margin: 0;
      padding: 1rem 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item {
        height: 20%;
      }
    }

    .content {
      color: $text-secondary;

      .title {
        margin-bottom: $gap;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
          .right {
            opacity: 1;
            color: $text;
          }
        }

        .left {
          display: flex;
          align-items: center;

          .iconfont {
            color: var(--s-primary);
            font-size: $font-size-h2;
            margin-right: $gap;
          }

          .text {
            color: $text;
            font-size: $font-size-h3;
            font-weight: bold;
            letter-spacing: 1px;
          }
        }

        .right {
          color: $text-divider;
          opacity: 0.4;
          transition: all $transition-time-fast;
          .iconfont {
            margin: 0;
          }
        }
      }

      ::v-deep(.count) {
        color: $text;
        font-weight: bold;
        margin: 0 $xs-gap;
        &.large {
          font-size: $font-size-h2;
        }
        &.primary {
          color: var(--s-primary);
        }
      }

      ::v-deep(.iconfont) {
        color: $text-disabled;
        margin-right: $sm-gap;
      }
    }
  }
</style>
