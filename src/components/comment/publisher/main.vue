<script lang="ts" setup>
  defineProps<{ fetching?: boolean }>()
</script>

<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="publisher-skeleton" key="skeleton">
        <div class="avatar">
          <skeleton-base />
        </div>
        <div class="content">
          <skeleton-base />
        </div>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  $avatar-size: 4rem;

  .publisher-skeleton {
    display: flex;
    height: $avatar-size;

    .avatar {
      width: $avatar-size;
      margin-right: $gap;
    }

    .content {
      flex-grow: 1;
    }
  }
</style>
