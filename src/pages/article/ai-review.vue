<script lang="ts" setup>
  import { computed } from 'vue'
  import Markdown from '/@/components/common/markdown.vue'

  const avatarMap = {
    chatgpt3: '/images/ai-providers/chatgpt-3.webp',
    chatgpt4: '/images/ai-providers/chatgpt-4.webp',
    openai: '/images/ai-providers/openai.svg',
    gemini: '/images/ai-providers/gemini.svg',
    google: '/images/ai-providers/google.svg',
    microsoft: '/images/ai-providers/microsoft.svg',
    meta: '/images/ai-providers/meta.svg',
    qwen: '/images/ai-providers/qwen.svg',
    default: '/icon.normal.png'
  } as const

  const props = defineProps<{
    content: string
    provider: string
    model?: string
    timestamp?: string
    link?: string
    hiddenAvatar?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'click-link'): void
  }>()

  const handleLinkClick = () => {
    emit('click-link')
  }

  const aiAvatarUrl = computed<string>(() => {
    const provider = props.provider.toLowerCase()
    return provider === 'chatgpt'
      ? props.model?.includes('3')
        ? avatarMap.chatgpt3
        : avatarMap.chatgpt4
      : avatarMap[provider] || avatarMap.default
  })
</script>

<template>
  <div class="ai-review" :class="{ 'hide-avatar': hiddenAvatar }">
    <div class="ai-avatar" v-if="!hiddenAvatar">
      <ulink class="link" :href="link" @click="handleLinkClick">
        <uimage
          class="image"
          :alt="model"
          :src="aiAvatarUrl"
          :class="{ svg: aiAvatarUrl.endsWith('.svg') }"
          draggable="false"
          cdn
        />
      </ulink>
    </div>
    <div class="ai-body">
      <div class="ai-header">
        <div class="left">
          <ulink class="provider" :href="link" @click="handleLinkClick">{{ provider }}</ulink>
          <span class="model" v-if="model">
            <i class="iconfont icon-cpu"></i>
            <span>{{ model }}</span>
          </span>
        </div>
        <div class="right">
          <span class="created" v-if="timestamp">
            <udate :date="Number(timestamp) * 1000" to="ago" />
          </span>
        </div>
      </div>
      <div class="ai-content">
        <div class="markdown">
          <markdown :markdown="content" :compact="true" :render-options="{ sanitize: true }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .ai-review {
    position: relative;
    padding-left: 2rem;
    margin-top: $gap;
    &:hover {
      .ai-body {
        background-color: $module-bg-hover;
      }
    }

    .ai-avatar {
      display: block;
      position: absolute;
      left: 0;
      top: $gap-lg;

      .link {
        $size: 3.6rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: $size;
        height: $size;
        border: 4px solid $module-bg-lighter;
        border-radius: $radius-sm;
        background-color: $module-bg-darker-2;

        .image {
          width: 100%;
          height: 100%;
          border-radius: $radius-xs;

          &.svg {
            width: 65%;
            height: auto;
          }
        }
      }
    }

    .ai-body {
      display: block;
      width: 100%;
      height: 100%;
      padding: $gap-xs $gap-xs $gap-xs 2.3rem;
      background-color: $module-bg-darker-1;
      border-radius: $radius-xs;
      @include mix.background-transition();

      > .ai-header {
        position: relative;
        display: flex;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;
        }

        .provider {
          font-weight: bold;
          margin-right: $gap-xs;
          &[href]:not([href='']):hover {
            @include mix.text-underline();
          }
        }

        .model {
          display: inline-flex;
          align-items: center;
          font-size: $font-size-h6;
          color: $color-text-divider;

          .iconfont {
            margin-right: $gap-tiny;
          }
        }

        .created {
          color: $color-text-divider;
          font-size: $font-size-h6;
          font-weight: bold;
        }
      }

      > .ai-content {
        padding-right: $gap-tiny;
        user-select: text;

        .markdown {
          margin-top: $gap-tiny;
        }
      }
    }

    &.hide-avatar {
      padding: 0;
      margin-top: $gap;

      .ai-body {
        padding: $gap-xs $gap-sm;
      }
    }
  }
</style>
