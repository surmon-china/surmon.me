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
        <nuxt-link to="/sitemap" class="sitemap-btn">
          <i class="iconfont icon-book"></i>
        </nuxt-link>
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
      <div class="aside-mammon ali-mama" key="ad">
        <iframe
          src="/partials/mammon/aside.html"
          scrolling="no"
          frameborder="0"
          class="mammon-iframe"
        ></iframe>
      </div>
    </transition>
    <div class="aside-fixed-box" :class="{ fixed: fixedMode.fixed }" v-scroll-top>
      <client-only>
        <transition name="fade">
          <aside-ad :initIndex="adIndex" @slideChange="handleChangeAdSwiper" v-if="fixedMode.fixed" />
        </transition>
      </client-only>
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
              <span>{{ isEnLang ? tag.slug : tag.name }}</span>
              <span>({{ tag.count || 0 }})</span>
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
  import AsideAd from './ad'
  import Calendar from './calendar'
  import { mapState } from 'vuex'
  import { Route } from '~/constants/system'
  import { isArticleDetailRoute, isSearchArchiveRoute } from '~/services/route-validator'
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
        fixedMode: {
          fixed: false,
          element: null,
          sidebarFixedOffsetTop: 0
        }
      }
    },
    mounted() {
      if (isSearchArchiveRoute(this.$route.name)) {
        this.keyword = this.$route.params.keyword
      }
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
      },
      parseScroll() {
        const element = this.fixedMode.element
        const sidebarFixedOffsetTop = this.fixedMode.sidebarFixedOffsetTop
        const windowScrollTop =
          document.documentElement.scrollTop || 
          window.pageYOffset || 
          window.scrollY ||
          document.body.scrollTop
        const newSidebarFixedOffsetTop = element.offsetTop
        this.fixedMode.sidebarFixedOffsetTop =
          (newSidebarFixedOffsetTop !== sidebarFixedOffsetTop && newSidebarFixedOffsetTop !== 77)
            ? newSidebarFixedOffsetTop
            : sidebarFixedOffsetTop
        const isFixed = windowScrollTop > sidebarFixedOffsetTop
        this.fixedMode.fixed = isFixed && element
      }
    },
    directives: {
      scrollTop: {
        inserted(element, _, VNode) {
          // context
          const context = VNode.context
          // element
          context.fixedMode.element = element
          // 检测此元素相对于文档Document原点的绝对位置，并且这个值是不变化的
          context.fixedMode.sidebarFixedOffsetTop = element.offsetTop
          // 初始化应用
          context.parseScroll()
          // 监听滚动事件
          window.addEventListener('scroll', context.parseScroll, { passive: true })
        },
        unbind(element, _, VNode) {
          window.removeEventListener('scroll', VNode.context.parseScroll)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $aside-width: 19em;

  aside {
    float: right;
    display: block;
    width: $aside-width;
    margin: 0;

    .aside-search,
    .aside-article,
    .aside-calendar,
    .aside-mammon,
    .aside-tag {
      @include module-blur-bg();
    }

    .aside-search {
      margin-bottom: 1em;

      > .search-box {
        padding: .5em;
        overflow: hidden;

        > .search-input,
        > .search-btn,
        > .sitemap-btn {
          background-color: $module-hover-bg;
          height: 2em;
          line-height: 2em;
          float: left;

          &:hover {
            background-color: $module-hover-bg-darken-20;
          }
        }

        > .search-input {
          margin-right: 0;
          width: calc(100% - 5.5em - 1px);
          box-sizing: border-box;
          
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

        > .sitemap-btn {
          text-align: center;
          float: right;
          width: 3em;

          > .iconfont {
            font-size: 1.6rem;
          }
        }

        > .search-keywords {

          > .item {}
        }
      }
    }

    > .aside-article {
      overflow: hidden;
      margin-bottom: 1em;

      > .title {
        height: 3em;
        line-height: 3em;
        margin: 0;
        padding: 0 .8em;
        border-bottom: 1px dashed $body-bg;
        text-transform: uppercase;

        .iconfont {
          margin-right: .5em;
        }
      }

      > .aside-article-list {
        list-style: none;
        padding: .5em 0;
        margin-bottom: 0;
        counter-reset: hot-article-list;

        .item {
          display: block;
          height: 1.9em;
          line-height: 1.9em;
          padding: 0 .8em;
          margin-bottom: .5em;
          color: $text-dark;
          @include text-overflow();

          &:nth-child(1) {
            .index {
              color: $reversal;
              background-color: $primary-opacity-5;
            }
          }

          &:nth-child(2) {
            .index {
              color: $reversal;
              background-color: rgba($accent, .6);
            }
          }

          &:nth-child(3) {
            .index {
              color: $reversal;
              background-color: rgba($red, .6);
            }
          }

          &:last-child {
            margin: 0;
          }

          .index {
            color: $secondary;
            counter-increment: hot-article-list;
            background-color: $module-hover-bg;
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            display: inline-block;
            text-align: center;
            margin-right: .5em;
            font-size: .8em;

            &::before {
              content: counter(hot-article-list);
            }
          }

          .title {
            font-size: .9em;

            &:hover {
              margin-left: .5em;
              text-decoration: underline;
            }
          }
        }
      }
    }

    .aside-calendar {
      padding: .8em;
      margin-bottom: 1em;
    }

    .aside-mammon {
      width: 100%;
      margin-bottom: 1em;

      &.ali-mama {
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

    .aside-fixed-box {
      width: $aside-width;

      &.fixed {
        position: fixed;
        top: 5.5em;

        > .aside-tag {
          max-height: calc(100vh - 8em - 4.5em - 3em - 8em);
          overflow-y: auto;
        }
      }

      > .aside-tools {
        display: flex;
        justify-content: space-between;

        > .full-column,
        > .full-page {
          display: inline-block;
          width: calc((100% - 1em) / 2);
          height: 3rem;
          line-height: 3rem;
          text-align: center;
          background-color: $module-bg;
          cursor: pointer;

          &:hover {
            background-color: $module-hover-bg;
          }
        }
      }

      > .aside-tag {
        width: 19em;
        padding-left: 1rem;
        border-top: 1rem solid transparent;
        border-bottom: 1rem solid transparent;
        margin-bottom: 1em;

        .empty-box {
          padding-right: .8em;
          padding-bottom: .8em;
        }

        .aside-tag-list {
          list-style: none;
          padding: 0;
          margin: 0;
          overflow: hidden;

          .item {
            display: inline-block;
            margin-right: 1rem;
            margin-bottom: 1rem;
            height: 2em;
            line-height: 2em;
            text-transform: capitalize;
            background-color: $module-hover-bg;

            &:hover {
              background-color: $module-hover-bg-darken-40;
            }

            &:last-child {
              margin: 0;
            }

            .title {
              display: block;
              padding: 0 .5em;
              font-family: $sans-serif;
            }
          }
        }
      }
    }
  }
</style>
