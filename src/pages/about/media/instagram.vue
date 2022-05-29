<template>
  <placeholder :i18n-key="LanguageKey.EMPTY_PLACEHOLDER" :loading="fetching" :data="store.data">
    <template #loading>
      <ul class="list">
        <li class="item" v-for="i in 24" :key="i">
          <skeleton-base />
        </li>
      </ul>
    </template>
    <template #default>
      <ul class="list">
        <li class="item" :key="index" v-for="(item, index) in store.data.slice(0, 23)">
          <ulink class="link" :href="item.permalink" :title="item.caption">
            <uimage class="cover" :src="getInstagramImage(item, 't')" :alt="item.caption" />
            <div class="mask"><i class="iconfont icon-eye"></i></div>
          </ulink>
        </li>
        <li class="item">
          <ulink class="link more" :href="VALUABLE_LINKS.INSTAGRAM">•••</ulink>
        </li>
      </ul>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useInstagramMediasStore } from '/@/stores/media'
  import { getInstagramImage } from '/@/transforms/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { LanguageKey } from '/@/language'

  export default defineComponent({
    name: 'AboutPageInstagram',
    setup() {
      const fetching = ref(true)
      const store = useInstagramMediasStore()
      onMounted(() => {
        store.fetch().finally(() => {
          fetching.value = false
        })
      })

      return {
        LanguageKey,
        VALUABLE_LINKS,
        getInstagramImage,
        fetching,
        store
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .list {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1rem;
    $item-size: 74px;

    .item {
      position: relative;
      height: $item-size;

      .link {
        display: block;
        width: 100%;
        height: 100%;
        background-color: $module-bg-darker-1;
        opacity: 0.8;
        @include visibility-transition();
        &:hover {
          opacity: 1;
          .mask {
            @include visible();
          }
        }

        &.more {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $font-size-h3;
        }

        .cover {
          height: $item-size;
          object-fit: cover;
          border-radius: $xs-radius;
        }

        .mask {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $white;
          background-color: rgba(0, 0, 0, 0.3);
          @include visibility-transition();
          @include hidden();
        }
      }
    }
  }
</style>
