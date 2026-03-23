<script lang="ts" setup>
  import { ref, shallowRef, computed, nextTick, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useAiChatStore } from '/@/stores/ai-chat'
  import { enableCopyrighter, disableCopyrighter } from '/@/effects/copyright'
  import { LocalesKey } from '/@/locales'
  import { AiLogoImage } from '/@/components/common/ai-brand'
  import AssistantWrapper from './assistant-wrapper.vue'
  import AssistantMarkdown from './assistant-markdown.vue'
  import AssistantStream from './assistant-stream/index.vue'
  import AssistantError from './assistant-error.vue'

  const messagesContainer = shallowRef<HTMLElement | null>(null)
  const messagesListRef = shallowRef<HTMLElement[] | null>(null)
  const inputRef = shallowRef<HTMLInputElement | null>(null)

  const { i18n: _i18n } = useEnhancer()
  const aiChatStore = useAiChatStore()

  const input = ref('')
  const hasInputValue = computed(() => input.value.length >= 3)

  const scrollToMessagesBottom = () => {
    messagesContainer.value?.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }

  const isAssistantBubbleTyping = ref(false)
  const handleAssistantBubbleTypingTick = () => {
    isAssistantBubbleTyping.value = true
    scrollToMessagesBottom()
  }
  const handleAssistantBubbleTypingDone = () => {
    isAssistantBubbleTyping.value = false
    scrollToMessagesBottom()
    nextTick(() => inputRef.value?.focus())
  }

  const handleWaitingStateChange = () => {
    nextTick(() => {
      requestAnimationFrame(() => {
        scrollToMessagesBottom()
      })
    })
  }

  const handleStop = () => {
    aiChatStore.abortStreaming()
  }

  const handleSend = () => {
    if (!hasInputValue.value) return
    aiChatStore.sendMessage(input.value.trim())
    input.value = ''
    nextTick(() => scrollToMessagesBottom())
  }

  const handleInputEnter = (event: KeyboardEvent) => {
    if (!event.isComposing) {
      handleSend()
    }
  }

  onMounted(() => {
    nextTick(() => {
      inputRef.value?.focus()
      const target = messagesListRef.value?.findLast((el) => el.dataset.role === 'user')
      const container = messagesContainer.value
      if (target && container) {
        container.scrollTo({
          top: target.offsetTop - container.offsetTop - 14,
          behavior: 'smooth'
        })
      }
    })
  })
</script>

