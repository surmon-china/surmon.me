<script lang="ts" setup>
  import { ref, watch, onUnmounted } from 'vue'
  import MessageMarkdown from './message-markdown.vue'

  const props = defineProps<{ content: string }>()
  const emit = defineEmits<{ tick: []; done: [] }>()

  const displayed = ref('')
  let timer: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    if (timer !== null) return
    timer = setInterval(() => {
      if (displayed.value.length < props.content.length) {
        displayed.value = props.content.slice(0, displayed.value.length + 1)
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
  <div class="message-typewriter">
    <message-markdown :content="displayed" />
    <p class="cursor">▋</p>
  </div>
</template>

<style lang="scss" scoped>
  .message-typewriter {
    .cursor {
      margin: 0;
      animation: blink 1s step-end infinite;
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
