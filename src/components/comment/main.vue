<template>
  <placeholder :loading="fetching" :data="hasData">
    <template #loading>
      <ul class="main-skeleton">
        <li v-for="item in isMobile ? 3 : 5" :key="item" class="item">
          <div class="gravatar">
            <skeleton-base />
          </div>
          <div class="content">
            <skeleton-paragraph :lines="4" />
          </div>
        </li>
      </ul>
    </template>
    <template #placeholder>
      <div class="list-empty">
        <i18n :lkey="LANGUAGE_KEYS.COMMENT_LIST_PLACEHOLDER" />
      </div>
    </template>
    <template #default>
      <div class="main">
        <slot name="list"></slot>
        <slot name="pagination"></slot>
      </div>
    </template>
  </placeholder>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LANGUAGE_KEYS } from '/@/language/key'

  export default defineComponent({
    name: 'CommentMain',
    props: {
      fetching: {
        type: Boolean,
        default: false
      },
      hasData: {
        type: Boolean,
        required: true
      }
    },
    setup() {
      const { isMobile } = useEnhancer()
      return {
        LANGUAGE_KEYS,
        isMobile
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .main-skeleton {
    padding: 0;

    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: $lg-gap;

      .gravatar {
        width: 5rem;
        height: 5rem;
      }

      .content {
        width: calc((100% - 5rem) * 0.9);
      }
    }
  }

  .list-empty {
    color: $text-secondary;
    font-weight: bold;
    text-align: center;
    line-height: 8rem;
  }
</style>
