<template>
  <aside id="aside" class="aside">
    <div class="search">
      <aside-search />
    </div>
    <div class="article">
      <aside-article />
    </div>
    <client-only>
      <div class="mammon">
        <aside-ad ref="asideAdComponent" @slide-change="handleSlideChange" />
      </div>
    </client-only>
    <div class="calendar">
      <calendar>
        <router-link v-slot="humanDate" :to="getDateRoute(humanDate)">
          {{ humanDate.day }}
        </router-link>
      </calendar>
    </div>
    <transition name="module">
      <div key="ad" class="ali-ma-ma">
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
        <div class="mammon">
          <aside-ad
            v-if="state.renderStickyAd"
            :init-index="state.adIndex"
            @slide-change="handleChangeAdSwiper"
          />
        </div>
      </client-only>
      <div class="tag">
        <aside-tag />
      </div>
      <div class="tool">
        <aside-tool />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import StickyEvents from 'sticky-events'
  import Calendar from '/@/components/common/calendar.vue'
  import { isClient } from '/@/vuniversal/env'
  import { getDateArchiveRoute } from '/@/transformers/route'
  import { humanDateToYMD, HumanDate } from '/@/transformers/moment'
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
      const asideAdComponent = ref(null)
      const state = reactive({
        adIndex: 0,
        renderStickyAd: false
      })

      const getDateRoute = (humanDate: HumanDate) => {
        return getDateArchiveRoute(humanDateToYMD(humanDate))
      }

      const handleStickyStateChange = (event) => {
        // workaround: when (main container height >= aside height) & isSticky -> render sticky ad
        const asideElementHeight = this.$el.clientHeight
        const mainContentElementHeight = document.getElementById('main-content')?.children[0].clientHeight
        const isFeasible = mainContentElementHeight >= asideElementHeight
        state.renderStickyAd = isFeasible && event.detail.isSticky
      }

      const handleSlideChange = (index) => {
        state.adIndex = index
      }

      const handleChangeAdSwiper = (index) => {
        this.$refs.asideAd.swiper.slideToLoop(index)
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

  #aside {
    display: block;
    width: $aside-width;
    margin: 0;
    margin-left: $lg-gap;
    user-select: none;

    .search,
    .article,
    .calendar,
    .mammon,
    .tag {
      margin-bottom: $lg-gap;
      @include module-blur-bg();
    }

    .calendar {
      padding: $gap;
    }

    .mammon {
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

    .aside-sticky-box {
      $top-height: $header-height + $lg-gap;
      $tool-height: 3rem;
      position: sticky;
      top: $top-height;
      width: $aside-width;
    }
  }
</style>
