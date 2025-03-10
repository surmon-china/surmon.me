<script lang="ts" setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { getPageURL } from '/@/transforms/url'
  import HeaderView from './header.vue'
  import FooterView from './footer.vue'
  import AsideView from './aside.vue'

  const { route } = useEnhancer()
  const pageURL = computed(() => getPageURL(route.fullPath))

  const isLoaded = ref(false)
  const isOpenedAside = ref(false)
  const openAside = () => (isOpenedAside.value = true)
  const closeAside = () => (isOpenedAside.value = false)

  onMounted(() => {
    isLoaded.value = true
    watch(isOpenedAside, (opened) => {
      document.body.style.overflow = opened ? 'hidden' : 'auto'
    })
  })
</script>

<template>
  <div class="mobile-main">
    <div class="asider" :class="{ loaded: isLoaded, opened: isOpenedAside }">
      <aside-view class="aside" />
    </div>
    <div class="main" :class="{ opened: isOpenedAside }">
      <div v-if="isOpenedAside" class="close-mask" @click="closeAside" />
      <header-view :opened="isOpenedAside" @close="closeAside" @open="openAside" />
      <main class="main-container">
        <router-view name="mobile" v-slot="{ Component, route: r }">
          <div class="route-view" v-if="r.meta.responsive">
            <component :is="Component" :key="r.name" />
          </div>
          <div class="fallback" v-else>
            <i class="iconfont icon-desktop"></i>
            <p class="text">
              <i18n zh="请在 PC 端访问以获得最佳体验" en="This page only support visit on PC" />
            </p>
            <a class="link" :href="pageURL">{{ pageURL }}</a>
          </div>
        </router-view>
      </main>
      <footer-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .mobile-main {
    color: $color-text;
    background-color: $module-bg-hover;
    $aside-width: 66%;

    .asider {
      width: $aside-width;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: $mobile-aside-bg;
      transform: translate3d(-100%, 0, 0);

      .aside {
        opacity: 0;
        transition: $mobile-aside-transition;
      }

      &.loaded {
        transition: $mobile-aside-transition;
      }

      &.opened {
        transform: translate3d(0, 0, 0);
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        .aside {
          opacity: 1;
          transition: $mobile-aside-transition;
        }
      }
    }

    .main {
      min-height: 100vh;
      position: relative;
      transition: $mobile-aside-transition;

      &.opened {
        transform: translate3d($aside-width, 0, 0);
      }

      .close-mask {
        position: absolute;
        width: 100vw;
        height: 100%;
        top: 0;
        right: 0;
        z-index: $z-index-top;
        background-color: $module-bg-translucent;
        @include mix.backdrop-blur(3px);
      }

      .main-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        min-height: calc(100vh - $mobile-header-height);
        margin: 0;
        padding: $gap-lg $gap;
        padding-top: $mobile-header-height + $gap-lg;
        transition: width 0.35s;
        display: flex;

        .fallback {
          width: 100%;
          padding-bottom: 6rem; // for middle
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .iconfont {
            color: $color-text-divider;
            font-size: 12rem;
          }

          .text {
            font-size: $font-size-h4;
            margin-bottom: $gap-lg;
          }

          .link {
            color: $color-text-disabled;
            @include mix.text-underline(0.4em);
          }
        }

        .route-view {
          width: 100%;
        }
      }
    }
  }
</style>
