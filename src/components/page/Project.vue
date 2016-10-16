<style lang="scss" scoped>
  .projects {
  }
</style>

<template>
  <div class="projects">
    <ul class="project-list">
      <li>
        <router-link to="/project/vue-codemirror" class="item">
          <i class="iconfont icon-code"></i>
          <span>Vue-Codemirror</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {

    // 模块名称
    name: 'project-list',

    data() {
      return {
      }
    }
  }
</script>
