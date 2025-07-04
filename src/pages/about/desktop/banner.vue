<script lang="ts" setup>
  import { ref } from 'vue'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { getAssetURL } from '/@/transforms/url'
  import { getEmailLink } from '/@/transforms/email'
  import { APP_META, VALUABLE_LINKS } from '/@/configs/app.config'
  import { useAdminAvatar, i18ns } from '../shared'

  const emit = defineEmits<{
    (event: 'gTagEvent', name: string): void
  }>()

  const { isZhLang, isDarkTheme, cdnDomain } = useEnhancer()
  const { adminInfo } = useStores()
  const { appOption } = useStores()

  const emailLink = getEmailLink({
    email: appOption.data?.site_email!,
    subject: `Hello, ${APP_META.author}!`,
    body: 'Hi, I am writing to you from your website.'
  })

  const wechatModalOpened = ref(false)
  const handleOpenWeChatModal = () => {
    wechatModalOpened.value = true
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
      <div class="fullwidth">
        <div class="profile" :class="{ dark: isDarkTheme }">
          <uimage class="avatar" :src="useAdminAvatar(adminInfo.data?.avatar)" />
          <div class="right">
            <h1 class="name">{{ adminInfo.data?.name || '-' }}</h1>
            <p class="slogan">{{ adminInfo.data?.slogan || '-' }}</p>
          </div>
        </div>
        <p class="description">
          <webfont bolder>{{ isZhLang ? APP_META.zh_description : APP_META.en_description }}</webfont>
        </p>
        <div class="socials">
          <ulink class="item icon-only instagram" title="Instagram" :href="VALUABLE_LINKS.INSTAGRAM">
            <i class="iconfont icon-instagram" />
          </ulink>
          <ulink class="item icon-only threads" title="Threads" :href="VALUABLE_LINKS.THREADS_FOLLOW">
            <i class="iconfont icon-threads" />
          </ulink>
          <ulink class="item with-text github" :href="VALUABLE_LINKS.GITHUB">
            <i class="iconfont icon-github" />
            <span class="text">GitHub</span>
          </ulink>
          <ulink class="item icon-only youtube" title="YouTube" :href="VALUABLE_LINKS.YOUTUBE_CHANNEL">
            <i class="iconfont icon-youtube" />
          </ulink>
          <!-- <ulink class="item icon-only twitter" :href="VALUABLE_LINKS.TWITTER">
            <i class="iconfont icon-twitter-x" />
          </ulink> -->
          <ulink class="item icon-only telegram" title="Telegram" :href="VALUABLE_LINKS.TELEGRAM">
            <i class="iconfont icon-telegram" />
          </ulink>
          <button class="item icon-only wechat" title="WeChat" @click="handleOpenWeChatModal">
            <i class="iconfont icon-wechat" />
            <client-only>
              <popup v-model:visible="wechatModalOpened" :scroll-close="false">
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
          <ulink class="item icon-only linkedin" title="LinkedIn" :href="VALUABLE_LINKS.LINKEDIN">
            <i class="iconfont icon-linkedin" />
          </ulink>
          <ulink class="item icon-only zhihu" title="知乎回答" :href="VALUABLE_LINKS.ZHIHU">
            <i class="iconfont icon-zhihu" />
          </ulink>
          <ulink class="item icon-only douban" title="豆瓣" :href="VALUABLE_LINKS.DOUBAN">
            <i class="iconfont icon-douban" />
          </ulink>
          <ulink class="item icon-only email" title="Email me" :href="emailLink">
            <i class="iconfont icon-mail" />
          </ulink>
        </div>
      </div>
      <div class="container">
        <p class="biography" v-html="isZhLang ? i18ns.biography.zh : i18ns.biography.en"></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:color';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

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
      @include mix.radius-box($radius-sm);
    }

    .text {
      font-weight: bold;
      color: var(--item-primary);
    }
  }

  .page-banner {
    $banner-height: 25rem;

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
      background-color: $module-bg;
      background-image:
        global.surl('/images/page-about/background.png'), linear-gradient($module-bg-opaque 50%, #00000000 100%);
      background-size: contain;
      background-repeat: repeat-x;
      background-blend-mode: lighten;

      .fullwidth {
        width: 100%;
        height: $banner-height;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .profile {
        $avatar-size: 5rem;
        z-index: $z-index-normal + 2;
        margin-bottom: $gap * 2;
        padding: $gap-xs $gap-lg $gap-xs $gap-xs;
        display: flex;
        align-items: center;
        @include mix.backdrop-blur(3px);
        @include mix.radius-box($avatar-size);
        border-bottom-right-radius: $radius-sm;
        border-top: 1px solid rgb(255 255 255 / 40%);
        background-color: rgb(255, 255, 255, 0.14);
        &.dark {
          background-color: rgba(0, 0, 0, 0.05);
        }

        &:hover {
          .avatar {
            transform: rotate(360deg);
          }
        }

        .avatar {
          width: $avatar-size;
          height: $avatar-size;
          box-sizing: content-box;
          border: 6px solid $module-bg;
          border-radius: 100%;
          overflow: hidden;
          margin-right: $gap-lg;
          background-color: $module-bg;
          transition: transform $motion-duration-slow;
        }

        .name {
          line-height: 1;
          margin-top: 0;
          margin-bottom: $gap;
          color: $white;
        }

        .slogan {
          line-height: 1;
          font-weight: 600;
          margin-bottom: $gap-xs;
          color: #ffffffbf;
        }
      }

      .description {
        z-index: $z-index-normal + 2;
        font-size: $font-size-h3;
        color: $white;
      }

      .socials {
        $button-size: 3.4rem;
        display: flex;
        justify-content: center;
        z-index: $z-index-normal + 2;

        .item {
          position: relative;
          height: $button-size;
          line-height: $button-size;
          margin-right: $gap;
          &:last-child {
            margin: 0;
          }

          &:hover {
            &::after {
              @include mix.visible();
            }
          }

          &::after {
            content: attr(title);
            position: absolute;
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            display: inline-block;
            text-wrap-mode: nowrap;
            font-weight: bold;
            color: $white;
            @include mix.hidden();
            @include mix.visibility-transition();
          }
        }

        .item.icon-only {
          display: inline-block;
          width: $button-size;
          text-align: center;
          border-radius: 100%;
          color: $white;
          opacity: 0.8;
          transition: all $motion-duration-fast;
          &:hover {
            opacity: 1;
          }

          .iconfont {
            font-size: $font-size-h3;
          }
        }

        .item.with-text {
          padding: 0 $gap;
          display: inline-flex;
          align-items: center;
          border-radius: $radius-lg * 3;
          color: $white;
          transition: all $motion-duration-fast;

          .iconfont {
            font-size: $font-size-h3;
          }

          .text {
            margin-left: 0.5rem;
            font-weight: bold;
          }
        }

        .item {
          &.youtube {
            background-color: $youtube-primary;
            &:hover {
              background-color: color.mix($black, $youtube-primary, 8%);
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
          &.github {
            background-color: $github-primary;
            &:hover {
              background-color: $github-primary-hover;
            }
          }
          &.twitter {
            background-color: $twitter-x-primary;
            &:hover {
              background-color: $twitter-x-primary-hover;
            }
          }
          &.wechat {
            background-color: $wechat-primary;
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
          &.zhihu {
            background-color: $zhihu-primary;
            &:hover {
              background-color: $zhihu-primary-hover;
            }
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
          &.email {
            background-color: $surmon;
          }
        }
      }

      .biography {
        margin: 0;
        padding: $gap-lg $gap-xs;
        line-height: $line-height-base * 1.9;
        text-indent: 2em;
        font-weight: 600;
        color: $color-text-secondary;

        &::first-letter {
          line-height: 1;
          font-weight: bold;
          font-size: $font-size-h2;
          color: $color-text-darker;
        }
      }
    }
  }
</style>
