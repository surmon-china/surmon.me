<template>
  <div class="articles">

    <!-- 列表 -->
    <div class="article-lists">
      <list-item v-for="(item, index) in articles.data" :item="item" :key="index"></list-item>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore" @click="addArticle">加载更多</button>
    </div>

  </div>
</template>

<script>

// 引入其他模块
import ListItem from './Item.vue'

// 定义模块
export default {

  // 组件（模块）名称
  name: 'article-lists',

  // 依赖组件
  components: {
    ListItem
  },

  // 绑定的数据
  data () {
    return {
      page: 1,
      count: 10
      // items: datas
    }
  },

  props: {
    articles: {
      type: Object,
      default: {}
    }
  },

  // 创建时
  created () {
    console.log('文章列表组件被创建', this)
  },

  // 销毁时
  destroyed () {
    // store.removeListener('topstories-updated', this.update)
  },

  methods: {
    addArticle() {
      // console.log(this.articles)
      this.$emit('loadmore')
    }
  }
}
</script>

<style lang="scss">
  @import '../../../sass/variables';
  .articles {

    .article-lists {
      margin-bottom: 1em;
      min-height: 1em;
      overflow: hidden;
    }

    .article-load {

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
