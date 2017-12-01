<template>
  <aside class="aside">
    <div class="aside-search">
      <div class="search-box">
        <input id="keyword" 
               required 
               list="keywords"
               type="search" 
               name="search" 
               class="search-input" 
               placeholder="Search..."
               v-model.trim="keyword"
               @keyup.enter="toSearch">
        <button class="search-btn" @click="toSearch">
          <i class="iconfont icon-search"></i>
        </button>
        <router-link to="/sitemap" class="sitemap-btn">
          <i class="iconfont icon-sitemap"></i>
        </router-link>
      </div>
    </div>
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-list"></i>
        <span>热门文章</span>
      </p>
      <empty-box v-if="!article.fetching && !article.data.data.length">
        <slot>No Result Hot Articles.</slot>
      </empty-box>
      <ul class="aside-article-list" v-else-if="!article.fetching && article.data.data.length">
        <li class="item" :key="item.id" v-for="item in article.data.data.slice(0, 10)">
          <span class="index"></span>
          <router-link class="title" 
                       :title="`${item.title} - [ ${item.meta.comments} 条评论  |  ${item.meta.likes} 人喜欢 ]`"
                       :to="`/article/${item.id}`">
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="aside-ad" v-if="false">
      <a href="https://s.click.taobao.com/ZaXp1Rx" 
         target="_blank" 
         rel="external nofollow noopener" 
         class="ad-box">
        <img src="https://p1.bpimg.com/567571/e85fb6270effc4c7.jpg">
      </a>
    </div>
    <div class="aside-calendar">
      <calendar></calendar>
    </div>
    <div class="aside-fixed-box" v-scroll-top>
      <div class="aside-tag">
        <empty-box v-if="!tag.fetching && !tag.data.data.length">
          <slot>No Result Tags.</slot>
        </empty-box>
        <ul class="aside-tag-list" v-else-if="!tag.fetching && tag.data.data.length">
          <router-link tag="li"
                       class="item"
                       :key="index"
                       :to="`/tag/${item.slug}`"
                       v-for="(item, index) in tag.data.data">
            <a class="title" :title="item.description">
              <i class="iconfont" 
                 :class="[item.extends.find(t => Object.is(t.name, 'icon')).value]" 
                 v-if="item.extends.find(t => Object.is(t.name, 'icon'))"></i>
              <span>&nbsp;</span>
              <span>{{ item.name }}</span>
              <span>({{ item.count || 0 }})</span>
            </a>
          </router-link>
        </ul>
      </div>
      <div class="aside-tools" v-if="isArticlePage">
        <div class="full-column" @click="setFullColumu">
          <span>通栏阅读</span>
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-read"></i>
        </div>
        <div class="full-page" @click="fullScreen">
          <span>全屏阅读</span>
          <span>&nbsp;&nbsp;</span>
          <i class="iconfont icon-fullscreen"></i>
        </div>        
      </div>
    </div>
  </aside>
</template>

<script>
  import Calendar from './calendar.vue'
  export default {
    name: 'layout-aside',
    data() {
      return {
        keyword: ''
      }
    },
    components: {
      Calendar
    },
    mounted() {
      if (Object.is(this.$route.name, 'search-keyword')) {
        this.keyword = this.$route.params.keyword
      }
    },
    computed: {
      tag() {
        return this.$store.state.tag
      },
      article() {
        return this.$store.state.article.hot
      },
      isArticlePage() {
        return this.$route.name === 'article-article_id'
      }
    },
    methods: {
      toSearch() {
        const keyword = this.keyword
        const paramsKeyword = this.$route.params.keyword
        const isSearchPage = Object.is(this.$route.name, 'search-keyword')
        if (keyword && (isSearchPage ? !Object.is(paramsKeyword, keyword) : true)) {
          this.$router.push({ name: 'search-keyword', params: { keyword }})
        }
      },
      setFullColumu() {
        this.$store.commit('option/SET_ERROR_COLUMU', true)
      },
      fullScreen() {
        this.setFullColumu()
        const docElm = document.documentElement
        // const docElm = document.getElementById('main-content')
        const requestEvent = docElm.requestFullscreen || 
                             docElm.mozRequestFullScreen || 
                             docElm.webkitRequestFullScreen ||
                             docElm.msRequestFullscreen
        if(requestEvent) requestEvent.bind(docElm)()
      }
    },
    directives: {
      scrollTop: {
        inserted(element) {
          // 检测此元素相对于文档Document原点的绝对位置，并且这个值是不变化的
          let sidebarFixedOffsetTop = element.offsetTop
          // 处理
          const parseScroll = () => {
            const windowScrollTop = document.documentElement.scrollTop || 
                                    window.pageYOffset || 
                                    window.scrollY ||
                                    document.body.scrollTop
            const newSidebarFixedOffsetTop = element.offsetTop
            sidebarFixedOffsetTop = (newSidebarFixedOffsetTop !== sidebarFixedOffsetTop && newSidebarFixedOffsetTop !== 77) ? newSidebarFixedOffsetTop : sidebarFixedOffsetTop
            const isFixed = windowScrollTop > sidebarFixedOffsetTop
            if (isFixed && element) element.setAttribute('class','aside-fixed-box fixed')
            if (!isFixed && element) element.setAttribute('class','aside-fixed-box')
          }
          // 初始化应用
          parseScroll()
          // 监听滚动事件
          window.addEventListener('scroll', parseScroll, { passive: true })
        },
        unbind(element) {
          window.onscroll = null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  @import '~assets/sass/mixins';
  aside {
    float: right;
    display: block;
    width: 19em;
    margin: 0;

    .aside-search,
    .aside-article,
    .aside-calendar,
    .aside-ad,
    .aside-tag, {
      background-color: $module-bg;
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
            background-color: darken($module-hover-bg, 20%);
          }
        }

        > .search-input {
          margin-right: 0;
          width: calc(100% - 6.5em - 1px);
          box-sizing: border-box;
        }

        > .search-btn {
          width: 2em;
          background-color: darken($module-hover-bg, 20%);

          &:hover {
            background-color: darken($module-hover-bg, 40%);
          }
        }

        > .sitemap-btn {
          text-align: center;
          float: right;
          width: 4em;
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
        border-bottom: 1px dashed #eee;

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
          color: #333;
          @include text-overflow();

          &:last-child {
            margin: 0;
          }

          .index {
            counter-increment: hot-article-list;
            background-color: $module-hover-bg;
            width: 1.5em;
            height: 1.5em;
            line-height: 1.5em;
            display: inline-block;
            text-align: center;
            margin-right: .5em;
            color: #777;
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

    .aside-ad {
      padding: .8em;
      margin-bottom: 1em;

      > .ad-box {
        opacity: .8;

        img {
          max-width: 100%;
          border-top: 1px solid #1c4767;
        }
      }
    }

    .aside-fixed-box {

      &.fixed {
        position: fixed;
        top: 5.5em;

        > .aside-tag {
          max-height: calc(100vh - 8em - 4.5em - 3em);
          overflow-y: auto;
        }
      }

      > .aside-tools {

        > .full-column {
          margin-right: 1rem;
        }

        > .full-column,
        > .full-page {
          display: inline-block;
          width: calc((100% - 1rem) / 2;
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
            float: left;
            margin-right: 1rem;
            margin-bottom: 1rem;
            height: 2em;
            line-height: 2em;
            text-transform: capitalize;
            background-color: $module-hover-bg;

            &:hover {
              background-color: darken($module-hover-bg, 40%);
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
