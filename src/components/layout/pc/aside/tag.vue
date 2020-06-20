<template>
  <div class="tag">
    <su-empty v-if="!tags.length">
      <i18n :lkey="LANGUAGE_KEYS.TAG_PLACEHOLDER" />
    </su-empty>
    <ul v-else class="tag-list">
      <router-link
        v-for="(tag, index) in tags"
        :key="index"
        tag="li"
        class="item"
        :to="getTagArchiveRoute(tag.slug)"
      >
        <a class="title" :title="tag.description">
          <i
            v-if="tag.extends.find(t => t.name === 'icon')"
            :class="tag.extends.find(t => t.name === 'icon').value"
            class="iconfont"
          />
          <span class="name">
            <span>{{ isZhLang ? tag.name : tag.slug }}</span>
            <span>({{ tag.count || 0 }})</span>
          </span>
        </a>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from '/@/store'
  import { useI18n } from '/@/services/i18n'
  import { getTagArchiveRoute, isArticleDetail } from '/@/transformers/route'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { Language } from '/@/language/data'

  export default defineComponent({
    name: 'PcAsideTag',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      const route = useRoute()
      const tags = computed(() => store.state.tag.data)
      const isArticlePage = computed(() => isArticleDetail(route.name))
      const isZhLang = computed(() => i18n.language.value === Language.Zh)

      return {
        tags,
        t: i18n.t,
        LANGUAGE_KEYS,
        isZhLang,
        isArticlePage,
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

        &:last-child {
          margin: 0;
        }

        &:hover {
          .title {
            .iconfont {
              background-color: $module-hover-bg;
            }

            .name {
              background-color: $module-hover-bg-darken-20;
            }
          }
        }

        .title {
          display: flex;
          font-family: $font-family-sans-serif;

          .iconfont {
            width: 2em;
            text-align: center;
            background-color: $module-hover-bg-opacity-3;
            @include background-transition();
          }

          .name {
            display: block;
            padding: 0 $sm-gap;
            background-color: $module-hover-bg;
            @include background-transition();
          }
        }
      }
    }
  }
</style>
