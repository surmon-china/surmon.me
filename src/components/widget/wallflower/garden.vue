<script lang="ts" setup>
  import { reactive, onMounted, onBeforeUnmount } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import Flower, { Props as FlowerProps } from './flower.vue'
  import { ATTRIBUTE_NAME } from './directive'

  const EN_FLOWERS = ['💙', '🤍', '❤️']
  const ZH_FLOWERS = ['布施', '持戒', '忍辱', '精进', '禅定', '般若']

  const { isZhLang } = useEnhancer()
  const state = reactive({
    id: 0,
    contentIndex: -1,
    flowers: [] as FlowerProps[]
  })

  const handleClick = (event: MouseEvent) => {
    let currentElement = event?.target as HTMLElement | null
    while (currentElement) {
      if (currentElement.getAttribute(ATTRIBUTE_NAME) != null) {
        return
      }
      currentElement = currentElement.parentElement
    }

    const flowers = isZhLang.value ? ZH_FLOWERS : EN_FLOWERS
    state.contentIndex++
    if (state.contentIndex >= flowers.length) {
      state.contentIndex = 0
    }
    state.flowers.push({
      id: ++state.id,
      x: event.x || event.clientX,
      y: event.y || event.clientY,
      text: flowers[state.contentIndex]
    } as FlowerProps)
  }

  const handleAnimationEnd = (id: number) => {
    const targetIndex = state.flowers.findIndex((flower) => flower.id === id)
    if (targetIndex > -1) {
      state.flowers.splice(targetIndex, 1)
    }
  }

  onMounted(() => window.addEventListener('click', handleClick))
  onBeforeUnmount(() => window.removeEventListener('click', handleClick))
</script>

<template>
  <div id="wallflower">
    <ul v-if="state.flowers.length" class="garden-box">
      <flower
        v-for="(flower, index) in state.flowers"
        :key="flower.id"
        :id="flower.id"
        :x="flower.x"
        :y="flower.y"
        :text="flower.text"
        :z-index="index + 1"
        @ended="handleAnimationEnd"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

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
      padding: 0;
    }
  }
</style>
