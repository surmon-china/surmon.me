<template>
  <div class="share">
    <transition name="module" mode="out-in">
      <div v-if="fetching" key="skeleton" class="skeleton">
        <skeleton-base
          v-for="item in (isMobile ? 3 : 10)"
          :key="item"
          :style="{
            width: `calc((100% - (1em * ${isMobile ? 2 : 9})) / ${isMobile ? 3 : 10})`
          }"
          :radius="0"
        />
      </div>
      <share-box v-else key="share" :class="{ mobile: isMobile }" />
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useGlobalState } from '/@/state'

  export default defineComponent({
    name: 'CategoryShare',
    props: {
      fetching: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const globalState = useGlobalState()
      return {
        isMobile: globalState.userAgent.isMobile
      }
    }
  })
</script>

<style lang="scss">
  // workaround css scoped
  .article-page {
    .share-box {
      .share-ejector {
        background-color: $body-bg;
      } 
    }
  }
</style>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

  .share {
    padding: $gap;

    > .skeleton {
      display: flex;
      justify-content: space-between;
      height: 3rem;
    }

    > .share-box {
      width: 100%;
      opacity: .6;
      display: flex;
      justify-content: space-between;

      &:hover {
        opacity: 1;
      }

      > .share-ejector {
        flex-grow: 1;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        margin-right: $gap;
        font-size: 17px;

        &:last-child {
          margin-right: 0;
        }
      }

      &.mobile {
        > .share-ejector {
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
