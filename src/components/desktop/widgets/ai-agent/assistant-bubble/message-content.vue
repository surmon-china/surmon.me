<script lang="ts" setup>
  import { ref, watch, nextTick } from 'vue'
  import Markdown from './message-markdown.vue'
  import Typewriter from './message-typewriter.vue'

  const props = defineProps<{
    content: string
    streaming: boolean
  }>()

  const emit = defineEmits<{ typingTick: []; typingDone: [] }>()

  const typingDone = ref(!props.streaming)
  const typewriterDone = ref(false)

  const handleTypingTick = () => emit('typingTick')
  const handleTypingDone = () => {
    typewriterDone.value = true
    if (!props.streaming) {
      typingDone.value = true
      nextTick(() => emit('typingDone'))
    }
  }

  watch(
    () => props.streaming,
    (streaming) => {
      if (streaming) {
        typingDone.value = false
        typewriterDone.value = false
      } else {
        if (typewriterDone.value) {
          typingDone.value = true
          nextTick(() => emit('typingDone'))
        }
      }
    }
  )
</script>

<template>
  <typewriter
    v-if="streaming || !typingDone"
    :content="content"
    @tick="handleTypingTick"
    @done="handleTypingDone"
  />
  <markdown :content="content" v-else />
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;
</style>
