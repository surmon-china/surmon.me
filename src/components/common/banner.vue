<template>
  <div class="banner" :class="{ mobile: isMobile }">
    <div
      class="background"
      :class="{ dark: isDarkTheme }"
      :style="{ backgroundImage: `url(${imageURL})`, backgroundPositionY: `${position}%` }"
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

<script lang="ts">
  import { defineComponent } from 'vue'
  import { getTargetCDNURL } from '/@/transforms/url'
  import { useEnhancer } from '/@/app/enhancer'

  export default defineComponent({
    name: 'PageBanner',
    props: {
      image: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        default: 20
      },
      blur: {
        type: Number,
        default: 0
      },
      isMobile: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { isDarkTheme } = useEnhancer()
      return {
        isDarkTheme,
        imageURL: getTargetCDNURL(props.image)
      }
    }
  })
</script>

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
