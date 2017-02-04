<template>
  <div class="article-list-item">
    <div class="item-content">
      <div class="item-thumb">
        <router-link :to="`/article/${item.id}`">
          <img class="item-thumb-img" :src="item.thumb">
        </router-link>
      </div>
      <div class="item-body">
        <h5 class="item-title">
          <router-link :to="`/article/${item.id}`">{{ item.title }}</router-link>
        </h5>
        <p class="item-description">{{ item.description }}</p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ item.date | toLocalString | toYMD }}</span>
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ item.meta ? item.meta.views : 0 }}</span>
          </span>
<!--           <span class="comment">
            <i class="iconfont icon-comment"></i>
            <span>{{ item.meta.comments }}</span>
          </span> -->
          <span class="category">
            <i class="iconfont icon-list"></i>
            <span v-if="!item.category.length">未分类</span>
            <router-link :to="`/category/${category.slug}`" 
                         v-for="category in item.category">{{ category.name }}</router-link>
          </span>
          <span class="tag">
            <i class="iconfont icon-tag"></i>
            <span v-if="!item.tag.length">无</span>
            <router-link :to="`/tag/${tag.slug}`" v-for="tag in item.tag">{{ tag.name }}</router-link>
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
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/variables';
  @import '~assets/sass/mixins';
  .article-list-item {
    margin-bottom: 1em;
    background-color: $module-bg;

    &:last-child {
      margin: 0;
    }

    &:hover {
      background-color: $module-hover-bg;
    }

    > .item-content {
      display: block;
      overflow: hidden;
      height: 9.5em;
      padding: .5em;

      > .item-thumb {
        float: left;
        width: 12em;
        height: 8.5em;
        overflow: hidden;

        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + .5em);
          max-width: calc(100% + .5em);
          height: auto;
          min-height: 8.5em;
          border-color: transparent;
          background-color: #c0c0c0;
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

      > .item-body {
        float: right;
        width: 28.5em;
        height: 8.5em;

        > .item-title {
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

        > .item-description {
          font-size: .9em;
          margin: 0;
          margin-bottom: 0.3em;
          height: 5em;
          line-height: 1.8em;
          // word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        > .item-meta {
          font-size: .9em;
          height: 2em;
          line-height: 2em;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          > .date,
          > .views,
          > .comment,
          > .tag,
          > .category {
            display: inline-block;
            float: left;
            margin-right: 1em;

            > .iconfont {
              font-size: 1em;
              margin-right: .4em;
            }
          }

          > .tag,
          > .category {

            a {
              text-transform: capitalize;
              margin-right: .5em;
            }
          }

          > .tag {
            margin-right: 0;
            max-width: 10em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
