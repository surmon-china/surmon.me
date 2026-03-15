<script lang="ts" setup>
  import { ref, computed, watch } from 'vue'
  import { Language, LocalesKey } from '/@/locales'
  import { type ToolCall, toolI18nMap } from '../../../../../stores/ai-chat'
  import MessageContent from './message-content.vue'
  import ShimmerText from './shimmer-text.vue'

  type WaitingState = 'pending' | 'tool-calling' | 'tool-waiting' | null

  const props = defineProps<{
    content: string
    streaming: boolean
    toolWaiting: boolean
    toolCalls: readonly ToolCall[]
  }>()

  const emit = defineEmits<{
    typingTick: []
    typingDone: []
    waitingStateChange: [WaitingState]
  }>()

  const indicatorLeaved = ref(!props.streaming)
  const handleTransitionAfterLeave = () => {
    indicatorLeaved.value = true
  }

  const callingTool = computed(() => {
    if (!props.streaming) return null
    return props.toolCalls.find(({ status }) => status === 'calling') ?? null
  })

  const callingTooli18n = computed(() => {
    if (!callingTool.value) return null
    return (
      toolI18nMap[callingTool.value.name] ?? {
        [Language.Chinese]: `正在调用 ${callingTool.value.name}...`,
        [Language.English]: `Calling ${callingTool.value.name}...`
      }
    )
  })

  const waitingState = computed((): WaitingState => {
    if (!props.streaming) return null
    if (callingTool.value) return 'tool-calling'
    if (props.toolWaiting) return 'tool-waiting'
    if (!props.content) return 'pending'
    return null
  })

  watch(waitingState, (state) => emit('waitingStateChange', state))
</script>

<template>
  <slot name="error" v-if="indicatorLeaved"></slot>
  <message-content
    v-if="content && indicatorLeaved"
    class="assistant-message-content"
    :content="content"
    :streaming="streaming"
    @typing-tick="emit('typingTick')"
    @typing-done="emit('typingDone')"
  />
  <transition mode="out-in" name="module" @after-leave="handleTransitionAfterLeave">
    <div class="assistant-waiting-indicator" :key="waitingState" v-if="waitingState">
      <shimmer-text>
        <i18n :zh="callingTooli18n!.zh" :en="callingTooli18n!.en" v-if="waitingState === 'tool-calling'" />
        <i18n :k="LocalesKey.AI_CHAT_THINKING" v-else />
      </shimmer-text>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .assistant-message-content {
    & + .assistant-waiting-indicator {
      margin-top: $gap-tiny;
    }
  }
</style>