<template>
  <div class="ai-chat-panel">
    <div class="chat-messages" ref="messagesContainer">
      <div class="chat-welcome" v-if="!aiChatStore.messages.length">
        <ai-logo-image class="logo" />
        <p class="text"><i18n :k="LocalesKey.AI_CHAT_WELCOME" /></p>
      </div>
      <div
        ref="messagesListRef"
        class="message-row"
        :class="message.role"
        :data-role="message.role"
        v-for="(message, index) in aiChatStore.messages"
        :key="index"
      >
        <div v-if="message.role === 'user'" class="user-bubble">{{ message.content }}</div>
        <template v-if="message.role === 'assistant'">
          <assistant-wrapper class="assistant-bubble" v-if="!message.transient">
            <assistant-markdown :content="message.content" v-if="message.content" />
            <span class="message-time" v-if="message.created_at">
              <udate :date="message.created_at * 1000" to="ago" />
            </span>
          </assistant-wrapper>
          <assistant-wrapper
            class="assistant-bubble"
            :danger="!!message.error"
            v-else-if="index !== aiChatStore.messages.length - 1"
          >
            <assistant-error :error="message.error" v-if="message.error" />
            <assistant-markdown :content="message.content" v-if="message.content" />
          </assistant-wrapper>
          <assistant-wrapper
            class="assistant-bubble"
            :animating="aiChatStore.isStreaming"
            :danger="!!message.error"
            v-else
          >
            <assistant-stream
              :content="message.content"
              :streaming="aiChatStore.isStreaming"
              :tool-waiting="aiChatStore.streaming.toolWaiting"
              :tool-calls="aiChatStore.streaming.toolCalls"
              @typing-tick="handleAssistantBubbleTypingTick"
              @typing-done="handleAssistantBubbleTypingDone"
              @waiting-state-change="handleWaitingStateChange"
            >
              <template #error>
                <assistant-error :error="message.error" v-if="message.error" />
              </template>
            </assistant-stream>
          </assistant-wrapper>
        </template>
      </div>
    </div>
    <div class="chat-input">
      <input
        ref="inputRef"
        class="input"
        name="input"
        type="search"
        autofocus
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        data-form-type="other"
        data-lpignore="true"
        data-1p-ignore
        minlength="3"
        maxlength="200"
        :disabled="aiChatStore.isStreaming || isAssistantBubbleTyping"
        :placeholder="_i18n.t(LocalesKey.AI_CHAT_INPUT_PLACEHOLDER)"
        @keydown.enter.exact.prevent="handleInputEnter"
        @focus="disableCopyrighter"
        @blur="enableCopyrighter"
        v-model.trim="input"
      />
      <button class="submit" @click="handleStop" v-if="aiChatStore.isStreaming && !isAssistantBubbleTyping">
        <i18n :k="LocalesKey.AI_CHAT_STOP_BUTTON" />
      </button>
      <button class="submit" :disabled="!hasInputValue || isAssistantBubbleTyping" @click="handleSend" v-else>
        <i18n :k="LocalesKey.AI_CHAT_SEND_BUTTON" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .ai-chat-panel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .chat-welcome {
      margin-top: 9rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .logo {
        opacity: 0.6;
        width: 10rem;
        height: 10rem;
        margin-bottom: $gap;
      }

      .text {
        font-weight: bold;
        font-size: $font-size-h3;
        color: $color-text-disabled;
      }
    }

    .chat-messages {
      flex-grow: 1;
      padding: $gap;
      overflow-y: auto;
      scrollbar-width: thin;

      .message-row {
        display: flex;
        margin-bottom: $gap;
        &:last-child {
          margin-bottom: 0;
        }

        &.user {
          padding-left: 2rem;
          justify-content: flex-end;
        }

        &.assistant {
          padding-right: 2rem;
          justify-content: flex-start;
        }

        .user-bubble,
        .assistant-bubble {
          max-width: 100%;
          border-radius: $radius-md;
        }

        .user-bubble {
          padding-block: 0.6em;
          padding-inline: 1em;
          border-top-right-radius: $radius-tiny;
          background-color: $module-bg-darker-1;
          line-height: $line-height-loose;
          user-select: text;
        }

        .assistant-bubble {
          padding-block: 0.75em;
          padding-inline: 1em;
          border-top-left-radius: $radius-tiny;
          position: relative;

          &:hover {
            .message-time {
              @include mix.visible();
            }
          }

          .message-time {
            position: absolute;
            top: -1.2rem;
            left: $gap-tiny;
            font-size: $font-size-quaternary;
            color: $color-text-disabled;
            white-space: nowrap;
            @include mix.visibility-transition();
            @include mix.hidden();
          }
        }
      }
    }

    .chat-input {
      flex-shrink: 0;
      height: 3.8rem;
      display: flex;
      align-items: center;
      gap: $gap-sm;
      padding: $gap-sm;
      border-top: 1px solid $module-bg-darker-1;

      .input {
        flex: 1;
        height: 100%;
        border-radius: $radius-xs;
        padding-inline: $gap-xs;
        border: 1px solid $module-bg-darker-1;
        &[disabled] {
          background: transparent;
          opacity: 0.8;
        }
      }

      .submit {
        height: 100%;
        width: 5rem;
        border-radius: $radius-xs;
        background-color: $module-bg-darker-1;
        &[disabled] {
          opacity: 0.7;
        }
        &:not([disabled]):hover {
          background-color: $module-bg-darker-2;
          color: $color-link;
        }
      }
    }
  }
</style>
