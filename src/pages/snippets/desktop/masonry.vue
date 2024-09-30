<script lang="ts" setup>
  import { computed } from 'vue'
  import type { ZhihuAnswerItem } from '/@/server/getters/zhihu'

  const props = defineProps<{
    cols: number
    answers: Array<ZhihuAnswerItem>
  }>()

  const columns = computed(() => {
    const columnList = Array.from({ length: props.cols }).map<ZhihuAnswerItem[]>(() => [])
    props.answers.forEach((answer, index) => {
      const colIndex = index % props.cols
      columnList.at(colIndex)!.push(answer)
    })
    return columnList
  })
</script>

<template>
  <ul class="columns" :style="{ '--grid-columns': cols }">
    <li class="column" v-for="(data, i) in columns" :key="i">
      <ul class="answers">
        <li class="answer-item-wrapper" v-for="(answer, index) in data" :key="index">
          <slot name="answer" :answer="answer"></slot>
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

  .answers {
    margin: 0;
    padding: 0;
    list-style: none;

    .answer-item-wrapper {
      @include radius-box($radius-sm);
      margin-bottom: $gap-lg * 2;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
