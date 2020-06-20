<template>
  <div v-if="isArticlePage" class="tools">
    <div class="full-column" @click="setFullColumn">
      <span v-i18n="LANGUAGE_KEYS.ARTICLE_FULL_COL_READ" />
      <span>&nbsp;&nbsp;</span>
      <i class="iconfont icon-read" />
    </div>
    <div class="full-page" @click="setFullScreen">
      <span v-i18n="LANGUAGE_KEYS.ARTICLE_FULL_SCREEN_READ" />
      <span>&nbsp;&nbsp;</span>
      <i class="iconfont icon-fullscreen" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useGlobalState, LayoutColumn } from '/@/state'
  import { getTagArchiveRoute, isArticleDetail } from '/@/transformers/route'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'PcAsideTags',
    setup() {
      const route = useRoute()
      const globalState = useGlobalState()
      const isArticlePage = computed(() => isArticleDetail(route.name))

      const setFullColumn = () => {
        globalState.layoutColumn.setLayoutColumn(LayoutColumn.Full)
      }

      const setFullScreen = () => {
        setFullColumn()
        document.documentElement.requestFullscreen()
      }

      return {
        LANGUAGE_KEYS,
        isArticlePage,
        getTagArchiveRoute,
        setFullColumn,
        setFullScreen
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';
  @import './variables.scss';

  .tools {
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
