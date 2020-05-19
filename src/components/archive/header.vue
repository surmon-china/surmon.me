<template>
  <div
    class="header-box"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
    :style="{
      'background-color': currentBackgroundColor,
      'background-image': `url(${currentBackgroundImage})`
    }"
  >
    <div class="logo-box">
      <p class="logo">
        <transition name="module" mode="out-in">
          <!-- data -->
          <i v-if="currentDate" key="date" class="iconfont icon-clock"></i>
          <!-- tag -->
          <i
            v-else-if="currentTag"
            key="tag"
            class="iconfont"
            :class="currentTagIconClass"
          ></i>
          <!-- category -->
          <i
            v-else-if="currentCategory"
            key="category"
            class="iconfont"
            :class="currentCategoryIconClass"
          ></i>
          <!-- search -->
          <i
            v-else-if="currentKeyword"
            key="search"
            class="iconfont icon-search"
          ></i>
        </transition>
      </p>
    </div>
    <div class="title-box">
      <transition name="module" mode="out-in">
        <!-- category -->
        <h5
          v-if="currentCategory"
          :key="`category-${currentCategory.description}`"
          class="title"
        >
          <span>{{ currentCategory.description || '...' }}</span>
        </h5>
        <!-- tag -->
        <h5
          v-else-if="currentTag"
          :key="`tag-${currentTag.name}`"
          class="title"
        >
          <span>{{ currentTag.name }}</span>
          <span>&nbsp;-&nbsp;</span>
          <span>{{ currentTag.description || '...' }}</span>
        </h5>
        <!-- date -->
        <h5 v-else-if="currentDate" :key="`date-${currentDate}`" class="title">
          <span v-if="isEnLang">
            <span>{{ currentDate }}&nbsp;</span>
            <span>articles</span>
          </span>
          <span v-else>
            <span>发布于</span>
            <span>&nbsp;{{ currentDate }}&nbsp;</span>
            <span>的所有文章</span>
          </span>
        </h5>
        <!-- search -->
        <h5
          v-else-if="currentKeyword"
          :key="`search-${currentKeyword}`"
          class="title"
        >
          <span v-if="isEnLang">
            <span>"{{ currentKeyword }}"</span>
            <span>related articles</span>
          </span>
          <span v-else>
            <span>和</span>
            <span>&nbsp;"</span>
            <span>{{ currentKeyword }}</span>
            <span>"&nbsp;</span>
            <span>有关的所有文章</span>
          </span>
        </h5>
      </transition>
    </div>
  </div>
</template>

<script>
  import { getFileCDNUrl } from '~/transformers/url'
  export default {
    name: 'ArticleListHeader',
    computed: {
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isDarkTheme() {
        return this.$store.getters['global/isDarkTheme']
      },
      currentTag() {
        return this.$store.state.tag.data.find(
          tag => tag.slug === this.$route.params.tag_slug
        )
      },
      currentTagIconClass() {
        return this.getExtendsValue(this.currentTag, 'icon') || 'icon-tag'
      },
      currentCategory() {
        return this.$store.state.category.data.find(category => {
          return category.slug === this.$route.params.category_slug
        })
      },
      currentCategoryIconClass() {
        return this.getExtendsValue(this.currentCategory, 'icon') || 'icon-category'
      },
      currentBackgroundImage() {
        const tagBg = this.getExtendsValue(this.currentTag, 'background')
        const cateBg = this.getExtendsValue(this.currentCategory, 'background')
        return tagBg || cateBg || getFileCDNUrl('/images/service.jpg')
      },
      currentBackgroundColor() {
        const tagBg = this.getExtendsValue(this.currentTag, 'bgcolor')
        const cateBg = this.getExtendsValue(this.currentCategory, 'bgcolor')
        return tagBg || cateBg || null
      },
      currentDate() {
        return this.$route.params.date
      },
      currentKeyword() {
        return this.$route.params.keyword
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    methods: {
      getExtendsValue(target, key) {
        if (!target || !target.extends.length) {
          return null
        }
        const targetExtend = target.extends.find(t => t.name === key)
        return targetExtend ? targetExtend.value : null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-box {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16.4rem;
    background-size: cover;
    background-blend-mode: hue;
    background-color: $module-hover-bg-darken-10;
    background-position: center center;
    color: $text-reversal;

    &.dark {
      color: $text;
    }

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

    > .logo-box {
      height: 12rem;
      overflow: hidden;

      > .logo {
        margin: 0;
        line-height: 12rem;
        text-align: center;

        @keyframes logo-animate {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

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
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
</style>
