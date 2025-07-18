<script lang="ts" setup>
  import { LocaleKey } from '/@/locales'

  interface Props {
    hasData: boolean
    fetching?: boolean
    skeletonCount?: number
  }

  withDefaults(defineProps<Props>(), {
    fetching: false,
    skeletonCount: 6
  })
</script>

<template>
  <placeholder :loading="fetching" :data="hasData || !!$slots.extra">
    <template #loading>
      <ul class="main-skeleton">
        <li v-for="item in skeletonCount" :key="item" class="item">
          <div class="avatar">
            <skeleton-base />
          </div>
          <div class="content">
            <skeleton-paragraph :lines="4" />
          </div>
        </li>
      </ul>
    </template>
    <template #placeholder>
      <div class="list-empty">
        <i18n :k="LocaleKey.COMMENT_LIST_EMPTY" />
      </div>
    </template>
    <template #default>
      <div class="main">
        <slot name="extra"></slot>
        <slot name="list"></slot>
        <slot name="pagination"></slot>
      </div>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .main-skeleton {
    padding: 0;

    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: $gap-lg;

      .avatar {
        width: 5rem;
        height: 5rem;
      }

      .content {
        width: calc((100% - 5rem) * 0.9);
      }
    }
  }

  .list-empty {
    color: $color-text-secondary;
    font-weight: bold;
    text-align: center;
    line-height: 4rem;
  }
</style>
