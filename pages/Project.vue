<template>
  <div class="projects">
    <ul class="project-list">
      <router-link to="/project/vue-awesome-swiper" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-vue"></i>
          <h4 class="title">vue-awesome-swiper</h4>
          <p class="desc">支持Vue全版本的幻灯轮播图组件</p>
        </a>
      </router-link>
      <router-link to="/project/vue-video-player" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-vue"></i>
          <h4 class="title">Vue-video-player</h4>
          <p class="desc">适用于Vue全版本的视频播放器组件</p>
        </a>
      </router-link>
      <router-link to="/project/vue-codemirror" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-vue"></i>
          <h4 class="title">Vue-Codemirror</h4>
          <p class="desc">为Vue程序添加一个代码编辑器</p>
        </a>
      </router-link>
      <router-link to="/project/vue-touch-ripple" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-vue"></i>
          <h4 class="title">vue-touch-ripple</h4>
          <p class="desc">轻松为Vue程序添加点击波纹特效</p>
        </a>
      </router-link>
      <router-link to="/project/nodepress" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-nodejs"></i>
          <h4 class="title">nodepress</h4>
          <p class="desc">使用Node.js + MongoDB搭建的博客服务端程序</p>
        </a>
      </router-link>
      <router-link to="/project/angular-admin" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-angularjs"></i>
          <h4 class="title">angular-admin</h4>
          <p class="desc">基于Angular2搭建的博客后台管理程序</p>
        </a>
      </router-link>
      <router-link to="/project/vue-blog" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-code"></i>
          <h4 class="title">vue-blog</h4>
          <p class="desc">基于Vue2搭建的博客程序（本站前端）</p>
        </a>
      </router-link>
      <router-link to="/project/vue-netease-cloud-music" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-netease-music"></i>
          <h4 class="title">vue-netease-music</h4>
          <p class="desc">适用于Vue的网易云音乐播放器（开发中）</p>
        </a>
      </router-link>
      <router-link to="/project/wordpress-one" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-wordpress"></i>
          <h4 class="title">One</h4>
          <p class="desc">一款小清新的Wordpress主题</p>
        </a>
      </router-link>
      <router-link to="/project/wordpress-surmon" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-wordpress"></i>
          <h4 class="title">Surmon</h4>
          <p class="desc">前博客（Wordpress）主题</p>
        </a>
      </router-link>
      <router-link to="/project/wordpress-metro" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-wordpress"></i>
          <h4 class="title">Metro</h4>
          <p class="desc">仿Ipc.me的Wordpress主题</p>
        </a>
      </router-link>
      <router-link to="/project/wordpress-think" tag="li" class="item">
        <a class="item-content">
          <i class="iconfont icon-wordpress"></i>
          <h4 class="title">think</h4>
          <p class="desc">仿云景论坛门户首页的Wordpress主题</p>
        </a>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Project',
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .projects {
    min-height: 40em;

    > .project-list {
      padding: 0;
      margin: 0;

      > .item {
        display: inline-block;
        float: left;
        margin-right: 1em;
        margin-bottom: 1em;

        &:nth-child(4),
        &:nth-child(8),
        &:nth-child(12),
        &:nth-child(16) {
          margin-right: 0;
        }

        &:nth-child(1n + 9) {
          margin-bottom: 0;
        }

        > .item-content {
          display: block;
          width: 14.8em;
          height: 18em;
          padding: 1em;
          text-align: center;
          background-color: $module-bg;

          &:hover {
            background-color: $module-hover-bg;
          }

          > .iconfont {
            display: block;
            height: 1.3em;
            font-size: 5em;
          }

          > .title {
            margin-bottom: 1em;
            text-transform: capitalize;
          }

          > .desc {
            margin-bottom: 0;
            text-align: left;
            line-height: 2em;
            text-indent: 1em;
          }
        }
      }
    }
  }
</style>
