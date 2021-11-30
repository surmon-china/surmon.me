<template>
  <div class="merch-page" :class="{ mobile: isMobile }">
    <page-banner :position="70" image="/images/page-merch/banner.jpg">
      <template #title>
        <i18n zh="亲身体验，真实不虚" en="Merch bar" />
      </template>
      <template #description>
        <i18n zh="手动维护，未用不推" en="Maybe you will like it" />
      </template>
    </page-banner>
    <div class="container">
      <div class="module-title" id="products">我在用的推荐好物</div>
      <product-list :products="products" />
      <div class="module-title" id="brokers">我筛选后在用的港美股券商</div>
      <product-list :products="brokers" :image-style="{ backgroundSize: '50%' }" />
      <div class="end"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import PageBanner from '/@/components/common/banner.vue'
  import ProductList from './list.vue'

  export default defineComponent({
    name: 'MerchPage',
    components: {
      PageBanner,
      ProductList
    },
    setup() {
      const { i18n, helmet, isMobile, isZhLang, adConfig } = useEnhancer()
      const products = computed(() => adConfig.value.PC_MERCH_PRODUCTS)
      const brokers = computed(() => adConfig.value.PC_MERCH_BROKERS)

      helmet(() => {
        const prefix = isZhLang.value ? `${i18n.t(LANGUAGE_KEYS.PAGE_JOB)} | ` : ''
        return { title: prefix + 'Merch' }
      })

      return {
        products,
        brokers,
        isMobile
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
      border-width: 2px double $primary;
      border-radius: $lg-radius;
      text-transform: uppercase;
      text-align: center;
      color: $primary;
      letter-spacing: 5px;
      font-size: $font-size-h3;
      font-weight: bold;
    }

    .end {
      height: $gap * 2;
    }
  }
</style>
