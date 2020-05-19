<template>
  <div class="vlog-page" :class="{ mobile: isMobile }">
    <ul ref="videoList" class="video-list">
      <li
        v-for="(video, index) in videoList"
        :key="index"
        class="item"
        :title="video.title"
        @click="handlePlay(video)"
      >
        <div class="thumb">
          <div class="mask">
            <div class="button">
              <i class="iconfont icon-music-play" />
            </div>
          </div>
          <span class="length">{{ video.length }}</span>
          <div
            class="background lozad"
            :data-background-image="getThumbUrl(video.pic)"
          />
        </div>
        <h5 class="title" v-text="video.title" />
        <p
          class="description"
          style="-webkit-box-orient: vertical;"
          v-text="video.description || '-'"
        />
        <hr class="split">
        <p class="meta">
          <span class="item favorites">
            <i class="iconfont icon-like"></i>
            <span>{{ video.favorites }}</span>
          </span>
          <span class="item play">
            <i class="iconfont icon-video-play"></i>
            <span>{{ video.play }}</span>
          </span>
          <span class="item comment">
            <i class="iconfont icon-comment"></i>
            <span>{{ video.comment }}</span>
          </span>
          <span class="item created">
            <i class="iconfont icon-clock"></i>
            <span>{{ (video.created * 1000) | timeAgo(language) }}</span>
          </span>
        </p>
      </li>
    </ul>
    <div class="loadmore">
      <a
        href="https://space.bilibili.com/27940710/video"
        target="_blank"
        class="button"
        rel="external nofollow noopenter"
      >
        <span class="icon">
          <i class="iconfont icon-vlog"></i>
        </span>
        <span v-text="$i18n.text.article.loadmore"></span>
      </a>
    </div>
  </div>
</template>

<script>
  import { getFileProxyUrl } from '~/transformers/url'
  export default {
    name: 'Vlog',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.vlog + ' | '}Vlog`
      }
    },
    fetch({ store }) {
      return store.dispatch('vlog/fetchVideos')
    },
    data() {
      return {
        lozadObserver: null
      }
    },
    computed: {
      language() {
        return this.$store.state.global.language
      },
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      },
      imageExt() {
        return this.$store.state.global.imageExt
      },
      videoData() {
        return this.$store.state.vlog.video.data
      },
      videoList() {
        return this.videoData.vlist
      },
      isFetching() {
        return this.videoData.fetching
      },
      isCanLoadMore() {
        const { pages, count } = this.videoData
        return !!count && pages > 1
      }
    },
    methods: {
      getThumbUrl(url) {
        return getFileProxyUrl(`/bilibili/${url.replace('//', '')}@560w_350h.${this.imageExt}`)
      },
      handlePlay(video) {
        window.open(`https://www.bilibili.com/video/av${video.aid}`)
      }
    },
    mounted() {
      const listElement = this.$refs.videoList
      const lozadElements = listElement && listElement.querySelectorAll('.lozad')
      if (!lozadElements || !lozadElements.length) {
        return false
      }
      this.lozadObserver = window.lozad(lozadElements, {
        loaded: element => element.classList.add('loaded')
      })
      this.lozadObserver.observe()
    },
    beforeDestroy() {
      this.lozadObserver = null
    }
  }
</script>

<style lang="scss" scoped>
  .vlog-page {
    min-height: 40rem;

    &.mobile {
      min-height: auto;

      > .video-list {
        > .item {
          width: 100%;
          height: auto;
          flex-grow: 1;
          margin-right: 0;
          margin-bottom: $gap;

          > .thumb {
            height: 10rem;
          }

          > .split {
            border-color: $module-hover-bg;
          }
        }
      }
    }

    > .video-list {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style: none;
      justify-content: flex-start;

      > .item {
        display: block;
        margin-right: $lg-gap;
        margin-bottom: $lg-gap;
        width: calc((100% - #{$lg-gap * 2}) / 3);
        background-color: $module-bg;
        cursor: pointer;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg;

          .thumb {
            .background {
              transform: rotate(2deg) scale(1.1),
            }

            .mask {
              @include visible();
              .button {
                transform: scale(1);
              }
            }
          }

          > .split {
            border-color: $module-hover-bg-darken-10;
          }
        }

        &:nth-child(3n + 0) {
          margin-right: 0;
        }

        > .thumb {
          width: 100%;
          height: 13rem;
          position: relative;
          overflow: hidden;

          .background {
            width: 100%;
            height: 100%;
            background-color: $module-hover-bg-darken-10;
            background-size: cover;
            background-position: center;
            transform: rotate(0deg) scale(1);
            @include transform-transition($transition-time-normal);
          }

          .length {
            display: inline-block;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: $z-index-normal + 1;
            background-color: $module-hover-bg-darken-40;
            height: $font-size-h2;
            line-height: $font-size-h2;
            padding: 0 $sm-gap;
            opacity: 0.9;
            font-size: $font-size-small;
            @include title-shadow();
          }

          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: $z-index-normal + 1;
            @include hidden();
            @include visibility-transition();

            .button {
              width: 5rem;
              height: 5rem;
              line-height: 5rem;
              text-align: center;
              background: $module-bg-opacity-5;
              border-radius: 100%;
              color: $module-bg;
              opacity: 0.88;
              font-size: 3em;
              transform: scale(1.2);
              @include transform-transition($transition-time-normal);
            }
          }
        }

        > .title {
          padding: 0 $gap;
          margin-top: $gap;
          margin-bottom: $sm-gap;
          font-weight: bold;
          text-transform: capitalize;
          @include text-overflow();
        }

        > .description {
          padding: 0 $gap;
          margin-bottom: $sm-gap;
          line-height: 2rem;
          height: 2rem;
          font-size: $font-size-h6;
          @include text-overflow();
        }

        > .split {
          border-color: $body-bg;
          border-top-style: dashed;
          margin: 0;
        }

        > .meta {
          margin: 0;
          height: 3rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: $font-size-h6;

          > .item {
            font-weight: 400;
            color: $text-secondary;

            .iconfont {
              margin-right: $xs-gap;
            }
          }
        }
      }
    }

    > .loadmore {
      > .button {
        display: block;
        width: 100%;
        height: $block-button-height;
        line-height: $block-button-height;
        background-color: $module-bg;
        text-align: center;
        @include background-transition();

        &:hover {
          background-color: $module-hover-bg;
        }

        > .icon {
          margin-right: $gap;
        }
      }
    }
  }
</style>
