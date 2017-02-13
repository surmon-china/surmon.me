<template>
  <div class="header-box">
    <p class="logo">
      <!-- data -->
      <i class="iconfont icon-clock" v-if="currentDate"></i>
      <!-- tag -->
      <i class="iconfont" v-if="currentTag" :class="[currentTagIconClass]"></i>
      <!-- category -->
      <i class="iconfont"  v-if="currentCategory" :class="[currentCategoryIconClass]"></i>
      <!-- search -->
      <i class="iconfont icon-search" v-if="currentKeyword"></i>
    </p>
    <!-- category -->
    <h4 class="title" v-if="currentCategory">
      <span>{{ currentCategory.description || 'Nothing.' }}</span>
    </h4>
    <!-- tag -->
    <h4 class="title" v-if="currentTag">
      <span>{{ currentTag.name }}</span>
      <span>&nbsp;-&nbsp;</span>
      <span>{{ currentTag.description || 'Nothing.' }}</span>
    </h4>
    <!-- data -->
    <h4 class="title" v-if="currentDate">
      <span>发布于</span>
      <span>&nbsp;{{ currentDate }}&nbsp;</span>
      <span>的所有文章</span>
    </h4>
      <!-- search -->
    <h4 class="title" v-if="currentKeyword">
      <span>和</span>
      <span>&nbsp;"</span>
      <span>{{ currentKeyword }}</span>
      <span>"&nbsp;</span>
      <span>有关的所有文章</span>
    </h4>
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
        if (!this.currentTag) return ''
        const currentTagIcon = this.currentTag.extends.find(t => Object.is(t.name, 'icon'))
        return currentTagIcon ? currentTagIcon.value : 'icon-tag'
      },
      currentCategory() {
        return this.$store.state.category.data.result.data.find((category, index, arr) => {
          return Object.is(category.slug, this.$route.params.category_slug)
        })
      },
      currentCategoryIconClass() {
        if (!this.currentCategory) return ''
        const currentCategoryIcon = this.currentCategory.extends.find(t => Object.is(t.name, 'icon'))
        return currentCategoryIcon ? currentCategoryIcon.value : 'icon-category'
      },
      currentDate() {
        return this.$route.params.date
      },
      currentKeyword() {
        return this.$route.params.keyword
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
      font-size: 1em;
      text-align: center;
      text-transform: capitalize;
    }
  }
</style>
