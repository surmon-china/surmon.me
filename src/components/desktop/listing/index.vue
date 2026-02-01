<script lang="ts" setup>
  import { Pagination } from '/@/interfaces/pagination'
  import { Article } from '/@/interfaces/article'
  import ListLoadmore from './list-loadmore.vue'
  import ListMain from './list-main.vue'

  interface Props {
    articles: Article[]
    pagination: Pagination | null
    fetching: boolean
    hasMore: boolean
    mammon?: boolean
  }

  const emits = defineEmits(['loadmore'])
  const props = withDefaults(defineProps<Props>(), {
    mammon: true
  })
</script>

<template>
  <list-main class="list-main" :articles="articles" :fetching="fetching" :mammon="mammon" />
  <list-loadmore :fetching="fetching" :has-more="hasMore" @click="emits('loadmore')">
    <template #pagination>{{ articles.length }} / {{ pagination?.total }}</template>
  </list-loadmore>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .list-main {
    margin-bottom: $gap;
  }
</style>
