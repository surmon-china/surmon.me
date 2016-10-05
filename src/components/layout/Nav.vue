<template>
  <div class="aside-nav">
    <ul class="list-group">
      <router-link to="/" class="list-group-item active">
        <i class="icon icon-ass"></i>
        <span>全部</span>
      </router-link>
      <router-link to="/" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>JavaScript</span>
      </router-link>
      <router-link to="/" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>CSS</span>
      </router-link>
      <router-link to="/" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>HTML5</span>
      </router-link>
      <router-link to="/" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>基础知识</span>
      </router-link>
      <router-link to="/" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>Guestbook</span>
      </router-link>
      <router-link to="/" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>About</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav'
}
</script>

<style lang="scss">
  @import '../../sass/variables';
  .aside-nav {
    // position: fixed;
    // top: 5em;
    // display: inline-block;
    // width: 10em;
    // background-color: white;
    // padding: .5em;
    position: fixed;
    top: 5em;
    display: inline-block;
    width: 10em;
    
    .list-group {

      .list-group-item {
        border: none;
        border-radius: 0;
      }
    }
  }
</style>