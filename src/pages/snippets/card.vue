<script lang="ts" setup>
  import type { ZhihuAnswerItem } from '/@/server/getters/zhihu'
  import { getZhihuAnswerDetailURL } from '/@/transforms/media'

  defineProps<{
    answer: ZhihuAnswerItem
  }>()
</script>

<template>
  <div class="answer-card">
    <h4 class="question" :title="answer.question.title">{{ answer.question.title }}</h4>
    <div class="divider"></div>
    <p class="excerpt" :title="answer.excerpt">{{ answer.excerpt }}</p>
    <div class="info">
      <div class="left">
        <span class="item"><i class="iconfont icon-like"></i> {{ answer.voteup_count }} 赞同</span>
        <span class="item"><i class="iconfont icon-comment"></i> {{ answer.comment_count }} 评论</span>
      </div>
      <div class="right">
        <span class="date"><udate to="ago" :date="answer.created_time * 1000" /></span>
        <ulink
          class="link"
          :title="answer.question.title"
          :href="getZhihuAnswerDetailURL(answer.question.id, answer.id)"
        >
          <i class="iconfont icon-zhihu-full"></i>
        </ulink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .answer-card {
    display: block;
    padding: $gap-lg;
    @include common-bg-module($motion-duration-fast);
    &:hover {
      cursor: pointer;
      .excerpt {
        color: $color-text;
      }
    }

    .question {
      margin: 0;
      line-height: 1.68;
      color: $color-link;
      font-weight: bold;
    }

    .divider {
      margin-block: $gap-lg;
      border-bottom: 1px dashed $module-bg-darker-3;
    }

    .excerpt {
      line-height: 1.72;
      color: $color-text-secondary;
      @include color-transition($motion-duration-fast);
    }

    .info {
      display: flex;
      justify-content: space-between;
      color: $color-text-disabled;
      font-size: $font-size-small;

      .left {
        .item {
          display: inline-flex;
          align-items: center;
          margin-right: $gap * 2;
          .iconfont {
            margin-right: $gap-sm;
          }
        }
      }

      .right {
        display: inline-flex;
        align-items: center;
        .link {
          display: inline-flex;
          color: $zhihu-primary;
          margin-left: $gap;
        }
      }
    }
  }
</style>
