<template>
  <div class="search">
    <div class="search-box">
      <input
        id="keyword"
        v-model.trim="keyword"
        required
        type="search"
        name="search"
        list="keywords"
        class="search-input"
        :class="i18n.language"
        :placeholder="i18n.t(LANGUAGE_KEYS.SEARCH_PLACEHOLDER)"
        @keyup.enter="handleSearch"
      />
      <button class="search-btn" @click="handleSearch">
        <i class="iconfont icon-search" />
      </button>
      <client-only>
        <datalist v-if="tagStore.tags.length" id="keywords">
          <option
            v-for="tag in tagStore.tags"
            :key="tag.slug"
            :value="isZhLang ? tag.name : tag.slug"
            :label="tag.description"
            class="iiem"
          />
        </datalist>
      </client-only>
    </div>
    <router-link class="archive-btn" :to="{ name: RouteName.Archive }">
      <i class="iconfont icon-peachblossom" />
    </router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { RouteName } from '/@/app/router'
  import { useTagStore } from '/@/store/tag'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { isSearchArchive } from '/@/transforms/route'

  export default defineComponent({
    name: 'PCAsideSearch',
    setup() {
      const { i18n, route, router, isZhLang } = useEnhancer()
      const tagStore = useTagStore()
      const keyword = ref('')

      onMounted(() => {
        if (isSearchArchive(route.name as string)) {
          keyword.value = route.params.keyword as string
        }
      })

      const handleSearch = () => {
        const inputKeyword = keyword.value
        const paramsKeyword = route.params.keyword as string
        const isSearchPage = isSearchArchive(route.name as string)
        if (inputKeyword && (!isSearchPage || paramsKeyword !== inputKeyword)) {
          router.push({
            name: RouteName.SearchArchive,
            params: { keyword: inputKeyword }
          })
        }
      }

      return {
        LANGUAGE_KEYS,
        RouteName,
        i18n,
        tagStore,
        isZhLang,
        keyword,
        handleSearch
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';
  @import './variables.scss';

  .search {
    padding: $sm-gap;
    width: 100%;
    height: 3em;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .search-input,
    .search-btn,
    .archive-btn {
      height: 2em;
      line-height: 2em;
      background-color: $module-bg-darker-1;
      @include background-transition();

      &:hover {
        background-color: $module-bg-hover;
      }
    }

    > .search-box {
      display: flex;
      flex-grow: 1;

      > .search-input {
        margin-right: 0;
        flex-grow: 1;

        &::-webkit-calendar-picker-indicator {
          display: none;
        }
      }

      > .search-btn {
        width: 2em;
        background-color: $module-bg-darker-3;
        @include background-transition();

        &:hover {
          background-color: $module-bg-darker-4;
        }
      }
    }

    > .archive-btn {
      display: inline-block;
      text-align: center;
      margin-left: $sm-gap;
      width: 3em;

      .iconfont {
        font-size: $font-size-h4;
      }
    }
  }
</style>
