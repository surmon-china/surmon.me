<template>
  <div class="article-list-item" @click="toDetail">
    <div class="item-content" :class="{ mobile: mobileLayout }">
      <div class="item-thumb" v-if="!mobileLayout">
        <router-link :to="`/article/${item.id}`">
          <img class="item-thumb-img" 
               :src="buildThumb(item.thumb)"
               :alt="item.title"
               :title="item.title">
        </router-link>
      </div>
      <div class="item-body">
        <h4 class="item-title">
          <router-link :to="`/article/${item.id}`" :title="item.title">{{ item.title }}</router-link>
        </h4>
        <p class="item-description" style="-webkit-box-orient: vertical;" v-html="item.description"></p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ item.create_at | toYMD }}</span>
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ item.meta.views || 0 }}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>{{ item.meta.comments || 0 }}</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-like"></i>
            <span>{{ item.meta.likes || 0 }}</span>
          </span>
          <span class="categories">
            <i class="iconfont icon-list"></i>
            <span v-if="!item.category.length">未分类</span>
            <router-link :key="index"
                         :to="`/category/${category.slug}`" 
                         v-for="(category, index) in item.category">{{ category.name }}</router-link>
          </span>
          <span class="tags" v-show="false">
            <i class="iconfont icon-tag"></i>
            <span v-if="!item.tag.length">无</span>
            <router-link :key="index" 
                         :to="`/tag/${tag.slug}`" 
                         v-for="(tag, index) in item.tag">{{ tag.name }}</router-link>
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
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      imgExt() {
        return this.$store.state.option.imgExt
      }
    },
    methods: {
      buildThumb(thumb) {
        if (!thumb) return `${this.cdnUrl}/images/thumb-article.jpg`
        return `${thumb}?imageView2/1/w/350/h/238/format/${this.imgExt}/interlace/1/q/75|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/460/fill/I0ZGRkZGRg==/dissolve/23/gravity/SouthWest/dx/15/dy/7|imageslim`
      },
      toDetail() {
        if (this.mobileLayout) {
          this.$router.push(`/article/${this.item.id}`)
        }
      }
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

      &:hover {

        > .item-thumb {

          .item-thumb-img {
            @include css3-prefix(opacity, .95);
            @include css3-prefix(transform, translateX(-.5em));
          }
        }
      }

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
          @include css3-prefix(transform, translateX(0));
        }
      }

      > .item-body {
        float: right;
        width: 28.5em;
        height: 8.5em;

        > .item-title {
          font-size: 1em;
          font-weight: bold;
          color: #333;
          margin-top: .2em;
          margin-bottom: .5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

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
          overflow: hidden;
          text-overflow: ellipsis;
          @include clamp(3);
        }

        > .item-meta {
          font-size: .9em;
          height: 2em;
          line-height: 2em;
          display: flex;
          justify-content: flex-start;
          align-items: baseline;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: normal;

          > .views {
            min-width: 4rem;
          }

          > .likes,
          > .comments {
            min-width: 3em;
          }

          > .date,
          > .views,
          > .comments,
          > .likes,
          > .tags,
          > .categories {
            margin-right: 1em;

            > .iconfont {
              font-size: 1em;
              margin-right: .4em;
            }
          }

          > .tags,
          > .categories {

            a {
              text-transform: capitalize;
              margin-right: .5em;
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }

       &.mobile {
        height: auto;

        > .item-body {
          width: 100%;
          height: auto;

          > .item-description {
            height: auto;
            margin-bottom: .5em;
          }

          > .item-meta {
            justify-content: space-between;

            > .date,
            > .views,
            > .comments,
            > .likes,
            > .tags,
            > .categories {
              margin: 0;
            }
          }
        }
      }
    }
  }
</style>
