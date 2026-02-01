<script lang="ts" setup>
  import type { ArchiveTreeList } from '/@/stores/archive'

  const props = defineProps<{
    tree: ArchiveTreeList
  }>()
</script>

<template>
  <div class="archive-tree">
    <ul class="month-list" v-for="node in props.tree" :key="node.year">
      <li v-for="mn in node.months" :key="mn.month" class="month">
        <slot name="title" :count="mn.articles.length" :year="node.year" :month="mn.month"> </slot>
        <div class="article-list">
          <slot
            name="article"
            :index="index"
            :article="article"
            :day="String(article.createAt.day).padStart(2, '0')"
            :key="index"
            v-for="(article, index) in mn.articles"
          ></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .archive-tree {
    .month-list,
    .article-list {
      margin: 0;
      padding: 0;
    }

    .month-list {
      list-style: none;
    }
  }
</style>
