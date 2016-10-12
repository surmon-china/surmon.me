<style lang="scss">

  .article-list-item {
    // border-bottom: 1px dashed $gray-lighter;
    margin-bottom: 1em;
    // padding: 1em;
    background-color: white;

    .item-content {
      display: block;
      overflow: hidden;
      height: 9em;
      padding: .5em;
      // border-bottom: 1px dashed #e4e4e4;

      .item-thumb {
        float: left;
        width: 12em;

        .item-thumb-img {
          max-width: 100%;
          height: 8em;
        }
      }

      .item-body {
        float: right;
        width: 29em;
        height: 8em;
        padding-top: .2em;

        .item-title {
          font-weight: bold;
          color: #333;

          h5 {
            margin-top: 0;
          }
        }

        .item-description {
          font-size: .9em;
          margin: 0;
          margin-bottom: 0.3em;
          display: -webkit-box;
          display: -moz-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          line-height: 1.6em;
        }

        .item-meta {
          font-size: .9em;
          height: 1.6em;
          line-height: 2em;

          span {
            margin-right: .5em;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="article-list-item">
    <div class="item-content">
      <div class="item-thumb">
        <router-link to="/article/asdasdasd" class="item">
         <img class="item-thumb-img" src="http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/11/20120815211519_LZsce.thumb_.600_0.jpeg&h=96&w=144&q=100&zc=1">
        </router-link>
      </div>
      <div class="item-body">
        <router-link to="/article/asdasdasd" class="item-title">
          <h5>{{ item.title }}</h5>
        </router-link>
        <p class="item-description">{{ item.description }}</p>
        <div class="item-meta">
          <span class="date">
            <!-- <i class="iconfont icon-clock"></i> -->
            <span>{{ item.date }}</span>
          </span>
          <span class="views">
            <!-- <i class="iconfont icon-eye"></i> -->
            <span>{{ item.meta.views || 0 }}</span>
          </span>
          <span class="comment">
            <!-- <i class="iconfont icon-comment"></i> -->
            <span>{{ item.meta.comments }}</span>
          </span>
          <span class="tag">
            <!-- <i class="iconfont icon-tag"></i> -->
            <span v-if="!item.tag.length">无</span>
            <span v-for="tag in item.tag">{{ tag.name }}</span>
          </span>
          <span class="category">
            <!-- <i class="iconfont icon-list"></i> -->
            <span v-if="!item.category.length">未分类</span>
            <span v-for="category in item.category">{{ category.name }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'article-list-item',

  props: {
    item: Object
  },

  computed: {
    // href () {
    //   return this.item.url || ('#/item/' + this.item.id)
    // },
    // showInfo () {
    //   return this.item.type === 'story' || this.item.type === 'poll'
    // },
    // showDomain () {
    //   return this.item.type === 'story'
    // }
  }
}
</script>
