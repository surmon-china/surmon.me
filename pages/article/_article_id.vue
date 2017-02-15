<template>
  <div class="article">
    <div class="detail">
      <h2 class="title">{{ article.title || '...' }}</h2>
      <transition name="module" mode="out-in">
        <empty-box class="article-empty-box" v-if="!fetching && !article.title">
          <slot>No Result Article.</slot>
        </empty-box>
      </transition>
      <transition name="module" mode="out-in">
        <div class="content" v-html="articleContent" v-if="!fetching && article.content"></div>
      </transition>
    </div>
    <share-box class="article-share" v-if="!fetching && article.content"></share-box>
    <transition name="module" mode="out-in">
      <div class="metas" v-if="!fetching && article.title">
        <p class="item">
          <span>本文于</span>
          <span>&nbsp;</span>
          <router-link :title="buildDateTitle(article.create_time)"
                       :to="buildDateLink(article.create_time)">
            <span>{{ buildDateTitle(article.create_time) }}</span>
          </router-link>
          <span>&nbsp;发布在&nbsp;</span>
          <router-link :to="`/category/${category.slug}`"
                       :title="category.description || category.name"
                       v-for="(category, index) in article.category">
            <span>{{ category.name }}</span>
            <span v-if="article.category.length && article.category[index + 1]">、</span>
          </router-link>
          <span v-if="!article.category.length">未知</span>
          <span>&nbsp;分类下，当前已被围观&nbsp;</span>
          <span>{{ article.meta.views || 0 }}</span>
          <span>&nbsp;次</span>
        </p>
        <p class="item">
          <span>相关标签：</span>
          <span v-if="!article.tag.length">无相关标签</span>
          <router-link :to="`/tag/${tag.slug}`"
                       :title="tag.description || tag.name"
                       v-for="(tag, index) in article.tag">
            <span>{{ tag.name }}</span>
            <span v-if="article.tag.length && article.tag[index + 1]">、</span>
          </router-link>
        </p>
        <p class="item">
          <span>永久地址：</span>
          <span ref="copy_url_btn"
                class="site-url"
                :data-clipboard-text="`https://surmon.me/article/${this.article.id}`">
                <span>https://surmon.me/article/{{ article.id }}</span>
          </span>
        </p>
        <div class="item">
          <span>版权声明：</span>
          <span>本文内容可能来自互联网，若侵犯到您的利益请及时&nbsp;</span>
          <a href="mailto:surmon@foxmail.com" target="_blank">Email me</a>
          <span>&nbsp;处理</span>
        </div>
      </div>
    </transition>
    <transition name="module" mode="out-in">
      <div class="related" v-if="article.related && article.related.length">
        <ul class="article-lists">
          <li class="item" v-for="article in article.related.slice(0, 8)">
            <router-link :to="`/article/${article.id}`" :title="article.title" class="item-box">
              <img :src="buildThumb(article.thumb)" class="thumb" :alt="article.title">
              <span class="title">{{ article.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
    <div class="comment">
      <comment-hidden-box v-if="!fetching && article.title"></comment-hidden-box>
      <duoshuo-box v-if="!fetching && article.title"
                   :title="article.title"
                   :thread-key="article.id"
                   :url="`https://surmon.me/article/${article.id}`">
      </duoshuo-box>
    </div>
  </div>
</template>

<script>
  import ShareBox from '~components/layout/share'
  import Clipboard from '~plugins/clipboard'
  import Hljs from '~plugins/highlight.js'
  import marked from '~plugins/marked'
  import buildArticleRelatedTag from '~utils/article-tag-releted'

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return Hljs.highlightAuto(code).value;
    }
  });

  export default {
    name: 'article-detail',
    validate ({ params }) {
      return (!!params.article_id && !Object.is(Number(params.article_id), NaN));
    },
    fetch ({ store, params }) {
      return store.dispatch('loadArticleDetail', params)
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
    components: {
      ShareBox
    },
    mounted() {
      this.clipboard()
    },
    computed: {
      article() {
        return this.$store.state.article.detail.data.result
      },
      articleContent () {
        let content = this.article.content || ''
        if (!content) return ''
        content = marked(content)
        if (!Object.is(this.tags.code, 1)) return content
        const tags = this.tags.result.data
        const newcontent = buildArticleRelatedTag(content, tags)
        // console.log('content:', content, 'tags:', tags, 'newcontent:', newcontent)
        return newcontent
      },
      fetching() {
        return this.$store.state.article.detail.fetching
      },
      tags() {
        return this.$store.state.tag.data
      }
    },
    methods: {
      fullShareMenu() {
        window.a2a.show_full()
      },
      clipboard() {
        if (this.article.title) {
          this.clipboard = new Clipboard(this.$refs.copy_url_btn)
        }
      },
      buildThumb(thumb) {
        if (!thumb) return '/images/thumb-releted.jpg'
        return `${thumb}?imageView2/1/w/270/h/224/interlace/0/q/100`
      },
      buildDateTitle(date) {
        if (!date) return date
        let string = new Date(date).toLocaleString().toString()
        return string.substr(0, string.indexOf('午') + 1)
      },
      buildDateLink(date) {
        if (!date) return date
        let string = new Date(date).toLocaleString().toString()
        return `/date/${string.substr(0, string.indexOf(' ') + 1).replace(/\//g, '-')}`
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .article {

    > .detail,
    > .metas,
    > .related {
      margin-bottom: 1em;
      background-color: $module-bg;
    }

    > .detail {
      padding: 1em 2em;

      > .title {
        text-align: center;
        margin: 1em 0 1.5em 0;
        font-weight: 700;
      }

      > .content {

        a {
          font-weight: bold;
          margin: 0 .1em;

          &:hover {
            text-decoration: underline;
          }
        }

        img {
          max-width: 80%;
          margin: 0 auto;
          display: block;
          text-align: center;
          border-radius: $radius;
          transform: rotate(0deg);
          border: .7rem solid $module-hover-bg;
          transition: .25s border, .25s transform;

          &:hover {
            transform: rotate(1deg);
            border-color: rgba(144, 144, 144, 0.3);
            transition: .25s border, .25s transform;
          }
        }

        code {
          padding: .3em .5em;
          margin: 0 .5em;
          border-radius: $radius;
          background-color: $module-hover-bg;
        }

        p {
          line-height: 2.2em;
          text-indent: 2em;
          margin-bottom: 1em;
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
            padding: .5em 1em;

            &:hover {
              background-color: rgba(230, 230, 230, 0.7);
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
        }

        pre {
          margin-bottom: 1em;

          > code {
            margin: 0;
            padding: 1em;
            line-height: 1.6em;
            background-color: rgba(0, 0, 0, 0.8);
            position: relative;
            display: block;
            // font-size: .95em;
            color: rgba(255, 255, 255, 0.87);

            /*
            &:before {
              color: white;
              content: "CODE "attr(class);
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
            */
          }
        }
      }
    }

    .article-share {
      padding: .8em;
      margin-bottom: 1em;
      background-color: $module-bg;

      > .share-box {
        
      }
    }

    > .metas {
      padding: 1em 2em;

      > .item {

        a:hover {
          text-decoration: underline;
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
      padding: .8em;
      overflow: hidden;

      > .article-lists {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
        opacity: .9;

        > .item {
          float: left;
          margin-right: .8em;
          margin-bottom: .8em;

          &:nth-child(4),
          &:nth-child(8) {
            margin-right: 0;
          }

          &:nth-child(1n + 5) {
            margin-bottom: 0;
          }

          > .item-box {
            display: block;
            position: relative;
            overflow: hidden;
            width: 9.6em;
            height: 8em;
            opacity: .8;

            &:hover {

              .thumb {
                opacity: .9;
                @include css3-prefix(transform, scale(1.2) rotate(3deg));
                @include css3-prefix(transition, all 1s);
              }
            }

            > .thumb {
              width: 100%;
              height: 100%;
              @include css3-prefix(transform, scale(1) rotate(0deg));
              @include css3-prefix(transition, all 1s);
            }

            > .title {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2em;
              line-height: 2em;
              background-color: rgba(165, 165, 165, 0.5);
              padding: 0 .5em;
              color: white;
              opacity: .8;
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
</style>
