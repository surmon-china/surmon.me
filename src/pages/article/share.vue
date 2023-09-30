<script lang="ts" setup>
  import { PropType } from 'vue'
  import { Article } from '/@/interfaces/article'
  import BaseShare, { SocialMedia } from '/@/components/widget/share.vue'
  const props = defineProps({
    article: {
      type: Object as PropType<Article>,
      required: true
    },
    socials: {
      type: Array as PropType<SocialMedia[]>,
      default: () => []
    }
  })

  const handleImageShare = () => {
    // TODO: share as image
  }
</script>

<template>
  <div class="share-box">
    <base-share class="share" :socials="props.socials" @share-as-image="handleImageShare" />
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  $share-size: 3rem;

  .share-box {
    padding: $gap;

    .share {
      width: 100%;
      opacity: 0.8;
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
