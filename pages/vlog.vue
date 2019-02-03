<template>
  <div class="videos" :class="{ mobile: isMobile }">
    <ul class="video-list" ref="videoList">
      <li
        class="item"
        :key="index"
        v-for="(video, index) in videoList"
        @click="handlePlay(video)"
      >
        <div class="thumb">
          <div class="mask">
            <div class="button">
              <i class="iconfont icon-music-play"></i>
            </div>
          </div>
          <div
            class="background lozad"
            :data-background-image="getThumbUrl(video.pic)"
            bak-style="{
              'background-image': `url(${getThumbUrl(video.pic)})`
            }"
          ></div>
        </div>
        <h3 class="title" v-text="video.title"></h3>
        <p class="description" style="-webkit-box-orient: vertical;" v-text="video.description || '-'"></p>
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
        :disabled="isFetching || !isCanLoadMore"
      >
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <span v-text="$i18n.text.article.loadmore"></span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vlog',
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
      video() {
        return this.$store.state.vlog.video.data
      },
      videoList() {
        return this.video.vlist
      },
      isFetching() {
        return this.video.fetching
      },
      isCanLoadMore() {
        const { pages, count } = this.video
        return !!count && pages > 1
      }
    },
    methods: {
      getThumbUrl(url) {
        return `${this.proxyUrl}bilibili/${url.replace('//', '')}@560w_350h.${this.imageExt}`
      },
      handlePlay(video) {
        if (this.isMobile) {
          window.open(`https://www.bilibili.com/video/av${video.aid}`)
          return
        }
        if (window.utils) {
          const music = this.$root.$music
          music && music.humanizeOperation(music.player.pause)
          window.utils.openIframePopup(`//player.bilibili.com/player.html?aid=${video.aid}&page=1`)
        }
      }
    },
    mounted() {
      const listElement = this.$refs.videoList
      const lozadElements = listElement && listElement.querySelectorAll('.lozad')
      if (!lozadElements || !lozadElements.length) {
        return false
      }
      this.lozadObserver = lozad(lozadElements, {
        loaded: element => element.classList.add('loaded')
      })
      this.lozadObserver.observe()
    },
    deactivated() {
      this.lozadObserver = null
    }
  }
</script>

<style lang="scss" scoped>
  .videos {
    min-height: 40em;

    &.mobile {
      min-height: auto;

      > .video-list {

        > .item {
          width: 100%;
          height: auto;
          float: none;
          flex-grow: 1;
          margin-right: 0;
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
        margin-right: 1rem;
        margin-bottom: 1rem;
        width: calc((100% - 2rem) / 3);
        height: 23rem;
        cursor: pointer;
        background-color: $module-bg;
        transition: transform 1s, background-color .5s;

        &:hover {
          background-color: $module-hover-bg;
          transition: transform 1s, background-color .5s;

          > .thumb {

            .mask {
              opacity: 1;
              visibility: visible;
            }

            .background {
              @include css3-prefix(transform, rotate(2deg) scale(1.1));
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
            @include css3-prefix(transform, rotate(0deg) scale(1));
            @include css3-prefix(transition, transform 1s);
          }

          .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            visibility: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9;
            background-color: $module-hover-bg-opacity-3;

            .button {
              width: 5rem;
              height: 5rem;
              line-height: 5rem;
              text-align: center;
              font-size: 3rem;
              background: $module-bg-opacity-5;
              border-radius: 100%;
            }
          }
        }

        > .title {
          @include text-overflow();
          padding: 0 1rem;
          margin: 1rem 0;
          font-weight: bold;
          text-transform: capitalize;
        }

        > .description {
          text-align: left;
          padding: 0 1rem;
          margin-bottom: 1rem;
          line-height: 2rem;
          height: 2rem;
          text-overflow: ellipsis;
          @include clamp(1);
        }

        > .split {
          border-color: $body-bg;
          margin: 0;
        }

        > .meta {
          margin: 0;
          height: 3rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 1rem;

          > .item {
            font-weight: 400;
            color: $secondary;

            .iconfont {
              margin-right: .3rem;
            }
          }
        }
      }
    }

    > .loadmore {

      > .button {
        display: block;
        width: 100%;
        height: 3.8rem;
        line-height: 3.8rem;
        text-align: center;
        background-color: $module-bg;

        &[disabled] {
          opacity: .9;
          background-color: $module-bg-opacity-5;
        }

        &:hover {
          background-color: $module-hover-bg;
        }

        > .icon {
          margin-right: 1rem;
        }
      }
    }
  }
</style>
