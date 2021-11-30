<template>
  <div
    class="banner"
    :class="{ dark: isDarkTheme }"
    :style="{ backgroundImage: `url(${imageUrl})`, backgroundPositionY: `${position}%` }"
  >
    <div class="content" :class="className">
      <h2 class="title">
        <slot name="title"></slot>
      </h2>
      <p class="description">
        <slot name="description"></slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { useEnhancer } from '/@/app/enhancer'
  export default defineComponent({
    name: 'FullPageBanner',
    props: {
      class: String,
      position: {
        type: Number,
        default: 20
      },
      image: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const { isDarkTheme } = useEnhancer()
      return {
        isDarkTheme,
        className: props.class,
        imageUrl: getFileCDNUrl(props.image)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .banner {
    height: $full-column-page-banner-height;
    background-color: $module-bg-darker-1;
    background-size: cover;
    background-position-x: center;

    &.dark {
      /* background-blend-mode: lighten; */
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: $white;

      .title {
        font-size: 3em;
        margin-bottom: $lg-gap * 2;
      }

      .description {
        font-size: $font-size-h4;
      }
    }
  }
</style>
