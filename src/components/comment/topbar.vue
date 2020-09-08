<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="topbar-skeleton" key="skeleton">
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
      <div class="topbar" key="element">
        <div class="statistics">
          <div class="total">
            <strong class="count">{{ total || 0 }}</strong>
            <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIST_COUNT" />
          </div>
          <button
            class="like"
            :class="{ liked: isPageLiked }"
            @click="handleLikePage"
          >
            <i class="iconfont icon-like" />
            <strong class="count">{{ likes || 0 }}</strong>
            <template v-if="isZhLang && isMobile">赞</template>
            <template v-else>
              <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIKE_COUNT" />
            </template>
          </button>
          <desktop-only>
            <button class="sponsor" @click="handleSponsor">
              <i class="iconfont icon-hao" />
            </button>
            <popup v-model:visible="isVisibleSponsor" :border="false">
              <iframe class="sponsor-modal" :src="VALUABLE_LINKS.SPONSOR" />
            </popup>
          </desktop-only>
        </div>
        <div class="sort">
          <button
            class="button"
            :class="{ actived: sort === SortType.Desc }"
            @click="handleSortList(SortType.Desc)"
            v-i18n="LANGUAGE_KEYS.COMMENT_PAGINATION_NEW"
          />
          <button
            class="button"
            :class="{ actived: sort === SortType.Hot }"
            @click="handleSortList(SortType.Hot)"
            v-i18n="LANGUAGE_KEYS.COMMENT_PAGINATION_HOT"
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
  import { SortType, CommentPostType } from '/@/constants/state'
  import { GAEventTags, GAEventActions } from '/@/constants/gtag'
  import { usePageLike } from '/@/transforms/state'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { VALUABLE_LINKS } from '/@/config/app.config'

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
        type: Number
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
      const { i18n, store, gtag, isMobile, isZhLang } = useEnhancer()
      const { isLiked: isPageLiked, like: likePage } = usePageLike(props.postId)
      const isVisibleSponsor = ref(false)

      const handleSortList = (sort: SortType) => {
        if (sort !== props.sort) {
          context.emit(Events.Sort, sort)
        }
      }

      const handleLikePage = async () => {
        if (isPageLiked.value) {
          return false
        }
        gtag?.event('喜欢当页', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.Comment
        })
        try {
          await store.dispatch(
            props.postId === CommentPostType.Guestbook
              ? getNamespace(Modules.Option, OptionModuleActions.PostSiteLike)
              : getNamespace(Modules.Article, ArticleModuleActions.PostArticleLike),
            props.postId
          )
          likePage()
        } catch (error) {
          const message = i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_ACTION)
          console.warn(message, error)
          alert(message)
        }
      }

      const handleSponsor = () => {
        isVisibleSponsor.value = true
        gtag?.event('评论赞赏弹窗', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.Comment
        })
      }

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        SortType,
        isMobile,
        isZhLang,
        isVisibleSponsor,
        isPageLiked,
        handleSponsor,
        handleLikePage,
        handleSortList
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';
  $topbar-size: 2em;

  .sponsor-modal {
    width: 600px;
    height: 200px;
    border-radius: $sm-radius !important;
  }

  .topbar,
  .topbar-skeleton {
    display: flex;
    padding-bottom: $gap;
    margin-bottom: $lg-gap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed $module-bg-darker-1;
  }

  .topbar-skeleton {
    .statistics-skeleton {
      display: flex;
      width: 70%;

      .count-skeleton {
        width: 20%;
        height: $topbar-size;
        margin-right: 1rem;
      }
      .like-skeleton {
        height: $topbar-size;
        width: 40%;
      }
    }

    .sort-skeleton {
      width: 20%;
      height: $topbar-size;
    }
  }

  .topbar {
    .statistics {
      display: flex;

      .like,
      .sponsor,
      .total {
        height: $topbar-size;
        line-height: $topbar-size;
        padding: 0 .6em;
        margin-right: $sm-gap;
        background-color: $module-bg-darker-1;
        @include radius-box($mini-radius);

        .count {
          margin-right: $xs-gap;
        }
      }

      .like {
        padding-left: 0;
        @include background-transition();

        .iconfont {
          display: inline-block;
          width: $topbar-size;
          text-align: center;
          margin-right: $sm-gap;
          background-color: $module-bg-darker-2;
          @include background-transition();
        }

        &:hover {
          background-color: $module-bg-hover;
          .iconfont {
            background-color: $module-bg-darker-3;
          }
        }

        &.liked {
          cursor: no-drop;
          .iconfont {
            color: $red;
          }
        }
      }

      .sponsor {
        color: $text-reversal;
        background-color: $primary-lighter;
        @include background-transition();
        &:hover {
          background-color: $primary;
        }
      }
    }

    .sort {
      .button {
        margin-left: $gap;

        &.actived {
          color: $link-color-hover;
          font-weight: bold;
        }
      }
    }
  }
</style>
