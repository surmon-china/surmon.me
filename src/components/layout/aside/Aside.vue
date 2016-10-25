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
      <ul class="aside-article-list">
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">Socket，你需要知道的事儿</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">和牛人一起用掘金</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">25+ 优质实用简洁的个人简历模...</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">JavaScript原型详解</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">Socket，你需要知道的事儿</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">Socket，你需要知道的事儿</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">我喜欢一切任性顽劣的偏执</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">这个故事，说的是我如何袭击了一次婚礼</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">Socket，你需要知道的事儿</router-link>
        </li>
        <li class="list-item">
          <i class="index"></i>
          <router-link to="/article/python3" class="title">当他好久都不主动联系你，代表他已经尸化得想舍掉这段关系 #周末讨论#对于前男友（</router-link>
        </li>
      </ul>
    </div>
    <div class="aside-ad" v-if="false">
      <router-link to="http://s.click.taobao.com/ZaXp1Rx" target="_blank" class="ad-box">
        <img src="http://i1.piimg.com/567571/184e5b1a3e1613f5.jpg">
      </router-link>
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
      <ul class="aside-tag-list">
        <router-link :to="'/tag/' + tag.router" tag="li" class="list-item" v-for="tag in tags">
          <a class="title" :title="tag.title">
            <i class="iconfont" :class="[tag.icon]"></i>
            <span>{{ tag.title }}</span>
          </a>
        </router-link>
      </ul>
    </div>
  </aside>
</template>

<script>

  // import
  import Calendar from './Calendar.vue'
  import tags from '../../article/tag/tags'

  // export
  export default {
    name: 'aside',
    data() {
      return {
        tags
      }
    },
    components: {
      Calendar
    },
    directives: {
      scrollTop: {
        inserted(element) {

          // 检测此元素相对于文档Document原点的绝对位置，并且这个值是不变化的
          const sidebarFixedOffsetTop = parseInt(element.offsetTop)

          // 监听滚动事件
          window.onscroll = function() {
            let windowScrollTop = document.body.scrollTop
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

<style lang="scss" scoped>
  @import '../../../sass/variables';
  @import '../../../sass/mixins';
  aside {
    // position: absolute;
    // top: 0;
    // right: 0;
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

    .aside-article {
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

      .aside-article-list {
        list-style: none;
        padding: .5em 0;
        counter-reset: hot-article-list;

        .list-item {
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

        .list-item {
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
            padding: 0 .8em;
            font-family: CenturyGothic, -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", sans-serif;
          }
        }
      }
    }
  }
</style>
