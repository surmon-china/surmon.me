<template>
  <div class="share-box">
    <base-share class="share" :socials="socials" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import BaseShare, { SocialMedia } from '/@/components/widget/share.vue'

  export default defineComponent({
    name: 'ArticleLikeShare',
    components: {
      BaseShare
    },
    props: {
      socials: {
        type: Array as PropType<SocialMedia[]>,
        default: () => []
      }
    },
    setup(props) {
      const skeletonCount = props.socials.length
        ? props.socials.length
        : Object.keys(SocialMedia).length

      return {
        skeletonCount,
        VALUABLE_LINKS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

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
