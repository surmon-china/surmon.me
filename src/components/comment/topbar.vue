<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="topbar-skeleton" key="skeleton">
        <div class="statistics-skeleton">
          <skeleton-line class="count-skeleton" />
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
            <i class="iconfont icon-discussion"></i>
            <i18n>
              <template #zh>
                共 <span class="count">{{ total }}</span> 条看法
                <span v-if="total">
                  <divider type="vertical" size="sm" />
                  已加载 <span class="count">{{ count }}</span>
                </span>
              </template>
              <template #en>
                <span class="count">{{ total }}</span> comments
                <span v-if="total">
                  <divider type="vertical" size="sm" />
                  loaded <span class="count">{{ count }}</span>
                </span>
              </template>
            </i18n>
          </div>
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
  import { defineComponent, PropType } from 'vue'
  import { SortType } from '/@/constants/state'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import divider from '../common/divider.vue'

  export enum Events {
    Sort = 'sort'
  }
  export default defineComponent({
    name: 'CommentTopbar',
    components: { divider },
    props: {
      postId: {
        type: Number,
        required: true
      },
      sort: {
        type: Number as PropType<SortType>,
        required: true
      },
      total: {
        type: Number,
        default: 0,
        required: false
      },
      count: {
        type: Number,
        default: 0,
        required: false
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    emits: [Events.Sort],
    setup(props, context) {
      const handleSortList = (sort: SortType) => {
        if (sort !== props.sort) {
          context.emit(Events.Sort, sort)
        }
      }

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        SortType,
        handleSortList
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';
  $topbar-size: 2em;

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
        width: 20rem;
        height: $topbar-size;
        margin-right: 1rem;
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

      .total {
        height: $topbar-size;
        line-height: $topbar-size;
        padding: 0;
        padding-right: 0.6em;
        background-color: $module-bg-darker-1;
        @include radius-box($xs-radius);

        .iconfont {
          display: inline-block;
          width: $topbar-size;
          text-align: center;
          margin-right: $xs-gap;
          background-color: $module-bg-darker-2;
          @include background-transition();
        }

        .count {
          font-weight: bold;
          margin: 0 $xs-gap;
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
