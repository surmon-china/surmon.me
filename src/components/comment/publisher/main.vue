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

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CommentPublisherMain',
    props: {
      fetching: {
        type: Boolean,
        default: false
      }
    }
  })
</script>

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
