<template>
  <div class="tag">
    <placeholder
      :data="tagData.data.length"
      :fetching="tagData.fetching"
      :p-i18n-key="LANGUAGE_KEYS.TAG_PLACEHOLDER"
    >
      <div class="tag-list">
        <router-link
          class="item"
          :title="tag.description"
          :to="getTagArchiveRoute(tag.slug)"
          :key="index"
          v-for="(tag, index) in tagData.data"
        >
          <i class="iconfont" :class="getTagIcon(tag)" />
          <span class="name">
            <i18n :zh="tag.name" :en="tag.slug" />
            <span class="count">({{ tag.count || 0 }})</span>
          </span>
        </router-link>
      </div>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from '/@/store'
  import { useI18n } from '/@/services/i18n'
  import { getTagArchiveRoute } from '/@/transforms/route'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getExtendsValue } from '/@/transforms/state'

  export default defineComponent({
    name: 'PcAsideTag',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      const route = useRoute()
      const tagData = computed(() => store.state.tag)

      const getTagIcon = (tag: any) => {
        return getExtendsValue(tag, 'icon') || 'icon-tag'
      }

      return {
        LANGUAGE_KEYS,
        t: i18n.t,
        tagData,
        getTagIcon,
        getTagArchiveRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';
  @import './variables.scss';

  .tag {
    margin-bottom: 0;
    max-height: calc(100vh - 88px - #{$top-height + $lg-gap + $lg-gap + $tool-height});
    overflow-y: auto;
    width: 100%;
    border-top: $gap solid transparent;
    border-bottom: $gap solid transparent;

    .tag-list {
      list-style: none;
      padding: 0;
      overflow: hidden;
      margin-left: $gap;
      margin-bottom: - $gap;

      .item {
        $height: 2em;
        display: inline-flex;
        margin-right: $sm-gap;
        margin-bottom: $gap;
        height: $height;
        line-height: $height;
        font-size: $font-size-h6;
        text-transform: capitalize;
        font-family: $font-family-normal;
        @include radius-box($mini-radius);

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
          }
        }

        &.link-active {
          .iconfont {
            color: $module-bg-opaque;
            background-color: $primary-translucent;
          }
          .name {
            background-color: $primary;
            color: $text-reversal;
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
