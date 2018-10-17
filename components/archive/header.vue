<template>
  <div class="header-box" :class="{ mobile: mobileLayout }">
    <div class="background" :style="{
      'background-color': currentBackgroundColor,
      'background-image': `url(${currentBackgroundImage})`
    }"></div>
    <div class="logo-box">
      <p class="logo">
        <transition name="module" mode="out-in">
          <!-- data -->
          <i class="iconfont icon-clock" v-if="currentDate"></i>
          <!-- tag -->
          <i class="iconfont" v-else-if="currentTag" :class="[currentTagIconClass]"></i>
          <!-- category -->
          <i class="iconfont"  v-else-if="currentCategory" :class="[currentCategoryIconClass]"></i>
          <!-- search -->
          <i class="iconfont icon-search" v-else-if="currentKeyword"></i>
        </transition>
      </p>
    </div>
    <div class="title-box">
      <transition name="module" mode="out-in">

        <!-- category -->
        <h4 class="title" v-if="currentCategory">
          <span>{{ currentCategory.description || 'Nothing.' }}</span>
        </h4>

        <!-- tag -->
        <h4 class="title" v-else-if="currentTag">
          <span>{{ currentTag.name }}</span>
          <span>&nbsp;-&nbsp;</span>
          <span>{{ currentTag.description || 'Nothing.' }}</span>
        </h4>

        <!-- data -->
        <h4 class="title" v-else-if="currentDate">
          <span v-if="languageIsEn">
            <span>{{ currentDate }}&nbsp;</span>
            <span>articles</span>
          </span>
          <span v-else>
            <span>发布于</span>
            <span>&nbsp;{{ currentDate }}&nbsp;</span>
            <span>的所有文章</span>
          </span>
        </h4>

        <!-- search -->
        <h4 class="title" v-else-if="currentKeyword">
          <span v-if="languageIsEn">
            <span>"{{ currentKeyword }}"</span>
            <span> related articles</span>
          </span>
          <span v-else>
            <span>和</span>
            <span>&nbsp;"</span>
            <span>{{ currentKeyword }}</span>
            <span>"&nbsp;</span>
            <span>有关的所有文章</span>
          </span>
        </h4>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article-list-header',
    methods: {
      getExtendsValue(target, key) {
        if (!target || !target.extends.length) return null
        const targetExtend = target.extends.find(t => Object.is(t.name, key))
        return targetExtend ? targetExtend.value : null
      }
    },
    computed: {
      languageIsEn() {
        return this.$store.getters['option/langIsEn']
      },
      currentTag() {
        return this.$store.state.tag.data.data.find((tag, index, arr) => {
          return Object.is(tag.slug, this.$route.params.tag_slug)
        })
      },
      currentTagIconClass() {
        return this.getExtendsValue(this.currentTag, 'icon') || 'icon-tag'
      },
      currentCategory() {
        return this.$store.state.category.data.data.find((category, index, arr) => {
          return Object.is(category.slug, this.$route.params.category_slug)
        })
      },
      currentCategoryIconClass() {
        return this.getExtendsValue(this.currentCategory, 'icon') || 'icon-category'
      },
      currentBackgroundImage() {
        const tagBg = this.getExtendsValue(this.currentTag, 'background')
        const cateBg = this.getExtendsValue(this.currentCategory, 'background')
        return tagBg || cateBg || '/images/service.jpg'
      },
      currentBackgroundColor() {
        const tagBg = this.getExtendsValue(this.currentTag, 'bgcolor')
        const cateBg = this.getExtendsValue(this.currentCategory, 'bgcolor')
        return tagBg || cateBg || 'transparent'
      },
      currentDate() {
        return this.$route.params.date
      },
      currentKeyword() {
        return this.$route.params.keyword
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-box {
    color: $white;
    height: 16.4rem;
    display: flex;
    flex-direction: column;
    position: relative;

    &.mobile {
      height: 12rem;

      > .logo-box {
        height: 8.6rem;

        > .logo {
          line-height: 8.6rem;

          > .iconfont {
            font-size: 5em;
          }
        }
      }
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

    > .background {
      background-size: cover;
      background-blend-mode: darken;
      background-color: $module-bg;
      background-position: center center;
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
    }

    > .logo-box {
      height: 12rem;
      overflow: hidden;

      > .logo {
        margin: 0;
        line-height: 12rem;
        text-align: center;

        .iconfont {
          font-size: 6em;
          display: inline-block;
          animation: logo-animate 5s infinite;
        }
      }
    }

    > .title-box {
      height: 4rem;
      line-height: 2.5rem;

      > .title {
        margin: 0;
        font-size: 1em;
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
</style>
