<template>
  <article class="article-page" :class="{ mobile: isMobile }">
    <div ref="detail" class="detail">
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
          <span v-if="!article.origin">{{ $i18n.text.origin.original }}</span>
          <span v-else-if="article.origin === constants.OriginState.Reprint">{{
            $i18n.text.origin.reprint
          }}</span>
          <span v-else-if="article.origin === constants.OriginState.Hybrid">{{
            $i18n.text.origin.hybrid
          }}</span>
        </div>
      </transition>
      <transition name="module" mode="out-in" @after-enter="contentAnimateDone">
        <div v-if="isFetching" key="skeleton" class="skeleton">
          <client-only>
            <skeleton-line class="title" />
            <skeleton-paragraph
              class="content"
              :lines="9"
              line-height="1.2em"
            />
          </client-only>
        </div>
        <div v-else key="knowledge" class="knowledge">
          <h2 class="title">{{ article.title }}</h2>
          <div
            :id="contentElementIds.content"
            class="content"
            v-html="articleContent"
          ></div>
          <transition
            name="module"
            mode="out-in"
            @after-enter="readMoreAnimateDone"
          >
            <div v-if="isCanReadMore" key="readmore-btn" class="readmore">
              <button
                class="readmore-btn"
                :disabled="isReadMoreLoading"
                @click="readMore()"
              >
                <span>{{
                  isReadMoreLoading
                    ? $i18n.text.article.rendering
                    : $i18n.text.article.readAll
                }}</span>
                <i class="iconfont icon-next-bottom"></i>
              </button>
            </div>
            <div
              v-else-if="article.isRenderedFullContent"
              :id="contentElementIds.moreContent"
              key="more-content"
              class="content"
              v-html="articleMoreContent"
            ></div>
          </transition>
        </div>
      </transition>
    </div>
    <client-only>
      <div class="mammon">
        <transition name="module" mode="out-in">
          <skeleton-paragraph
            v-if="isFetching"
            key="skeleton"
            class="skeleton"
            line-height="1em"
            :lines="4"
          />
          <adsense-responsive
            v-else
            key="adsense"
            ins-class="mammon-ins"
          />
        </transition>
      </div>
    </client-only>
    <div class="share">
      <transition name="module" mode="out-in">
        <div v-if="isFetching" key="skeleton" class="skeleton">
          <skeleton-base
            v-for="item in (isMobile ? 3 : 10)"
            :key="item"
            :style="{
              width: `calc((100% - (1em * ${isMobile ? 2 : 9})) / ${isMobile ? 3 : 10})`
            }"
            :radius="0"
          />
        </div>
        <share-box v-else key="share" :class="{ mobile: isMobile }" />
      </transition>
    </div>
    <transition name="module" mode="out-in">
      <div v-if="isFetching" key="skeleton" class="metas">
        <skeleton-paragraph
          :align="true"
          :lines="4"
          line-height="1.2em"
        />
      </div>
      <div v-else key="metas" class="metas">
        <p v-if="isEnLang" class="item">
          <span>Article created at</span>
          <span>&nbsp;</span>
          <nuxt-link
            :title="getDateTitle(article.create_at)"
            :to="getDateLink(article.create_at)"
          >
            <span>{{ getDateTitle(article.create_at) }}</span>
          </nuxt-link>
          <span>&nbsp;in category&nbsp;</span>
          <nuxt-link
            v-for="(category, index) in article.category"
            :key="index"
            :to="`/category/${category.slug}`"
            :title="category.description || category.name"
          >
            <span>{{ category.slug }}</span>
            <span v-if="article.category.length && article.category[index + 1]">、</span>
          </nuxt-link>
          <span v-if="!article.category.length">no catgory</span>
          <span>,&nbsp;&nbsp;</span>
          <span>{{ article.meta.views || 0 }}</span>
          <span>&nbsp;Views</span>
        </p>
        <p v-else class="item">
          <span>本文于</span>
          <span>&nbsp;</span>
          <nuxt-link :title="getDateTitle(article.create_at)" :to="getDateLink(article.create_at)">
            <span>{{ getDateTitle(article.create_at) }}</span>
          </nuxt-link>
          <span>&nbsp;发布在&nbsp;</span>
          <span v-for="(category, index) in article.category" :key="index">
            <nuxt-link
              :to="`/category/${category.slug}`"
              :title="category.description || category.name"
            >
              <span>{{ category.name }}</span>
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
          <span v-for="(tag, index) in article.tag" :key="index">
            <nuxt-link :to="`/tag/${tag.slug}`" :title="tag.description || tag.name">
              <span>{{ isEnLang ? tag.slug : tag.name }}</span>
            </nuxt-link>
            <span v-if="article.tag.length && article.tag[index + 1]">、</span>
          </span>
        </p>
        <p class="item">
          <span class="title" :class="language">{{ isEnLang ? 'Article Address:' : '永久地址：' }}</span>
          <span class="site-url" @click="copyArticleUrl">{{ articleUrl }}</span>
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
      <div v-if="isFetching" key="skeleton" class="related">
        <skeleton-paragraph
          v-if="isMobile"
          class="skeleton"
          :lines="4"
          line-height="1em"
        />
        <ul v-else class="skeleton-list">
          <skeleton-base
            v-for="item in 4"
            :key="item"
            class="article"
          />
        </ul>
      </div>
      <div v-else-if="article.related && article.related.length" key="related" class="related">
        <div
          v-if="!isMobile"
          v-swiper:releted="swiperOption"
          class="article-list swiper"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(article, index) in relatedArticles"
              :key="index"
              class="swiper-slide item"
            >
              <nuxt-link
                class="item-box filter"
                :to="`/article/${article.id}`"
                :title="article.title"
              >
                <img
                  :src="getRelatedArticleThumb(article.thumb)"
                  :alt="article.title"
                  class="thumb"
                >
                <span class="title">
                  <span class="text">{{ article.title }}</span>
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <ul v-else class="article-list">
          <li
            v-for="(article, index) in relatedArticles"
            :key="index"
            class="item"
          >
            <nuxt-link
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
  import { isBrowser } from '~/environment'
  import lozad from '~/plugins/lozad'
  import marked from '~/plugins/marked'
  import { getArticleDetailPageUrl } from '~/transformers/url'
  import { getArchiveArticleThumbnailUrl } from '~/transformers/thumbnail'
  import ShareBox from '~/components/widget/share'

  export default {
    name: 'ArticleDetail',
    components: {
      ShareBox
    },
    validate({ params, store }) {
      return params.article_id && !isNaN(Number(params.article_id))
    },
    fetch({ store, params, error }) {
      return Promise.all([
        store
          .dispatch('article/fetchDetail', params)
          .catch(err => error({ statusCode: 404 })),
        store.dispatch('comment/fetchList', { post_id: params.article_id })
      ])
    },
    head() {
      return {
        title: this.article?.title || '...',
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.article?.keywords?.join(',') || this.article?.title || ''
          },
          {
            hid: 'description',
            name: 'description',
            content: this.article?.description
          }
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
        isReadMoreLoading: false,
        contentElementIds: {
          content: 'article-content',
          moreContent: 'more-article-content'
        }
      }
    },
    mounted() {
      if (isBrowser) {
        this.observeLozad(this.contentElementIds.content)
      }
    },
    computed: {
      ...mapState({
        constants: state => state.global.constants,
        language: state => state.global.language,
        tags: state => state.tag.data,
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
      articleUrl() {
        return getArticleDetailPageUrl(this.article.id)
      },
      isContentTooMore() {
        const { content } = this.article
        return content && content.length > 13688
      },
      isCanReadMore() {
        return this.isContentTooMore && !this.article.isRenderedFullContent
      },
      moreContentIndex()  {
        if (!this.isContentTooMore) {
          return null
        }
        // 坐标优先级：H4 -> H3 -> Code -> \n\n
        const shortContent = this.article.content.substring(0, 11688)
        const lastH4Index = shortContent.lastIndexOf('\n####')
        const lastH3Index = shortContent.lastIndexOf('\n###')
        const lastCodeIndex = shortContent.lastIndexOf('\n\n```')
        const lastLineIndex = shortContent.lastIndexOf('\n\n**')
        const lastReadindex = Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex)
        return lastReadindex
      },
      articleContent() {
        const { content } = this.article
        if (!content) {
          return ''
        }
        return marked(
          this.isContentTooMore
            // 渲染截断部分前半段
            ? content.substring(0, this.moreContentIndex)
            // 正常长度，正常渲染
            : content,
          this.tags,
          true
        )
      },
      articleMoreContent() {
        const { content } = this.article
        if (!content || !this.isContentTooMore) {
          return ''
        }
        return marked(
          content.substring(this.moreContentIndex, content.length),
          this.tags,
          true
        )
      },
      relatedArticles() {
        return [...this.article.related].slice(0, 10)
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
      contentAnimateDone() {
        // console.log('contentAnimateDone')
        this.observeLozad(this.contentElementIds.content)
      },
      readMoreAnimateDone() {
        // console.log('readMoreAnimateDone')
        this.observeLozad(this.contentElementIds.moreContent)
      },
      observeLozad(elementId) {
        const contentElement = this.$refs.detail.querySelector(`#${elementId}`)
        const lozadElements = contentElement && contentElement.querySelectorAll('.lozad')
        if (!lozadElements || !lozadElements.length) {
          return false
        }
        // console.log('计算出的文档:', this.$refs.detail, contentElement, lozadElements)
        const lozadObserver = lozad(lozadElements, {
          loaded: element => element.classList.add('loaded')
        })
        lozadObserver.observe()
        // console.log('重新监听 observer', lozadObserver)
      },
      copyArticleUrl() {
        if (this.article.title) {
          this.$root.$copyToClipboard(this.articleUrl)
        }
      },
      getRelatedArticleThumb(thumb) {
        return getArchiveArticleThumbnailUrl(
          thumb,
          this.$store.getters['global/isWebPImage']
        )
      },
      getDateTitle(date) {
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
      getDateLink(date) {
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
  // workaround css scoped
  .article-page {
    .share-box {
      .share-ejector {
        background-color: $body-bg;
      } 
    }
  }
</style>

<style lang="scss">
  .article-page {

    &.mobile {
      > .detail,
      > .mammon,
      > .share,
      > .metas,
      > .related {
        margin-bottom: $gap;
      }

      > .detail {
        padding: $gap $lg-gap;

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

      > .metas {
        line-height: 2.3em;

        > .item {
          margin: 0;
          padding: 0;
          border: none;

          > .title.en {
            width: auto;
            margin-right: $gap;
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
          opacity: 0.9;

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
    }

    > .detail,
    > .mammon,
    > .share,
    > .metas,
    > .related {
      margin-bottom: $lg-gap;
      background-color: $module-bg;
    }

    > .mammon {
      padding: $gap;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      .mammon-ins {
        width: 100%;
        height: 16rem;
        min-height: 16rem;
      }

      .skeleton {
        width: 100%;
      }
    }

    > .detail {
      padding: 1rem 2rem;
      position: relative;
      overflow: hidden;
      height: auto;
      transition: height $transition-time-normal;

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
        top: -11px;
        left: -29px;
        transform: rotate(-45deg);
        width: 7rem;
        height: 4rem;
        line-height: 5.8rem;
        text-align: center;
        text-transform: uppercase;
        transform-origin: center;
        color: $text-reversal;
        font-weight: bold;
        font-size: $font-size-small;

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
          margin: 1em 0 1.5em 0;
          text-align: center;
          font-weight: 700;
          font-size: $font-size-h2 * .95;
        }

        > .content {

          > .google-auto-placed {
            margin-bottom: $sm-gap;
          }

          iframe {
            width: 100%;
            margin-bottom: 1em;
            background-color: $theme-black;
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
            position: relative;
            margin: 0 auto;
            display: block;
            text-align: center;
            border-radius: $radius;
            border: $sm-gap solid $module-hover-bg;
            opacity: .9;
            cursor: pointer;

            &:hover {
              opacity: 1;
              transition: all $transition-time-normal;
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
            line-height: 1.8em;
            font-weight: 700;
            text-indent: 0;
          }

          blockquote {
            p {
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
            $code-header-height: 2.8rem;
            $code-number-width: 3rem;
            $code-row-line-height: 1.8rem;
            $code-font-size: $font-size-h6;
            display: block;
            position: relative;
            overflow: hidden;
            margin-bottom: 1em;
            padding-left: $code-number-width;
            font-size: $code-font-size;
            background-color: rgba($black, 0.8);

            &:before {
              color: $white;
              content: attr(data-lang)" CODE";
              height: $code-header-height;
              line-height: $code-header-height;
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
              top: $code-header-height;
              margin: 0;
              padding: 1rem 0;
              width: $code-number-width;
              height: calc(100% - #{$code-header-height});
              text-align: center;
              background-color: rgba($black, 0.2);

              > .code-line-number {
                padding: 0;
                position: relative;
                list-style-type: none;
                line-height: $code-row-line-height;
                font-size: $font-size-small;
                user-select: none;
                transition: none;

                &:hover {
                  &:before {
                    @include visible();
                  }
                }

                &:before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: $code-number-width;
                  width: 66em;
                  height: 100%;
                  background-color: rgba(154, 154, 154, 0.2);
                  @include hidden();
                }
              }
            }

            > code {
              margin: 0;
              padding: 1rem;
              float: left;
              width: 100%;
              height: 100%;
              display: block;
              line-height: $code-row-line-height;
              color: rgba($white, 0.87);
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
            transform: translate3d(0, $sm-gap, 0);
            background-color: $primary;
            color: $white;
          }
          50% {
            transform: translate3d(0, 0, 0);
            background-color: $module-hover-bg;
          }
          75% {
            transform: translate3d(0, $sm-gap, 0);
            background-color: $primary;
            color: $white;
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
          margin-bottom: $gap;

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
              background-color: $primary !important;
              color: $white !important;
            }

            > .iconfont {
              margin-left: $sm-gap;
            }
          }
        }
      }
    }

    > .share {
      padding: $gap;

      > .skeleton {
        display: flex;
        justify-content: space-between;
        height: 3rem;
      }

      > .share-box {
        width: 100%;
        opacity: .6;
        display: flex;
        justify-content: space-between;

        &:hover {
          opacity: 1;
        }

        > .share-ejector {
          flex-grow: 1;
          width: auto;
          height: 3rem;
          line-height: 3rem;
          margin-right: $gap;
          font-size: 17px;

          &:last-child {
            margin-right: 0;
          }
        }

        &.mobile {
          > .share-ejector {
            width: auto;
            display: none;
            flex-grow: 0;

            &[class*='wechat'],
            &[class*='weibo'],
            &[class*='twitter'] {
              display: inline-block;
              flex-grow: 1;
            }
            &[class*='twitter'] {
              margin-right: 0;
            }
          }
        }
      }
    }

    > .metas {
      padding: $gap;

      > .item {
        margin-bottom: $lg-gap;
        border-left: solid $sm-gap $body-bg;
        padding-left: $gap;
        word-break: break-all;

        &:last-child {
          margin: 0;
        }

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
      padding: $gap 0;
      border-width: 0 $gap;
      border-color: transparent;
      overflow: hidden;
      user-select: none;

      > .skeleton-list {
        padding: 0;
        margin: 0;
        height: 9rem;
        overflow: hidden;
        display: flex;

        .article {
          width: 12rem;
          margin-right: 1rem;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      > .swiper.article-list {

        > .swiper-wrapper {
          height: 9rem;
          overflow: hidden;

          &[style*="300ms"] {
            @include blur-filter('horizontal-small');
          }

          > .swiper-slide.item {
            width: auto;
            margin-right: $gap;

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
                  transform: scale(1.1);
                }

                > .title {
                  opacity: 1;
                }
              }

              > .thumb {
                width: auto;
                height: 100%;
                transform: scale(1);
                transition: transform $transition-time-normal, opacity $transition-time-fast;
              }

              > .title {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2em;
                line-height: 2em;
                background-color: $module-hover-bg-darken-10;
                opacity: 0.4;
                color: $text-reversal;
                font-size: $font-size-h6;
                transition: opacity $transition-time-fast;

                .text {
                  display: block;
                  padding: 0 0.5em;
                  text-align: center;
                  @include text-overflow();
                }
              }
            }
          }
        }
      }
    }
  }
</style>
