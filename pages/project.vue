<template>
  <div class="projects" :class="{ mobile: mobileLayout }">
    <ul class="project-list">
      <li class="item" 
          :key="index"
          :class="{ last: buildLastClass(index) }"
          v-for="(project, index) in projects">
        <a target="_blank"
           class="item-content" 
           rel="external nofollow noopenter"
           :href="project.html_url"
           :title="project.description">
          <i class="iconfont" :class="[buildIcon(project)]"></i>
          <h3 class="title">{{ project.name }}</h3>
          <p class="description" style="-webkit-box-orient: vertical;">{{ project.description }}</p>
          <hr>
          <p class="meta">
            <span class="item star">
              <i class="iconfont icon-star"></i>
              <span>{{ project.stargazers_count }}</span>
            </span>
            <span class="item fork">
              <i class="iconfont icon-git-fork"></i>
              <span>{{ project.forks_count }}</span>
            </span>
            <span class="item issues">
              <i class="iconfont icon-git-issue"></i>
              <span>{{ project.open_issues_count }}</span>
            </span>
          </p>
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
    fetch ({ store }) {
      return store.dispatch('loadGithubRepositories')
    },
    computed: {
      projects() {
        return this.$store.state.project.repositories.data
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    },
    methods: {
      buildLastClass(index) {
        const projects = this.projects
        
        // 取余
        if (projects.length % 4) {
          return index >= (projects.length - projects.length % 4)
        
        // 取整
        } else {
          return index >= projects.length - 4
        }
      },
      buildIcon(project) {
        switch(true) {
          case project.name.toLowerCase().includes('vue'):
          case project.description.toLowerCase().includes('vue'):
            return 'icon-vue'
            break;
          case project.name.toLowerCase().includes('node'):
            return 'icon-nodejs'
            break;
          case project.name.toLowerCase().includes('angular'):
          case project.name.toLowerCase().includes('ng2'):
            return 'icon-angularjs'
            break;
          case project.name.toLowerCase().includes('chrome'):
            return 'icon-chrome'
            break;
          case project.name.toLowerCase().includes('jquery'):
            return 'icon-jquery'
            break;
          case project.name.toLowerCase().includes('wordpress'):
            return 'icon-wordpress'
            break;
          case project.name.toLowerCase().includes('linux'):
          case project.description.toLowerCase().includes('linux'):
            return 'icon-linux'
            break;
          case project.name.toLowerCase().includes('react'):
          case project.description.toLowerCase().includes('react'):
            return 'icon-react'
            break;
          case project.description.toLowerCase().includes('netease'):
            return 'icon-netease-music'
            break;
          case project.description.toLowerCase().includes('music'):
            return 'icon-music'
            break;
          default:
            return 'icon-code'
            break; 
        }
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
          flex-grow: 1;
          margin-right: 0;

          &.last {
            margin-bottom: 1rem;
          }

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

            > .description {
              height: auto;
            }
          }
        }
      }
    }

    > .project-list {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style: none;
      justify-content: flex-start;

      > .item {
        margin-right: 1rem;
        margin-bottom: 1rem;
        width: 23.9%;
        // height: 23.33rem;

        &.last {
          margin-bottom: 0;
        }

        &:nth-child(4n + 0) {
          margin-right: 0;
        }

        > .item-content {
          display: block;
          width: 100%;
          height: 100%;
          padding: 1rem;
          text-align: center;
          background-color: $module-bg;
          transition: transform 1s, background-color .5s;

          &:hover {
            background-color: $module-hover-bg;
            transition: transform 1s, background-color .5s;
          }

          > .iconfont {
            display: block;
            height: 1.3em;
            font-size: 6rem;
          }

          > .title {
            @include text-overflow();
            padding: 0 1em;
            margin-bottom: 1.2em;
            font-weight: bold;
            text-transform: capitalize;
          }

          > .description {
            margin-bottom: 1rem;
            text-align: left;
            line-height: 2em;
            text-indent: 1.6em;
            height: 4em;
            overflow: hidden;
            text-overflow: ellipsis;
            @include clamp(2);
          }

          > .meta {
            margin-bottom: .5rem;
            display: flex;
            justify-content: space-around;

            > .item {
              font-weight: 400;
              color: $secondary;

              > .iconfont {
                margin-right: .6rem;
              }
            }
          }
        }
      }
    }
  }
</style>
