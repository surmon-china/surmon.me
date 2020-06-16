<template>
  <div class="aside-tag">
    <empty-box v-if="!tags.length">
      <slot>{{ $i18n.text.tag.empty }}</slot>
    </empty-box>
    <ul v-else class="aside-tag-list">
      <router-link
        v-for="(tag, index) in tags"
        :key="index"
        tag="li"
        class="item"
        :to="`/tag/${tag.slug}`"
      >
        <a class="title" :title="tag.description">
          <i
            v-if="tag.extends.find(t => t.name === 'icon')"
            :class="tag.extends.find(t => t.name === 'icon').value"
            class="iconfont"
          />
          <span class="name">
            <span>{{ isEnLang ? tag.slug : tag.name }}</span>
            <span>({{ tag.count || 0 }})</span>
          </span>
        </a>
      </router-link>
    </ul>
  </div>
  <div v-if="isArticlePage" class="aside-tools">
    <div class="full-column" @click="handleSetFullColumn">
      <span v-text="$i18n.text.article.fullcolread" />
      <span>&nbsp;&nbsp;</span>
      <i class="iconfont icon-read" />
    </div>
    <div class="full-page" @click="handleFullScreen">
      <span v-text="$i18n.text.article.fullscreenread" />
      <span>&nbsp;&nbsp;</span>
      <i class="iconfont icon-fullscreen" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from '/@/store'
  import { RouteName } from '/@/router'
  import { useI18n } from '/@/services/i18n'
  import { isSearchArchive } from '/@/transformers/route'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'PcAsideTags',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      const tags = computed(() => store.state.tag.data)

      return {
        tags,
        t: i18n.t,
        LANGUAGE_KEYS
      }
    }
  })
</script>

<style lang="scss" scoped>
  > .aside-tag {
    margin-bottom: 0;
    max-height: calc(100vh - 88px - #{$top-height + $lg-gap + $lg-gap + $tool-height});
    overflow-y: auto;
    width: 100%;
    padding-left: $gap;
    border-top: $gap solid transparent;
    border-bottom: $gap solid transparent;

    .empty-box {
      padding-right: $gap;
      padding-bottom: $gap;
    }

    .aside-tag-list {
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

  > .aside-tools {
    margin-top: $lg-gap;
    display: flex;
    justify-content: space-between;

    > .full-column {
      margin-right: $sm-gap;
    }

    > .full-page {
      margin-left: $sm-gap;
    }

    > .full-column,
    > .full-page {
      display: inline-block;
      flex-grow: 1;
      height: $tool-height;
      line-height: $tool-height;
      text-align: center;
      background-color: $module-bg;
      @include background-transition();
      cursor: pointer;

      &:hover {
        background-color: $module-hover-bg;
      }
    }
  }
</style>
