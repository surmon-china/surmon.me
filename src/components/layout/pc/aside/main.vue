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
        <aside-ad ref="asideAdComponent" @slide-change="handleSlideChange" />
      </div>
    </client-only>
    <div class="module calendar">
      <calendar>
        <template #default="humanDate">
          <!-- TODO: 感觉 sitemap（如果已拉取） 来判断，到底有没有文章数据 -->
          <router-link :to="getDateRoute(humanDate)">
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
          <aside-ad
            v-if="state.renderStickyAd"
            :init-index="state.adIndex"
            @slide-change="handleChangeAdSwiper"
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
  import { defineComponent, ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import StickyEvents from 'sticky-events'
  import Calendar from '/@/components/widget/calendar.vue'
  import { isClient } from '/@/vuniversal/env'
  import { getDateArchiveRoute } from '/@/transforms/route'
  import { humanDateToYMD, HumanDate } from '/@/transforms/moment'
  import AsideSearch from './search.vue'
  import AsideArticle from './article.vue'
  import AsideAd from './ad.vue'
  import AsideTag from './tag.vue'
  import AsideTool from './tool.vue'

  export default defineComponent({
    name: 'PcAside',
    components: {
      AsideSearch,
      AsideArticle,
      AsideAd,
      Calendar,
      AsideTag,
      AsideTool
    },
    setup() {
      // polyfill sticky event
      let stickyEvents: any = null
      const element = ref<HTMLDivElement>(null as any)
      const asideAdComponent = ref<any>(null)
      const state = reactive({
        adIndex: 0,
        renderStickyAd: false
      })

      const getDateRoute = (humanDate: HumanDate) => {
        return getDateArchiveRoute(humanDateToYMD(humanDate))
      }

      const handleStickyStateChange = (event) => {
        // workaround: when (main container height >= aside height) & isSticky -> render sticky ad
        const asideElementHeight = element.value.clientHeight
        // @ts-ignore
        const mainContentElementHeight = document.getElementById('main-content').children[0].clientHeight
        const isFeasible = mainContentElementHeight >= asideElementHeight
        state.renderStickyAd = isFeasible && event.detail.isSticky
      }

      const handleSlideChange = (index) => {
        state.adIndex = index
      }

      const handleChangeAdSwiper = (index) => {
        asideAdComponent.value.swiper.slideToLoop(index)
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
        state,
        element,
        asideAdComponent,
        getDateRoute,
        handleStickyStateChange,
        handleSlideChange,
        handleChangeAdSwiper
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
