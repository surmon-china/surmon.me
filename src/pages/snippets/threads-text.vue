<script lang="ts" setup>
  import { computed } from 'vue'

  const { text } = defineProps<{ text: string }>()
  const paragraphs = computed(() => (text ?? '').split(/\n\n+/))
</script>

<template>
  <div class="threads-text">
    <p class="line" v-for="(paragraph, i) in paragraphs" :key="i">
      <template v-for="(line, j) in paragraph.split('\n')" :key="j">
        {{ line }}<br v-if="j < paragraph.split('\n').length - 1" />
      </template>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-text {
    white-space: pre-wrap;

    .line {
      line-height: $line-height-loose;
      margin-bottom: $gap-xs;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
