<script lang="ts" setup>
  import { shallowRef, onMounted } from 'vue'
  import { Markdown } from '/@/effects/markdown'
  import vanilla from '/@/services/vanilla'

  const loading = shallowRef(true)
  const content = shallowRef<string>()
  const fetchPrivacyMarkdown = () => {
    vanilla('/privacy/index.md').then((respnse) => {
      content.value = respnse.data
      loading.value = false
    })
  }

  onMounted(() => fetchPrivacyMarkdown())
</script>

<template>
  <div class="privacy">
    <placeholder :loading="loading">
      <template #loading>
        <div class="loading">
          <loading-indicator width="1.8rem" />
        </div>
      </template>
      <template #default>
        <div class="content">
          <markdown :markdown="content" :compact="true" />
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $min-height: 20rem;

  .privacy {
    width: 46rem;
    min-height: $min-height;
    max-height: 80vh;
    background-color: $module-bg-opaque;
    overflow-y: auto;
    overscroll-behavior-y: none;
    scrollbar-width: thin;

    .loading {
      width: 100%;
      height: $min-height;
      display: flex;
      justify-content: center;
    }

    .content {
      padding-block: $gap;
      padding-inline: 2em;
    }
  }
</style>
