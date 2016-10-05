<template>
  <aside class="aside">
    <div class="hot">
      <h3>热门文章</h3>
      <ul class="list-group">
        <router-link to="/" class="list-group-item active">
          <span class="label label-default label-pill pull-right">14</span>
          <span>全部</span>
        </router-link>
        <router-link to="/" class="list-group-item">
          <span>JavaScript</span>
          <span class="label label-default label-pill pull-right">14</span>
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
  </aside>
</template>

<script>
export default {
  name: 'aside'
}
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';
  aside {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 19em;
    margin: 0;
  }
</style>