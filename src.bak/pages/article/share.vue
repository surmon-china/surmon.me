<template>
  <div class="share-module">
    <placeholder :loading="fetching">
      <template #loading>
        <div class="skeleton">
          <skeleton-base
            v-for="item in skeletonCount"
            :key="item"
            :radius="0"
            :style="{
              width: `calc((100% - (1em * ${skeletonCount - 1})) / ${skeletonCount})`
            }"
          />
        </div>
      </template>
      <template #default>
        <base-share class="article-share" :class="{ mobile: isMobile }" />
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '../../../src/app/enhancer'
  import BaseShare from '/@/components/widget/share.vue'

  export default defineComponent({
    name: 'ArticleShare',
    components: {
      BaseShare
    },
    props: {
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup() {
      const { isMobile } = useEnhancer()
      const skeletonCount = isMobile.value ? 3 : 10
      return {
        isMobile,
        skeletonCount
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .share-module {
    padding: $gap;

    > .skeleton {
      display: flex;
      justify-content: space-between;
      height: 3rem;
    }

    > .article-share {
      width: 100%;
      opacity: 0.6;
      display: flex;
      justify-content: space-between;

      &:hover {
        opacity: 1;
      }

      ::v-deep(.share-ejector) {
        flex-grow: 1;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        margin-right: $gap;
        font-size: $font-size-h4;
        border-radius: $xs-radius;
        background-color: $module-bg-darker-1;

        &:last-child {
          margin-right: 0;
        }
      }

      &.mobile {
        ::v-deep(.share-ejector) {
          width: auto;
          display: none;
          flex-grow: 0;

          &[class*='wechat'],
          &[class*='weibo'],
          &[class*='twitter'] {
            display: inline-block;
            flex-grow: 1;
          }
          &[class*='twitter'] {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
