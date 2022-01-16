<template>
  <aside :id="ASIDE_ELEMENT_ID" class="desktop-aside" ref="element">
    <div class="module">
      <aside-search />
    </div>
    <div class="module">
      <aside-article />
    </div>
    <client-only transition>
      <div class="module mammon">
        <aside-mammon
          @index-change="handleStandingAdSlideChange"
          @ready="handleStandingAdSwiperReady"
        />
      </div>
    </client-only>
    <div class="module">
      <aside-calendar />
    </div>
    <div class="module mammon-square">
      <client-only>
        <Adsense
          ins-style="display:inline-block;width:250px;height:250px"
          data-ad-slot="6138120718"
          class="content"
        />
      </client-only>
    </div>
    <div :id="ASIDE_STICKY_ELEMENT_ID" class="aside-sticky-box">
      <client-only>
        <div class="module mammon" v-if="renderStickyAd">
          <aside-mammon :index="adIndex" @index-change="handleStickyAdIndexChange" />
        </div>
      </client-only>
      <div class="module">
        <client-only v-if="isArticlePage">
          <aside-anchor class="sticky-module" />
        </client-only>
        <aside-tag class="sticky-module" v-else />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
  import { useRoute } from 'vue-router'
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import SwiperClass from '/@/services/swiper'
  import { ASIDE_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/anchor'
  import { isArticleDetail } from '/@/transforms/route'
  import AsideSearch from './search.vue'
  import AsideArticle from './article.vue'
  import AsideMammon from './mammon.vue'
  import AsideTag from './tag.vue'
  import AsideAnchor from './anchor.vue'
  import AsideCalendar from './calendar.vue'

  const ASIDE_STICKY_ELEMENT_ID = 'aside-sticky-module'

  export default defineComponent({
    name: 'DesktopAside',
    components: {
      AsideSearch,
      AsideArticle,
      AsideMammon,
      AsideCalendar,
      AsideTag,
      AsideAnchor
    },
    setup() {
      const route = useRoute()
      const isArticlePage = computed(() => isArticleDetail(route.name))

      // polyfill sticky event
      let stickyEvents: any = null
      const element = ref<HTMLDivElement>(null as any)
      const adIndex = ref(0)
      const renderStickyAd = ref(false)
      const swiper = ref<SwiperClass>()

      const handleStandingAdSwiperReady = (_swiper: SwiperClass) => {
        swiper.value = _swiper
      }
      const handleStandingAdSlideChange = (index: number) => {
        adIndex.value = index
      }
      const handleStickyAdIndexChange = (index: number) => {
        swiper.value?.slideToLoop(index)
      }

      const handleStickyStateChange = (event) => {
        // workaround: when (main container height >= aside height) & isSticky -> render sticky ad
        const asideElementHeight = element.value.clientHeight
        const targetElement = document.getElementById(MAIN_CONTENT_ELEMENT_ID)?.children?.[0]
        if (targetElement) {
          const mainContentElementHeight = targetElement.clientHeight
          const isFeasible = mainContentElementHeight >= asideElementHeight
          renderStickyAd.value = isFeasible && event.detail.isSticky
        }
      }

      onMounted(() => {
        nextTick(() => {
          stickyEvents = new window.$StickyEvents({
            enabled: true,
            stickySelector: `#${ASIDE_STICKY_ELEMENT_ID}`
          })
          stickyEvents.stickyElements?.[0]?.addEventListener(
            window.$StickyEvents.CHANGE,
            handleStickyStateChange
          )
        })
      })

      onBeforeUnmount(() => {
        stickyEvents.stickyElements?.[0]?.removeEventListener(
          window.$StickyEvents.CHANGE,
          handleStickyStateChange
        )
        stickyEvents.disableEvents(false)
        stickyEvents = null
      })

      return {
        isArticlePage,
        ASIDE_ELEMENT_ID,
        ASIDE_STICKY_ELEMENT_ID,
        renderStickyAd,
        adIndex,
        element,
        handleStandingAdSwiperReady,
        handleStandingAdSlideChange,
        handleStickyAdIndexChange
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
        max-height: calc(100vh - 88px - #{$header-height + $lg-gap + $lg-gap + $lg-gap});
      }
    }

    .aside-sticky-box {
      position: sticky;
      top: $header-height + $lg-gap;
      width: $aside-width;
    }
  }
</style>
