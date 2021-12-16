<template>
  <div class="share-module">
    <placeholder :loading="fetching">
      <template #loading>
        <div class="skeletons">
          <skeleton-base class="item" v-for="item in skeletonCount" :key="item" />
        </div>
      </template>
      <template #default>
        <base-share class="article-share" :socials="socials" />
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import BaseShare, { SocialMedia } from '/@/components/widget/share.vue'

  export default defineComponent({
    name: 'ArticleShare',
    components: {
      BaseShare
    },
    props: {
      socials: {
        type: Array as PropType<SocialMedia[]>,
        default: () => []
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const skeletonCount = props.socials.length
        ? props.socials.length
        : Object.keys(SocialMedia).length
      return {
        skeletonCount
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .share-module {
    $share-size: 3rem;
    padding: $gap;

    .skeletons {
      display: flex;
      justify-content: space-between;
      height: $share-size;

      .item {
        margin-right: $gap;
        &:last-child {
          margin-right: 0;
        }
      }
    }

    .article-share {
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
        height: $share-size;
        line-height: $share-size;
        margin-right: $gap;
        font-size: $font-size-h4;
        border-radius: $xs-radius;
        background-color: $module-bg-darker-1;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
