<template>
  <div class="search">
    <div class="search-box">
      <input
        id="keyword"
        v-model.trim="keyword"
        required
        type="search"
        name="search"
        class="search-input"
        :class="i18n.language"
        :placeholder="i18n.t(LANGUAGE_KEYS.SEARCH_PLACEHOLDER)"
        @keyup.enter="handleSearch"
      >
      <button class="search-btn" @click="handleSearch">
        <i class="iconfont icon-search" />
      </button>
      <client-only>
        <datalist v-if="tags.length" id="keywords" class="search-keywords">
          <option
            v-for="tag in tags"
            :key="tag.slug"
            :value="isZhLang ? tag.name : tag.slug"
            :label="tag.description"
            class="iiem"
          />
        </datalist>
      </client-only>
    </div>
    <router-link to="/sitemap" class="sitemap-btn">
      <i class="iconfont icon-book" />
    </router-link>
    <!-- TODO:  重新实现，不再使用 list，而是使用 element 实现，并且 focus 时需要高亮起来 -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from '/@/store'
  import { RouteName } from '/@/router'
  import { useI18n } from '/@/services/i18n'
  import { isSearchArchive } from '/@/transforms/route'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'PcAsideSearch',
    setup() {
      const i18n = useI18n()
      const route = useRoute()
      const router = useRouter()
      const store = useStore()

      const keyword = ref('')
      const tags = computed(() => store.state.tag.data)
      const isZhLang = computed(() => i18n.language.value === Language.Zh)

      onMounted(() => {
        if (isSearchArchive(route.name as string)) {
          keyword.value = route.params.keyword as string
        }
      })

      const handleSearch = () => {
        const keywordValue = keyword.value
        const paramsKeyword = route.params.keyword as string
        const isSearchPage = isSearchArchive(route.name as string)
        if (keywordValue && (isSearchPage ? (paramsKeyword !== keywordValue) : true)) {
          router.push({ name: RouteName.SearchArchive, params: { keywordValue }})
        }
      }

      return {
        LANGUAGE_KEYS,
        i18n,
        tags,
        isZhLang,
        keyword,
        handleSearch
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';
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
    .sitemap-btn {
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

    > .sitemap-btn {
      display: inline-block;
      text-align: center;
      margin-left: $sm-gap;
      width: 3em;

      > .iconfont {
        font-size: $font-size-h3;
      }
    }
  }
</style>