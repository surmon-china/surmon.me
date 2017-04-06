<template>
  <div class="projects" :class="{ mobile: mobileLayout }">
    <ul class="project-list">
      <li class="item" v-for="(project, index) in projects">
        <a class="item-content" 
           rel="external nofollow"
           :href="project.link"
           target="_blank">
          <i class="iconfont" :class="[project.icon]"></i>
          <h3 class="title">{{ project.name }}</h3>
          <p class="desc">{{ project.desc }}</p>
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
    data() {
      return {
        projects: [
          {
            link: 'https://github.com/surmon-china/vue-awesome-swiper',
            icon: 'icon-vue',
            name: 'vue-awesome-swiper',
            desc: '基于Swiper3构建，用于支持Vue的幻灯轮播图组件'
          },
          {
            link: 'https://github.com/surmon-china/vue-video-player',
            icon: 'icon-vue',
            name: 'vue-video-player',
            desc: '适用于Vue的视频播放器组件'
          },
          {
            link: 'https://github.com/surmon-china/vue-codemirror',
            icon: 'icon-vue',
            name: 'vue-codemirror',
            desc: '为Vue应用添加一个代码编辑器'
          },
          {
            link: 'https://github.com/surmon-china/vue-touch-ripple',
            icon: 'icon-vue',
            name: 'vue-touch-ripple',
            desc: '轻松为Vue应用添加点击波纹特效'
          },
          {
            link: 'https://github.com/surmon-china/vue-drag-zone',
            icon: 'icon-vue',
            name: 'vue-drag-zone',
            desc: '拖动可以改变父子组件的布局尺寸'
          },
          {
            link: 'https://github.com/surmon-china/vue-quill-editor',
            icon: 'icon-vue',
            name: 'vue-quill-editor',
            desc: '适用于Vue的富文本编辑器'
          },
          {
            link: 'https://github.com/surmon-china/surmon.me',
            icon: 'icon-code',
            name: 'surmon.me',
            desc: '基于Nuxt.js搭建的SSR博客Web端应用'
          },
          {
            link: 'https://github.com/surmon-china/surmon.me.native',
            icon: 'icon-react',
            name: 'surmon.me.native',
            desc: '基于react-native搭建的博客移动端应用'
          },
          {
            link: 'https://github.com/surmon-china/nodepress',
            icon: 'icon-nodejs',
            name: 'nodepress',
            desc: '使用Node.js + MongoDB搭建的博客服务端应用'
          },
          {
            link: 'https://github.com/surmon-china/angular-admin',
            icon: 'icon-angularjs',
            name: 'angular-admin',
            desc: '基于Angular4搭建的博客Web端后台管理应用'
          },
          {
            link: 'https://github.com/surmon-china/ng2-quill-editor',
            icon: 'icon-angularjs',
            name: 'ng2-quill-editor',
            desc: '适用于Angular2的Quill富文本编辑器'
          },
          {
            link: 'https://github.com/surmon-china/deploy',
            icon: 'icon-deploy',
            name: 'deploy',
            desc: '一个简易的Github Webhooks自动热部署方案'
          },
          {
            link: 'https://github.com/surmon-china/wordpress-theme-one',
            icon: 'icon-wordpress',
            name: 'One',
            desc: '一款小清新的Wordpress博客风格主题'
          },
          {
            link: 'https://github.com/surmon-china/wordpress-theme-surmon',
            icon: 'icon-wordpress',
            name: 'Surmon',
            desc: '前博客Wordpress-BLOG主题'
          },
          {
            link: 'https://github.com/surmon-china/wordpress-theme-metro',
            icon: 'icon-wordpress',
            name: 'Metro',
            desc: '仿Ipc.me的Wordpress-CMS主题'
          },
          {
            link: 'https://github.com/surmon-china/wordpress-theme-think',
            icon: 'icon-wordpress',
            name: 'think',
            desc: '仿远景论坛门户首页的Wordpress-CMS主题'
          }
        ]
      }
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
