<template>
  <div class="project">
    <h3 class="title">Angular-Admin</h3>
    <div class="example"></div>
    <div class="detail" v-html="pageDetail"></div>
  </div>
</template>

<script>
  export default {
    name: 'project-angular-admin',
    data() {
      return {
        pageDetail: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .project {
    padding: 1em;
    background-color: $module_bg;

    > .title {
      text-align: center;
    }

    > .example {}

    > .detail {}
  }
</style>
