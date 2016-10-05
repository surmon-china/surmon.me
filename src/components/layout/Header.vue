<template>
  <header class="header">
    <nav class="navbar navbar-light navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand">
            <img src="/static/images/logo-header.svg" class="logo-image">
          </router-link>
          <router-link to="/" class="navbar-brand">
            <span class="text-primary">高质量的技术社区</span>
          </router-link>
        </div>
        <form class="form-inline navbar-form pull-right">
          <input class="form-control" type="text" placeholder="Search">
          <button class="btn btn-success-outline" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';
  .header {

    .navbar {
      background-color: white;
      border-bottom: 1px solid #f1f1f1;

      .navbar-header {

        .navbar-brand {
          height: 2em;
          line-height: 2em;
        }
      }
    }
  }
</style>