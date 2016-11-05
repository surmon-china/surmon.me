<template>
  <div class="header-box">
    <p class="logo">
      <i class="iconfont icon-clock" v-if="currentDate"></i>
      <i class="iconfont icon-code"  v-if="$route.params.category == 'code'"></i>
      <i class="iconfont icon-think" v-if="$route.params.category == 'think'"></i>
      <i class="iconfont" :class="[currentTag.icon]" v-if="currentTag"></i>
    </p>
    <h5 class="title" v-if="$route.params.category == 'code'">这里记录与编程有关的一切</h5>
    <h5 class="title" v-if="$route.params.category == 'think'">这里分享我所收藏的、原创的关于生活、社会、互联网...的一些思考和见解</h5>
    <h5 class="title" v-if="currentTag">
      <span>{{ currentTag.title }}</span>
      <span>-</span>
      <span>{{ currentTag.introduction || '暂无介绍' }}</span>
    </h5>
    <h5 class="title" v-if="currentDate">
      <span>发布于</span>
      <span>{{ currentDate }}</span>
      <span>的所有文章</span>
    </h5>
  </div>
</template>

<script>
  export default {
    name: 'Article-List-Header',
    computed: {
      currentTag() {
        return this.$store.state.tag.data.data.find((tag, index, arr) => tag.router === this.$route.params.tag)
      },
      currentDate() {
        return this.$route.params.date
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../sass/mixins';
  @import '../../../sass/variables';
  .header-box {
    padding: 1em;

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

    > .logo {
      text-align: center;

      .iconfont {
        font-size: 6em;
        display: inline-block;
        animation: logo-animate 5s infinite;
      }
    }

    > .title {
      text-align: center;
      text-transform: capitalize;
    }
  }
</style>
