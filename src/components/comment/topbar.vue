<template>
  <transition name="module" mode="out-in">
    <div v-if="fetching" key="skeleton" class="tools">
      <div class="total-skeleton">
        <skeleton-line class="count-skeleton" />
        <skeleton-line class="like-skeleton" />
      </div>
      <div class="sort-skeleton">
        <skeleton-line />
      </div>
    </div>
    <div v-else key="tools" class="tools">
      <div class="total">
        <div class="count">
          <strong class="count">{{ comment.pagination.total || 0 }}</strong>
          <span>{{ $i18n.text.comment.count }}</span>
        </div>
        <a href class="like" :class="{ liked: isLikedPage }" @click.stop.prevent="likePage">
          <i class="iconfont icon-like" />
          <strong>{{ likes || 0 }}</strong>
          <span>{{ (isMobile && !isEnLang) ? '赞' : $i18n.text.comment.like }}</span>
        </a>
        <a href class="sponsor" @click.stop.prevent="handleSponsor">
          <i class="iconfont icon-hao" />
        </a>
      </div>
      <div class="sort">
        <a
          href
          class="sort-btn"
          :class="{ actived: sortMode === constants.SortType.Desc }"
          @click.stop.prevent="sortComemnts(constants.SortType.Desc)"
        >{{ $i18n.text.comment.new }}</a>
        <a
          href
          class="sort-btn"
          :class="{ actived: sortMode === constants.SortType.Hot }"
          @click.stop.prevent="sortComemnts(constants.SortType.Hot)"
        >{{ $i18n.text.comment.hot }}</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .tools {
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
