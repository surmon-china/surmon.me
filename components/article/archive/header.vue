<template>
  <div class="header-box">
    <p class="logo">
      <i class="iconfont icon-clock" v-if="currentDate"></i>
      <i class="iconfont" v-if="currentTag" :class="[currentTagIconClass]"></i>
      <i class="iconfont icon-code"  v-if="Object.is($route.params.category_slug, 'code')"></i>
      <i class="iconfont icon-think" v-if="Object.is($route.params.category_slug, 'think')"></i>
    </p>
    <h5 class="title" v-if="Object.is($route.params.category_slug, 'code')">这里记录与编程有关的一切</h5>
    <h5 class="title" v-if="Object.is($route.params.category_slug, 'think')">生活、思考、互联网</h5>
    <h5 class="title" v-if="currentTag">
      <span>{{ currentTag.name }}</span>
      <span>&nbsp;-&nbsp;</span>
      <span>{{ currentTag.description || '暂无介绍' }}</span>
    </h5>
    <h5 class="title" v-if="currentDate">
      <span>发布于</span>
      <span>&nbsp;{{ currentDate }}&nbsp;</span>
      <span>的所有文章</span>
    </h5>
  </div>
</template>

<script>
  export default {
    name: 'article-list-header',
    computed: {
      currentTag() {
        return this.$store.state.tag.data.result.data.find((tag, index, arr) => {
          return Object.is(tag.slug, this.$route.params.tag_slug)
        })
      },
      currentTagIconClass() {
        const currentTagIcon = this.currentTag.extend.find(t => t.icon)
        return currentTagIcon ? currentTagIcon.icon : 'icon-tag'
      },
      currentDate() {
        return this.$route.params.date
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
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
