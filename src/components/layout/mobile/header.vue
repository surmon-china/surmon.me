<script lang="ts" setup>
  import { reactive, ref, watch, onMounted, nextTick } from 'vue'
  import { useTagStore, getTagEnName, getTagIconName } from '/@/stores/tag'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { LanguageKey } from '/@/language'
  import { isSearchFlow } from '/@/transforms/route'
  import { getTagFlowRoute } from '/@/transforms/route'
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
  const tagStore = useTagStore()
  const inputElement = ref<HTMLInputElement>(null as any)
  const searchState = reactive({
    open: false,
    focused: false,
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
    <div class="search" v-if="searchState.open">
      <div class="search-bar">
        <input
          class="input"
          ref="inputElement"
          autocomplete="off"
          type="text"
          maxlength="24"
          required
          :placeholder="_i18n.t(LanguageKey.SEARCH_PLACEHOLDER)"
          v-model.trim="searchState.keyword"
          @keyup.enter.stop.prevent="submitSearch"
          @focus="searchState.focused = true"
          @blur="searchState.focused = false"
        />
        <span class="close" @click.stop.prevent="cancelSearch">
          <i class="iconfont icon-cancel"></i>
        </span>
      </div>
      <div class="search-tags" @click="cancelSearch">
        <div class="tag-list" :class="{ 'input-focused': searchState.focused }" v-if="tagStore.sorted">
          <router-link
            class="item"
            :title="`${getTagEnName(tag)} | ${tag.description}`"
            :to="getTagFlowRoute(tag.slug)"
            :key="index"
            v-for="(tag, index) in tagStore.sorted"
          >
            <i class="iconfont" :class="getTagIconName(tag)" />
            <span class="name"><i18n :zh="tag.name" :en="getTagEnName(tag)" /></span>
            <span class="count">{{ tag.article_count || 0 }}</span>
          </router-link>
        </div>
      </div>
    </div>
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

    .search {
      position: fixed;
      z-index: $z-index-normal + 1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;

      .search-bar {
        width: 100%;
        height: $mobile-header-height;
        display: flex;
        background-color: $text-reversal;
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
      }

      .search-tags {
        flex: 1;
        padding: $lg-gap;
        touch-action: none;
        background-color: $module-bg-translucent;
        @include backdrop-blur(5px);

        .tag-list {
          padding: 0;
          overflow: hidden;
          list-style: none;
          &.input-focused {
            .item {
              margin-bottom: $gap;
            }
          }

          .item {
            display: inline-block;
            padding: 0 $sm-gap;
            margin-right: $lg-gap;
            margin-bottom: $lg-gap;
            line-height: 2em;
            font-size: $font-size-h6;
            font-family: $font-family-normal;
            background-color: $module-bg-darker-1;
            transition: margin-bottom $transition-time-fast;
            @include radius-box($xs-radius);

            .iconfont {
              font-size: $font-size-small;
            }

            .name {
              margin-left: $xs-gap;
            }

            .count {
              margin-left: $xs-gap;
              font-size: $font-size-small;
              color: $text-secondary;
            }

            &.link-active {
              color: $text-reversal;
              background-color: $primary;

              .name {
                font-weight: bold;
              }
              .count {
                color: $text-reversal;
              }
            }
          }
        }
      }
    }
  }
</style>
