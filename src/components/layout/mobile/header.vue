<template>
  <header class="header">
    <div class="search" :class="{ actived: searchState.open }">
      <input
        class="input"
        ref="inputElement"
        type="text"
        maxlength="16"
        required
        :placeholder="t(LanguageKey.SEARCH_PLACEHOLDER)"
        v-model.trim="searchState.keyword"
        @keyup.enter.stop.prevent="submitSearch"
      />
      <span class="close" @click.stop.prevent="cancelSearch">
        <i class="iconfont icon-cancel"></i>
      </span>
    </div>
    <transition name="module">
      <div v-if="searchState.open" class="search-mask"></div>
    </transition>
    <nav class="navbar">
      <button class="navbar-menu" @click.stop.prevent="handleMenuToggle">
        <i class="iconfont icon-menu"></i>
      </button>
      <router-link to="/" class="navbar-logo">
        <uimage class="image" cdn src="/images/logo.svg" />
      </router-link>
      <button class="navbar-search" @click.stop.prevent="openSearch">
        <i class="iconfont icon-search"></i>
      </button>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watch, onMounted, nextTick } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { LanguageKey } from '/@/language'
  import { isSearchFlow } from '/@/transforms/route'

  export enum MobileHeaderEvents {
    Open = 'open',
    Close = 'close'
  }

  export default defineComponent({
    name: 'MobileHeader',
    props: {
      opened: {
        type: Boolean,
        required: true
      }
    },
    emits: [MobileHeaderEvents.Open, MobileHeaderEvents.Close],
    setup(props, context) {
      const { i18n, route, router } = useEnhancer()
      const inputElement = ref<HTMLInputElement>(null as any)
      const searchState = reactive({
        open: false,
        keyword: ''
      })

      onMounted(() => {
        if (isSearchFlow(route.name as string)) {
          searchState.keyword = route.params.keyword as string
        }
      })

      const handleMenuToggle = () => {
        context.emit(props.opened ? MobileHeaderEvents.Close : MobileHeaderEvents.Open)
      }

      const openSearch = () => {
        searchState.open = true
        nextTick(() => {
          inputElement.value.focus()
        })
      }

      const cancelSearch = () => {
        searchState.open = false
      }

      const submitSearch = () => {
        const keyword = searchState.keyword.trim()
        if (keyword) {
          router.push({
            name: RouteName.SearchFlow,
            params: { keyword }
          })
        }
      }

      watch(
        () => router.currentRoute.value,
        () => {
          nextTick(() => {
            cancelSearch()
            context.emit(MobileHeaderEvents.Close)
          })
        }
      )

      return {
        t: i18n.t,
        LanguageKey,
        searchState,
        inputElement,
        openSearch,
        submitSearch,
        cancelSearch,
        handleMenuToggle
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $mobile-header-height;
    background-color: $module-bg;
    z-index: $z-index-header;
    @include backdrop-blur(5px);

    .search-mask {
      position: fixed;
      z-index: $z-index-normal;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      touch-action: none;
      background-color: $module-bg-translucent;
      @include backdrop-blur(3px);
    }

    .search {
      position: absolute;
      display: flex;
      z-index: $z-index-normal + 1;
      width: 100%;
      height: $mobile-header-height;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: $text-reversal;
      transform: translateY(-100%);

      > .input {
        width: 80%;
        height: 100%;
        padding: 1em;
      }

      > .close {
        width: 20%;
        height: 100%;
        line-height: $mobile-header-height;
        text-align: center;
      }

      &.actived {
        opacity: 1;
        transform: translateY(0%);
      }
    }

    .navbar {
      width: 100%;
      height: $mobile-header-height;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: space-between;

      .navbar-menu,
      .navbar-search {
        height: 100%;
        width: 20%;
        line-height: $mobile-header-height;
        text-align: center;
      }

      .navbar-logo {
        width: 30%;

        .image {
          filter: $theme-logo-rotate;
        }
      }
    }
  }
</style>
