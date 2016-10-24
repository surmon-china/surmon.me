<template>
  <div class="article-lists-header">
    <div class="header-box" v-if="$route.params.category_slug == 'think'">
      <p class="logo">
        <i class="iconfont icon-think"></i>
      </p>
      <h5 class="title">这里分享我所收藏的、原创的关于生活、社会、互联网...的一些思考和见解</h5>
    </div>
    <div class="header-box" v-if="$route.params.category_slug == 'code'">
      <!-- <img src="" class="background"> -->
      <p class="logo">
        <i class="iconfont icon-code"></i>
      </p>
      <h5 class="title">我会在这里记录与编程有关的一切</h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article-lists-header',
    data() {
      return {}
    },
    watch: {
      '$route'(route) {
        console.log(route.params.category_slug)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../sass/mixins';
  @import '../../../sass/variables';
  .article-lists-header {
    margin-bottom: 1em;
    position: relative;
    overflow: hidden;
    background-color: $module-bg;

    .header-box {
      padding: 1em;

      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .6;
        z-index: -1;
        background-size: cover;
        background: url('http://surmon.me/wp-content/uploads/2015/07/79_120801145009_1.jpg') $module-bg;
      }


      @keyframes logo-animate {
        0% {
          opacity: 1;
          transform: scale(1);
        }

        33% {
          opacity: .8;
          transform: scale(.9) rotateY(0deg);
        }

        66% {
          opacity: .8;
          transform: scale(.9) rotateY(360deg);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .logo {
        text-align: center;

        .iconfont {
          font-size: 6em;
          display: inline-block;
          animation: logo-animate 5s infinite;
        }
      }

      .title {
        text-align: center;
      }
    }
  }
</style>
