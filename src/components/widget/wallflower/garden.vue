<template>
  <div id="wallflower">
    <ul v-if="state.flowers.length" class="garden-box">
      <flower
        v-for="(flower, index) in state.flowers"
        :key="flower.id"
        :z-index="index + 1"
        :options="flower"
        @ended="handleAnimationEnd"
      />
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, onBeforeUnmount } from 'vue'
  import Flower from './flower.vue'

  const FLOWERS = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']

  export interface IFlower {
    id: number
    x: number
    y: number
    text: string
  }

  export default defineComponent({
    name: 'WallFlowerGarden',
    components: {
      Flower
    },
    setup() {
      const state = reactive({
        id: 0,
        flowers: [] as IFlower[],
        contentIndex: -1
      })

      const handleClick = (event: MouseEvent) => {
        state.contentIndex++
        if (state.contentIndex >= FLOWERS.length) {
          state.contentIndex = 0
        }
        state.flowers.push({
          id: ++state.id,
          x: event.x || event.clientX,
          y: event.y || event.clientY,
          text: FLOWERS[state.contentIndex]
        } as IFlower)
      }

      onMounted(() => window.addEventListener('click', handleClick))
      onBeforeUnmount(() => window.removeEventListener('click', handleClick))

      const handleAnimationEnd = (id: number) => {
        const targetIndex = state.flowers.findIndex(flower => flower.id === id)
        if (targetIndex > -1) {
          state.flowers.splice(targetIndex, 1)
        }
      }

      return {
        state,
        handleAnimationEnd
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  #wallflower {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 0;
    list-style: none;
    z-index: $z-index-underground;

    .garden-box {
      width: 100%;
      height: 100%;
    }
  }
</style>
