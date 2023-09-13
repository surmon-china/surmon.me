<script lang="ts" setup>
  import { LanguageKey } from '/@/language'
  import { useTagStore, getTagEnName, getTagIconName } from '/@/stores/tag'
  import { getTagFlowRoute } from '/@/transforms/route'

  const tagStore = useTagStore()
</script>

<template>
  <div class="tags">
    <placeholder
      :data="tagStore.sorted.length"
      :fetching="tagStore.fetching"
      :i18n-key="LanguageKey.TAG_PLACEHOLDER"
    >
      <template #loading>
        <ul class="tag-list-skeleton" key="skeleton">
          <li v-for="item in 14" :key="item" class="item">
            <skeleton-line />
          </li>
        </ul>
      </template>
      <template #default>
        <div class="tag-list" key="list">
          <router-link
            class="item"
            :title="`${getTagEnName(tag)} | ${tag.description}`"
            :to="getTagFlowRoute(tag.slug)"
            :key="index"
            v-for="(tag, index) in tagStore.sorted"
          >
            <i class="iconfont" :class="getTagIconName(tag)" />
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .tags {
    margin-bottom: 0;
    overflow-y: auto;
    width: 100%;
    border-top: $gap solid transparent;
    border-bottom: $gap solid transparent;

    .tag-list-skeleton {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0 $gap;
      overflow: hidden;

      .item {
        width: calc(50% - #{math.div($gap, 2)});
        height: 1.4em;
        margin-right: 0;
        margin-bottom: $gap;

        &:nth-child(2n-1) {
          margin-right: $gap;
        }
        &:nth-child(4n-1) {
          width: 30%;
          margin-right: $gap;
        }
        &:nth-child(4n) {
          width: calc(70% - #{$gap});
        }
        &:nth-last-child(1),
        &:nth-last-child(2) {
          margin-bottom: 0;
        }
      }
    }

    .tag-list {
      list-style: none;
      padding: 0;
      overflow: hidden;
      margin-left: $gap;
      margin-top: -$gap;

      .item {
        $height: 2em;
        display: inline-flex;
        margin-right: $sm-gap;
        margin-top: $gap;
        height: $height;
        line-height: $height;
        font-size: $font-size-h6;
        font-family: $font-family-normal;
        @include radius-box($xs-radius);

        .iconfont {
          width: 2em;
          text-align: center;
          background-color: $module-bg-darker-1;
          @include background-transition();
        }

        .name {
          display: block;
          padding: 0 $sm-gap;
          @include background-transition();

          .count {
            margin-left: $xs-gap;
            color: $text-secondary;
          }
        }

        &.link-active {
          .iconfont {
            color: $module-bg-opaque;
            background-color: $primary-translucent;
          }
          .name {
            font-weight: bold;
            color: $text-reversal;
            background-color: $primary;
            .count {
              color: $text-reversal;
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
