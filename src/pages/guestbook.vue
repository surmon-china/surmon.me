<template>
  <div class="guestbook-page" :class="{ mobile: isMobile }">
    <div class="detail">
      <div class="banner">
        <uimage cdn class="image" src="/images/guestbook.jpg" />
        <span class="solgan" v-i18n="LANGUAGE_KEYS.GUESTBOOK_SLOGAN" />
      </div>
    </div>
    <div class="comment">
      <comment :post-id="0" :likes="siteLikes" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { OptionModuleActions, OptionModuleMutations } from '/@/store/option'
  import { CommentModuleActions } from '/@/store/comment'
  import { useGlobalState } from '/@/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import Comment from '/@/components/comment/index.vue'

  export default defineComponent({
    name: 'Guestbook',
    // head() {
    //   return {
    //     title: `${this.isEnLang ? '' : this.$i18n.nav.guestbook + ' | '}Guestbook`
    //   }
    // },
    components: {
      Comment
    },
    async setup() {
      const store = useStore()
      const globalState = useGlobalState()
      const isMobile = computed(() => globalState.userAgent.isMobile)
      const siteLikes = computed(() => {
        const appOption = store.state.option.appOption.data
        return appOption ? appOption.meta.likes : 0
      })

      await Promise.all([
        store.dispatch(getNamespace(Modules.Option, OptionModuleActions.FetchAppOption), true),
        store.dispatch(getNamespace(Modules.Comment, CommentModuleActions.FetchList), { post_id: 0 })
      ])

      return {
        LANGUAGE_KEYS,
        isMobile,
        siteLikes
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .guestbook-page {
    .detail {
      margin-bottom: $lg-gap;

      .banner {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 19rem;
        border: 0;
        background-color: $module-bg;
        @include radius-box($lg-radius);

        .image {
          margin-top: -$gap * 6;
          transition: all 1s;

          &:hover {
            transform: rotate(2deg) scale(1.1);
            transition: all 1s;
          }
        }

        .solgan {
          $size: 2em;
          display: block;
          position: absolute;
          right: $lg-gap * 2;
          bottom: $lg-gap * 2;
          height: $size;
          line-height: $size;
          padding: 0 $sm-gap;
          padding-left: 3rem;
          opacity: .5;
          font-weight: 700;
          color: $body-bg;
          user-select: none;
          cursor: progress;
          background: linear-gradient(
            to left,
            $module-bg,
            $module-bg-darker-3,
            transparent
          );
        }
      }
    }

    &.mobile {
      > .detail {
        > .banner {
          height: 12rem;
        }
      }
    }
  }
</style>
