<template>
  <div class="masonry">
    <ul
      class="list"
      :class="listClass"
      :key="index"
      v-for="(columnData, index) in columnDatas"
    >
      <slot v-bind="item" v-for="item in columnData"></slot>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, h, PropType } from 'vue'

  const createNumberArray = (count: number) => {
    return Array.from(Array(count).keys())
  }

  export default defineComponent({
    name: 'Masonry',
    props: {
      data: {
        type: Array as PropType<Array<any>>,
        required: true
      },
      columns: {
        type: Number,
        required: true
      },
      listClass: String
    },
    setup(props, context) {
      // 构造基本数据
      let index = 0
      const columnDatas = createNumberArray(props.columns).map(() => [] as any[])
      // 分配数据
      props.data.forEach(item => {
        columnDatas[index].push(item)
        index = index === props.columns - 1
          ? 0
          : index + 1
      })

      return {
        columnDatas
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';
  .masonry {
    display: flex;
    justify-content: space-between;

    .list {
      padding: 0;
      margin: 0;
      flex: 1;
    }
  }
</style>
