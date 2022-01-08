<template>
  <li class="product">
    <div
      class="image"
      :style="{
        backgroundImage: `url('${product.src}')`,
        ...imageStyle
      }"
    ></div>
    <div class="content">
      <ulink class="title" :href="product.url">
        {{ product.name }}
      </ulink>
      <p class="description" v-html="product.description" />
    </div>
    <div class="detail">
      <p class="text">
        {{ product.detail || '暂无描述' }}
      </p>
      <ulink
        class="link"
        :href="product.url"
        @mousedown="handleGTagEvent('merch_product_link', product.name)"
      >
        去看看
        <i class="iconfont icon-new-window"></i>
      </ulink>
    </div>
  </li>
</template>

<script lang="ts">
  import { defineComponent, PropType, CSSProperties } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/gtag'
  export interface ProductItem {
    name: string
    description: string
    detail: string
    src: string
    url: string
  }

  export default defineComponent({
    name: 'MerchProductItem',
    props: {
      product: {
        type: Object as PropType<ProductItem>,
        required: true
      },
      imageStyle: {
        type: Object as PropType<CSSProperties>,
        required: false
      }
    },
    setup() {
      const { gtag } = useEnhancer()
      const handleGTagEvent = (event: string, label: string) => {
        gtag?.event(event, {
          event_category: GAEventCategories.Universal,
          event_label: label
        })
      }

      return { handleGTagEvent }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .product {
    display: block;
    height: auto;
    position: relative;
    @include radius-box($sm-radius);
    @include common-bg-module();
    &:hover {
      .detail {
        @include visible();
      }
    }

    .image {
      width: 100%;
      height: 245px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: $white;
      background-size: cover;
      background-position: center;
    }

    .content {
      padding: $lg-gap;

      .title {
        margin: 0;
        font-weight: bold;
        font-size: $font-size-h4;
        text-transform: capitalize;
        border-bottom: 1px solid transparent;
        &:hover {
          text-decoration: none;
          border-color: initial;
        }
      }

      .description {
        margin-top: $gap;
        margin-bottom: 0;
        line-height: 2;
      }
    }

    .detail {
      display: block;
      width: 100%;
      padding: $gap;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: $module-bg;
      backdrop-filter: blur(5px);
      @include hidden();
      @include visibility-transition();

      .text {
        line-height: $line-height-base * 1.4;
      }

      .link {
        $height: 2.4em;
        display: block;
        width: 100%;
        margin-top: $lg-gap;
        line-height: $height;
        border: 1px solid;
        border-color: $primary;
        color: $primary;
        font-size: $font-size-small;
        text-align: center;
        letter-spacing: 1px;
        transition: color $transition-time-fast, background-color $transition-time-fast;
        @include radius-box($xs-radius);

        &:hover {
          color: $text-reversal;
          background-color: $primary;
        }
      }
    }
  }
</style>
