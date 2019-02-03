<template>
  <article id="article" class="article" :class="{ mobile: isMobile }">
    <div class="detail" ref="detail">
      <transition name="module">
        <div
          v-if="!isFetching"
          class="oirigin"
          :class="{
            self: !article.origin,
            other: article.origin === constants.OriginState.Reprint,
            hybrid: article.origin === constants.OriginState.Hybrid
          }"
        >
          <span v-if="!article.origin" v-text="$i18n.text.origin.original"></span>
          <span v-else-if="article.origin === constants.OriginState.Reprint" v-text="$i18n.text.origin.reprint"></span>
          <span v-else-if="article.origin === constants.OriginState.Hybrid" v-text="$i18n.text.origin.hybrid"></span>
        </div>
      </transition>
      <transition name="module" mode="out-in" @after-enter="contentAnimatieDone">
        <div class="skeleton" key="skeleton" v-if="isFetching">
          <no-ssr>
            <skeleton-line class="title" />
            <skeleton-paragraph class="content" :lines="9" line-height="1.2em" />
          </no-ssr>
        </div>
        <div class="knowledge" key="knowledge" v-else>
          <h2 class="title">{{ article.title }}</h2>
          <div class="content" id="article-content" v-html="articleContent"></div>
          <transition name="module" mode="out-in" @after-leave="readmoreAnimatieDone">
            <div class="readmore" v-if="isCanReadMore">
              <button class="readmore-btn" :disabled="isReadMoreLoading" @click="readMore()">
                <span>{{ isReadMoreLoading ? $i18n.text.article.rendering : $i18n.text.article.readAll }}</span>
                <i class="iconfont icon-next-bottom"></i>
              </button>
            </div>
          </transition>
        </div>
      </transition>
    </div>
    <no-ssr>
      <div class="ad">
        <transition name="module" mode="out-in">
          <skeleton-paragraph class="ad-skeleton" key="skeleton" v-if="isFetching" :lines="4" line-height="1em" />
          <adsense-article key="adsense" v-else-if="renderAd" />
        </transition>
      </div>
    </no-ssr>
    <div class="share">
      <transition name="module" mode="out-in">
        <div class="skeleton" key="skeleton" v-if="isFetching">
          <skeleton-base
            :style="{ width: `calc((100% - (1em * ${isMobile ? 2 : 9})) / ${isMobile ? 3 : 10})` }"
            :radius="0"
            :key="item"
            v-for="item in (isMobile ? 3 : 10)"
          />
        </div>
        <share-box key="share" class="article" v-else />
      </transition>
    </div>
    <transition name="module" mode="out-in">
      <div class="metas" key="skeleton" v-if="isFetching">
        <skeleton-paragraph :align="true" :lines="4" line-height="1.2em" />
      </div>
      <div class="metas" key="metas" v-else>
        <p class="item" v-if="isEnLang">
          <span>Article created at</span>
          <span>&nbsp;</span>
          <nuxt-link :title="buildDateTitle(article.create_at)" :to="buildDateLink(article.create_at)">
            <span>{{ buildDateTitle(article.create_at) }}</span>
          </nuxt-link>
          <span>&nbsp;in category&nbsp;</span>
          <nuxt-link
            :key="index"
            :to="`/category/${category.slug}`"
            :title="category.description || category.name"
            v-for="(category, index) in article.category"
          >
            <span>{{ category.name }}</span>
            <span v-if="article.category.length && article.category[index + 1]">、</span>
          </nuxt-link>
          <span v-if="!article.category.length">no catgory</span>
          <span>,&nbsp;&nbsp;</span>
          <span>{{ article.meta.views || 0 }}</span>
          <span>&nbsp;Views</span>
        </p>
        <p class="item" v-else>
          <span>本文于</span>
          <span>&nbsp;</span>
          <nuxt-link :title="buildDateTitle(article.create_at)" :to="buildDateLink(article.create_at)">
            <span>{{ buildDateTitle(article.create_at) }}</span>
          </nuxt-link>
          <span>&nbsp;发布在&nbsp;</span>
          <span :key="index" v-for="(category, index) in article.category">
            <nuxt-link :to="`/category/${category.slug}`" :title="category.description || category.name">
              <span>{{ isEnLang ? category.slug : category.name }}</span>
            </nuxt-link>
            <span v-if="article.category.length && article.category[index + 1]">、</span>
          </span>
          <span v-if="!article.category.length">未知</span>
          <span>&nbsp;分类下，当前已被围观&nbsp;</span>
          <span>{{ article.meta.views || 0 }}</span>
          <span>&nbsp;次</span>
        </p>
        <p class="item">
          <span class="title" :class="language">{{ isEnLang ? 'Related tags:' : '相关标签：' }}</span>
          <span v-if="!article.tag.length" v-text="$i18n.text.tag.empty"></span>
          <span :key="index" v-for="(tag, index) in article.tag">
            <nuxt-link :to="`/tag/${tag.slug}`" :title="tag.description || tag.name">
              <span>{{ isEnLang ? tag.slug : tag.name }}</span>
            </nuxt-link>
            <span v-if="article.tag.length && article.tag[index + 1]">、</span>
          </span>
        </p>
        <p class="item">
          <span class="title" :class="language">{{ isEnLang ? 'Article Address:' : '永久地址：' }}</span>
          <span class="site-url" @click="copyArticleUrl">
            <span>https://surmon.me/article/{{ article.id }}</span>
          </span>
        </p>
        <div class="item">
          <span class="title" :class="language">{{ isEnLang ? 'Copyright Clarify:' : '版权声明：' }}</span>
          <span v-if="!isEnLang">
            <span>自由转载-署名-非商业性使用</span>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </span>
          <a
            target="_blank"
            rel="external nofollow noopenter"
            href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
          >Creative Commons BY-NC 3.0 CN</a>
        </div>
      </div>
    </transition>
    <transition name="module" mode="out-in">
      <div class="related" key="skeleton" v-if="isFetching">
        <skeleton-paragraph class="skeleton" v-if="isMobile" :lines="4" line-height="1em" />
        <ul class="skeleton-list" v-else>
          <skeleton-base class="article" :key="item" v-for="item in 4" />
        </ul>
      </div>
      <div class="related" key="related" v-else-if="article.related && article.related.length">
        <div class="article-list swiper" v-if="!isMobile" v-swiper:swiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide item" :key="index" v-for="(article, index) in relatedArticles">
              <a
                v-if="article.ad"
                class="item-box"
                :href="article.link"
                rel="external nofollow noopener"
                target="_blank"
              >
                <img :src="article.img" class="thumb" :alt="article.title">
                <span class="title">{{ article.title }}</span>
              </a>
              <nuxt-link
                v-else
                :to="`/article/${article.id}`"
                :title="article.title"
                class="item-box"
              >
                <img
                  :src="buildThumb(article.thumb)"
                  class="thumb"
                  :alt="article.title"
                >
                <span class="title">{{ article.title }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <ul class="article-list" v-else>
          <li class="item" v-for="(article, index) in relatedArticles" :key="index">
            <a
              v-if="article.ad"
              class="item-link"
              :href="article.link"
              rel="external nofollow noopener"
              target="_blank"
            >
              <span class="sign">《</span>
              <span class="title">{{ article.title }}</span>
              <span class="sign">》</span>
              <small class="tip">- 狠狠地阅读</small>
            </a>
            <nuxt-link
              v-else
              class="item-link"
              :to="`/article/${article.id}`"
              :title="`「 ${article.title} 」- 继续阅读`"
            >
              <span class="sign">《</span>
              <span class="title">{{ article.title }}</span>
              <span class="sign">》</span>
              <small class="tip">- 继续阅读</small>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
    <div class="comment">
      <comment-box
        :fetching="isFetching"
        :post-id="routeArticleId"
        :likes="article.meta && article.meta.likes"
      />
    </div>
  </article>
</template>

<script>
  import { mapState } from 'vuex'
  import { isBrowser } from '~/environment/esm'
  import lozad from '~/plugins/lozad'
  import marked from '~/plugins/marked'
  import adConfig from '~/config/ad.config'
  import ShareBox from '~/components/widget/share'
  export default {
    name: 'article-detail',
    components: {
      ShareBox
    },
    validate({ params, store }) {
      return params.article_id && !isNaN(Number(params.article_id))
    },
    fetch({ store, params, error }) {
      return Promise.all([
        store.dispatch('article/fetchDetail', params).catch(err => {
          error({ statusCode: 404, message: '众里寻他 我已不再' })
        }),
        store.dispatch('comment/fetchList', { post_id: params.article_id })
      ])
    },
    head() {
      const { article } = this
      return {
        title: article.title || '...',
        meta: [
          {
            hid: 'keywords', 
            name: 'keywords', 
            content: (article.keywords ? article.keywords.join(',') : article.title) || ''
          },
          { hid: 'description', name: 'description', content: article.description }
        ]
      }
    },
    data() {
      return {
        swiperOption: {
          setWrapperSize: true,
          simulateTouch: false,
          mousewheel: {
            sensitivity: 1,
          },
          autoplay: {
            delay: 3500,
            disableOnInteraction: false,
          },
          observeParents: true,
          grabCursor: true,
          slidesPerView: 'auto'
        },
        lozadObserver: null,
        isReadMoreLoading: false,
        renderAd: true
      }
    },
    mounted() {
      if (isBrowser) {
        this.observeLozad()
      }
    },
    activated() {
      this.updateAd()
    },
    deactivated() {
      this.lozadObserver = null
    },
    computed: {
      ...mapState({
        constants: state => state.global.constants,
        language: state => state.global.language,
        tags: state => state.tag.data,
        imageExt: state => state.global.imageExt,
        article: state => state.article.detail.data,
        isFetching: state => state.article.detail.fetching,
        isMobile: state => state.global.isMobile,
      }),
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      routeArticleId() {
        return Number(this.$route.params.article_id)
      },
      isContentTooMore() {
        const { content } = this.article
        return content && content.length > 13688
      },
      isCanReadMore() {
        return this.isContentTooMore && !this.article.isRenderedFullContent
      },
      articleContent() {
        const { content, isRenderedFullContent } = this.article
        if (!content) {
          return ''
        }
        const hasTags = this.tags && this.tags.length

        // 正常长度，正常渲染
        if (!this.isContentTooMore || isRenderedFullContent) {
          return marked(content, hasTags ? this.tags : false, true)
        }

        // 内容过多，进行分段处理，避免渲染时间太长
        let shortContent = content.substring(0, 11688)
        const lastH4Index = shortContent.lastIndexOf('\n####')
        const lastH3Index = shortContent.lastIndexOf('\n###')
        const lastCodeIndex = shortContent.lastIndexOf('\n\n```')
        const lastLineIndex = shortContent.lastIndexOf('\n\n**')
        const lastReadindex = Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex);
        // console.log(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex, 'min', lastReadindex)
        shortContent = shortContent.substring(0, lastReadindex)
        return marked(shortContent, hasTags ? this.tags : false, true)
      },
      relatedArticles() {
        const relateds = [...this.article.related].slice(0, 10)
        const adArticle = adConfig.common.articleRelated(this.tags, this.isMobile)
        adArticle && relateds.splice(2, 0, adArticle)
        return relateds
      }
    },
    methods: {
      readMore() {
        this.isReadMoreLoading = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.$store.commit('article/updateDetailRenderedState', true)
            this.isReadMoreLoading = false
          }, 0)
        })
      },
      updateAd() {
        this.renderAd = false
        this.$nextTick(() => {
          this.renderAd = true
        })
      },
      contentAnimatieDone() {
        this.observeLozad()
      },
      readmoreAnimatieDone() {
        this.observeLozad()
      },
      observeLozad() {
        const contentElement = this.$refs.detail.querySelector('#article-content')
        const lozadElements = contentElement && contentElement.querySelectorAll('.lozad')
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        // console.log('计算出的文档:', this.$refs.detail, contentElement, lozadElements)
        this.lozadObserver = lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        this.lozadObserver.observe()
        // console.log('重新监听 observer', this.lozadObserver)
      },
      copyArticleUrl() {
        if (this.article.title) {
          this.$root.$copyToClipboard(`https://surmon.me/article/${this.article.id}`)
        }
      },
      buildThumb(thumb) {
        return thumb
          ? `${thumb}?imageView2/1/w/300/h/230/format/${this.imageExt}/interlace/1/q/80|imageslim`
          : `${this.cdnUrl}/images/thumb-releted.jpg`
      },
      buildDateTitle(date) {
        if (!date) {
          return date
        }
        date = new Date(date)
        const am = this.isEnLang ? 'AM' : '上午'
        const pm = this.isEnLang ? 'PM' : '下午'
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const meridiem = date.getHours() > 11 ? pm : am
        return `${year}/${month}/${day} ${meridiem}`
      },
      buildDateLink(date) {
        if (!date) {
          return date
        }
        date = new Date(date)
        const year = date.getFullYear()
        let month = (date.getMonth() + 1).toString()
        let day = date.getDate().toString()
        month = month.length === 1 ? `0${month}` : month
        day = day.length === 1 ? `0${day}` : day
        return `/date/${year}-${month}-${day}`
      }
    }
  }
