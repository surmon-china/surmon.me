<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    cols: number
    data: Array<any>
  }>()

  const columns = computed(() => {
    const columnList = Array.from({ length: props.cols }).map<any>(() => [])
    props.data.forEach((item, index) => {
      const colIndex = index % props.cols
      columnList.at(colIndex)!.push(item)
    })
    return columnList
  })
</script>

<template>
  <ul class="columns" :style="{ '--grid-columns': cols }">
    <li class="column" v-for="(data, i) in columns" :key="i">
      <ul class="list">
        <li class="item-wrapper" v-for="(item, index) in data" :key="index">
          <slot name="item" :data="item"></slot>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .columns {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    grid-gap: $gap-lg * 2.2;

    .column {
      width: 100%;
      overflow: hidden;
    }
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;

    .item-wrapper {
      @include radius-box($radius-sm);
      margin-bottom: $gap-lg * 2;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
