<script lang="ts" setup>
  import { getCDN_URL } from '/@/transforms/url'
  import { useEnhancer } from '/@/app/enhancer'

  interface Props {
    image: string
    position?: number
    blur?: number
    isMobile?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    position: 20,
    blur: 0,
    isMobile: false
  })

  const { isDarkTheme } = useEnhancer()
</script>

<template>
  <div class="banner" :class="{ mobile: isMobile }">
    <div
      class="background"
      :class="{ dark: isDarkTheme }"
      :style="{ backgroundImage: `url(${getCDN_URL(props.image)})`, backgroundPositionY: `${position}%` }"
    ></div>
    <div class="content" :class="{ blur: Boolean(blur) }" :style="{ '--blur': `${blur}px` }">
      <h2 class="title">
        <slot name="title"></slot>
      </h2>
      <div class="description">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .banner {
    position: relative;
    height: $full-column-page-banner-height;
    z-index: $z-index-normal;

    .background {
      position: absolute;
      z-index: $z-index-underground;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $module-bg-darker-1;
      background-size: cover;
      background-position-x: center;
      &.dark {
        filter: brightness(0.8);
      }
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: $white;
      &.blur {
        @include backdrop-blur(var(--blur));
      }

      .title {
        font-size: 3em;
        margin-top: 0;
        margin-bottom: $lg-gap * 2;
      }

      .description {
        font-size: $font-size-h4;
        font-weight: bold;
      }
    }

    &.mobile {
      height: $mobile-banner-height;
      margin-top: -$lg-gap;
      margin-left: -$gap;
      margin-right: -$gap;

      .title {
        font-size: 2em;
      }
    }
  }
</style>
