<script lang="ts" setup>
  import type { ZhihuAnswerItem } from '/@/server/getters/zhihu'
  import { getZhihuAnswerDetailURL } from '/@/transforms/media'

  defineProps<{
    answer: ZhihuAnswerItem
  }>()
</script>

<template>
  <div class="answer-detail">
    <h2 class="question" :title="answer.question.title">
      <ulink class="link" :href="getZhihuAnswerDetailURL(answer.question.id, answer.id)">
        {{ answer.question.title }}
      </ulink>
    </h2>
    <div class="content" v-html="answer.content"></div>
    <div class="info">
      <div class="metas">
        <span class="item"><i class="iconfont icon-like"></i> {{ answer.voteup_count }} 赞同</span>
        <span class="item"><i class="iconfont icon-comment"></i> {{ answer.comment_count }} 评论</span>
      </div>
      <div class="right">
        <span class="date">
          回答于 <udate to="ago" :date="answer.created_time * 1000" />
          <template v-if="answer.created_time !== answer.updated_time">
            ， 最后修改于 <udate to="ago" :date="answer.updated_time * 1000" />
          </template>
        </span>
        <ulink class="link" :href="getZhihuAnswerDetailURL(answer.question.id, answer.id)">
          <i class="iconfont icon-zhihu-full"></i>
        </ulink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .answer-detail {
    display: block;
    width: auto;
    min-width: 38rem;
    max-width: 72rem;
    max-height: 80vh;
    overflow-y: auto;
    padding: $gap * 2;
    background-color: $module-bg-opaque;

    .question {
      margin-top: 0;
      line-height: 1.6;
      color: $color-link;

      .link {
        &:hover {
          text-decoration: underline;
          text-underline-position: from-font;
          text-underline-offset: 4px;
        }
      }
    }

    .content {
      font-size: $font-size-base + 1;
      line-height: 1.8;
    }

    .info {
      margin-top: $gap * 2;
      display: flex;
      justify-content: space-between;
      color: $color-text-disabled;
      font-size: $font-size-small;

      .metas {
        .item {
          margin-right: $gap * 2;

          .iconfont {
            margin-right: $gap-xs;
          }
        }
      }

      .link {
        color: $zhihu-primary;
        margin-left: $gap;
      }
    }
  }
</style>
