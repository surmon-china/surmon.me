<template>
  <aside id="aside" class="aside" ref="element">
    <div class="module">
      <aside-search />
    </div>
    <div class="module">
      <aside-article />
    </div>
    <client-only>
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
          <router-link class="date-link" :to="getDateRoute(humanDate)">
            {{ humanDate.day }}
          </router-link>
        </template>
      </calendar>
    </div>
    <transition name="module">
      <div key="ad" class="module ali-ma-ma">
        <iframe
          scrolling="no"
          frameborder="0"
          class="mammon-iframe"
          src="/partials/mammon/aside.html"
        />
      </div>
    </transition>
    <div class="aside-sticky-box">
      <client-only>
        <div class="module mammon">
          <aside-mammon
            v-if="renderStickyAd"
            :index="adIndex"
            @index-change="handleStickyAdIndexChange"
          />
        </div>
      </client-only>
      <div class="module">
        <aside-tag />
      </div>
      <div class="module">
        <aside-tool />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
  import Swiper from 'swiper'
  import StickyEvents from 'sticky-events'
  import { defineComponent, ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { getDateArchiveRoute } from '/@/transforms/route'
  import { humanDateToYMD, HumanDate } from '/@/transforms/moment'
  import Calendar from '/@/components/widget/calendar.vue'
  import AsideSearch from './search.vue'
  import AsideArticle from './article.vue'
  import AsideMammon from './mammon.vue'
  import AsideTag from './tag.vue'
  import AsideTool from './tool.vue'

  export default defineComponent({
    name: 'PcAside',
    components: {
      AsideSearch,
      AsideArticle,
      AsideMammon,
      Calendar,
      AsideTag,
      AsideTool
    },
    setup() {
      // polyfill sticky event
      let stickyEvents: any = null
      const element = ref<HTMLDivElement>(null as any)
      const adIndex = ref(0)
      const renderStickyAd = ref(false)
      const standingSwiperInstance = ref<Swiper>()

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
        // @ts-ignore
        const mainContentElementHeight = document.getElementById('main-content').children[0].clientHeight
        const isFeasible = mainContentElementHeight >= asideElementHeight
        renderStickyAd.value = isFeasible && event.detail.isSticky
      }

      onMounted(() => {
        nextTick(() => {
          stickyEvents = new StickyEvents({
            enabled: true,
            stickySelector: '.aside-sticky-box'
          })
          stickyEvents.stickyElements[0].addEventListener(
            StickyEvents.CHANGE,
            handleStickyStateChange
          )
        })
      })

      onBeforeUnmount(() => {
        stickyEvents.stickyElements[0].removeEventListener(
          StickyEvents.CHANGE,
          handleStickyStateChange
        )
        stickyEvents.disableEvents(false)
        stickyEvents = null
      })

      return {
        adIndex,
        renderStickyAd,
        element,
        getDateRoute,
        handleStandingAdSwiperReady,
        handleStandingAdSlideChange,
        handleStickyAdIndexChange,
        handleStickyStateChange
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';
  @import './variables.scss';

  #aside {
    display: block;
    width: $aside-width;
    margin: 0;
    margin-left: $lg-gap;
    user-select: none;

    .module {
      margin-bottom: $lg-gap;
      @include module-blur-bg();

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

        &.ali-ma-ma {
          height: $aside-width;
          display: flex;
          justify-content: center;
          align-items: center;

          > .mammon-iframe {
            height: 250px;
            width: 250px;
            overflow: hidden;
          }
        }
      }

      &.tools {
        margin-top: $lg-gap;
      }
    }

    .aside-sticky-box {
      position: sticky;
      top: $top-height;
      width: $aside-width;
    }
  }
</style>
