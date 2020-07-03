<template>
  <div class="tag">
    <su-empty v-if="!tags.length">
      <i18n :lkey="LANGUAGE_KEYS.TAG_PLACEHOLDER" />
    </su-empty>
    <ul v-else class="tag-list">
      <router-link
        tag="li"
        class="item"
        :title="tag.description"
        :to="getTagArchiveRoute(tag.slug)"
        :key="index"
        v-for="(tag, index) in tags"
      >
        <i class="iconfont" :class="getTagIcon(tag)" />
        <span class="name">
          <i18n :zh="tag.name" :en="tag.slug" />
          <span class="count">({{ tag.count || 0 }})</span>
        </span>
      </router-link>
    </ul>
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
      const tags = computed(() => store.state.tag.data)

      const getTagIcon = (tag: any) => {
        return getExtendsValue(tag, 'icon')?.value || 'icon-tag'
      }

      return {
        LANGUAGE_KEYS,
        t: i18n.t,
        tags,
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
    padding-left: $gap;
    border-top: $gap solid transparent;
    border-bottom: $gap solid transparent;

    .su-empty {
      padding-right: $gap;
      padding-bottom: $gap;
    }

    .tag-list {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;

      .item {
        display: inline-flex;
        margin-right: $sm-gap;
        margin-bottom: $gap;
        height: 2em;
        line-height: 2em;
        font-size: $font-size-h6;
        text-transform: capitalize;
        font-family: $font-family-sans-serif;
        &:last-child {
          margin: 0;
        }

        .iconfont {
          width: 2em;
          text-align: center;
          background-color: $module-hover-bg-opacity-3;
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
          background-color: $primary;
          color: $text-reversal;
        }

        &:not(.link-active) {
          .name {
            background-color: $module-hover-bg;
          }

          &:hover {
            .iconfont {
              background-color: $module-hover-bg;
            }
            .name {
              background-color: $module-hover-bg-darken-20;
            }
          }
        }
      }
    }
  }
</style>
