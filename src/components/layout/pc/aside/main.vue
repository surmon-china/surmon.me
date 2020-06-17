<template>
  <aside id="aside" class="aside">
    <!-- search -->
    <!-- article -->
    <client-only>
      <aside-ad
        ref="asideAd"
        @slide-change="handleSlideChange"
      />
    </client-only>
    <div class="aside-calendar">
      <calendar @click-day="" />
    </div>
    <transition name="module">
      <div key="ad" class="aside-mammon alimama">
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
        <aside-ad
          v-if="renderStickyAd"
          :init-index="adIndex"
          @slide-change="handleChangeAdSwiper"
        />
      </client-only>
      <!-- tag -->
    </div>
  </aside>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import StickyEvents from 'sticky-events'
  import AsideAd from './ad.vue'
  import Calendar from '/@/components/common/calendar.vue'
  import { Route } from '/@/constants/system'
  import { isClient } from '/@/vuniversal/env'
  import { isArticleDetailRoute, isSearchArchiveRoute } from '/@/services/route-validator'

  // polyfill sticky event
  let stickyEvents = null

  export default Vue.extend({
    name: 'PcAside',
    components: {
      AsideAd,
      Calendar
    },
    data() {
      return {
        adIndex: 0,
        renderStickyAd: false,
      }
    },
    mounted() {
      if (isClient) {
        this.$nextTick(() => {
          stickyEvents = new StickyEvents({
            enabled: true,
            stickySelector: '.aside-sticky-box'
          })
          stickyEvents.stickyElements[0].addEventListener(
            StickyEvents.CHANGE,
            this.handleStickyStateChange
          )
        })
      }
    },
    beforeDestroy() {
      stickyEvents.stickyElements[0].removeEventListener(
        StickyEvents.CHANGE,
        this.handleStickyStateChange
      )
      stickyEvents.disableEvents(false)
      stickyEvents = null
    },
    computed: {
      ...mapState({
        tags: state => state.tag.data,
      }),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      }
    },
    methods: {
      handleStickyStateChange(event) {
        // workaround: when (main container height >= aside height) & isSticky -> render sticky ad
        const asideElementHeight = this.$el.clientHeight
        const mainContentElementHeight = document.getElementById('main-content').children[0].clientHeight
        const isFeasible = mainContentElementHeight >= asideElementHeight
        this.renderStickyAd = isFeasible && event.detail.isSticky
      },
      handleSlideChange(index) {
        this.adIndex = index
      },
      handleChangeAdSwiper(index) {
        this.$refs.asideAd.swiper.slideToLoop(index)
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

    .aside-search,
    .aside-article,
    .aside-calendar,
    .aside-mammon,
    .aside-tag {
      margin-bottom: $lg-gap;
      @include module-blur-bg();
    }

    .aside-calendar {
      padding: $gap;
    }

    .aside-mammon {
      width: 100%;

      &.alimama {
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
