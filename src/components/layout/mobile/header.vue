<script lang="ts" setup>
  import { reactive, ref, watch, onMounted, nextTick } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { LanguageKey } from '/@/language'
  import { isSearchFlow } from '/@/transforms/route'
  import { onBeforeMount } from 'vue'

  enum MobileHeaderEvents {
    Open = 'open',
    Close = 'close'
  }

  const props = defineProps<{
    opened: boolean
  }>()

  const emit = defineEmits<{
    (e: MobileHeaderEvents.Open): void
    (e: MobileHeaderEvents.Close): void
  }>()

  const { route, router, i18n: _i18n } = useEnhancer()
  const inputElement = ref<HTMLInputElement>(null as any)
  const searchState = reactive({
    open: false,
    keyword: ''
  })

  const handleMenuToggle = () => {
    props.opened ? emit(MobileHeaderEvents.Close) : emit(MobileHeaderEvents.Open)
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

  onBeforeMount(() => {
    watch(
      () => router.currentRoute.value,
      () => {
        nextTick(() => {
          cancelSearch()
          emit(MobileHeaderEvents.Close)
        })
      }
    )
  })

  onMounted(() => {
    if (isSearchFlow(route.name as string)) {
      searchState.keyword = route.params.keyword as string
    }
  })
</script>

<template>
  <header class="header">
    <div class="search" :class="{ actived: searchState.open }">
      <input
        class="input"
        ref="inputElement"
        autocomplete="off"
        type="text"
        maxlength="16"
        required
        :placeholder="_i18n.t(LanguageKey.SEARCH_PLACEHOLDER)"
        v-model.trim="searchState.keyword"
        @keyup.enter.stop.prevent="submitSearch"
      />
      <span class="close" @click.stop.prevent="cancelSearch">
        <i class="iconfont icon-cancel"></i>
      </span>
    </div>
    <transition name="module">
      <div v-if="searchState.open" class="search-mask" @click="cancelSearch"></div>
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
      border-bottom: 1px solid $module-bg-darker-2;

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
      border-bottom: 1px solid $module-bg-darker-2;

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
