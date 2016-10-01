<template>
  <div class="aside-nav">
    <ul class="nav-list">
      <li class="item">
        <router-link to="/article" class="nav-list-item active">
          <i class="icon icon-ass"></i>
          <span>首页</span>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/">
          <i class="icon icon-ass"></i>
          <span>Code</span>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/">
          <i class="icon icon-ass"></i>
          <span>Project</span>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/">
          <i class="icon icon-ass"></i>
          <span>Think</span>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/">
          <i class="icon icon-ass"></i>
          <span>Music</span>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/">
          <i class="icon icon-ass"></i>
          <span>Video</span>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/">
          <i class="icon icon-ass"></i>
          <span>Guestbook</span>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/">
          <i class="icon icon-ass"></i>
          <span>About</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav'
}
</script>

<style lang="stylus">

  // @import '../../stylus/variables'
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
            background-color #fefefe
            color $brand-primary
            font-weight bold
          
          &:hover
            background-color #fefefe

</style>