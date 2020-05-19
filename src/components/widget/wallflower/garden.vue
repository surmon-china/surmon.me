<template>
  <div id="wallflower">
    <ul v-if="flowers.length" class="garden-box">
      <flower
        v-for="(flower, index) in flowers"
        :key="flower.id"
        :zindex="index + 1"
        :options="flower"
        @end="handleAnimationEnd"
      />
    </ul>
  </div>
</template>

<script>
  import Flower from './flower'
  export default {
    name: 'WallFlowerGarden',
    components: {
      Flower
    },
    data() {
      return {
        id: 0,
        flowers: [],
        flowerContents: ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'],
        contentIndex: -1
      }
    },
    methods: {
      eventHandle(event) {
        this.contentIndex++
        if (this.contentIndex >= this.flowerContents.length) {
          this.contentIndex = 0
        }
        this.flowers.push({
          id: ++this.id,
          x: event.x || event.clientX,
          y: event.y || event.clientY,
          text: this.flowerContents[this.contentIndex]
        })
      },
      handleAnimationEnd(id) {
        const targetIndex = this.flowers.findIndex(flower => flower.id === id)
        if (targetIndex > -1) {
          this.flowers.splice(targetIndex, 1)
        }
      }
    },
    mounted() {
      window.addEventListener('click', this.eventHandle)
    },
    beforeDestroy() {
      window.removeEventListener('click', this.eventHandle)
    }
  }
</script>

<style lang="scss" scoped>
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
