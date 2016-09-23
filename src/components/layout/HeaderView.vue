<style lang="stylus">
  @import '../../stylus/variables'
  .header
    position fixed
    z-index 5
    top 0
    left 0
    right 0
    background white
    border-bottom 1px solid $gray-lighter
    height 4em

    .header-logo,
    .header-action
      margin 0
      
    .header-logo
      float left

      > li
        float left
        vertical-align top

        &.header-logo-image
          
          .logo-link
            display block
            height 4em
            line-height 4em

          .logo-image
            height 2em
          
        &.header-logo-slogan
          margin-left 3em

          > .header-logo-slogan-text
            display block
            height 4em
            line-height 4em
            letter-spacing .2em
            
    .header-action
      float right

      > li
        float left
        &.header-action-input

          > .action-input-block
              padding: 1em 0.75em
              
              .search-input
                border 1px solid #ddd
                border-radius $border-radius-sm
                width 16em
                height 2.4em
                padding .5em
                font-size .8em
                color $gray-light
                letter-spacing .05em
              
        &.header-action-btn
          
          > .btn 
            font-size: 0.9em
            padding: 1.7em 0.75em
            line-height: 4.4em
</style>

<template>
  <header class="header">
    <div class="container">
      <ul class="header-logo">
        <li class="header-logo-image">
          <a v-link="'/'" class="logo-link">
            <img src="/images/logo-header.svg" class="logo-image">
          </a>
        </li>
        <li class="header-logo-slogan">
          <span class="header-logo-slogan-text  text-primary">高质量的技术社区</span>
        </li>
      </ul>

      <ul class="header-action">
        <li class="header-action-input">
          <div class="action-input-block">
            <i class="icon icon-search"></i>
            <input type="input" placeholder="输入关键字搜索" class="search-input">
          </div>
        </li>
        <li class="header-action-btn">
          <a href="" class="btn follow-button">关注</a>
          <a href="" class="btn favorite-button">收藏</a>
        </li>
      </ul>
    </div>
  </header>
</template>