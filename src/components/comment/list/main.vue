<script lang="ts" setup>
  import { LanguageKey } from '/@/language'

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
        <i18n :k="LanguageKey.COMMENT_LIST_EMPTY" />
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .main-skeleton {
    padding: 0;

    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: $lg-gap;

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
    color: $text-secondary;
    font-weight: bold;
    text-align: center;
    line-height: 4rem;
  }
</style>
