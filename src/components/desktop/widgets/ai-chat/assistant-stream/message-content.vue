<script lang="ts" setup>
  import { ref, watch, nextTick } from 'vue'
  import AssistantMarkdown from '../assistant-markdown.vue'
  import MessageTypewriter from './message-typewriter.vue'

  const props = defineProps<{
    content: string
    streaming: boolean
  }>()

  const emit = defineEmits<{ typingTick: []; typingDone: [] }>()

  const typingDone = ref(!props.streaming)
  const typewriterDone = ref(!props.streaming)

  const handleTypewriterTick = () => emit('typingTick')
  const handleTypewriterDone = () => {
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
  <message-typewriter
    v-if="streaming || !typingDone"
    :content="content"
    @tick="handleTypewriterTick"
    @done="handleTypewriterDone"
  />
  <assistant-markdown :content="content" v-else />
</template>
