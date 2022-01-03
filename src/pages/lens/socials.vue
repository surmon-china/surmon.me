<template>
  <div class="socials">
    <div class="item" :class="social.class" :key="index" v-for="(social, index) in socials">
      <div class="background"></div>
      <span class="title">
        <i class="icon iconfont" :class="social.icon"></i>
        <span class="text">{{ social.name }}</span>
      </span>
      <span class="qrcode">
        <uimage class="image" cdn :src="social.qrcode" />
      </span>
      <ulink class="button" :href="social.link" @mousedown="handleGTagEvent(social.class)">
        {{ social.text }}
      </ulink>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/gtag'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  // plogs https://github.com/bertrandom/icloud-shared-album-to-flickr/blob/master/app.js
  export default defineComponent({
    name: 'LensPageSocials',
    setup() {
      const { gtag } = useEnhancer()
      const socials = [
        {
          class: 'instagram',
          name: 'Instagram',
          qrcode: `/images/page-lens/instagram.png`,
          icon: 'icon-instagram',
          link: VALUABLE_LINKS.INSTAGRAM,
          text: `Follow me on Instagram`
        },
        {
          class: 'wechat-channel',
          name: 'WeChat Channel',
          qrcode: `/images/page-lens/wechat-channel.png`,
          icon: 'icon-wechat-channel',
          text: `Follow my WeChat Channel`
        },
        {
          class: 'bilibili',
          name: 'BiliBili',
          qrcode: `/images/page-lens/bilibili.png`,
          icon: 'icon-bilibili-full',
          link: VALUABLE_LINKS.BILIBILI,
          text: `(゜-゜)つロ 干杯~`
        },
        {
          class: 'youtube',
          name: 'YouTube Channel',
          qrcode: `/images/page-lens/youtube.png`,
          icon: 'icon-youtube',
          link: VALUABLE_LINKS.YOUTUBE,
          text: `Subscribe my YouTube Channel`
        }
      ]

      const handleGTagEvent = (event: string) => {
        gtag?.event(event.replace('-', '_') + '_link', {
          event_category: GAEventCategories.Lens
        })
      }

      return {
        socials,
        handleGTagEvent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .socials {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: $gap * 2;
    width: 100%;
    height: 23rem;

    .item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      padding: $xs-gap 0;
      color: $white;
      background-image: linear-gradient($module-bg-opaque 40%, #00000000 100%);
      @include radius-box($sm-radius);

      .title {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        z-index: $z-index-normal + 1;

        .iconfont {
          font-size: $font-size-h1;
          margin-right: $sm-gap;
        }

        .text {
          font-size: $font-size-h3;
          font-weight: bold;
        }
      }

      .qrcode {
        z-index: $z-index-normal + 1;
        .image {
          width: 13rem;
          @include radius-box($sm-radius);
        }
      }

      .button {
        display: block;
        border-bottom: 1px solid;
        padding-bottom: $xs-gap;
        margin-bottom: $xs-gap;
        font-weight: bold;
      }

      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 46%;
      }

      &.bilibili {
        .background {
          background: $bilibili-pink-primary;
        }
        .button {
          color: $bilibili-pink-primary;
        }
      }
      &.instagram {
        .background {
          background: $instagram-primary;
          background: $instagram-gradient;
        }
        .button {
          color: $instagram-primary;
        }
      }
      &.youtube {
        .background {
          background-color: $youtube-primary;
        }
        .button {
          color: $youtube-primary;
        }
      }
      &.wechat-channel {
        .background {
          background-color: $wechat-channel-primary;
        }
        .button {
          color: $wechat-channel-primary;
        }
      }
    }
  }
</style>
