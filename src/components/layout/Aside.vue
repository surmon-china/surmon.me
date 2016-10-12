<template>
  <aside class="aside">
    <div class="hot-article">
      <p class="title">热门文章</p>
      <ul class="article-list">
        <li>
          <router-link to="/article/python3" class="list-item">Socket，你需要知道的事儿</router-link>
        </li>
        <li>
          <router-link to="/article/python3" class="list-item">和牛人一起用掘金</router-link>
        </li>
        <li>
          <router-link to="/article/python3" class="list-item">25+ 优质实用简洁的个人简历模...</router-link>
        </li>
        <li>
          <router-link to="/article/python3" class="list-item">JavaScript原型详解</router-link>
        </li>
        <li>
          <router-link to="/article/python3" class="list-item">Socket，你需要知道的事儿</router-link>
        </li>
        <li>
          <router-link to="/article/python3" class="list-item">Socket，你需要知道的事儿</router-link>
        </li>
        <li>
          <router-link to="/article/python3" class="list-item">Socket，你需要知道的事儿</router-link>
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
  aside {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 19em;
    margin: 0;

    .hot-article {
      background-color: white;

      .title {
        height: 2.5em;
        margin: 0;
        padding: 0 1em;
        border-bottom: 1px dashed #eee;
        line-height: 2.5em;
      }

      .article-list {
        list-style: none;
        padding: .5em 0;

        .list-item {
          display: block;
          height: 2em;
          line-height: 2em;
          padding-left: 1em;
          color: #333;
        }
      }
    }
  }
</style>
