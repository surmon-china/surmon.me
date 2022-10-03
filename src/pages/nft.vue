<template>
  <div class="nft-page">
    <page-banner :position="60" image="/images/page-nft/banner.jpg">
      <template #title>
        <webfont>
          <i18n zh="旷古无两，数字典藏" en="NFT Bar" />
        </webfont>
      </template>
      <template #description>
        <i18n zh="由我铸造发行的独一无二的数字藏品" en="Unique NFTs created by me" />
      </template>
    </page-banner>
    <container class="page-profile">
      <!-- TODO -->
    </container>
    <container class="page-content">
      <ulink class="comming-soon" :href="VALUABLE_LINKS.OPENSEA">
        <i class="iconfont icon-opensea"></i>
        <span class="text">comming soon</span>
      </ulink>
      <!-- <template :key="title" v-for="(list, title) in products">
        <h3 class="list-title">{{ title || '-' }}</h3>
        <ul class="product-list">
          <li class="product" :key="index" v-for="(product, index) in list">
            <div
              class="image"
              :style="{
                backgroundImage: `url('${product.src}')`,
                backgroundSize: product.size ?? 'cover'
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
                @mousedown="handleGTagEvent('nft_product_link', product.name)"
              >
                去看看
                <i class="iconfont icon-new-window"></i>
              </ulink>
            </div>
          </li>
        </ul>
      </template> -->
    </container>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Language, LanguageKey } from '/@/language'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { firstUpperCase } from '/@/transforms/text'
  import { GAEventCategories } from '/@/constants/gtag'
  import PageBanner from '/@/components/common/banner.vue'

  export interface NftItemConfig {
    name: string
    description: string
    detail: string
    url: string
    src: string
    size?: string
  }

  export default defineComponent({
    name: 'NftPage',
    components: {
      PageBanner
    },
    setup() {
      const { i18n, meta, gtag, isZhLang } = useEnhancer()
      const products: Record<string, Array<NftItemConfig>> = {}

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_NFT, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_NFT), enTitle] : [enTitle]
        return {
          pageTitle: titles.join(' | '),
          description: `${META.author} 铸造的数字藏品`,
          ogType: 'product'
        }
      })

      const handleGTagEvent = (event: string, label: string) => {
        gtag?.event(event, {
          event_category: GAEventCategories.Universal,
          event_label: label
        })
      }

      return {
        VALUABLE_LINKS,
        products,
        handleGTagEvent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .nft-page {
    min-height: $full-page-active-content-height;
    display: flex;
    flex-direction: column;

    .page-profile {
      height: 8rem;
      background-color: $module-bg-translucent;
    }

    .page-content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      text-align: center;

      .comming-soon {
        padding: 1rem 1em;
        text-transform: uppercase;
        font-size: $font-size-h4;
        color: $text-divider;
        background-color: $module-bg-darker-2;
        @include radius-box($xs-radius);
        &:hover {
          color: $text-disabled;
          background-color: $module-bg-darker-3;
        }

        .text {
          font-weight: bold;
          margin-left: $sm-gap;
        }
      }
    }

    .list-title {
      margin: ($gap * 2) 0;
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 2rem;
      letter-spacing: 5px;
      color: $text;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
    }

    .product-list {
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: $gap * 2;

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
            margin-top: $sm-gap;
            margin-bottom: 0;
            line-height: 1.6;
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
          @include backdrop-blur(5px);
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
  }
</style>
