<template>
  <aside :id="ASIDE_ELEMENT_ID" class="aside" ref="element">
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
    <div class="module calendar">
      <calendar>
        <template #default="humanDate">
          <router-link
            class="date-link"
            v-if="canPushRouteWithDay(humanDate)"
            :to="getDateRoute(humanDate)"
          >
            {{ humanDate.day }}
          </router-link>
          <span v-else>{{ humanDate.day }}</span>
        </template>
      </calendar>
    </div>
    <div class="module mammon-square" :placeholder="t(LANGUAGE_KEYS.AD)">
      <client-only>
        <Adsense
          ins-class="adsbygoogle"
          data-ad-client="ca-pub-4710915636313788"
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
          <aside-nav class="sticky-module" />
        </client-only>
        <aside-tag class="sticky-module" v-else />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
  import Swiper from 'swiper'
  import { useRoute } from 'vue-router'
  import { defineComponent, ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { ASIDE_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from '/@/constants/anchor'
  import { useEnhancer } from '/@/app/enhancer'
  import { getDateArchiveRoute, isArticleDetail } from '/@/transforms/route'
  import { humanDateToYMD, dateToHuman, HumanDate } from '/@/transforms/moment'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import AsideSearch from './search.vue'
  import AsideArticle from './article.vue'
  import AsideMammon from './mammon.vue'
  import AsideTag from './tag.vue'
  import AsideNav from './nav.vue'
  import Calendar from '/@/components/widget/calendar.vue'

  const ASIDE_STICKY_ELEMENT_ID = 'aside-sticky-module'

  export default defineComponent({
    name: 'PCAside',
    components: {
      AsideSearch,
      AsideArticle,
      AsideMammon,
      Calendar,
      AsideTag,
      AsideNav
    },
    setup() {
      const route = useRoute()
      const { i18n } = useEnhancer()
      const isArticlePage = computed(() => isArticleDetail(route.name))

      // polyfill sticky event
      let stickyEvents: any = null
      const today = dateToHuman(new Date())
      const element = ref<HTMLDivElement>(null as any)
      const adIndex = ref(0)
      const renderStickyAd = ref(false)
      const standingSwiperInstance = ref<Swiper>()

      const canPushRouteWithDay = (targetDate: HumanDate) => {
        if (targetDate.year > today.year) {
          return false
        }
        if (targetDate.month > today.month) {
          return false
        }
        if (
          targetDate.year == today.year &&
          targetDate.month == today.month &&
          targetDate.day > today.day
        ) {
          return false
        }
        return true
      }

      const getDateRoute = (humanDate: HumanDate) => {
        return getDateArchiveRoute(humanDateToYMD(humanDate))
      }

      const handleStandingAdSlideChange = (index: number) => {
        adIndex.value = index
      }
      const handleStandingAdSwiperReady = (swiper: Swiper) => {
        standingSwiperInstance.value = swiper
      }
      const handleStickyAdIndexChange = (index: number) => {
        standingSwiperInstance.value?.slideToLoop(index)
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
        LANGUAGE_KEYS,
        ASIDE_ELEMENT_ID,
        ASIDE_STICKY_ELEMENT_ID,
        t: i18n.t,
        adIndex,
        renderStickyAd,
        element,
        canPushRouteWithDay,
        getDateRoute,
        handleStandingAdSwiperReady,
        handleStandingAdSlideChange,
        handleStickyAdIndexChange
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .aside {
    display: block;
    width: $aside-width;
    margin: 0;
    margin-left: $lg-gap;

    .module {
      margin-bottom: $lg-gap;
      @include radius-box($sm-radius);
      @include common-bg-module();

      &.calendar {
        padding: $gap;

        .date-link {
          display: block;
          border-radius: 100%;

          &.link-active {
            background-color: $primary;
            color: $text-reversal;
          }
        }
      }

      &.mammon {
        width: 100%;
      }

      &.mammon-square {
        @extend .center-placeholder;
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
