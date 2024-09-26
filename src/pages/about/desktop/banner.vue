<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { getAssetURL } from '/@/transforms/url'
  import { META, VALUABLE_LINKS, IDENTITIES } from '/@/config/app.config'
  import { useAdminAvatar, i18ns } from '../shared'

  const emit = defineEmits<{
    (event: 'gTagEvent', name: string): void
  }>()

  const { isZhLang, cdnDomain } = useEnhancer()
  const { adminInfo } = useStores()

  const modalState = reactive({
    whatsApp: false,
    weChat: false
  })

  const handleOpenWhatsApp = () => {
    modalState.whatsApp = true
    emit('gTagEvent', 'whatsapp_modal')
  }

  const handleOpenWeChat = () => {
    modalState.weChat = true
    emit('gTagEvent', 'wechat_modal')
  }
</script>

<template>
  <div class="page-banner">
    <div class="background">
      <video
        class="video"
        loop
        muted
        autoplay
        :controls="false"
        :src="getAssetURL(cdnDomain, '/videos/clips/ocean-1.mp4')"
      ></video>
    </div>
    <div class="content">
      <div class="profile">
        <uimage class="avatar" :src="useAdminAvatar(adminInfo.data?.avatar)" />
        <h1 class="name">{{ adminInfo.data?.name || '-' }}</h1>
        <p class="slogan">{{ adminInfo.data?.slogan || '-' }}</p>
      </div>
      <p class="description">
        <webfont bolder>{{ isZhLang ? META.zh_description : META.en_description }}</webfont>
      </p>
      <div class="socials">
        <span class="normal">
          <ulink class="item instagram" :href="VALUABLE_LINKS.INSTAGRAM">
            <i class="iconfont icon-instagram" />
            <span class="text">Instagram</span>
          </ulink>
          <ulink class="item threads" :href="VALUABLE_LINKS.THREADS_FOLLOW">
            <i class="iconfont icon-threads" />
            <span class="text">Threads</span>
          </ulink>
          <ulink class="item zhihu" :href="VALUABLE_LINKS.ZHIHU">
            <i class="iconfont icon-zhihu-full" />
          </ulink>
        </span>
        <span class="mini">
          <ulink class="item github" :href="VALUABLE_LINKS.GITHUB">
            <i class="iconfont icon-github" />
          </ulink>
          <ulink class="item youtube" :href="VALUABLE_LINKS.YOUTUBE_CHANNEL">
            <i class="iconfont icon-youtube" />
          </ulink>
          <ulink class="item telegram" :href="VALUABLE_LINKS.TELEGRAM">
            <i class="iconfont icon-telegram" />
          </ulink>
          <button class="item whatsapp" @click="handleOpenWhatsApp">
            <i class="iconfont icon-whatsapp" />
            <client-only>
              <popup v-model:visible="modalState.whatsApp" :scroll-close="false">
                <div class="qrcode-modal whatsapp">
                  <div class="background"></div>
                  <uimage class="image" cdn src="/images/qrcodes/whatsapp.webp" />
                  <span class="text">
                    <i class="iconfont icon-whatsapp" />
                    Let's chat on
                    <ulink href="https://www.whatsapp.com/">WhatsApp</ulink>
                  </span>
                </div>
              </popup>
            </client-only>
          </button>
          <button class="item wechat" @click="handleOpenWeChat">
            <i class="iconfont icon-wechat" />
            <client-only>
              <popup v-model:visible="modalState.weChat" :scroll-close="false">
                <div class="qrcode-modal wechat">
                  <div class="background"></div>
                  <uimage class="image" cdn src="/images/qrcodes/wechat.webp" />
                  <span class="text">
                    <i18n>
                      <template #en>Friend me on WeChat | Channel</template>
                      <template #zh>扫码加微 ｜ 关注视频号</template>
                    </i18n>
                  </span>
                </div>
              </popup>
            </client-only>
          </button>
          <ulink class="item linkedin" :href="VALUABLE_LINKS.LINKEDIN">
            <i class="iconfont icon-linkedin" />
          </ulink>
          <ulink class="item douban" :href="VALUABLE_LINKS.DOUBAN">
            <i class="iconfont icon-douban" />
          </ulink>
        </span>
      </div>
      <divider dashed />
      <p class="biography" v-html="isZhLang ? i18ns.biography.zh : i18ns.biography.en"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .qrcode-modal {
    $image-size: 16rem;
    width: 23rem;
    height: 28rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.wechat {
      --item-primary: #{$wechat-primary};
    }
    &.whatsapp {
      --item-primary: #{$whatsapp-primary};
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 45%;
      background: var(--item-primary);
    }

    .image {
      z-index: $z-index-normal + 1;
      width: $image-size;
      height: $image-size;
      margin-bottom: 2rem;
      background-color: $module-bg-opaque;
      @include radius-box($radius-sm);
    }

    .text {
      font-weight: bold;
      color: var(--item-primary);
    }
  }

  .page-banner {
    $banner-height: 20rem;

    .background {
      display: block;
      position: absolute;
      width: 100%;
      height: $banner-height;
      top: 0;
      left: 0;
      overflow: hidden;
      z-index: $z-index-normal + 1;
      background-color: $module-bg-darker-1;
      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 1rem;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        background-image: radial-gradient(circle, transparent 70%, $color-text-reversal 70%);
        background-size: 0.7em 1em;
        background-position: 0 -0.5em;
      }

      .video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 0% 30%;
        pointer-events: none;
      }
    }

    .content {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      background-color: $module-bg;
      background-image: surl('/images/page-about/background.png'),
        linear-gradient($module-bg-opaque 50%, #00000000 100%);
      background-size: contain;
      background-repeat: repeat-x;
      background-blend-mode: lighten;

      .profile {
        margin-top: 2.6rem;
        margin-bottom: 4.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: $z-index-normal + 2;

        .avatar {
          $size: 8rem;
          width: $size;
          height: $size;
          box-sizing: content-box;
          border: 6px solid $module-bg;
          border-radius: 100%;
          overflow: hidden;
          background-color: $module-bg;
          transition: transform $motion-duration-slow;
          &:hover {
            transform: rotate(360deg);
          }
        }

        .name {
          color: $white;
          margin-top: $gap;
          margin-bottom: $gap-sm;
        }

        .slogan {
          font-weight: 600;
          color: $white;
          margin: 0;
        }
      }

      .description {
        font-size: $font-size-h3;
      }

      .socials {
        $button-size: 3rem;
        display: flex;
        justify-content: center;
        height: $button-size;
        margin-bottom: $gap;

        .normal {
          display: inline-flex;
          align-items: center;
          margin-right: $gap;

          .item {
            padding: 0 $gap;
            margin-right: $gap;
            height: 100%;
            display: inline-flex;
            align-items: center;
            border-radius: $radius-sm;
            color: $white;
            transition: all $motion-duration-fast;
            &:last-child {
              margin: 0;
            }

            .iconfont {
              font-size: $font-size-h4;
            }

            .text {
              margin-left: $gap-sm;
              font-weight: bold;
            }

            &.zhihu {
              background-color: $zhihu-primary;
              &:hover {
                background-color: $zhihu-primary-hover;
              }
            }
            &.youtube {
              background-color: $youtube-primary;
              &:hover {
                background-color: mix($black, $youtube-primary, 8%);
              }
            }
            &.instagram {
              opacity: 0.8;
              background: $instagram-primary;
              background: $instagram-gradient;
              &:hover {
                opacity: 1;
              }
            }
            &.threads {
              background-color: $threads-primary;
              opacity: 0.8;
              &:hover {
                opacity: 1;
              }
            }
          }
        }

        > .mini {
          display: flex;

          > .item {
            display: inline-block;
            width: $button-size;
            height: $button-size;
            line-height: $button-size;
            margin-right: $gap;
            text-align: center;
            border-radius: $radius-sm;
            color: $white;
            opacity: 0.8;
            transition: all $motion-duration-fast;

            &:hover {
              opacity: 1;
            }

            .iconfont {
              font-size: $font-size-h4;
            }

            &.github {
              background-color: $github-primary;
              &:hover {
                background-color: $github-primary-hover;
              }
            }
            &.wechat {
              background-color: $wechat-primary;
            }
            &.whatsapp {
              background-color: $whatsapp-primary;
            }
            &.youtube {
              background-color: $youtube-primary;
            }
            &.telegram {
              background-color: $telegram-primary;
            }
            &.douban {
              background-color: $douban-primary;
            }
            &.stackoverflow {
              background-color: $stackoverflow-primary;
            }
            &.algorithm {
              background-color: $leetcode-primary;
            }
            &.linkedin {
              background-color: $linkedin-primary;
            }
          }
        }
      }

      .biography {
        width: $container-width;
        margin-bottom: $gap-lg;
        padding: 0 $gap-xs;
        text-indent: 2em;
        line-height: $line-height-base * 1.9;
        font-weight: 600;
        color: $color-text-secondary;
      }
    }
  }
</style>
