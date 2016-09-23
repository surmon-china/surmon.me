<style lang="stylus">

  @import '../../stylus/variables'
  .aside-nav
    position fixed
    top 5em
    display inline-block
    width 10em
    background-color white
    padding .5em
    
    .nav-list
      margin 0
      
      .item
        
        .nav-list-item
          display block
          padding .5em
          
          .icon
            width 2em
            display inline-block
          
          &.active 
            background-color $gray-lightest
            color $brand-primary
            font-weight bold
          
          &:hover
            background-color $gray-lightest

</style>

<template>
  <div class="aside-nav">
    <ul class="nav-list">
      <li class="item">
        <a v-link="'/'" class="nav-list-item active">
          <i class="icon icon-ass"></i>
          <span>首页</span>
        </a>
      </li>
      <li class="item">
        <a v-link="'/'" class="nav-list-item">
          <i class="icon icon-ass"></i>
          <span>Code</span>
        </a>
      </li>
      <li class="item">
        <a v-link="'/'" class="nav-list-item">
          <i class="icon icon-ass"></i>
          <span>Project</span>
        </a>
      </li>
      <li class="item">
        <a v-link="'/'" class="nav-list-item">
          <i class="icon icon-ass"></i>
          <span>Think</span>
        </a>
      </li>
      <li class="item">
        <a v-link="'/'" class="nav-list-item">
          <i class="icon icon-ass"></i>
          <span>Music</span>
        </a>
      </li>
      <li class="item">
        <a v-link="'/'" class="nav-list-item">
          <i class="icon icon-ass"></i>
          <span>Video</span>
        </a>
      </li>
      <li class="item">
        <a v-link="'/'" class="nav-list-item">
          <i class="icon icon-ass"></i>
          <span>Guestbook</span>
        </a>
      </li>
      <li class="item">
        <a v-link="'/'" class="nav-list-item">
          <i class="icon icon-ass"></i>
          <span>About</span>
        </a>
      </li>
    </ul>
  </div>
</template>