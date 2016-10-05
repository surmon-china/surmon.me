<style lang="stylus">
  .articles
    .article-lists
      margin-bottom 1em
      background-color white
      min-height 1em
      overflow hidden
      
    .article-load
      background-color white
</style>

<template>
  <div class="articles">

    <!-- 列表 -->
    <div class="article-lists">
      <list-item-view
        v-for="item in articles"
        :item="item"
        :index="$index"
        track-by="$index">
      </list-item-view>
    </div>

    <!-- 加载更多 -->
    <div class="article-load">
      <span class="loading">加载中...</span>
      <span class="no-more">没有更多</span>
    </div>

  </div>
</template>

<script>

// 引入其他模块
import ListItemView from './ListItemView.vue'

// 定义模块
export default {

  // 组件（模块）名称
  name: 'ArticleListsView',

  // 依赖组件
  components: {
    ListItemView
  },

  // 绑定的数据
  // data () {
  //   return {
  //     page: 1,
  //     items: datas
  //   }
  // },

  props: {
    articles: Array
  },

  // 本View下的子路由
  route: {
    data ({ to }) {
      // const page = +to.params.page
      // document.title = 'Vue.js HN Clone'
      // return store.fetchItemsByPage(page).then(items => ({
      //   page,
      //   items
      // }))
    }
  },

  // 创建时
  created () {
    console.log('文章列表组件被创建')
    // store.on('topstories-updated', this.update)
  },

  // 销毁时
  destroyed () {
    // store.removeListener('topstories-updated', this.update)
  },

  // 包含方法
  methods: {
    update () {
      // 通过fetch获取资源
      // store.fetchItemsByPage(this.page).then(items => {
      //   this.items = items
      // })
    }
  },

  // 私有过滤器
  filters: {
    // formatItemIndex (index) {
    //   return (this.page - 1) * store.storiesPerPage + index + 1
    // }
  }
}
</script>