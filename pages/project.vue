<template>
  <div class="projects" :class="{ mobile: mobileLayout }">
    <ul class="project-list">
      <li class="item">
        <a class="item-content" 
           href="https://github.com/surmon-china/vue-awesome-swiper" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-vue"></i>
          <h3 class="title">vue-awesome-swiper</h3>
          <p class="desc">支持Vue的幻灯轮播图组件，基于Swiper3</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/vue-video-player" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-vue"></i>
          <h3 class="title">Vue-video-player</h3>
          <p class="desc">适用于Vue的视频播放器组件</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/vue-codemirror" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-vue"></i>
          <h3 class="title">Vue-Codemirror</h3>
          <p class="desc">为Vue程序添加一个代码编辑器</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/vue-touch-ripple" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-vue"></i>
          <h3 class="title">vue-touch-ripple</h3>
          <p class="desc">轻松为Vue程序添加点击波纹特效</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/vue-drag-zone" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-vue"></i>
          <h3 class="title">vue-drag-zone</h3>
          <p class="desc">拖动可以改变父子组件的布局尺寸</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/vue-quill-editor" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-vue"></i>
          <h3 class="title">vue-quill-editor</h3>
          <p class="desc">适用于Vue的富文本编辑器</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/surmon.me" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-code"></i>
          <h3 class="title">nuxt-blog</h3>
          <p class="desc">基于Nuxt.js搭建的博客程序（本站前端）</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/vue-netease-music" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-netease-music"></i>
          <h3 class="title">vue-netease-music</h3>
          <p class="desc">适用于Vue的网易云音乐播放器（开发中）</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/nodepress" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-nodejs"></i>
          <h3 class="title">nodepress</h3>
          <p class="desc">使用Node.js + MongoDB搭建的博客服务端程序</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/angular-admin" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-angularjs"></i>
          <h3 class="title">angular-admin</h3>
          <p class="desc">基于Angular2搭建的博客后台管理程序</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/ng2-quill-editor" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-angularjs"></i>
          <h3 class="title">ng2-quill-editor</h3>
          <p class="desc">适用于Angular2的Quill富文本编辑器</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/deploy" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-deploy"></i>
          <h3 class="title">deploy</h3>
          <p class="desc">一个简易的Github Webhooks自动热部署方案</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/wordpress-theme-one" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-wordpress"></i>
          <h3 class="title">One</h3>
          <p class="desc">一款小清新的Wordpress博客风格主题</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/wordpress-theme-surmon" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-wordpress"></i>
          <h3 class="title">Surmon</h3>
          <p class="desc">前博客Wordpress-BLOG主题</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/wordpress-theme-metro" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-wordpress"></i>
          <h3 class="title">Metro</h3>
          <p class="desc">仿Ipc.me的Wordpress-CMS主题</p>
        </a>
      </li>
      <li class="item">
        <a class="item-content"
           href="https://github.com/surmon-china/wordpress-theme-think" 
           rel="external nofollow"
           target="_blank">
          <i class="iconfont icon-wordpress"></i>
          <h3 class="title">think</h3>
          <p class="desc">仿远景论坛门户首页的Wordpress-CMS主题</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'project',
    head: {
      title: 'Project'
    },
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .projects {
    min-height: 40em;

    &.mobile {
      min-height: auto;

      > .project-list {

        > .item {
          width: 100%;
          height: auto;
          float: none;

          &:last-child {
            margin: 0;
          }

          > .item-content {
            width: 100%;
            height: auto;

            > .title {
              margin: 1em 0;
            }

            > .iconfont {
              font-size: 3em;
            }

            > .desc {
              text-indent: 0;
              text-align: center;
            }
          }
        }
      }
    }

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
          // margin-bottom: 0;
        }

        > .item-content {
          display: block;
          width: 14.8em;
          height: 18em;
          padding: 1em;
          text-align: center;
          background-color: $module-bg;
          transition: transform 1s, background-color .5s;

          &:hover {
            background-color: $module-hover-bg;
            // transform: rotate3d(0,0,1, 5deg);
            transition: transform 1s, background-color .5s;
          }

          > .iconfont {
            display: block;
            height: 1.3em;
            font-size: 5em;
          }

          > .title {
            font-weight: bold;
            margin-bottom: 1.2em;
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
