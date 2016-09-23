<style lang="stylus">
  @import '../../stylus/variables'
  .article-list-item
    border-bottom 1px dashed $gray-lighter
    // margin-bottom 1em
    // padding 1em
    
    .item-content
      display block
      overflow hidden
      height 8.5em
      padding 1em
      
      &:hover
        // background-color: $gray-lightsuper
        // .item-title
        
      .item-thumb
        float left
        width 9em
        
        .item-thumb-img
          max-width 100%
          height 6.5em
      
      .item-body
        float right
        width 28em
        height 6.5em
        padding-top .2em
        
        .item-title
          // padding .3em .1em
          // padding-top .3em
          font-weight bold
          text-truncate()
          
        .item-description
          font-size .9em
          margin 0
          margin-bottom 0.3em
          display -webkit-box
          display -moz-box
          overflow hidden
          text-overflow ellipsis
          word-break break-all
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          
        .item-meta
          font-size .9em
          height 1.6em
          line-height 2em
          
          span
            margin-right .5em
</style>

<template>
  <div class="article-list-item">
    <a v-link="{ path: '/article/'+ item.slug }" class="item-content">
      <div class="item-thumb">
          <img class="item-thumb-img" 
               src="http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/11/20120815211519_LZsce.thumb_.600_0.jpeg&h=96&w=144&q=100&zc=1" 
               alt="Generic placeholder image">
      </div>
      <div class="item-body">
        <h5 class="item-title">{{ item.title }}</h5>
        <p class="item-description">{{ item.description }}</p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>{{ item.date }}</span>
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{ item.meta.views }}</span>
          </span>
          <span class="comment">
            <i class="iconfont icon-comment"></i>
            <span>{{ item.meta.comments }}</span>
          </span>
          <span class="tag">
            <i class="iconfont icon-tag"></i>
            <span v-if="!item.tag.length">无</span>
            <span v-for="tag in item.tag">{{ tag.name }}</span>
          </span>
          <span class="category">
            <i class="iconfont icon-list"></i>
            <span v-if="!item.category.length">未分类</span>
            <span v-for="category in item.category">{{ category.name }}</span>
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>

export default {

  name: 'ListItemView',

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
