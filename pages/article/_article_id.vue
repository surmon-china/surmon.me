<template>
  <div class="article">
    <div class="detail">
      <h3 class="title">{{ article.data.result.title || '...' }}</h3>
      <loading-box v-if="article.fetching"></loading-box>
      <transition name="module">
        <div class="content" v-html="article.data.result.content" v-if="!article.fetching"></div>
      </transition>
    </div>
    <div class="metas">
      <transition name="module">
        <loading-box v-if="article.fetching"></loading-box>
      </transition>
      <p class="">
        <span>本文由 Surmon 发布于 </span>
        <router-link to="/date/2015-12-30" class="navbar-link">2015年-12月-30日</router-link>
        <span>，当前已被围观 1,012 次</span>
      </p>
      <p>
        <span>相关分类：</span>
        <router-link to="/" class="navbar-link">Code</router-link>
        <router-link to="/" class="navbar-link">Think</router-link>
      </p>
      <p>
        <span>相关标签：</span>
        <span v-if="!article.data.result.tags.length">无相关标签</span>
        <router-link class="navbar-link" 
                     :to="`/tag/${tag.silg}`"
                     v-for="tag in article.data.result.tags">
          <span>{{ tag.name }}</span>
        </router-link>
        <router-link to="/" class="navbar-link">Javascript</router-link>
        <router-link to="/" class="navbar-link">Vue.js</router-link>
      </p>
      <p>
        <span>永久地址：</span>
        <!-- 点击复制才对 -->
        <router-link to="/" class="navbar-link">http://surmon.me/861.html</router-link>
      </p>
<!--       <p>
        <span>原文信息：</span>
        <span>本文原文由尤雨溪发布于segmentfault，已获得转载授权</span>
      </p>
      <p>
        <span>原文链接：</span>
        <a href="https://segmentfault.com/q/1010000007247723" target="_blank">https://segmentfault.com/q/1010000007247723</a>
      </p> -->
      <div>
        <span>版权声明：</span>
        <span>本文内容来自互联网，非本站原创，若侵犯到您的利益请及时<a href="mailto:surmon@foxmail.com" target="_blank">联系我</a>删除</span>
      </div>
    </div>
    <div class="related">
      <loading-box v-if="article.fetching"></loading-box>
      <ul class="article-lists">
        <li class="item" v-for="item in 8">
          <router-link to="/article/234234234" class="item-box">
            <img src="http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/07/546841351684.jpg&h=135&w=126&q=90&zc=1" class="thumb" width="111" height="120" title="硕士学位的贬值" alt="硕士学位的贬值">
            <span class="title">硕士学位的贬值</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="comment">
      <!-- <duoshuo :data-thread-key="`article-${$route.params.article_id}`" data-title="我是文章详情"></duoshuo> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article-detail',
    validate ({ params }) {
      return (!!params.article_id && !Object.is(Number(params.article_id), NaN));
    },
    head() {
      return {
        title: 'Article'
      }
    },
    fetch ({ store, params }) {
      return Promise.all([
        store.dispatch('loadArticleDetail', params),
        // store.dispatch('loadRelatedArticles')
      ])
    },
    updated() {
      // if (!!Object.keys(this.article).length) {
      //   setTimeout(function () {
      //     const code = document.getElementsByTagName('code')
      //     if (code.length) hljs.highlightBlock(code[0])
      //   }, 500)
      // }
    },
    computed: {
      article() {
        return this.$store.state.article.detail
      }
    },
    methods: {
      getArticle() {
        // console.log('请求文章详情')
        // this.$store.commit('CLEAR_ARTICLE_DETAIL')
        // this.$store.dispatch('GET_ARTICLE_DETAIL', { id: this.$route.params.article_id })
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

        pre {}

        code {
          display: block;
          padding: 2em 2em 1.5em 2em;
          background-color: rgba(0, 0, 0, 0.8);
          position: relative;
          overflow: visible;

          &:before {
            color: white;
            content: attr(lang);
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
