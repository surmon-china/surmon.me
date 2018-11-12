<template>
  <div class="article" :class="{ mobile: mobileLayout }">
    <div class="detail">
      <div class="oirigin"
            v-if="!fetching && article.title"
            :class="{
              self: !article.origin,
              other: article.origin === constants.ORIGIN_STATE.reprint,
              hybrid: article.origin === constants.ORIGIN_STATE.hybrid
            }">
        <span
          v-if="!article.origin"
          v-text="$i18n.text.origin.original">原创</span>
        <span
          v-else-if="article.origin === constants.ORIGIN_STATE.reprint"
          v-text="$i18n.text.origin.reprint">转载</span>
        <span
          v-else-if="article.origin === constants.ORIGIN_STATE.hybrid"
          v-text="$i18n.text.origin.hybrid">混撰</span>
      </div>
      <h2 class="title">{{ article.title || '...' }}</h2>
      <transition name="module" mode="out-in">
        <template v-if="!fetching">
          <empty-box class="article-empty-box" v-if="!article.content">
            <slot v-text="$i18n.text.article.empty"></slot>
          </empty-box>
          <div class="content" v-else v-html="articleContent"></div>
        </template>
      </transition>
      <transition name="module" mode="out-in">
        <div class="readmore" v-if="canReadMore">
          <button class="readmore-btn" :disabled="readMoreLoading" @click="readMore()">
            <span>{{ readMoreLoading ? $i18n.text.article.rendering : $i18n.text.article.readAll }}</span>
            <i class="iconfont icon-next-bottom"></i>
          </button>
        </div>
      </transition>
    </div>
    <transition name="module" mode="out-in">
      <div class="ad" v-if="renderAd">
        <adsense-article></adsense-article>
      </div>
    </transition>
    <share-box class="article-share"></share-box>
    <div class="metas">
      <p class="item" v-if="languageIsEn">
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
          v-for="(category, index) in article.category">
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
            <span>{{ $i18n.nav[category.slug] }}</span>
          </nuxt-link>
          <span v-if="article.category.length && article.category[index + 1]">、</span>
        </span>
        <span v-if="!article.category.length">未知</span>
        <span>&nbsp;分类下，当前已被围观&nbsp;</span>
        <span>{{ article.meta.views || 0 }}</span>
        <span>&nbsp;次</span>
      </p>
      <p class="item">
        <span class="title" :class="language">{{ languageIsEn ? 'Related tags:' : '相关标签：' }}</span>
        <span v-if="!article.tag.length" v-text="$i18n.text.tag.empty">无相关标签</span>
        <span :key="index" v-for="(tag, index) in article.tag">
          <nuxt-link :to="`/tag/${tag.slug}`" :title="tag.description || tag.name">
            <span>{{ tag.name }}</span>
          </nuxt-link>
          <span v-if="article.tag.length && article.tag[index + 1]">、</span>
        </span>
      </p>
      <p class="item">
        <span class="title" :class="language">{{ languageIsEn ? 'Article Address:' : '永久地址：' }}</span>
        <span class="site-url" @click="copyArticleUrl">
          <span>https://surmon.me/article/{{ article.id }}</span>
        </span>
      </p>
      <div class="item">
        <span class="title" :class="language">{{ languageIsEn ? 'Copyright Clarify:' : '版权声明：' }}</span>
        <span v-if="!languageIsEn">
          <span>自由转载-署名-非商业性使用</span>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </span>
        <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
            target="_blank"
            rel="external nofollow noopenter">Creative Commons BY-NC 3.0 CN</a>
      </div>
    </div>
    <transition name="module" mode="out-in">
      <template v-if="article.related && article.related.length">
        <div class="related" v-if="!mobileLayout">
          <div class="article-list swiper" v-swiper:swiper="swiperOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide item" v-for="(article, index) in articleRelateds" :key="index">
                <a v-if="article.ad" class="item-box" :href="article.link" rel="external nofollow noopener" target="_blank">
                  <img :src="article.img" class="thumb" :alt="article.title">
                  <span class="title">{{ article.title }}</span>
                </a>
                <nuxt-link v-else :to="`/article/${article.id}`" :title="article.title" class="item-box">
                  <img :src="buildThumb(article.thumb)" class="thumb" :alt="article.title">
                  <span class="title">{{ article.title }}</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="related" v-else>
          <ul class="article-list">
            <li class="item" v-for="(article, index) in articleRelateds" :key="index">
              <a v-if="article.ad" class="item-link" :href="article.link" rel="external nofollow noopener" target="_blank">
                <span class="sign">《</span>
                <span class="title">{{ article.title }}</span>
                <span class="sign">》</span>
                <small class="tip">- 狠狠地阅读</small>
              </a>
              <nuxt-link v-else class="item-link" :to="`/article/${article.id}`" :title="`「 ${article.title} 」- 继续阅读`">
                <span class="sign">《</span>
                <span class="title">{{ article.title }}</span>
                <span class="sign">》</span>
                <small class="tip">- 继续阅读</small>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </template>
    </transition>
    <div class="comment">
      <comment-box :post-id="article.id" :likes="article.meta.likes" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import adConfig from '~/ad.config'
  import marked from '~/plugins/marked'
  import ShareBox from '~/components/layout/share'
  export default {
    name: 'article-detail',
    components: {
      ShareBox
    },
    validate({ params, store }) {
      return params.article_id && !isNaN(Number(params.article_id))
    },
    fetch({ store, params, error }) {
      return store.dispatch('loadArticleDetail', params).catch(err => {
        error({ statusCode: 404, message: '众里寻他 我已不再' })
      })
    },
    head() {
      const article = this.article
      return {
        title: article.title || 'No Result Data.',
        meta: [
          { hid: 'keywords', 
            name: 'keywords', 
            content: (article.keywords ? article.keywords.join(',') : article.title) || ''
          },
          { hid: 'description', name: 'description', content: article.description }
        ]
      }
    },
    mounted() {
      this.updateAd()
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
        canReadMore: false,
        fullContentEd: false,
        readMoreLoading: false,
        renderAd: true
      }
    },
    computed: {
      ...mapState({
        constants: state => state.option.constants,
        language: state => state.option.language,
        tags: state => state.tag.data,
        imgExt: state => state.option.imgExt,
        article: state => state.article.detail.data,
        fetching: state => state.article.detail.fetching,
        mobileLayout: state => state.option.mobileLayout,
      }),
      languageIsEn() {
        return this.$store.getters['option/langIsEn']
      },
      articleContent() {
        const content = this.article.content
        if (!content) {
          return ''
        }
        const hasTags = this.tags.data && this.tags.data.length
        if (content.length > 13688 && !this.fullContentEd) {
          this.canReadMore = true
          let shortContent = content.substring(0, 11688)
          const lastH4Index = shortContent.lastIndexOf('\n####')
          const lastH3Index = shortContent.lastIndexOf('\n###')
          const lastCodeIndex = shortContent.lastIndexOf('\n\n```')
          const lastLineIndex = shortContent.lastIndexOf('\n\n**')
          const lastReadindex = Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex);
          // console.log(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex, 'min', lastReadindex)
          shortContent = shortContent.substring(0, lastReadindex)
          return marked(shortContent, hasTags ? this.tags.data : false, true)
        } else {
          this.canReadMore = false
          return marked(content, hasTags ? this.tags.data : false, true)
        }
      },
      articleRelateds() {
        const relateds = [...this.article.related].slice(0, 10)
        const adArticle = adConfig.common.articleRelated(this.tags.data, this.mobileLayout)
        adArticle && relateds.splice(2, 0, adArticle)
        return relateds
      }
    },
    methods: {
      readMore() {
        this.readMoreLoading = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.fullContentEd = true
          }, 0)
        })
      },
      updateAd() {
        this.renderAd = false
        this.$nextTick(() => {
          this.renderAd = true
        })
      },
      copyArticleUrl() {
        if (this.article.title) {
          // console.log('要复制了', `https://surmon.me/article/${this.article.id}`, this.$root.$copyToClipboard)
          this.$root.$copyToClipboard(`https://surmon.me/article/${this.article.id}`)
        }
      },
      buildThumb(thumb) {
        if (!thumb) return `${this.cdnUrl}/images/thumb-releted.jpg`
        return `${thumb}?imageView2/1/w/300/h/230/format/${this.imgExt}/interlace/1/q/80|imageslim`
      },
      buildDateTitle(date) {
        if (!date) {
          return date
        }
        date = new Date(date)
        const am = this.languageIsEn ? 'AM' : '上午'
        const pm = this.languageIsEn ? 'PM' : '下午'
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

    > .detail,
    > .ad,
    > .metas,
    > .related {
      margin-bottom: 1em;
      background-color: $module-bg;
    }

    > .detail {
      padding: 1em 2em;
      position: relative;
      overflow: hidden;

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

      > .title {
        text-align: center;
        margin: 1em 0 1.5em 0;
        font-weight: 700;
      }

      > .article-empty-box {
        min-height: 16rem;
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
          display: block;
          position: relative;
          overflow: hidden;
          margin-bottom: 1em;
          padding-left: 2.5em;
          background-color: rgba(0, 0, 0, 0.8);

          &:before {
            color: white;
            content: attr(data-lang)" CODE";
            height: 2.8em;
            line-height: 2.8em;
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
            top: 2.8em;
            margin: 0;
            padding: 1em 0;
            width: 2.5em;
            height: calc(100% - 2.8em);
            text-align: center;
            background-color: rgba(0, 0, 0, 0.2);

            > .code-line-number {
              padding: 0;
              position: relative;
              list-style-type: none;
              line-height: 1.6em;
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
                height: 1.6em;
                position: absolute;
                top: 0;
                left: 2.5em;
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
            float: left;
            width: 100%;
            height: 100%;
            display: block;
            line-height: 1.6em;
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

    .article-share {
      padding: 1em;
      margin-bottom: 1em;
      background-color: $module-bg;
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
