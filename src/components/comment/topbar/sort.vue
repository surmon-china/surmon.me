<script lang="ts" setup>
  import { LocalesKey } from '/@/locales'
  import { SortMode } from '/@/constants/sort-param'

  const sort = defineModel<SortMode>()
</script>

<template>
  <label class="comment-sort">
    <span class="icon">▼</span>
    <select class="select" name="sort" v-model="sort">
      <option :value="SortMode.Latest">
        <i18n :k="LocalesKey.COMMENT_SORT_NEW" />
      </option>
      <option :value="SortMode.Hottest">
        <i18n :k="LocalesKey.COMMENT_SORT_HOT" />
      </option>
      <option :value="SortMode.Oldest">
        <i18n :k="LocalesKey.COMMENT_SORT_OLD" />
      </option>
    </select>
  </label>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $topbar-size: var(--topbar-size);

  .comment-sort {
    position: relative;
    height: $topbar-size;
    line-height: $topbar-size;
    background-color: $module-bg-darker-1;
    @include mix.radius-box($radius-xs);
    &:hover {
      background-color: $module-bg-darker-2;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      position: absolute;
      top: 0;
      left: $gap-xs;
      height: 100%;
      font-size: $font-size-tertiary;
      pointer-events: none;
    }

    .select {
      padding: 0 $gap-xs 0 $gap-lg;
      font-weight: bold;
      appearance: none;
      background: none;
      vertical-align: baseline;
      user-select: none;
      cursor: pointer;
    }
  }
</style>
