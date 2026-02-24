<script lang="ts" setup>
  import { shallowRef } from 'vue'

  const EMOJI_PAGES = [
    ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤'],
    ['😭', '😱', '😳', '😵', '🌚', '🙏', '💪', '👌', '🤘', '👍', '👎', '👏', '🌻'],
    ['🌹', '💊', '🐶', '🐈', '✨', '❤️‍🔥', '💔', '💩', '👻', '🚩', '💡', '🛵', '🪙']
  ]

  const TOTAL_PAGES = EMOJI_PAGES.length

  const emit = defineEmits<{
    (e: 'click', emoji: string): void
  }>()

  const containerRef = shallowRef<HTMLDivElement>()
  const currentPage = shallowRef(0)

  const scrollToPage = async (page: number) => {
    const element = containerRef.value
    if (!element) return

    element.scrollTo({
      left: element.clientWidth * page,
      behavior: 'smooth'
    })
  }

  const handlePrev = () => {
    if (currentPage.value <= 0) return
    scrollToPage(currentPage.value - 1)
  }

  const handleNext = () => {
    if (currentPage.value >= TOTAL_PAGES - 1) return
    scrollToPage(currentPage.value + 1)
  }

  const handleScroll = () => {
    const element = containerRef.value
    if (!element) return

    const width = element.clientWidth
    const page = Math.floor((element.scrollLeft + width / 2) / width)
    if (page !== currentPage.value) {
      currentPage.value = page
    }
  }
</script>

<template>
  <div class="editor-emoji-box">
    <button class="navigate" @click.prevent="handlePrev" :disabled="currentPage === 0">
      <i class="iconfont icon-prev"></i>
    </button>
    <div ref="containerRef" class="emoji-container" @scroll="handleScroll">
      <ul v-for="(page, pageIndex) in EMOJI_PAGES" :key="pageIndex" class="emoji-page">
        <li v-for="emoji in page" :key="emoji" class="item" @click="emit('click', emoji)">
          {{ emoji }}
        </li>
      </ul>
    </div>
    <button class="navigate" @click.prevent="handleNext" :disabled="currentPage === TOTAL_PAGES - 1">
      <i class="iconfont icon-next"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .editor-emoji-box {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: $module-bg-darker-2;
    padding-block: $gap-tiny;

    .navigate {
      width: 2rem;
      font-size: $font-size-tertiary;
    }

    .emoji-container {
      flex: 1;
      overflow-x: auto;
      display: flex;
      scroll-snap-type: x mandatory;
      scroll-snap-stop: always;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .emoji-page {
      flex: 0 0 100%;
      display: flex;
      justify-content: space-between;
      scroll-snap-align: start;
      padding: 0;
      margin: 0;
      list-style: none;

      .item {
        font-size: $font-size-h3;
        cursor: pointer;
        filter: saturate(0.9) opacity(0.9);
        &:hover {
          filter: saturate(1) opacity(1);
        }
      }
    }
  }
</style>
