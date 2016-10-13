<template>
  <aside class="aside">
    <div class="aside-search">
      <div class="search-box">
        <input type="text" name="search" class="search-input">
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
  </aside>
</template>

<script>
export default {
  name: 'aside'
}
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';
  @import '../../sass/mixins';
  aside {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 19em;
    margin: 0;

    .aside-search {
      background-color: $module-bg;
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
        }

        > .search-input {
          padding: .5em;
          margin-right: 0;
        }

        > .search-btn {
          width: 2em;
        }

        > .rss-btn {
          float: right;
          width: 4em;
        }
      }
    }

    .aside-article {
      background-color: $module-bg;

      > .title {
        height: 3em;
        line-height: 3em;
        margin: 0;
        padding: 0 1em;
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
          padding-left: 1em;
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
  }
</style>
