<template>
  <div class="merch-page">
    <page-banner :blur="false" :position="70" image="/images/page-merch/banner.jpg">
      <template #title>
        <webfont>
          <i18n zh="亲身体验，真实不虚" en="Merch Bar" />
        </webfont>
      </template>
      <template #description>
        <i18n zh="手动维护，未用不推" en="Maybe you will like it" />
      </template>
    </page-banner>
    <div class="container">
      <page-title class="title" id="products">我在用的推荐好物</page-title>
      <ul class="product-list">
        <product-item :key="index" :product="product" v-for="(product, index) in products" />
      </ul>
      <page-title class="title" id="brokers">我筛选后在用的港美股券商</page-title>
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
  import { Language, LanguageKey } from '/@/language'
  import { META } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { firstUpperCase } from '/@/transforms/text'
  import PageBanner from '/@/components/common/fullpage/banner.vue'
  import PageTitle from '/@/components/common/fullpage/title.vue'
  import ProductItem from './product.vue'

  export default defineComponent({
    name: 'MerchPage',
    components: {
      PageBanner,
      PageTitle,
      ProductItem
    },
    setup() {
      const { i18n, meta, isZhLang, adConfig } = useEnhancer()
      const products = computed(() => adConfig.value.PC_MERCH_PRODUCTS)
      const brokers = computed(() => adConfig.value.PC_MERCH_BROKERS)

      meta(() => {
        const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_MERCH, Language.English)!)
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_MERCH), enTitle] : [enTitle]
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
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .merch-page {
    .title {
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
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
