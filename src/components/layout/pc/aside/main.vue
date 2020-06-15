<template>
  <aside id="aside" class="aside">
    <!-- search -->
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-hotfill" />
        <strong v-text="$i18n.text.article.hotlist" />
      </p>
      <empty-box v-if="!articles.length">
        <slot>{{ $i18n.text.article.empty }}</slot>
      </empty-box>
      <ul v-else class="aside-article-list">
        <li v-for="item in articles" :key="item.id" class="item">
          <span class="index" />
          <router-link
            class="title"
            :to="`/article/${item.id}`"
            :title="`${item.title} - 「 ${item.meta.comments} ${$i18n.text.comment.count} | ${item.meta.likes} ${$i18n.text.comment.like} 」`"
          >
            <span v-text="item.title" />
          </router-link>
        </li>
      </ul>
    </div>
    <client-only>
      <aside-ad
        ref="asideAd"
        @slide-change="handleSlideChange"
      />
    </client-only>
    <div class="aside-calendar">
      <calendar />
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
      <div class="aside-tag">
        <empty-box v-if="!tags.length">
          <slot>{{ $i18n.text.tag.empty }}</slot>
        </empty-box>
        <ul v-else class="aside-tag-list">
          <router-link
            v-for="(tag, index) in tags"
            :key="index"
            tag="li"
            class="item"
            :to="`/tag/${tag.slug}`"
          >
            <a class="title" :title="tag.description">
              <i
                v-if="tag.extends.find(t => t.name === 'icon')"
                :class="tag.extends.find(t => t.name === 'icon').value"
                class="iconfont"
              />
              <span class="name">
                <span>{{ isEnLang ? tag.slug : tag.name }}</span>
                <span>({{ tag.count || 0 }})</span>
              </span>
            </a>
          </router-link>
        </ul>
      </div>
      <div v-if="isArticlePage" class="aside-tools">
        <div class="full-column" @click="handleSetFullColumn">
          <span v-text="$i18n.text.article.fullcolread" />
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-read" />
        </div>
        <div class="full-page" @click="handleFullScreen">
          <span v-text="$i18n.text.article.fullscreenread" />
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-fullscreen" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import StickyEvents from 'sticky-events'
  import AsideAd from './ad'
  import Calendar from './calendar'
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
        articles: state => state.article.hotList.data,
      }),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isArticlePage() {
        return isArticleDetailRoute(this.$route.name)
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
      },
      handleSetFullColumn() {
        this.$store.commit('global/updateThreeColumnsState', true)
      },
      handleFullScreen() {
        this.handleSetFullColumn()
        const docElm = document.documentElement
        const requestEvent = (
          docElm.requestFullscreen ||
          docElm.mozRequestFullScreen ||
          docElm.webkitRequestFullScreen ||
          docElm.msRequestFullscreen
        )
        if (requestEvent) requestEvent.bind(docElm)()
      }
    }
  })
</script>

<style lang="scss" scoped>
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

    > .aside-article {
      overflow: hidden;

      > .title {
        height: 3em;
        line-height: 3em;
        margin: 0;
        padding: 0 $gap;
        border-bottom: 1px dashed $body-bg;
        text-transform: uppercase;

        .iconfont {
          margin-right: $sm-gap;
        }
      }

      > .aside-article-list {
        list-style: none;
        padding: $sm-gap 0;
        margin-bottom: 0;
        counter-reset: hot-article-list;

        .item {
          display: block;
          height: 1.9em;
          line-height: 1.9em;
          padding: 0 $gap;
          margin-bottom: $sm-gap;
          color: $text-dark;
          @include text-overflow();

          &:nth-child(1) {
            .index {
              color: $text-reversal;
              background-color: $primary-opacity-5;
            }
          }

          &:nth-child(2) {
            .index {
              color: $text-reversal;
              background-color: rgba($accent, .6);
            }
          }

          &:nth-child(3) {
            .index {
              color: $text-reversal;
              background-color: rgba($red, .6);
            }
          }

          &:last-child {
            margin: 0;
          }

          .index {
            color: $text-secondary;
            counter-increment: hot-article-list;
            background-color: $module-hover-bg;
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            display: inline-block;
            text-align: center;
            margin-right: $sm-gap;
            font-size: $gap;

            &::before {
              content: counter(hot-article-list);
            }
          }

          .title {
            font-size: $font-size-h6;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
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

      > .aside-tag {
        margin-bottom: 0;
        max-height: calc(100vh - 88px - #{$top-height + $lg-gap + $lg-gap + $tool-height});
        overflow-y: auto;
      }

      > .aside-tools {
        margin-top: $lg-gap;
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

      > .aside-tag {
        width: 100%;
        padding-left: $gap;
        border-top: $gap solid transparent;
        border-bottom: $gap solid transparent;

        .empty-box {
          padding-right: $gap;
          padding-bottom: $gap;
        }

        .aside-tag-list {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow: hidden;

          .item {
            display: inline-flex;
            margin-right: $sm-gap;
            margin-bottom: $gap;
            height: 2em;
            line-height: 2em;
            font-size: $font-size-h6;
            text-transform: capitalize;

            &:last-child {
              margin: 0;
            }

            &:hover {
              .title {
                .iconfont {
                  background-color: $module-hover-bg;
                }

                .name {
                  background-color: $module-hover-bg-darken-20;
                }
              }
            }

            .title {
              display: flex;
              font-family: $font-family-sans-serif;

              .iconfont {
                width: 2em;
                text-align: center;
                background-color: $module-hover-bg-opacity-3;
                @include background-transition();
              }

              .name {
                display: block;
                padding: 0 $sm-gap;
                background-color: $module-hover-bg;
                @include background-transition();
              }
            }
          }
        }
      }
    }
  }
</style>
