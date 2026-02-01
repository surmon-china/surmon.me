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
  defineProps<{
    icon?: string
    platform?: string
    href?: string
    loading?: boolean
    hasData?: boolean
  }>()
</script>

<template>
  <div class="statistics-card">
    <placeholder :loading="loading" :has-data="hasData">
      <template #placeholder>
        <empty class="statistics-empty" bold size="large" />
      </template>
      <template #loading>
        <div class="statistics-skeleton">
          <skeleton class="title" />
          <skeleton class="line" v-for="i in 3" :key="i" />
        </div>
      </template>
      <template #default>
        <div class="statistics-content">
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $primary-color: var(--brand-primary-color, $primary);

  .statistics-card {
    width: 100%;
    height: 10.6rem;
    padding: 1em 1.8em 1.2em 1.8em;
    border-radius: $radius-sm;
    position: relative;
    overflow: hidden;
    @include mix.common-bg-module();

    .statistics-empty {
      height: 9rem;
    }

    .statistics-skeleton {
      padding-block: $gap-xs;

      .title {
        height: 2rem;
      }

      .line {
        height: 1rem;
        margin-top: $gap;
      }
    }

    .statistics-content {
      color: $color-text-secondary;

      .title {
        margin-bottom: $gap-sm;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
          .right {
            opacity: 1;
            color: $color-text;
          }
        }

        .left {
          display: flex;
          align-items: center;

          .iconfont {
            color: $primary-color;
            font-size: $font-size-h2;
            margin-right: $gap-sm;
          }

          .text {
            color: $color-text;
            font-size: $font-size-h3;
            font-weight: bold;
            letter-spacing: 1px;
          }
        }

        .right {
          color: $color-text-divider;
          opacity: 0.4;
          transition: all $motion-duration-fast;
          .iconfont {
            margin: 0;
          }
        }
      }

      ::v-deep(.count) {
        color: $color-text;
        font-weight: bold;
        margin: 0 $gap-tiny;
        &.large {
          font-size: $font-size-h2;
        }
        &.primary {
          color: $primary-color;
        }
      }

      ::v-deep(.iconfont) {
        color: $color-text-disabled;
        margin-right: $gap-xs;
      }
    }
  }
</style>
