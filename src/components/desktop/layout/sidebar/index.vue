<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  import { SIDEBAR_ELEMENT_ID } from '/@/constants/element-anchor'
  import { isArticleDetail } from '/@/transforms/route'
  import SidebarSearch from './search.vue'
  import SidebarStatistic from './statistic.vue'
  import SidebarArticles from './articles.vue'
  import SidebarMammon from './mammon.vue'
  import SidebarCalendar from './calendar.vue'
  import SidebarAnchor from './anchor.vue'
  import SidebarTags from './tags.vue'

  const route = useRoute()
  const isArticlePage = computed(() => isArticleDetail(route.name))
</script>

<template>
  <div :id="SIDEBAR_ELEMENT_ID" class="desktop-sidebar" v-disabled-wallflower>
    <div class="module">
      <sidebar-search />
    </div>
    <div class="module">
      <sidebar-statistic />
    </div>
    <div class="module">
      <sidebar-articles />
    </div>
    <client-only transition>
      <div class="module mammon">
        <sidebar-mammon />
      </div>
    </client-only>
    <div class="module">
      <sidebar-calendar />
    </div>
    <div class="sidebar-sticky-box">
      <div class="module mammon-square">
        <client-only>
          <Adsense
            ins-style="display:inline-block;width:250px;height:250px"
            data-ad-slot="6138120718"
            class="content"
          />
        </client-only>
      </div>
      <div class="module">
        <client-only v-if="isArticlePage">
          <sidebar-anchor class="sticky-module" />
        </client-only>
        <sidebar-tags class="sticky-module" v-else />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .desktop-sidebar {
    display: block;
    padding: 0;
    width: $sidebar-width;

    .module {
      margin-bottom: $gap;
      @include mix.radius-box($radius-sm);
      @include mix.common-bg-module();

      &.mammon {
        width: 100%;
      }

      &.mammon-square {
        padding: $gap-sm;

        .content {
          height: 250px;
          width: 250px;
        }
      }

      .sticky-module {
        max-height: calc(100vh - 250px - #{$header-height + $gap * 3 + $gap-sm * 2});
      }
    }

    .sidebar-sticky-box {
      position: sticky;
      top: $header-height + $gap;
    }
  }
</style>
