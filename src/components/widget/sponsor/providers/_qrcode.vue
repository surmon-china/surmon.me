<script lang="ts" setup>
  const props = defineProps<{
    qrcode: string
  }>()
</script>

<template>
  <div class="qrcode-provider">
    <uimage class="qrcode" :src="props.qrcode" cdn />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .qrcode-provider {
    position: relative;
    &:hover {
      .content {
        @include mix.visible();
      }
    }

    .qrcode {
      $size: 14rem;
      width: $size;
      height: $size;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(black, 0.7);
      color: rgba($white, 0.8);
      z-index: $z-index-normal + 1;
      @include mix.visibility-transition();
      @include mix.hidden();
    }
  }
</style>
