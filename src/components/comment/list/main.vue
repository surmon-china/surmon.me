<script lang="ts" setup>
  import { LocalesKey } from '/@/locales'

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
  <placeholder :loading="fetching" :has-data="hasData || !!$slots.extra">
    <template #placeholder>
      <div class="list-empty">
        <i18n :k="LocalesKey.COMMENT_LIST_EMPTY" />
      </div>
    </template>
    <template #loading>
      <ul class="list-skeleton">
        <li class="item" v-for="item in skeletonCount" :key="item">
          <skeleton class="avatar" />
          <div class="right">
            <skeleton class="username" />
            <skeleton class="content" />
            <skeleton class="content" />
            <skeleton class="content" />
          </div>
        </li>
      </ul>
    </template>
    <template #default>
      <div class="list-content">
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

  .list-skeleton {
    margin: 0;
    padding-inline: 1em;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.2rem;
      &:last-child {
        margin-bottom: $gap-sm;
      }

      .avatar {
        width: 3.4rem;
        height: 3.4rem;
        margin-right: $gap;
      }

      .right {
        flex: 1;

        .username {
          width: 8rem;
          height: 1.3rem;
          margin-bottom: $gap-sm;
        }

        .content {
          width: 100%;
          height: 0.8rem;
          margin-top: $gap-xs;
          &:nth-child(4) {
            width: 70%;
          }
        }
      }
    }
  }

  .list-empty {
    line-height: 3rem;
    text-align: center;
    font-weight: bold;
    color: $color-text-secondary;
  }
</style>
