<template>
  <div class="movies">

    <!-- 列表 -->
    <div class="movie-lists">
      电影列表
      <!-- <list-item v-for="(item, index) in articles.data" :item="item" :key="index"></list-item> -->
    </div>

    <!-- 加载更多 -->
    <div class="movie-load">
      <button class="btn-loadmore">加载更多</button>
    </div>

  </div>
</template>

<style lang="scss">
  @import '../../../../sass/variables';
  .movies {

    .movie-lists {
      background-color: white;
      padding: 1em;
      height: 30em;
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;
    }

    .movie-load {

      .btn-loadmore {
        width: 100%;
        display: block;
        height: 3em;
        line-height: 3em;
        background-color: $module-bg;

        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
  }
</style>
