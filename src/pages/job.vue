<template>
  <div class="job-page" :class="{ mobile: isMobile }">
    <div class="detail">
      <div class="banner">
        <uimage
          cdn
          class="image"
          src="/images/guestbook.jpg"
        />
        <span class="solgan" v-i18n="LANGUAGE_KEYS.GUESTBOOK_SLOGAN" />
      </div>
    </div>
    <div class="comment">
      <!-- <comment-box :post-id="0" :likes="siteLikes" /> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useStore, Modules, getNamespace } from '/@/store'
  import { OptionModuleActions, OptionModuleMutations } from '/@/store/option'
  import { useGlobalState } from '/@/state'
  import { useI18n } from '/@/services/i18n'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'Job',
    // head() {
    //   return {
    //     title: `${this.isEnLang ? '' : this.$i18n.nav.guestbook + ' | '}Guestbook`
    //   }
    // },
    async setup() {
      const store = useStore()
      const globalState = useGlobalState()
      const isMobile = computed(() => globalState.userAgent.isMobile)
      const siteLikes = () => {
        const appOption = store.state.option.appOption.data
        return appOption ? appOption.meta.likes : 0
      }

      await Promise.all([
        store.dispatch(getNamespace(Modules.Option, OptionModuleActions.FetchAppOption), true),
        // store.dispatch('comment/fetchList', { post_id: 0 })
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
    &.mobile {
      > .detail {
        > .banner {
          height: 12rem;
        }
      }
    }

    .detail {
      margin-bottom: $lg-gap;
      background-color: $module-bg;

      .banner {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 19rem;
        border: 0;

        .image {
          margin-top: -$gap * 6;
          transition: all 1s;

          &:hover {
            transform: rotate(2deg) scale(1.1);
            transition: all 1s;
          }
        }

        .solgan {
          position: absolute;
          right: $lg-gap * 2;
          bottom: $lg-gap * 2;
          display: block;
          font-weight: 700;
          opacity: .5;
          cursor: progress;
          padding: 0 $sm-gap;
          padding-left: 3rem;
          height: 2em;
          line-height: 2em;
          color: $body-bg;
          background: linear-gradient(
            to left,
            $module-bg,
            $module-hover-bg-opacity-3,
            transparent
          );
        }
      }
    }
  }
</style>
