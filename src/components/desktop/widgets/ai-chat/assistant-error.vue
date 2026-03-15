<script lang="ts" setup>
  defineProps<{ error: string }>()
</script>

<template>
  <div class="assistant-error">
    <i class="iconfont icon-error-outlined"></i>
    {{ error }}
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .assistant-error {
    color: $red;
    .iconfont {
      margin-right: $gap-tiny;
    }

    & + * {
      margin-top: $gap-tiny;
    }
  }
</style>
