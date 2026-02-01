<script lang="ts" setup>
  defineProps<{ fetching?: boolean }>()
</script>

<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="publisher-skeleton" key="skeleton">
        <skeleton class="avatar" />
        <skeleton class="content" />
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $avatar-size: 3rem;

  .publisher-skeleton {
    display: flex;

    .avatar {
      width: $avatar-size;
      height: $avatar-size;
      margin-right: $gap;
    }

    .content {
      flex-grow: 1;
      height: $avatar-size;
    }
  }
</style>
