<template>
  <header class="header">
    <form
      class="search"
      :class="{ actived: searchState.open }"
      @submit.stop.prevent="submitSearch()"
    >
      <input
        ref="inputElement"
        v-model.trim="searchState.keyword"
        type="text"
        class="input"
        list="keywords"
        required
        :placeholder="t(LANGUAGE_KEYS.SEARCH_PLACEHOLDER)"
        @keyup.enter.stop.prevent="submitSearch"
      >
      <span class="close" @click.stop.prevent="cancelSearch">
        <i class="iconfont icon-cancel"></i>
      </span>
      <client-only>
        <datalist v-if="tags.length" id="keywords" class="search-keywords">
          <option
            v-for="tag in tags"
            :key="tag.slug"
            class="iiem"
            :value="tag.name"
            :label="tag.description"
          />
        </datalist>
      </client-only>
    </form>
    <transition name="fade">
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
  import * as APP_CONFIG from '/@/config/app.config'
  import { defineComponent, computed, reactive, ref, toRefs, watch, nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useI18n } from '/@/services/i18n'
  import { useStore } from '/@/store'
  import { RouteName } from '/@/router'
  import { useGlobalState } from '/@/state'

  export default defineComponent({
    name: 'MobileHeader',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      const router = useRouter()
      const globalState = useGlobalState()
      const tags = store.state.tag.data
      const isOpenedSidebar = globalState.switchBox.mobileSidebar
      const toggleSidebar = globalState.switchTogglers.mobileSidebar
      const inputElement = ref<HTMLInputElement>(null as any)
      const searchState = reactive({
        open: false,
        keyword: ''
      })

      const openSearch = () => {
        searchState.open = true
        nextTick(inputElement.value.focus)
      }
      const cancelSearch = () => {
        searchState.open = false
      }
      const submitSearch = () => {
        router.push({
          name: RouteName.SearchArchive,
          params: {
            keyword: searchState.keyword
          }
        })
      }

      watch(
        () => router.currentRoute,
        () => {
          cancelSearch()
          toggleSidebar(false)
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
  @import 'src/assets/styles/init.scss';

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $mobile-header-height;
    background-color: $module-bg-darker-1;
    z-index: $z-index-header;

    .search-mask {
      position: fixed;
      z-index: $z-index-normal;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      background-color: $module-bg-darker-3;
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
