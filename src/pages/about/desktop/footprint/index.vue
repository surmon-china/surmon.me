<script lang="ts" setup>
  import type { Map } from 'mapbox-gl'
  import { shallowRef } from 'vue'
  import { APP_PROFILE, VALUABLE_LINKS } from '/@/configs/app.config'
  import { flyToLivingMarker } from './mapbox-living-now'
  import MapboxModal from './box-modal.vue'
  import Mapbox from './box-base.vue'

  const modalVisible = shallowRef(false)
  const openModal = () => {
    modalVisible.value = true
  }

  const map = shallowRef<Map>()
  const handleMapboxLoad = (payload: { map: Map }) => {
    map.value = payload.map
  }
</script>

<template>
  <div class="footprint-map">
    <client-only>
      <popup v-model:visible="modalVisible" :scroll-close="false">
        <mapbox-modal class="footprint-modal" />
      </popup>
    </client-only>
    <div class="mapbox-wrapper">
      <mapbox class="mapbox" @load="handleMapboxLoad" />
      <div class="toolbar">
        <ulink class="button" :href="VALUABLE_LINKS.GOOGLE_MY_MAP">
          <i class="iconfont icon-google-maps"></i>
        </ulink>
        <button class="button" @click="openModal">
          <i class="iconfont icon-fullscreen"></i>
        </button>
      </div>
    </div>
    <div class="legends">
      <div class="buttons">
        <button class="item" @click="flyToLivingMarker(map!)">
          <i class="iconfont icon-location"></i>
          <span class="text">
            <i18n :zh="APP_PROFILE.about_page_geo_title_zh" :en="APP_PROFILE.about_page_geo_title_en" />
          </span>
        </button>
        <div class="divider"></div>
        <button class="item" @click="openModal">
          <i class="iconfont icon-route"></i>
          <span class="text">
            <i18n zh="我的旅行足迹" en="My Journeys"></i18n>
          </span>
        </button>
      </div>
      <div class="links">
        <ulink class="item" href="https://goo.gl/maps/fzHHMCjuSbbJgBVt9">
          <i class="iconfont icon-map"></i>
          <span class="text">
            <i18n zh="我的美食地图" en="My Foodie Map"></i18n>
            <i class="new-window-icon iconfont icon-new-window-s"></i>
          </span>
        </ulink>
        <ulink class="item" href="https://google.com/maps/contrib/101107919754452588990/reviews">
          <i class="iconfont icon-map"></i>
          <span class="text">
            <i18n zh="我的环球点评" en="My Map Reviews"></i18n>
            <i class="new-window-icon iconfont icon-new-window-s"></i>
          </span>
        </ulink>
        <ulink class="item" href="https://goo.gl/maps/kLVRWTMhZbbY4DNa7">
          <i class="iconfont icon-map"></i>
          <span class="text">
            <i18n zh="我去过的地方" en="Places I've Been"></i18n>
            <i class="new-window-icon iconfont icon-new-window-s"></i>
          </span>
        </ulink>
        <ulink class="item" href="https://goo.gl/maps/SpB4JJm9HYUiqjtc6">
          <i class="iconfont icon-map"></i>
          <span class="text">
            <i18n zh="我想去的地方" en="Places I Want to Go"></i18n>
            <i class="new-window-icon iconfont icon-new-window-s"></i>
          </span>
        </ulink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .footprint-modal {
    width: 88vw;
    height: 88vh;
  }

  .footprint-map {
    position: relative;
    display: flex;
    width: 100%;
    $map-width: 810px;
    $map-height: 220px;

    .legends .buttons,
    .legends .links {
      @include mix.common-bg-module();
      @include mix.radius-box($radius-lg);
    }

    .legends {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: $gap * 2;

      .buttons {
        flex-shrink: 0;
        margin-bottom: $gap-lg;
        padding: $gap-xs 0;
        width: 100%;

        .divider {
          border-top: 1px dashed $module-bg-darker-1;
        }

        .item {
          padding: 0 $gap;
          display: block;
          width: 100%;
          text-align: left;
          line-height: 2.6em;
          color: $color-text-secondary;
          &:hover {
            color: $color-text;
          }

          .iconfont {
            margin-right: $gap-sm;
          }
          .text {
            font-weight: bold;
          }
        }
      }

      .links {
        flex: 1;
        list-style: none;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .item {
          display: block;
          padding: 0 $gap;
          line-height: 2.4em;
          color: $color-text-secondary;
          &:hover {
            color: $color-text;
          }

          .iconfont {
            margin-right: $gap;
          }

          .text {
            display: inline-block;
            position: relative;
            font-weight: bold;

            .new-window-icon {
              margin: 0;
              font-size: 10px;
              font-weight: normal;
              position: absolute;
              top: -0.5em;
              right: -1.2em;
              color: $color-text-divider;
            }
          }
        }
      }
    }

    .mapbox-wrapper {
      position: relative;
      padding: $gap;
      @include mix.common-bg-module();
      @include mix.radius-box($radius-lg);

      .mapbox {
        width: $map-width;
        height: $map-height;
        display: block;
      }

      .toolbar {
        position: absolute;
        top: $gap-lg * 2;
        right: $gap-lg * 2;
        z-index: $z-index-normal + 1;
        display: flex;

        .button {
          margin-left: $gap-lg;
          display: block;
          $size: 2em;
          width: $size;
          height: $size;
          line-height: $size;
          border-radius: $radius-xs;
          text-align: center;
          background-color: $module-bg;
          font-size: $font-size-h4;
          color: $color-text-secondary;
          @include mix.backdrop-blur(1px);
          &:hover {
            color: $color-link;
            background-color: $module-bg-opaque;
          }
        }
      }
    }
  }
</style>
