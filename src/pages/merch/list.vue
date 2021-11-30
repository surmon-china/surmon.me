<template>
  <ul class="products">
    <li class="item" :key="index" v-for="(product, index) in products">
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
        <a class="link" target="_blank" :href="product.url">
          去看看
          <i class="iconfont icon-new-window"></i>
        </a>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, PropType, CSSProperties } from 'vue'
  export interface ProductItem {
    name: string
    description: string
    detail: string
    src: string
    url: string
  }
  export default defineComponent({
    name: 'MerchProducts',
    props: {
      imageStyle: Object as PropType<CSSProperties>,
      products: {
        type: Array as PropType<Array<ProductItem>>,
        require: true
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';
  .products {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: $gap * 2;

    .item {
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

        .qrcode {
          height: 50%;
          background-color: $white;
          @include radius-box($sm-radius);
        }
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

          .location {
            font-weight: normal;
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
  }
</style>
