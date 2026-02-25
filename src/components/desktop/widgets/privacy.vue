<script lang="ts" setup>
  import { shallowRef, onMounted } from 'vue'
  import Markdown from '/@/components/common/markdown.vue'
  import vanilla from '/@/services/vanilla'

  const content = shallowRef<string>()
  const fetchPrivacyMarkdown = () => {
    vanilla('/privacy/index.md').then((respnse) => {
      content.value = respnse.data
    })
  }

  onMounted(() => fetchPrivacyMarkdown())
</script>

<template>
  <div class="privacy">
    <markdown class="content" :markdown="content" :compact="true" />
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .privacy {
    width: 46rem;
    min-height: 18rem;
    max-height: 80vh;
    background-color: $module-bg-opaque;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    scrollbar-width: thin;

    .content {
      padding-inline: 2em;
      padding-bottom: 2em;
    }
  }
</style>
