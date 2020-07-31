<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="topbar">
        <div class="statistics-skeleton">
          <skeleton-line class="count-skeleton" />
          <skeleton-line class="like-skeleton" />
        </div>
        <div class="sort-skeleton">
          <skeleton-line />
        </div>
      </div>
    </template>
    <template #default>
      <div class="topbar">
        <div class="statistics">
          <div class="total">
            <strong class="count">{{ total || 0 }}</strong>
            <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIST_COUNT" />
          </div>
          <button
            class="like"
            :class="{ liked: _isPageLiked }"
            @click="handleLikePage"
          >
            <i class="iconfont icon-like" />
            <strong class="count">{{ likes || 0 }}</strong>
            <template v-if="isZhLang && isMobile">赞</template>
            <template v-else>
              <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIKE_COUNT" />
            </template>
          </button>
          <button class="sponsor" @click="handleSponsor">
            <i class="iconfont icon-hao" />
          </button>
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
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, PropType } from 'vue'
  import { isClient } from '/@/vuniversal/env'
  import { useEnhancer } from '/@/enhancer'
  import { getNamespace, Modules } from '/@/store'
  import { ArticleModuleActions } from '/@/store/article'
  import { OptionModuleActions } from '/@/store/option'
  import { isPageLiked, getPagesLike, likePage } from '/@/transforms/state'
  import { SortType, CommentPostType } from '/@/constants/state'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export enum Events {
    Sort = 'sort'
  }

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
        type: Number as PropType<SortType>,
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
    emits: [
      Events.Sort
    ],
    setup(props, context) {
      const { i18n, store, isMobile, isZhLang } = useEnhancer()
      const _isPageLiked = isPageLiked(props.postId)

      const handleSortList = (sort: SortType) => {
        if (sort !== props.sort) {
          context.emit(Events.Sort, sort)
        }
      }

      const handleLikePage = () => {
        if (_isPageLiked.value) {
          return false
        }
        // this.$ga.event(
        //   '喜欢当页',
        //   GAEventActions.Click,
        //   GAEventTags.Comment
        // )
        store.dispatch(
          props.postId === CommentPostType.Guestbook
            ? getNamespace(Modules.Option, OptionModuleActions.PostSiteLike)
            : getNamespace(Modules.Article, ArticleModuleActions.PostArticleLike),
          props.postId
        ).then(() => {
          likePage(props.postId)
        }).catch(error => {
          const message = i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_ACTION)
          console.warn(message, error)
          alert(message)
        })
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

      return {
        SortType,
        LANGUAGE_KEYS,
        isMobile,
        isZhLang,
        _isPageLiked,
        handleSponsor,
        handleLikePage,
        handleSortList
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

  .topbar {
    display: flex;
    padding-bottom: $gap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $module-bg-hover;

    .count-skeleton,
    .like-skeleton,
    .sort-skeleton {
      height: 2rem;
    }

    .statistics-skeleton {
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

    > .statistics {
      display: flex;

      > .like,
      > .sponsor,
      > .total {
        padding: $xs-gap .5em;
        margin-right: $sm-gap;
        background-color: $module-bg-hover;

        .count {
          margin-right: $xs-gap;
        }
      }

      > .like {
        @include background-transition();

        > .iconfont {
          margin-right: $xs-gap;
        }

        &:hover {
          background-color: $module-bg-darker-6;
        }

        &.liked {
          > .iconfont {
            color: $red;
          }
        }
      }

      @keyframes sponsorBtnBg {
        0% { background: $primary; }
        50% { background: $accent; }
        100% { background: $primary; }
      }

      > .sponsor {
        margin-right: 0;
        color: $white;
        opacity: .8;
        animation: sponsorBtnBg 1s infinite;
      }
    }

    > .sort {
      > .sort-btn {
        margin-left: $gap;

        &.actived {
          color: $link-color-hover;
          font-weight: bold;
        }
      }
    }
  }
</style>
