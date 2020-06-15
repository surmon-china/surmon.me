<template>
  <div class="aside-article">
    <p class="title">
      <i class="iconfont icon-hotfill" />
      <strong v-text="$i18n.text.article.hotlist" />
    </p>
    <empty-box v-if="!articles.length">
      <slot>{{ $i18n.text.article.empty }}</slot>
    </empty-box>
    <ul v-else class="aside-article-list">
      <li v-for="item in articles" :key="item.id" class="item">
        <span class="index" />
        <router-link
          class="title"
          :to="`/article/${item.id}`"
          :title="`${item.title} - 「 ${item.meta.comments} ${$i18n.text.comment.count} | ${item.meta.likes} ${$i18n.text.comment.like} 」`"
        >
          <span v-text="item.title" />
        </router-link>
      </li>
    </ul>
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
    name: 'PcAsideArticles',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      // TODO: article
      // @ts-ignore
      const articles = computed(() => store.state.article.hotList.data)

      return {
        articles,
        t: i18n.t,
        LANGUAGE_KEYS
      }
    }
  })
</script>

<style lang="scss" scoped>
  .aside-article {
    overflow: hidden;

    > .title {
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dashed $body-bg;
      text-transform: uppercase;

      .iconfont {
        margin-right: $sm-gap;
      }
    }

    > .aside-article-list {
      list-style: none;
      padding: $sm-gap 0;
      margin-bottom: 0;
      counter-reset: hot-article-list;

      .item {
        display: block;
        height: 1.9em;
        line-height: 1.9em;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        color: $text-dark;
        @include text-overflow();

        &:nth-child(1) {
          .index {
            color: $text-reversal;
            background-color: $primary-opacity-5;
          }
        }

        &:nth-child(2) {
          .index {
            color: $text-reversal;
            background-color: rgba($accent, .6);
          }
        }

        &:nth-child(3) {
          .index {
            color: $text-reversal;
            background-color: rgba($red, .6);
          }
        }

        &:last-child {
          margin: 0;
        }

        .index {
          color: $text-secondary;
          counter-increment: hot-article-list;
          background-color: $module-hover-bg;
          width: 1.5em;
          height: 1.5em;
          line-height: 1.5em;
          display: inline-block;
          text-align: center;
          margin-right: $sm-gap;
          font-size: $gap;

          &::before {
            content: counter(hot-article-list);
          }
        }

        .title {
          font-size: $font-size-h6;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
