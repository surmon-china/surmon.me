<template>
  <aside id="aside" class="aside">
    <div class="aside-search">
      <div class="search-box">
        <input
          id="keyword"
          required
          list="keywords"
          type="search"
          name="search"
          class="search-input"
          :class="language"
          :placeholder="$i18n.text.search"
          v-model.trim="keyword"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          <i class="iconfont icon-search"></i>
        </button>
        <client-only>
          <datalist class="search-keywords" id="keywords" v-if="tags.length">
            <option class="iiem"
              :value="isEnLang ? tag.slug : tag.name"
              :label="tag.description"
              :key="tag.slug"
              v-for="tag in tags"
            />
          </datalist>
        </client-only>
      </div>
      <nuxt-link to="/sitemap" class="sitemap-btn">
        <i class="iconfont icon-book"></i>
      </nuxt-link>
    </div>
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-hotfill"></i>
        <strong v-text="$i18n.text.article.hotlist"></strong>
      </p>
      <empty-box v-if="!articles.length">
        <slot>{{ $i18n.text.article.empty }}</slot>
      </empty-box>
      <ul class="aside-article-list" v-else>
        <li class="item" :key="item.id" v-for="item in articles">
          <span class="index"></span>
          <nuxt-link
            class="title"
            :to="`/article/${item.id}`"
            :title="`${item.title} - 「 ${item.meta.comments} ${$i18n.text.comment.count} | ${item.meta.likes} ${$i18n.text.comment.like} 」`"
          >
            <span v-text="item.title"></span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <aside-ad ref="asideAd" @slideChange="handleSlideChange" />
    <div class="aside-calendar">
      <calendar />
    </div>
    <transition name="module">
      <div class="aside-mammon alimama" key="ad">
        <iframe
          scrolling="no"
          frameborder="0"
          class="mammon-iframe"
          src="/partials/mammon/aside.html"
        />
      </div>
    </transition>
    <div class="aside-sticky-box">
      <aside-ad :initIndex="adIndex" @slideChange="handleChangeAdSwiper" v-if="renderStickyAd" />
      <div class="aside-tag">
        <empty-box v-if="!tags.length">
          <slot>{{ $i18n.text.tag.empty }}</slot>
        </empty-box>
        <ul class="aside-tag-list" v-else>
          <nuxt-link
            tag="li"
            class="item"
            :key="index"
            :to="`/tag/${tag.slug}`"
            v-for="(tag, index) in tags"
          >
            <a class="title" :title="tag.description">
              <i
                class="iconfont"
                :class="tag.extends.find(t => Object.is(t.name, 'icon')).value"
                v-if="tag.extends.find(t => Object.is(t.name, 'icon'))"
              ></i>
              <span class="name">
                <span>{{ isEnLang ? tag.slug : tag.name }}</span>
                <span>({{ tag.count || 0 }})</span>
              </span>
            </a>
          </nuxt-link>
        </ul>
      </div>
      <div class="aside-tools" v-if="isArticlePage">
        <div class="full-column" @click="handleSetFullColumn">
          <span v-text="$i18n.text.article.fullcolread"></span>
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-read"></i>
        </div>
        <div class="full-page" @click="handleFullScreen">
          <span v-text="$i18n.text.article.fullscreenread"></span>
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-fullscreen"></i>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  import { mapState } from 'vuex'
  import StickyEvents from 'sticky-events'
  import AsideAd from './ad'
  import Calendar from './calendar'
  import { Route } from '~/constants/system'
  import { isBrowser } from '~/environment'
  import { isArticleDetailRoute, isSearchArchiveRoute } from '~/services/route-validator'

  // polyfill sticky event
  let stickyEvents = null

  export default {
    name: 'pc-aside',
    components: {
      AsideAd,
      Calendar
    },
    data() {
      return {
        adIndex: 0,
        keyword: '',
        renderStickyAd: false,
      }
    },
    mounted() {
      if (isSearchArchiveRoute(this.$route.name)) {
        this.keyword = this.$route.params.keyword
      }
      if (isBrowser) {
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
        language: state => state.global.language,
      }),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isArticlePage() {
        return isArticleDetailRoute(this.$route.name)
      }
    },
    methods: {
      handleSearch() {
        const keyword = this.keyword
        const paramsKeyword = this.$route.params.keyword
        const isSearchPage = isSearchArchiveRoute(this.$route.name)
        if (keyword && (isSearchPage ? (paramsKeyword !== keyword) : true)) {
          this.$router.push({ name: Route.SearchArchive, params: { keyword }})
        }
      },
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
        const requestEvent =
          docElm.requestFullscreen ||
          docElm.mozRequestFullScreen ||
          docElm.webkitRequestFullScreen ||
          docElm.msRequestFullscreen
        if (requestEvent) requestEvent.bind(docElm)()
      }
    }
  }
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

    .aside-search {
      padding: $sm-gap;
      width: 100%;
      height: 3em;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      .search-input,
      .search-btn,
      .sitemap-btn {
        height: 2em;
        line-height: 2em;
        background-color: $module-hover-bg;

        &:hover {
          background-color: $module-hover-bg-darken-20;
        }
      }

      > .search-box {
        display: flex;
        flex-grow: 1;

        > .search-input {
          margin-right: 0;
          flex-grow: 1;
          
          &::-webkit-calendar-picker-indicator {
            display: none;
          }
        }

        > .search-btn {
          width: 2em;
          background-color: $module-hover-bg-darken-20;

          &:hover {
            background-color: $module-hover-bg-darken-40;
          }
        }
      }

      > .sitemap-btn {
        display: inline-block;
        text-align: center;
        margin-left: $sm-gap;
        width: 3em;

        > .iconfont {
          font-size: $font-size-h3;
        }
      }
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
              }

              .name {
                display: block;
                padding: 0 $sm-gap;
                background-color: $module-hover-bg;
              }
            }
          }
        }
      }
    }
  }
</style>
