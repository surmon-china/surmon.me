<template>
  <header class="header">
    <div class="search" :class="{ actived: searchState.open }">
      <input
        ref="inputElement"
        v-model.trim="searchState.keyword"
        type="text"
        class="input"
        list="keywords"
        required
        :placeholder="t(LANGUAGE_KEYS.SEARCH_PLACEHOLDER)"
        @keyup.enter.stop.prevent="submitSearch"
      />
      <span class="close" @click.stop.prevent="cancelSearch">
        <i class="iconfont icon-cancel"></i>
      </span>
      <client-only>
        <datalist v-if="tags.length" id="keywords" class="search-keywords">
          <option
            class="iiem"
            v-for="tag in tags"
            :key="tag.slug"
            :value="tag.name"
            :label="tag.description"
          />
        </datalist>
      </client-only>
    </div>
    <transition name="module">
      <div v-if="searchState.open" class="search-mask"></div>
    </transition>
    <nav class="navbar">
      <a href class="navbar-menu" @click.stop.prevent="toggleSidebar">
        <i class="iconfont icon-menu"></i>
      </a>
      <router-link to="/" class="navbar-logo">
        <uimage cdn src="/images/logo.svg" />
      </router-link>
      <a href class="navbar-search" @click.stop.prevent="openSearch">
        <i class="iconfont icon-search"></i>
      </a>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent, computed, reactive, ref, watch, onMounted, nextTick } from 'vue'
  import { useEnhancer } from '../../../../src/app/enhancer'
  import { RouteName } from '../../../../src/app/router'
  import { isSearchArchive } from '/@/transforms/route'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'MobileHeader',
    setup() {
      const { store, i18n, route, router, globalState } = useEnhancer()
      const isOpenedSidebar = computed(() => globalState.switchBox.mobileSidebar)
      const tags = computed(() => store.state.tag.data)
      const inputElement = ref<HTMLInputElement>(null as any)
      const searchState = reactive({
        open: false,
        keyword: ''
      })

      onMounted(() => {
        if (isSearchArchive(route.name as string)) {
          searchState.keyword = route.params.keyword as string
        }
      })

      const toggleSidebar = globalState.switchTogglers.mobileSidebar
      const openSearch = () => {
        searchState.open = true
        nextTick(inputElement.value.focus)
      }
      const cancelSearch = () => {
        searchState.open = false
      }
      const submitSearch = () => {
        const keyword = searchState.keyword.trim()
        if (keyword) {
          router.push({
            name: RouteName.SearchArchive,
            params: { keyword }
          })
        }
      }

      watch(
        () => router.currentRoute.value,
        () => {
          nextTick(() => {
            cancelSearch()
            toggleSidebar(false)
          })
        }
      )

      return {
        t: i18n.t,
        LANGUAGE_KEYS,
        tags,
        searchState,
        inputElement,
        openSearch,
        submitSearch,
        cancelSearch,
        isOpenedSidebar,
        toggleSidebar
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $mobile-header-height;
    background-color: $module-bg;
    z-index: $z-index-header;
    @include backdrop-blur();

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
      }
    }
  }
</style>
