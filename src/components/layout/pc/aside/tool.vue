<template>
  <div v-if="isArticlePage" class="tools">
    <button class="full-column" @click="setFullColumn">
      <span v-i18n="LANGUAGE_KEYS.ARTICLE_FULL_COL_READ" />
      <i class="iconfont icon-read" />
    </button>
    <button class="full-page" @click="setFullScreen">
      <span v-i18n="LANGUAGE_KEYS.ARTICLE_FULL_SCREEN_READ" />
      <i class="iconfont icon-fullscreen" />
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useGlobalState, LayoutColumn } from '/@/state'
  import { getTagArchiveRoute, isArticleDetail } from '/@/transforms/route'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'PcAsideTool',
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
      @include radius-box($xs-radius);
      @include common-bg-module();

      .iconfont {
        margin-left: $gap;
      }
    }
  }
</style>
