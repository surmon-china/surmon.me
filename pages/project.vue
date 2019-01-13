<template>
  <div class="projects" :class="{ mobile: isMobile }">
    <ul class="project-list">
      <li
        class="item"
        :key="index"
        :class="{ last: buildLastClass(index) }"
        v-for="(project, index) in projects"
      >
        <a
          target="_blank"
          class="item-content"
          rel="external nofollow noopenter"
          :href="project.html_url"
          :title="project.description"
        >
          <i
            class="iconfont"
            :class="buildIcon(project).icon"
            :style="{ color: buildIcon(project).color }"
          ></i>
          <h3 class="title">{{ project.name }}</h3>
          <p
            class="description"
            style="-webkit-box-orient: vertical;"
          >{{ project.description }}</p>
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
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.project + ' | '}Project`
      }
    },
    fetch({ store }) {
      return store.dispatch('project/fetchRepositories')
    },
    computed: {
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      },
      projects() {
        return this.$store.state.project.repositories.data
      }
    },
    methods: {
      buildLastClass(index) {
        const projects = this.projects
        return projects.length % 4
          ? index >= (projects.length - projects.length % 4) // 取余
          : index >= projects.length - 4 // 取整
      },
      buildIcon(project) {

        const iconRules = [{
            desc: 'netease',
            icon: 'netease-music',
            color: '#ab3419'
          }, {
            name: 'react',
            desc: 'react',
            color: '#5dd4fa'
          }, {
            name: 'linux',
            color: '#000000'
          }, {
            name: 'deploy',
            icon: 'linux',
            color: '#000000'
          }, {
            name: 'sre',
            icon: 'linux',
            color: '#000000'
          }, {
            name: 'surmon',
            icon: 'think',
            color: '#0088f5'
          }, {
            name: 'emoji',
            color: '#f4c449'
          }, {
            name: 'vue',
            desc: 'vue',
            icon: 'vuejs-gray',
            color: '#62b287'
          }, {
            name: 'chrome',
            color: '#4aa066'
          }, {
            name: 'jquery',
            color: '#8bcdf1'
          }, {
            desc: 'music',
            color: '#ab3419'
          }, {
            name: 'theme',
            color: 'rgb(245, 119, 0)'
          }, {
            name: 'wordpress',
            color: '#24282d'
          }, {
            name: 'javascript',
            color: '#f4c449'
          }, {
            name: 'wallpaper',
            color: '#2c343d'
          }, {
            name: 'node',
            icon: 'nodejs',
            color: '#8dbb39'
          }, {
            name: 'angular',
            icon: 'angularjs',
            color: '#cc3427'
          }, {
            name: 'ngx',
            icon: 'angularjs',
            color: '#cc3427'
          }
        ]

        const isIncludeName = key => project.name.toLowerCase().includes(key)
        const isIncludeDesc = key => project.description.toLowerCase().includes(key)
        const targetRule = iconRules.find(rule => {
          const includeName = rule.name ? isIncludeName(rule.name) : false
          const includeDesc = rule.desc ? isIncludeDesc(rule.desc) : false
          return includeName || includeDesc
        })

        const targetIcon = targetRule
          ? targetRule.icon || targetRule.name || targetRule.desc
          : 'code'

        const defaultColor = 'inherit'
        const targetColor = targetRule ? targetRule.color || defaultColor : defaultColor

        return { icon: `icon-${targetIcon}`, color: targetColor }
      }
    }
  }
</script>

<style lang="scss" scoped>
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

              &.star {
                color: $text-light;
                font-weight: bold;
              }

              > .iconfont {
                margin-right: .3rem;
              }
            }
          }
        }
      }
    }
  }
</style>
