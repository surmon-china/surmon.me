<template>
  <a v-if="href" target="_blank" rel="external nofollow noopener" :href="href" v-bind="$attrs">
    <slot></slot>
  </a>
  <span v-else v-bind="$attrs">
    <slot></slot>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CommentLink',
    props: {
      href: String
    }
  })
</script>
