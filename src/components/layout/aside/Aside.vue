<template>
  <aside class="aside">
    <div class="aside-search">
      <div class="search-box">
        <input type="text" name="search" class="search-input" placeholder="Search...">
        <button class="search-btn">
          <i class="iconfont icon-search"></i>
        </button>
        <button class="rss-btn">
          <i class="iconfont icon-rss"></i>
        </button>
      </div>
    </div>
    <div class="aside-article">
      <p class="title">
        <i class="iconfont icon-list"></i>
        <span>热门文章</span>
      </p>
      <loading v-if="article.fetching" />
      <transition name="fade">
        <ul class="aside-article-list" v-if="!article.fetching">
          <li class="item" v-for="article in article.items" :key="article.id">
            <i class="index"></i>
            <router-link :to="'/article/' + article.id" class="title">{{ article.title }}</router-link>
          </li>
        </ul>
      </transition>
    </div>
    <div class="aside-ad">
      <a href="http://s.click.taobao.com/ZaXp1Rx" target="_blank" class="ad-box">
        <img src="http://p1.bpimg.com/567571/e85fb6270effc4c7.jpg">
      </a>
    </div>
    <div class="aside-calendar">
      <calendar></calendar>
    </div>
    <div class="aside-tag" v-scroll-top>
      <loading v-if="tag.fetching" />
      <transition name="fade">
        <ul class="aside-tag-list" v-if="!tag.fetching">
          <router-link :to="'/tag/' + tag.router" tag="li" class="item" v-for="tag in tag.list">
            <a class="title" :title="tag.title">
              <i class="iconfont" :class="[tag.icon]" v-if="tag.icon"></i>
              <span>{{ tag.title }}</span>
              <span>({{ tag.count || 0 }})</span>
            </a>
          </router-link>
        </ul>
      </transition>
    </div>
  </aside>
</template>

<script>

  // import
  import Calendar from './Calendar.vue'

  // export
  export default {
    name: 'aside',
    beforeMount() {
      this.init()
    },
    computed: {
      tag() {
        return this.$store.state.tag
      },
      article() {
        return this.$store.state.article.hot
      }
    },
    methods: {
      init() {
        this.$store.dispatch('GET_ARTICLE_HOT_LIST')
        this.$store.dispatch('GET_TAG_LIST')
      }
    },
    components: {
      Calendar
    },
    directives: {
      scrollTop: {
        inserted(element) {
          // 检测此元素相对于文档Document原点的绝对位置，并且这个值是不变化的
          let sidebarFixedOffsetTop = parseInt(element.offsetTop)
          // 监听滚动事件
          window.onscroll = function() {
            let windowScrollTop = document.body.scrollTop
            let newSidebarFixedOffsetTop = parseInt(element.offsetTop)
            sidebarFixedOffsetTop = (newSidebarFixedOffsetTop !== sidebarFixedOffsetTop && newSidebarFixedOffsetTop !== 77) ? newSidebarFixedOffsetTop : sidebarFixedOffsetTop
            console.log(sidebarFixedOffsetTop)
            let isFixed = (windowScrollTop - 333) > sidebarFixedOffsetTop
            if (isFixed && element) element.setAttribute('class','aside-tag fixed')
            if (!isFixed && element) element.setAttribute('class','aside-tag')
          }
        },
        unbind(element) {
          window.onscroll = null
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../sass/mixins';
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
        > .rss-btn {
          background-color: $module-hover-bg;
          height: 2em;
          line-height: 2em;
          float: left;

          &:hover {
            background-color: darken($module-hover-bg, 20%);
          }
        }

        > .search-input {
          // padding: 0 .5em;
          margin-right: 0;
        }

        > .search-btn {
          width: 2em;
          background-color: darken($module-hover-bg, 20%);

          &:hover {
            background-color: darken($module-hover-bg, 40%);
          }
        }

        > .rss-btn {
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

    .aside-tag {
      width: 19em;
      padding: .8em;
      padding-right: 0;
      padding-bottom: 0;
      margin-bottom: 1em;

      &.fixed {
        position: fixed;
        top: 5.5em;
      }

      .aside-tag-list {
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: hidden;

        .item {
          display: inline-block;
          float: left;
          margin-right: .8em;
          margin-bottom: .8em;
          height: 2em;
          line-height: 2em;
          text-transform: capitalize;
          background-color: $module-hover-bg;

          &:hover {
            background-color: darken($module-hover-bg, 40%);
          }

          .title {
            display: block;
            padding: 0 .5em;
            font-family: CenturyGothic, -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", sans-serif;
          }
        }
      }
    }
  }
</style>
