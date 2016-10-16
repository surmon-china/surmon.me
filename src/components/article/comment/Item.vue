<template>
  <div class="comment-item">
    <div class="item-content">
      <div class="item-gravatar">
        <router-link to="/article/asdasdasd">
         <img class="item-thumb-img" src="http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/11/20120815211519_LZsce.thumb_.600_0.jpeg&h=112&w=180&q=100&zc=1">
        </router-link>
      </div>
      <div class="item-body">
        <h5 class="item-title">
          <router-link to="/article/asdasdasd">
            {{ item.title }}
          </router-link>
        </h5>
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

  name: 'comment-list-item',

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

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../sass/mixins';
  .article-list-item {
    margin-bottom: 1em;
    background-color: $module-bg;

    &:last-child {
      margin: 0;
    }

    &:hover {
      background-color: $module-hover-bg;
    }

    .item-content {
      display: block;
      overflow: hidden;
      height: 9.5em;
      padding: .5em;

      .item-thumb {
        float: left;
        width: 12em;
        height: 8.5em;
        overflow: hidden;

        .item-thumb-img {
          max-width: auto;
          height: 8.5em;
          @include css3-prefix(opacity, 1);
          @include css3-prefix(filter, grayscale(0.3));
          @include css3-prefix(transform, translateX(0));

          &:hover {
            @include css3-prefix(opacity, .95);
            @include css3-prefix(filter, grayscale(0));
            @include css3-prefix(transform, translateX(-.5em));
          }
        }
      }

      .item-body {
        float: right;
        width: 28.5em;
        height: 8.5em;

        .item-title {
          font-weight: bold;
          color: #333;
          margin-top: .2em;
          margin-bottom: .5em;

          > a {
            margin-left: 0;

            &:hover {
              display: inline-block;
              text-decoration: underline;
              margin-left: .5em;
            }
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
          line-height: 1.8em;
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
