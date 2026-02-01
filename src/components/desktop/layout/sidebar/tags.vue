<script lang="ts" setup>
  import { LocalesKey } from '/@/locales'
  import { useTagStore, getTagEnName, getTagIconName } from '/@/stores/tag'
  import { getTagFlowRoute } from '/@/transforms/route'

  const tagStore = useTagStore()
</script>

<template>
  <div class="tags">
    <placeholder :has-data="!!tagStore.sorted.length">
      <template #placeholder>
        <empty>
          <i18n :k="LocalesKey.TAG_PLACEHOLDER" />
        </empty>
      </template>
      <template #default>
        <div class="tag-list">
          <router-link
            class="item"
            :title="`${getTagEnName(tag)} | ${tag.description}`"
            :to="getTagFlowRoute(tag.slug)"
            :key="index"
            v-for="(tag, index) in tagStore.sorted"
          >
            <i class="iconfont" :class="getTagIconName(tag.extras)" />
            <span class="name">
              <i18n :zh="tag.name" :en="getTagEnName(tag)" />
              <span class="count">({{ tag.article_count || 0 }})</span>
            </span>
          </router-link>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .tags {
    margin-bottom: 0;
    overflow-y: auto;
    width: 100%;
    border-top: $gap-sm solid transparent;
    border-bottom: $gap-sm solid transparent;

    .tag-list {
      list-style: none;
      padding: 0;
      overflow: hidden;
      margin-left: $gap-sm;
      margin-top: -$gap-sm;

      .item {
        $height: 2em;
        display: inline-flex;
        margin-right: $gap-sm;
        margin-top: $gap-sm;
        height: $height;
        line-height: $height;
        font-size: $font-size-secondary;
        font-family: $font-family-normal;
        @include mix.radius-box($radius-xs);

        .iconfont {
          width: 2em;
          text-align: center;
          background-color: $module-bg-darker-1;
          @include mix.background-transition();
        }

        .name {
          display: block;
          padding-left: $gap-xs;
          padding-right: $gap-xs;
          @include mix.background-transition();

          .count {
            margin-left: $gap-tiny;
            color: $color-text-secondary;
          }
        }

        &.link-active {
          .iconfont {
            color: $module-bg-opaque;
            background-color: $primary-translucent;
          }
          .name {
            font-weight: bold;
            color: $color-text-reversal;
            background-color: $primary;
            .count {
              color: $color-text-reversal;
            }
          }
        }

        &:not(.link-active) {
          .name {
            background-color: $module-bg-hover;
          }

          &:hover {
            .iconfont {
              background-color: $module-bg-hover;
            }
            .name {
              background-color: $module-bg-darker-3;
            }
          }
        }
      }
    }
  }
</style>
