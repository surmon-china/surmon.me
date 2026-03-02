<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { LocalesKey } from '/@/locales'

  const iconMap = {
    deepseek: '/images/ai-providers/deepseek.svg',
    chatgpt: '/images/ai-providers/openai.svg',
    gemini: '/images/ai-providers/gemini.svg'
  }

  const props = defineProps<{
    content: string
    provider?: string
    model?: string
    timestamp?: string
  }>()

  const iconUrl = computed<string | null>(() => {
    return props.provider ? iconMap[props.provider.toLowerCase()] : null
  })

  const isExpanded = ref(false)
  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value
  }
</script>

<template>
  <div class="ai-summary" :class="{ 'is-expanded': isExpanded }">
    <div class="summary-header">
      <span class="title">AI <i18n :k="LocalesKey.ARTICLE_SUMMARY" /></span>
      <span class="provider" v-if="model">
        <uimage class="icon" :alt="provider" :title="provider" :src="iconUrl" v-if="iconUrl" />
        <span class="model">{{ model }}</span>
      </span>
    </div>
    <div class="summary-content">
      <p class="text">{{ content }}</p>
    </div>
    <div class="toggle-action" @click="toggleExpand">
      <button class="toggle-btn">
        <i18n zh="收起" en="Show less" v-if="isExpanded" />
        <i18n zh="展开阅读" en="Read more" v-else />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .ai-summary {
    position: relative;
    margin-bottom: $gap;
    padding-block: var(--padding-block);
    padding-inline: var(--padding-inline);
    border-radius: $radius-sm;
    color: $color-text-secondary;
    font-size: $font-size-secondary;
    background-color: var(--background-color);
    border: 1px solid $module-bg-darker-1;

    --padding-block: 0.6em;
    --padding-inline: 1em;
    --background-color: #eee;
    @include mix.dark-theme {
      --background-color: #333;
    }

    .summary-header {
      margin-bottom: 0.35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;

      .title {
        font-weight: bold;
        background-image: $ai-primary-gradient;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }

      .provider {
        font-size: $font-size-tertiary;
        color: $color-text-divider;

        .icon {
          height: $font-size-quaternary;
          margin-right: $gap-tiny;
        }
      }
    }

    .summary-content {
      position: relative;
      line-height: 2em;

      .text {
        margin: 0;
        @include mix.clamp(3);
      }
    }

    .toggle-action {
      position: absolute;
      right: var(--padding-inline);
      bottom: var(--padding-block);
      padding-left: 4em;
      line-height: 2em;
      cursor: pointer;
      background: linear-gradient(to right, transparent, var(--background-color) 40%);

      .toggle-btn {
        background: transparent;
        border: none;
        outline: none;
        font-weight: bold;
        cursor: pointer;
        padding: 0;
      }
    }

    &.is-expanded {
      .summary-content .text {
        -webkit-line-clamp: unset;
        max-height: none;
      }

      .toggle-action {
        padding-left: 1em;
      }
    }
  }
</style>
