<template>
  <div class="merch-page">
    <page-banner :blur="false" :position="70" image="/images/page-merch/banner.jpg">
      <template #title>
        <i18n zh="亲身体验，真实不虚" en="Merch Bar" />
      </template>
      <template #description>
        <i18n zh="手动维护，未用不推" en="Maybe you will like it" />
      </template>
    </page-banner>
    <div class="container">
      <div class="module-title" id="products">我在用的推荐好物</div>
      <ul class="product-list">
        <product-item :key="index" :product="product" v-for="(product, index) in products" />
      </ul>
      <div class="module-title" id="brokers">我筛选后在用的港美股券商</div>
      <ul class="product-list">
        <product-item
          :key="index"
          :product="broker"
          :image-style="{ backgroundSize: '50%' }"
          v-for="(broker, index) in brokers"
        />
      </ul>
      <div class="end"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { firstUpperCase } from '/@/transforms/text'
  import { META } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import ProductItem from './product.vue'

  export default defineComponent({
    name: 'MerchPage',
    components: {
      PageBanner,
      ProductItem
    },
    setup() {
      const { i18n, meta, isZhLang, adConfig } = useEnhancer()
      const products = computed(() => adConfig.value.PC_MERCH_PRODUCTS)
      const brokers = computed(() => adConfig.value.PC_MERCH_BROKERS)

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LANGUAGE_KEYS.PAGE_MERCH, Language.En)!)
        const titles = isZhLang.value ? [i18n.t(LANGUAGE_KEYS.PAGE_MERCH), enTitle] : [enTitle]
        return { pageTitle: titles.join(' | '), description: `${META.author} 的周边好物` }
      })

      return {
        products,
        brokers
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .merch-page {
    .module-title {
      margin: ($gap * 2) 0;
      line-height: 3.6em;
      background-color: $module-bg;
      border: 4px double $primary;
      border-radius: $lg-radius;
      text-transform: uppercase;
      text-align: center;
      color: $primary;
      letter-spacing: 5px;
      font-size: $font-size-h3;
      font-weight: bold;
    }

    .product-list {
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: $gap * 2;
    }

    .end {
      height: $gap * 2;
    }
  }
</style>
