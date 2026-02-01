<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { LocalesKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { isSearchFlow } from '/@/transforms/route'
  import { BFF_CONFIG } from '/@/configs/app.config'

  const { gtag, route, router, i18n: _i18n } = useEnhancer()
  const formElement = ref<HTMLFormElement>()
  const keyword = ref('')

  const handleSearch = (event) => {
    event.preventDefault()
    const check_status = formElement.value?.checkValidity()
    if (!check_status) {
      formElement.value?.reportValidity()
      return
    }

    const inputKeyword = keyword.value
    const paramsKeyword = route.params.keyword as string
    const isSearchPage = isSearchFlow(route.name as string)
    if (inputKeyword && (!isSearchPage || paramsKeyword !== inputKeyword)) {
      router.push({
        name: RouteName.SearchListing,
        params: { keyword: inputKeyword }
      })
      gtag?.event('sidebar_search', {
        event_category: GAEventCategories.Universal,
        event_label: inputKeyword
      })
    }
  }

  onMounted(() => {
    if (isSearchFlow(route.name as string)) {
      keyword.value = route.params.keyword as string
    }
  })
</script>

<template>
  <div class="search">
    <form class="search-box" ref="formElement">
      <input
        id="keyword"
        class="search-input"
        required
        type="search"
        name="search"
        maxlength="16"
        autocomplete="off"
        v-model.trim="keyword"
        :class="_i18n.language"
        :placeholder="_i18n.t(LocalesKey.SEARCH_PLACEHOLDER)"
        @keyup.enter="handleSearch"
      />
      <button type="submit" class="search-btn" @click="handleSearch">
        <i class="iconfont icon-search" />
      </button>
    </form>
    <ulink class="rss-btn" :external="false" :href="BFF_CONFIG.route_path_rss">
      <i class="iconfont icon-rss" />
    </ulink>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .search {
    width: 100%;
    padding: $gap-xs;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .search-input,
    .search-btn,
    .rss-btn {
      $height: 1.9rem;
      height: $height;
      line-height: $height;
    }

    .search-box {
      display: inline-flex;

      .search-input {
        width: 10rem;
        margin-right: 0;
        padding: 0;
        text-indent: 0.5em;
        border-top-left-radius: $radius-xs;
        border-bottom-left-radius: $radius-xs;
        @include mix.background-transition();
        background-color: $module-bg-darker-1;
        &:hover {
          background-color: $module-bg-hover;
        }
        &::-webkit-calendar-picker-indicator {
          display: none;
        }
      }

      .search-btn {
        width: 2.8rem;
        border-top-right-radius: $radius-xs;
        border-bottom-right-radius: $radius-xs;
        @include mix.background-transition();
        background-color: $module-bg-hover;
        &:hover {
          background-color: $module-bg-darker-3;
        }
      }
    }

    .rss-btn {
      flex-grow: 1;
      display: inline-block;
      min-width: 2rem;
      margin-left: $gap-xs;
      text-align: center;
      border-radius: $radius-xs;
      @include mix.background-transition();
      background-color: $module-bg-hover;
      color: $color-text;
      &:hover {
        background-color: $rss-primary;
        color: $white;
      }
    }
  }
</style>
