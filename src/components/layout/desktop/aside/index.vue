<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { ASIDE_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/anchor'
  import { isArticleDetail } from '/@/transforms/route'
  import AsideSearch from './search.vue'
  import AsideStatistic from './statistic.vue'
  import AsideArticle from './article.vue'
  import AsideMammon from './mammon.vue'
  import AsideTag from './tag.vue'
  import AsideAnchor from './anchor.vue'
  import AsideCalendar from './calendar.vue'

  const ASIDE_STICKY_ELEMENT_ID = 'aside-sticky-module'

  const route = useRoute()
  const isArticlePage = computed(() => isArticleDetail(route.name))

  // polyfill sticky event
  let stickyEvents: any = null
  const element = ref<HTMLDivElement>(null as any)

  const handleStickyStateChange = () => {
    // workaround: when (main container height >= aside height) & isSticky -> render sticky ad
    const targetElement = document.getElementById(MAIN_CONTENT_ELEMENT_ID)?.children?.[0]
    // const asideElementHeight = element.value.clientHeight
    if (targetElement) {
      // const mainContentElementHeight = targetElement.clientHeight
      // const isFeasible = mainContentElementHeight >= asideElementHeight
      // console.log(isFeasible && event.detail.isSticky)
    }
  }

  onMounted(() => {
    nextTick(() => {
      stickyEvents = new window.$StickyEvents({
        enabled: true,
        stickySelector: `#${ASIDE_STICKY_ELEMENT_ID}`
      })
      stickyEvents.stickyElements?.[0]?.addEventListener(window.$StickyEvents.CHANGE, handleStickyStateChange)
    })
  })

  onBeforeUnmount(() => {
    stickyEvents.stickyElements?.[0]?.removeEventListener(window.$StickyEvents.CHANGE, handleStickyStateChange)
    stickyEvents.disableEvents(false)
    stickyEvents = null
  })
</script>

<template>
  <aside :id="ASIDE_ELEMENT_ID" class="desktop-aside" ref="element" v-disabled-wallflower>
    <div class="module">
      <aside-search />
    </div>
    <div class="module">
      <aside-statistic />
    </div>
    <div class="module">
      <aside-article />
    </div>
    <client-only transition>
      <div class="module mammon">
        <aside-mammon />
      </div>
    </client-only>
    <div class="module">
      <aside-calendar />
    </div>
    <div :id="ASIDE_STICKY_ELEMENT_ID" class="aside-sticky-box">
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
          <aside-anchor class="sticky-module" />
        </client-only>
        <aside-tag class="sticky-module" v-else />
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .desktop-aside {
    display: block;
    padding: 0;
    width: $aside-width;

    .module {
      margin-bottom: $lg-gap;
      @include radius-box($sm-radius);
      @include common-bg-module();

      &.mammon {
        width: 100%;
      }

      &.mammon-square {
        height: $aside-width;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
          height: 250px;
          width: 250px;
          overflow: hidden;
        }
      }

      .sticky-module {
        max-height: calc(100vh - 250px - #{$header-height + $lg-gap * 4});
      }
    }

    .aside-sticky-box {
      position: sticky;
      top: $header-height + $lg-gap;
      width: $aside-width;
    }
  }
</style>
