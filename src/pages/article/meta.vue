<template>
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
        <router-link
          :title="getDateTitle(article.create_at)"
          :to="getDateLink(article.create_at)"
        >
          <span>{{ getDateTitle(article.create_at) }}</span>
        </router-link>
        <span>&nbsp;in category&nbsp;</span>
        <router-link
          v-for="(category, index) in article.category"
          :key="index"
          :to="`/category/${category.slug}`"
          :title="category.description || category.name"
        >
          <span>{{ category.slug }}</span>
          <span v-if="article.category.length && article.category[index + 1]">、</span>
        </router-link>
        <span v-if="!article.category.length">no catgory</span>
        <span>,&nbsp;&nbsp;</span>
        <span>{{ article.meta.views || 0 }}</span>
        <span>&nbsp;Views</span>
      </p>
      <p v-else class="item">
        <span>本文于</span>
        <span>&nbsp;</span>
        <router-link :title="getDateTitle(article.create_at)" :to="getDateLink(article.create_at)">
          <span>{{ getDateTitle(article.create_at) }}</span>
        </router-link>
        <span>&nbsp;发布在&nbsp;</span>
        <span v-for="(category, index) in article.category" :key="index">
          <router-link
            :to="`/category/${category.slug}`"
            :title="category.description || category.name"
          >
            <span>{{ category.name }}</span>
          </router-link>
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
          <router-link :to="`/tag/${tag.slug}`" :title="tag.description || tag.name">
            <span>{{ isEnLang ? tag.slug : tag.name }}</span>
          </router-link>
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
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useGlobalState } from '/@/state'

  export default defineComponent({
    name: 'CategoryMeta',
    props: {
      fetching: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const globalState = useGlobalState()

      articleUrl() {
        return getArticleDetailPageUrl(this.article.id)
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


      return {
        isMobile: globalState.userAgent.isMobile
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

  .metas {
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

    &.mobile {
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
  }
</style>
