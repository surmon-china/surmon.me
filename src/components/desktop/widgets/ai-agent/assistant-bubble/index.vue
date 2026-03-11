<script lang="ts" setup>
  import { ref, watch, computed, nextTick } from 'vue'
  import { Language, LocalesKey } from '/@/locales'
  import { type ChatMessage, ToolCall } from '/@/stores/ai-agent'
  import Markdown from './markdown.vue'
  import Typewriter from './typewriter.vue'

  const props = defineProps<{
    message: ChatMessage
    streaming: boolean
    toolCalls: readonly ToolCall[]
  }>()

  const emit = defineEmits<{ typingTick: []; typingDone: [] }>()

  const toolNameI18nMap: Record<string, Record<Language.Chinese | Language.English, string>> = {
    getBlogList: { zh: '正在检索博客列表...', en: 'Fetching blog list...' },
    getArticleDetail: { zh: '正在阅读文章详情...', en: 'Reading article...' },
    askKnowledgeBase: { zh: '正在查阅知识库...', en: 'Searching knowledge base...' },
    getOpenSourceProjects: { zh: '正在收集开源项目...', en: 'Fetching open-source projects...' }
  }

  const toolCallingi18n = computed(() => {
    const lastTool = props.toolCalls.at(-1)
    if (!lastTool) return null
    return (
      toolNameI18nMap[lastTool.name] ?? {
        [Language.Chinese]: `正在调用 ${lastTool.name}...`,
        [Language.English]: `Calling ${lastTool.name}...`
      }
    )
  })

  const typingDone = ref(!props.streaming)
  const handleTypingTick = () => emit('typingTick')
  const handleTypingDone = () => {
    typingDone.value = true
    nextTick(() => emit('typingDone'))
  }

  watch(
    () => props.streaming,
    (val) => {
      if (val) typingDone.value = false
    }
  )
</script>

<template>
  <div class="assistant-bubble" :class="{ streaming, error: !!message.error }">
    <div class="assistant-error" v-if="message.error">
      <i class="iconfont icon-error-outlined"></i>
      {{ message.error }}
    </div>
    <div class="assistant-message" v-if="message.content">
      <typewriter
        v-if="streaming || !typingDone"
        :content="message.content"
        @tick="handleTypingTick"
        @done="handleTypingDone"
      />
      <markdown v-else :content="message.content" />
      <span class="time" v-if="message.created_at">
        <udate :date="message.created_at * 1000" to="ago" />
      </span>
    </div>
    <transition mode="out-in" name="module" v-else-if="streaming">
      <div class="assistant-thinking" :key="toolCallingi18n ? 'tool' : 'thinking'">
        <span class="shimmer-text">
          <i18n v-if="toolCallingi18n" :zh="toolCallingi18n.zh" :en="toolCallingi18n.en" />
          <i18n v-else :k="LocalesKey.AI_AGENT_THINKING" />
        </span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
  @property --assistant-bubble-background-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes assistant-bubble-border-rotate {
    to {
      --assistant-bubble-background-angle: 360deg;
    }
  }
</style>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .assistant-bubble {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: $radius-md;
      border-top-left-radius: $radius-tiny;
      padding: 1px;
      pointer-events: none;
      background: $ai-primary-gradient;
      mask:
        conic-gradient(#000 0 0) content-box,
        conic-gradient(#000 0 0);
      mask-composite: exclude;
    }

    &.error {
      &::before {
        background: $red;
      }
    }

    &.streaming {
      &::before {
        animation: assistant-bubble-border-rotate 1.6s linear infinite;
        background: conic-gradient(
          from var(--assistant-bubble-background-angle),
          $ai-primary-red,
          $ai-primary-blue,
          $ai-primary-green,
          $ai-primary-red
        );
      }
    }

    .assistant-error {
      color: $red;
      .iconfont {
        margin-right: $gap-tiny;
      }

      & + div {
        margin-top: $gap-tiny;
      }
    }

    .assistant-thinking {
      .shimmer-text {
        background: linear-gradient(
          90deg,
          $color-text-secondary 25%,
          $color-link 50%,
          $color-text-secondary 75%
        );
        background-size: 200% 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        animation: shimmer 1s linear infinite;
      }

      @keyframes shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
    }

    .assistant-message {
      .time {
        position: absolute;
        top: -1.2rem;
        left: $gap-tiny;
        font-size: $font-size-quaternary;
        color: $color-text-disabled;
        white-space: nowrap;
        @include mix.hidden();
        @include mix.visibility-transition();
      }
    }

    &:hover {
      .assistant-message .time {
        @include mix.visible();
      }
    }
  }
</style>
