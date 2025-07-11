<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { LocaleKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { isSearchFlow } from '/@/transforms/route'

  const { i18n: _i18n, gtag, route, router } = useEnhancer()
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
      gtag?.event('aside_search', {
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
        :placeholder="_i18n.t(LocaleKey.SEARCH_PLACEHOLDER)"
        @keyup.enter="handleSearch"
      />
      <button type="submit" class="search-btn" @click="handleSearch">
        <i class="iconfont icon-search" />
      </button>
    </form>
    <router-link class="extra-btn" :to="{ name: RouteName.Sponsor }">
      <i class="iconfont icon-peachblossom" />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .search {
    padding: $gap-sm;
    width: 100%;
    height: 3em;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .search-input,
    .search-btn,
    .extra-btn {
      height: 2em;
      line-height: 2em;
      background-color: $module-bg-darker-1;
      @include mix.background-transition();
      &:hover {
        background-color: $module-bg-hover;
      }
    }

    .search-box {
      .search-input {
        width: 11em;
        margin-right: 0;
        padding: 0;
        text-indent: 0.5em;
        &::-webkit-calendar-picker-indicator {
          display: none;
        }
      }

      .search-btn {
        width: 3em;
        background-color: $module-bg-hover;
        @include mix.background-transition();
        &:hover {
          background-color: $module-bg-darker-3;
        }
      }
    }

    .extra-btn {
      flex-grow: 1;
      display: inline-block;
      margin-left: $gap-sm;
      text-align: center;
      border-radius: $radius-mini;

      .iconfont {
        font-size: $font-size-h4;
      }
    }
  }
</style>
