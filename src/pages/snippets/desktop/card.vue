<script lang="ts" setup>
  const props = defineProps<{
    icon: string
    username: string
    permalink: string
    timestamp: string
  }>()
</script>

<template>
  <div class="list-item-card">
    <div class="header">
      <ulink class="link" :title="props.username" :href="props.permalink">
        <i class="iconfont" :class="props.icon"></i>
        <span class="username">{{ props.username }}</span>
      </ulink>
      <div class="timestamp">
        <udate to="ago" :date="props.timestamp" />
      </div>
    </div>
    <div class="body">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .list-item-card {
    display: block;
    padding: $gap;
    @include mix.radius-box($radius-sm);
    @include mix.common-bg-module($motion-duration-fast);

    .header {
      margin-bottom: $gap-sm;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .link {
        color: $color-text;
        line-height: 1;
        &:hover {
          .username {
            text-decoration: underline;
            text-underline-offset: 4px;
          }
        }

        .iconfont {
          font-size: $font-size-h6;
          margin-right: 1px;
        }

        .username {
          font-weight: bold;
          font-family: $font-family-monospace;
        }
      }

      .timestamp {
        font-size: $font-size-h6;
        color: $color-text-secondary;
      }
    }
  }
</style>
