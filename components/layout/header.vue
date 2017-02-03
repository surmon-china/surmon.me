<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <img src="/images/logo.svg" class="navbar-logo">
          <span class="navbar-slogan">Talk is cheap. Show me the code</span>
          <router-link to="/" class="navbar-link"></router-link>
        </div>
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
  @import '~assets/sass/variables';
  .header {

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4.5em;
      background-color: $module-bg;
      z-index: 999;

      .navbar-container {
        height: 4.5em;

        .navbar-header {
          height: 4.5em;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          width: 30em;
          justify-content: space-between;

          .navbar-logo {
            width: 10em;
          }

          .navbar-slogan {
            color: $primary;
            font-family: CenturyGothic;
          }

          .navbar-link {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
