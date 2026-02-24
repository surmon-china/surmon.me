<script lang="ts" setup>
  defineProps<{
    total?: number
  }>()
</script>

<template>
  <div class="comment-count">
    <i class="iconfont icon-discussion"></i>
    <i18n>
      <!-- prettier-ignore -->
      <template #zh>共<span class="total" key="zh">{{ total }}</span>条评论</template>
      <!-- prettier-ignore -->
      <template #en><span class="total en" key="en">{{ total }}</span>comments</template>
    </i18n>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $topbar-size: var(--topbar-size);

  .comment-count {
    padding: 0;
    padding-right: 0.6em;
    width: fit-content;
    height: $topbar-size;
    line-height: $topbar-size;
    background-color: $module-bg-darker-1;
    @include mix.radius-box($radius-xs);

    .iconfont {
      display: inline-block;
      width: $topbar-size;
      height: $topbar-size;
      text-align: center;
      margin-right: $gap-xs;
      background-color: $module-bg-darker-2;
    }

    .total {
      font-weight: bold;
      margin: 0 $gap-tiny;

      &.en {
        margin-left: 0;
      }
    }
  }
</style>
