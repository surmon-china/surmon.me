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
            <strong class="count">{{ total }}</strong>
            <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIST_COUNT" />
          </div>
          <button class="like" :class="{ liked: isPageLiked }" @click="handleLikePage">
            <i class="iconfont icon-heart" />
            <strong class="count">{{ likes }}</strong>
            <i18n v-if="miniLikes" :lkey="LANGUAGE_KEYS.COMMENT_LIKE_COUNT_BRIEF" />
            <i18n v-else :lkey="LANGUAGE_KEYS.COMMENT_LIKE_COUNT" />
          </button>
          <template v-if="!hiddenSponsor">
            <button class="sponsor" @click="handleSponsor">
              <i class="iconfont icon-dollar" />
            </button>
            <client-only>
              <popup v-model:visible="isVisibleSponsor" :border="false">
                <iframe class="sponsor-modal" :src="VALUABLE_LINKS.SPONSOR" />
              </popup>
            </client-only>
          </template>
        </div>
        <div class="sort">
          <button
            class="button"
            :class="{ actived: sort === SortType.Desc }"
            @click="handleSortList(SortType.Desc)"
          >
            <i18n :lkey="LANGUAGE_KEYS.COMMENT_PAGINATION_NEW" />
          </button>
          <button
            class="button"
            :class="{ actived: sort === SortType.Hot }"
            @click="handleSortList(SortType.Hot)"
          >
            <i18n :lkey="LANGUAGE_KEYS.COMMENT_PAGINATION_HOT" />
          </button>
        </div>
      </div>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent, ref, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleDetailStore } from '/@/store/article'
  import { useMetaStore } from '/@/store/meta'
  import { SortType, CommentPostType } from '/@/constants/state'
  import { GAEventCategories } from '/@/constants/gtag'
  import { usePageLike } from '/@/transforms/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  export enum Events {
    Sort = 'sort'
  }
  export default defineComponent({
    name: 'CommentTopbar',
    props: {
      postId: {
        type: Number,
        required: true
      },
      fetching: {
        type: Boolean,
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
      total: {
        type: Number,
        default: 0,
        required: false
      },
      miniLikes: {
        type: Boolean,
        required: false
      },
      hiddenSponsor: {
        type: Boolean,
        required: false
      }
    },
    emits: [Events.Sort],
    setup(props, context) {
      const { i18n, gtag } = useEnhancer()
      const articleDetailStore = useArticleDetailStore()
      const metaStore = useMetaStore()

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
        gtag?.event('like_page', {
          event_category: GAEventCategories.Article
        })
        try {
          if (props.postId === CommentPostType.Guestbook) {
            await metaStore.postSiteLike()
          } else {
            await articleDetailStore.postArticleLike(props.postId)
          }
          likePage()
        } catch (error) {
          const message = i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_ACTION)
          console.warn(message, error)
          alert(message)
        }
      }

      const handleSponsor = () => {
        isVisibleSponsor.value = true
        gtag?.event('page_sponsor', {
          event_category: GAEventCategories.Article
        })
      }

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        SortType,
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
  @import 'src/styles/init.scss';
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
    border-bottom: 1px solid $module-bg-darker-1;
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
        padding: 0 0.6em;
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
        color: $white;
        background-color: $surmon;
        opacity: 0.8;
        &:hover {
          opacity: 1;
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
