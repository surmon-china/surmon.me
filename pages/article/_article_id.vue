<template>
  <div class="article">
    <div class="detail">
      <h3 class="title">{{ article.title || '...' }}</h3>
      <transition name="module">
        <div class="content" 
             v-html="buildArticleRelatedTag(article.content)" 
             v-if="!fetching && article.title"
             v-highlightjs></div>
      </transition>
      <transition name="module">
        <empty-box class="article-empty-box" v-if="!fetching && !article.title">
          <slot>No Result Article.</slot>
        </empty-box>
      </transition>
    </div>
    <div class="metas" v-if="!fetching && article.title">
      <p class="item">
        <span>本文于</span>
        <span>&nbsp;</span>
        <router-link :to="`/date/${new Date(article.date).toLocaleString().substr(0, 8).replace(/\//g, '-')}`" 
                     :title="new Date(article.date).toLocaleString().substr(0, 11)"
                     class="navbar-link">
          <span>{{ new Date(article.date).toLocaleString().substr(0, 11) }}</span>
        </router-link>
        <span>&nbsp;发布在&nbsp;</span>
        <router-link class="navbar-link" 
                     :to="`/category/${category.slug}`"
                     :title="category.description || category.name"
                     v-for="category in article.category">
          <span>{{ category.name }}</span>
        </router-link>
        <span>&nbsp;分类下，当前已被围观&nbsp;</span>
        <span>{{ article.meta.views || 0 }}</span>
        <span>&nbsp;次</span>
      </p>
      <p>
        <span>相关标签：</span>
        <span v-if="!article.tag.length">无相关标签</span>
        <router-link class="navbar-link" 
                     :to="`/tag/${tag.slug}`"
                     :title="tag.description || tag.name"
                     v-for="(tag, index) in article.tag">
          <span>{{ tag.name }}</span>
          <span v-if="article.tag.length && article.tag[index + 1]">、</span>
        </router-link>
      </p>
      <p>
        <span>永久地址：</span>
        <a href="" 
           ref="copy_url_btn"
           class="navbar-link"
           :data-clipboard-text="`http://surmon.me/article/${this.article.id}`"
           @click.prevent="">http://surmon.me/article/{{ article.id }}</a>
      </p>
      <div>
        <span>版权声明：</span>
        <span>本文内容可能来自互联网，若侵犯到您的利益请及时&nbsp;</span>
        <a href="mailto:surmon@foxmail.com" target="_blank">Email me</a>
        <span>&nbsp;处理</span>
      </div>
    </div>
    <div class="related" v-if="article.related && article.related.length">
      <ul class="article-lists">
        <li class="item" v-for="article in article.related.slice(0, 8)">
          <router-link :to="`/article/${article.id}`" :title="article.title" class="item-box">
            <img :src="article.thumb" class="thumb" :alt="article.title">
            <span class="title">{{ article.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="comment">
      <comment-hidden-box v-if="!fetching && article.title"></comment-hidden-box>
      <duoshuo-box v-if="!fetching && article.title"
                   :title="article.title"
                   :thread-key="article.id"
                   :url="`http://surmon.me/article/${article.id}`">
      </duoshuo-box>
    </div>
  </div>
</template>

<script>
  import Clipboard from '~plugins/clipboard'

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
    mounted() {
      this.clipboard()
    },
    computed: {
      article() {
        return this.$store.state.article.detail.data.result
      },
      fetching() {
        return this.$store.state.article.detail.fetching
      },
      tags() {
        return this.$store.state.tag.data
      }
    },
    methods: {
      clipboard() {
        if (this.article.title) {
          this.clipboard = new Clipboard(this.$refs.copy_url_btn)
        }
      },
      buildArticleRelatedTag(content) {
        if (!Object.is(this.tags.code, 1)) return content
        const tags = this.tags.result.data
        const tagNames = tags.map(t => t.name)
        const tagReg = eval(`/${tagNames.join('|')}/ig`) 
        // console.log(content, tags, tagNames, tagNames.join('|'), tagReg, '可以构造正则了')
        const $content = $(content).not('pre').not('img').not('a')
        // console.log($content)
        // Array.from(a).map(e => {
        //   const text = $(e).text()
        //   console.log($(e).text(text.replace('javascript', '<a href="">我就是javascript</a>')))
        // })
        return content.replace(tagReg, tag => {
          const slug = tags.find(t => Object.is(t.name, tag)).slug
          const command = `window.$nuxt.$router.push({ path: '/tag/${tag}' });return false`
          // console.log(tag, slug, command)
          return `<a href="/tag/${slug}" onclick="${command}">${tag}</a>`
        })
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

        img {
          max-width: 80%;
          text-align: center;
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
          margin: 1em 0;
          padding-left: 0;
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }

        blockquote {

          p {
            text-indent: 0em;
          }
        }

        pre,
        code {
          padding: 3.5em 1em 1em 1em;
          line-height: 1.6em;
          background-color: rgba(0, 0, 0, 0.8);
          position: relative;

          &:before {
            color: white;
            content: attr(lang)" CODE";
            height: 2.5em;
            line-height: 2.5em;
            font-size: 1.1em;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-weight: 700;
            background-color: rgb(68, 68, 68);
            display: block;
            text-transform: uppercase;
            text-align: center;
          }
        }
      }
    }

    > .metas {
      padding: 1em 2em;
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
            width: 9.61em;
            height: 9em;
            overflow: hidden;

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
            }

            > .title {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2em;
              line-height: 2em;
              background-color: rgba(165, 165, 165, 0.7);
              padding: 0 .5em;
              color: white;
              opacity: .8;
            }
          }
        }
      }
    }
  }
</style>