</script>

<style lang="scss">
  .article {

    &.mobile {

      > .metas {
        line-height: 2.3em;

        > .item {
          margin: 0;
          padding: 0;
          border: none;

          > .title.en {
            width: auto;
            margin-right: 1rem;
          }
        }
      }

      > .related {
        height: auto;

        > .article-list {
          padding: 0;
          margin: 0;
          list-style: none;
          overflow: hidden;
          opacity: .9;

          > .item {

            > .item-link {
              display: flex;
              width: 100%;
              height: 2.2em;
              line-height: 2.2em;

              > .title {
                max-width: 70%;
                display: inline-block;
                @include text-overflow();
              }

              > .tip {
                display: inline-block;
              }
            }
          }
        }
      }

      > .detail {

        > .oirigin {
          font-size: $font-size-base;
        }

        > .knowledge {

          > .content {

            pre {
              padding-left: 0;

              > .code-lines {
                display: none;
              }
            }
          }
        }
      }
    }

    > .detail,
    > .ad,
    > .metas,
    > .related {
      margin-bottom: 1em;
      background-color: $module-bg;
    }

    > .ad {

      .ad-skeleton {
        padding: 1em;
      }
    }

    > .detail {
      padding: 1em 2em;
      position: relative;
      overflow: hidden;
      height: auto;
      transition: height .25s;

      > .skeleton {
        
        .title {
          width: 60%;
          height: 26px;
          margin: 2rem auto;
        }

        .content {
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
      }

      > .oirigin {
        position: absolute;
        top: -0.9rem;
        left: -2.4rem;
        transform: rotate(-45deg);
        width: 7rem;
        height: 4rem;
        line-height: 5.8rem;
        text-align: center;
        transform-origin: center;
        color: $white;
        font-weight: bold;
        font-size: $font-size-small;
        text-transform: uppercase;

        &.self {
          background-color: rgba($accent, .8);
        }

        &.other {
          background-color: rgba($red, .8);
        }

        &.hybrid {
          background-color: rgba($primary, .8);
        }
      }

      > .knowledge {

        > .title {
          text-align: center;
          margin: 1em 0 1.5em 0;
          font-weight: 700;
        }

        > .content {
          iframe {
            width: 100%;
            margin-bottom: 1em;
            background-color: black;
          }

          a {
            font-weight: bold;
            margin: 0 .1em;

            &.image-link {
              margin: 0;
            }

            &:hover {
              text-decoration: underline;
            }
          }

          img {
            max-width: 100%;
            margin: 0 auto;
            display: block;
            text-align: center;
            border-radius: $radius;
            border: .5rem solid $module-hover-bg;
            transition: all .25s;
            opacity: .9;
            cursor: pointer;

            &:hover {
              opacity: 1;
              transition: all .25s;
            }
          }

          p {
            line-height: 2.2em;
            text-indent: 2em;
            margin-bottom: 1em;

            &.text-center {
              text-align: center;
            }

            &.text-right {
              text-align: right;
            }
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 1.5rem 0;
            padding-left: 0;
            line-height: 1.8em;
            font-weight: 700;
            text-indent: 0;
          }

          blockquote {

            p {
              // text-indent: 0em;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }

          ul {
            list-style-type: square;
          }

          ul, ol {

            > li {
              line-height: 1.8em;
              padding: .5em .8em;

              &:hover {
                background-color: $module-hover-bg;
              }

              > p {
                text-indent: 0;
              }

              > ul {

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }

          code {
            color: #bd4147;
            padding: .3em .5em;
            margin: 0 .5em;
            border-radius: $radius;
            background-color: $module-hover-bg;
          }

          pre {
            $code-line-height: 2.8em;
            $code-line-width: 2.5em;
            $code-line-line-height: 1.6em;
            display: block;
            position: relative;
            overflow: hidden;
            margin-bottom: 1em;
            padding-left: $code-line-width;
            background-color: rgba(0, 0, 0, 0.8);

            &:before {
              color: white;
              content: attr(data-lang)" CODE";
              height: $code-line-height;
              line-height: $code-line-height;
              font-size: 1em;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              font-weight: 700;
              background-color: rgba(68, 68, 68, 0.9);
              display: block;
              text-transform: uppercase;
              text-align: center;
            }

            > .code-lines {
              position: absolute;
              left: 0;
              top: $code-line-height;
              margin: 0;
              padding: 1em 0;
              width: $code-line-width;
              height: calc(100% - #{$code-line-height});
              text-align: center;
              background-color: rgba(0, 0, 0, 0.2);

              > .code-line-number {
                padding: 0;
                position: relative;
                list-style-type: none;
                line-height: $code-line-line-height;
                transition: background-color .05s;

                &:hover {
                  &:before {
                    display: block;
                    opacity: 1;
                    visibility: visible;
                  }
                }

                &:before {
                  content: '';
                  height: $code-line-line-height;
                  position: absolute;
                  top: 0;
                  left: $code-line-width;
                  width: 66em;
                  background-color: rgba(154, 154, 154, 0.2);
                  display: none;
                  visibility: hidden;
                  opacity: 0;
                }
              }
            }

            > code {
              margin: 0;
              padding: 1em;
              // padding-top: $code-line-height + 1em;
              float: left;
              width: 100%;
              height: 100%;
              display: block;
              line-height: $code-line-line-height;
              color: rgba(255, 255, 255, 0.87);
              background-color: transparent;
            }
          }
        }

        @keyframes readmorebtn {
          0% { 
            transform: translate3d(0, 0, 0);
            background-color: $module-hover-bg;
          }
          25% { 
            transform: translate3d(0, .5rem, 0);
            background-color: $primary;
            color: white;
          }
          50% { 
            transform: translate3d(0, 0, 0);
            background-color: $module-hover-bg;
          }
          75% { 
            transform: translate3d(0, .5rem, 0);
            background-color: $primary;
            color: white;
          }
          100% { 
            transform: translate3d(0, 0, 0);
            background-color: $module-hover-bg;
          }
        }

        > .readmore {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: .8rem;

          > .readmore-btn {
            width: 80%;
            text-align: center;
            height: 3rem;
            line-height: 3rem;
            background-color: $module-hover-bg;
            animation: readmorebtn 4s linear infinite;

            &[disabled] {
              cursor: no-drop;
            }

            &:hover {
              background-color: $primary!important;
              color: white!important;
            }

            > .iconfont {
              margin-left: .5rem;
            }
          }
        }
      }
    }

    .share {
      padding: 1em;
      margin-bottom: 1em;
      background-color: $module-bg;

      > .skeleton {
        display: flex;
        justify-content: space-between;
        height: 3rem;
      }
    }

    > .metas {
      padding: 1em;

      > .item {
        border-left: solid .5em $body-bg;
        padding-left: 1rem;
        word-break: break-all;

        a:hover {
          text-decoration: underline;
        }

        > .title.en {
          width: 11rem;
          display: inline-block;
        }

        .site-url {
          text-decoration: underline;
          cursor: pointer;
          color: $link-color;

          &:hover {
            color: $link-hover-color;
          }
        }
      }
    }

    > .related {
      padding: 1em 0;
      border-width: 0 1em;
      border-color: transparent;
      overflow: hidden;
      height: 10em;

      > .skeleton-list {
        padding: 0;
        margin: 0;
        height: 100%;
        overflow: hidden;
        display: flex;

        .article {
          width: calc((100% - 2rem) / 4);
          margin-right: 1rem;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      > .swiper.article-list {

        > .swiper-wrapper {
          height: 8em;
          overflow: hidden;

          > .swiper-slide.item {
            width: auto;
            margin-right: 1rem;

            &:last-child {
              margin-right: 0;
            }

            > .item-box {
              display: block;
              position: relative;
              overflow: hidden;
              width: auto;
              height: 100%;
              opacity: .8;

              &:hover {

                .thumb {
                  opacity: 1;
                  @include css3-prefix(transform, scale(1.2) rotate(2deg));
                  @include css3-prefix(transition, all 1s);
                }

                > .title {
                  opacity: 1;
                }
              }

              > .thumb {
                width: auto;
                height: 100%;
                @include css3-prefix(transform, scale(1) rotate(0deg));
                @include css3-prefix(transition, all 1s);
              }

              > .title {
                position: absolute;
                bottom: 0;
                left: 0;
                width: calc(100% - 1em);
                height: 2em;
                line-height: 2em;
                background-color: $module-hover-bg-darken-10;
                padding: 0 .5em;
                color: $white;
                opacity: .4;
                font-size: .9em;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
</style>
