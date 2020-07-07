<template>
  <transition name="module" mode="out-in">
    <div v-if="fetching" key="skeleton" class="topbar">
      <div class="total-skeleton">
        <skeleton-line class="count-skeleton" />
        <skeleton-line class="like-skeleton" />
      </div>
      <div class="sort-skeleton">
        <skeleton-line />
      </div>
    </div>
    <div v-else key="topbar" class="topbar">
      <div class="total">
        <div class="count">
          <strong class="count">{{ total || 0 }}</strong>
          <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIST_COUNT" />
        </div>
        <span
          class="like"
          :class="{ liked: _isPageLiked }"
          @click="handleLikePage"
        >
          <i class="iconfont icon-like" />
          <strong class="count">{{ likes || 0 }}</strong>
          <template v-if="isZhLang && isMobile">赞</template>
          <template v-else>
            <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIKE" />
          </template>
        </span>
        <span class="sponsor" @click="handleSponsor">
          <i class="iconfont icon-hao" />
        </span>
      </div>
      <div class="sort">
        <span
          class="sort-btn"
          :class="{ actived: sort === SortType.Desc }"
          @click="handleSortList(SortType.Desc)"
          v-i18n="LANGUAGE_KEYS.COMMENT_PAGENATION_NEW"
        />
        <span
          class="sort-btn"
          :class="{ actived: sort === SortType.Hot }"
          @click.stop.prevent="handleSortList(SortType.Hot)"
          v-i18n="LANGUAGE_KEYS.COMMENT_PAGENATION_HOT"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { isClient } from '/@/vuniversal/env'
  import { useEnhancer } from '/@/enhancer'
  import { getNamespace, Modules } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { OptionModuleActions } from '/@/store/option'
  import { isPageLiked, likePage } from '/@/transforms/state'
  import { SortType, CommentPostType } from '/@/constants/state'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'CommentTopbar',
    props: {
      fetching: {
        type: Boolean,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      sort: {
        type: Number,
        required: true
      },
      likes: {
        type: Number,
        required: true
      },
      postId: {
        type: Number,
        required: true
      }
    },
    setup(props, context) {
      const { i18n, store, globalState, isMobile, isZhLang } = useEnhancer()
      const _isPageLiked = ref(false)
      const initPageLiked = () => {
        _isPageLiked.value = isPageLiked(props.postId)
      }

      const handleSortList = (sort) => {
        context.emit('sort', sort)
      }

      const handleLikePage = async () => {
        if (_isPageLiked.value) {
          return false
        }
        // this.$ga.event(
        //   '喜欢当页',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        try {
          await store.dispatch(
            props.postId === CommentPostType.Guestbook
              ? getNamespace(Modules.Option, OptionModuleActions.PostSiteLike)
              : getNamespace(Modules.Article, ArticleModuleActions.PostArticleLike),
            props.postId
          )
          likePage(props.postId)
        } catch (error) {
          console.warn('喜欢失败', error)
          alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_ACTION))
        }
      }

      const handleSponsor = () => {
        // this.$ga.event(
        //   '评论赞赏弹窗',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        // TODO: 可以使用 popup 组件？
        // this.isMobile
          // // ? window.utils.openImgPopup(getFileCDNUrl('/images/sponsor-mobile.png'))
          // sponsor 业务不使用 CDN
          // : window.utils.openIframePopup('/sponsor', 'sponsor')
      }

      onMounted(() => {
        initPageLiked()
      })

      return {
        SortType,
        LANGUAGE_KEYS,
        isMobile,
        isZhLang,
        _isPageLiked,
        handleSortList
      }
    }
  })
</script>

<style lang="scss">
  .topbar {
    display: flex;
    padding-bottom: $gap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $module-hover-bg;

    .count-skeleton,
    .like-skeleton,
    .sort-skeleton {
      height: 2rem;
    }
    
    .total-skeleton {
      display: flex;
      width: 70%;

      .count-skeleton {
        width: 20%;
        margin-right: 1rem;
      }

      .like-skeleton {
        width: 40%;
      }
    }

    .sort-skeleton {
      width: 20%;
    }

    > .total {
      display: flex;

      > .like,
      > .sponsor,
      > .count {
        padding: $xs-gap .5em;
        margin-right: $sm-gap;
        background-color: $module-hover-bg;
      }

      @keyframes sponsorBtnBg {
        0% {
          background: $primary-opacity-9;
        }
        50% {
          background: rgba($accent, .8);
        }
        100% {
          background: $primary-opacity-9;
        }
      }

      > .sponsor {
        margin-right: 0;
        color: $white;
        animation: sponsorBtnBg 1s infinite;
      }

      > .like {
        @include background-transition();

        > .iconfont {
          margin-right: $xs-gap / 2;
        }

        &:hover {
          background-color: $module-hover-bg-darken-20;
        }

        &.liked {
          > .iconfont {
            color: $red;
          }
        }
      }
    }

    > .sort {
      > .sort-btn {
        margin-left: $gap;

        &.actived {
          color: $link-hover-color;
          font-weight: bold;
        }
      }
    }
  }
</style>
