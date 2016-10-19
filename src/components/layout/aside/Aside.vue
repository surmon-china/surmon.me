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
      <router-link to="http://s.click.taobao.com/ZaXp1Rx" target="_blank" class="ad-box">
        <img src="http://p1.bpimg.com/567571/e85fb6270effc4c7.jpg">
      </router-link>
    </div>
    <div class="aside-calendar">
      <calendar></calendar>
    </div>
    <div class="aside-tag">
      <ul class="aside-tag-list">
        <router-link to="/tag/html5" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-html5"></i>
            <span>html5</span>
          </a>
        </router-link>
        <router-link to="/tag/css3" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-css3"></i>
            <span>css3</span>
          </a>
        </router-link>
        <router-link to="/tag/JavaScript" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-js"></i>
            <span>JavaScript</span>
          </a>
        </router-link>
        <router-link to="/tag/nodejs" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-socialnodejs"></i>
            <span>nodejs</span>
          </a>
        </router-link>
        <router-link to="/tag/jquery" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-jquery"></i>
            <span>jquery</span>
          </a>
        </router-link>
        <router-link to="/tag/angular2" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-socialangular"></i>
            <span>Angular2</span>
          </a>
        </router-link>
        <router-link to="/tag/react" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-react"></i>
            <span>react</span>
          </a>
        </router-link>
        <router-link to="/tag/php" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-php"></i>
            <span>php</span>
          </a>
        </router-link>
        <router-link to="/tag/python3" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-python"></i>
            <span>Python3</span>
          </a>
        </router-link>
        <router-link to="/tag/chrome" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-chrome"></i>
            <span>chrome</span>
          </a>
        </router-link>
        <router-link to="/tag/linux" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-linux"></i>
            <span>linux</span>
          </a>
        </router-link>
        <router-link to="/tag/ubuntu" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-ubuntu"></i>
            <span>ubuntu</span>
          </a>
        </router-link>
        <router-link to="/tag/windows" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-windows"></i>
            <span>windows</span>
          </a>
        </router-link>
        <router-link to="/tag/vr" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-vr"></i>
            <span>vr</span>
          </a>
        </router-link>
        <router-link to="/tag/http" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-http"></i>
            <span>http</span>
          </a>
        </router-link>
        <router-link to="/tag/github" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-github"></i>
            <span>github</span>
          </a>
        </router-link>
        <router-link to="/tag/mac" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-mac"></i>
            <span>mac</span>
          </a>
        </router-link>
        <router-link to="/tag/wechat" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-wechat"></i>
            <span>wechat</span>
          </a>
        </router-link>
        <router-link to="/tag/google" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-google2015logo"></i>
            <span>google</span>
          </a>
        </router-link>
        <router-link to="/tag/redis" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-redis"></i>
            <span>redis</span>
          </a>
        </router-link>

        <router-link to="/tag/wordpress" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-wordpress"></i>
            <span>wordpress</span>
          </a>
        </router-link>
        <router-link to="/tag/zhihu" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-zhihu"></i>
            <span>知乎</span>
          </a>
        </router-link>
        <router-link to="/tag/douban" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-douban"></i>
            <span>豆瓣</span>
          </a>
        </router-link>
        <router-link to="/tag/internet" tag="li" class="list-item">
          <a class="title">
            <i class="iconfont icon-internet"></i>
            <span>其他</span>
          </a>
        </router-link>
      </ul>
    </div>
  </aside>
</template>

<script>

  import Calendar from './Calendar.vue'

  export default {
    name: 'aside',

    components: {
      Calendar
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
      padding: .8em;
      padding-bottom: 0;
      margin-bottom: 1em;

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
