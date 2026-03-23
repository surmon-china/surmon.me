<script lang="ts" setup>
  import { ref, watch, onUnmounted } from 'vue'
  import AssistantMarkdown from '../assistant-markdown.vue'

  const props = defineProps<{ content: string }>()
  const emit = defineEmits<{ tick: []; done: [] }>()

  const displayed = ref('')
  let timer: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    if (timer !== null) return
    timer = setInterval(() => {
      if (displayed.value.length < props.content.length) {
        const step = Math.max(1, Math.floor(props.content.length / 200))
        displayed.value = props.content.slice(0, displayed.value.length + step)
        emit('tick')
      } else {
        clearInterval(timer!)
        timer = null
        emit('done')
      }
    }, 16)
  }

  watch(() => props.content, startTimer, { immediate: true })

  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  })
</script>

<template>
  <assistant-markdown class="message-typewriter" :content="displayed" :hide-copy-button="true" />
</template>
