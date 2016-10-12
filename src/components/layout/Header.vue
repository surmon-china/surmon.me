<template>
  <header class="header">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-container">
          <div class="navbar-header">
            <router-link to="/" class="navbar-logo">
              <!-- <img src="/static/images/logo.png" class="img-rounded"> -->
              <img src="/static/images/logo-header.svg" class="img-rounded">
            </router-link>
            <router-link to="/" class="navbar-slogan">
              <span>高质量的技术社区</span>
            </router-link>
          </div>
          <ul class="navbar-nav nav" v-if="false">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Code</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Think</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Guestbook</a>
            </li>
          </ul>
          <form class="form-inline navbar-form navbar-search" v-if="false">
            <input class="form-control" type="text" placeholder="Search">
            <button class="btn btn-success-outline" type="submit">Search</button>
          </form>
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
  @import '../../sass/variables';
  .header {

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4em;
      background-color: rgba(255,255,255,0.8);
      border-bottom: 1px solid #f1f1f1;
      z-index: 999;

      .navbar-container {
        height: 4em;

        .navbar-header {
          height: 4em;
          display: flex;
          align-items: center;

          .navbar-logo {

            .img-rounded {
              max-width: 100%;
              max-height: 100%;
            }
          }

          .navbar-slogan {
            margin-left: 2em;
            margin-right: 3em;

            &:hover {
              text-decoration: none;
            }
          }
        }

        .navbar-search {
          float: right;
        }
      }
    }
  }
</style>
