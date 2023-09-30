<script lang="ts" setup>
  import { computed } from 'vue'
  import { getChatGPTShareURL } from '/@/transforms/chatgpt'
  import Markdown from '/@/components/common/markdown.vue'

  const props = defineProps<{
    gptId: string
    gptResponse: string
    gptModel?: string
    gptTimestamp?: string
    hiddenAvatar?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'click-link'): void
  }>()

  const handleLinkClick = () => {
    emit('click-link')
  }

  const avatarURL = computed(() => {
    const fileName = props.gptModel?.includes('4') ? '4.0' : '3.5'
    return `/images/chatgpt/${fileName}.png`
  })
</script>

<template>
  <div class="gpt-comment" :class="{ 'hide-avatar': hiddenAvatar }">
    <div class="gpt-avatar" v-if="!hiddenAvatar">
      <ulink class="link" :href="getChatGPTShareURL(gptId)" @click="handleLinkClick">
        <uimage cdn :src="avatarURL" :alt="gptModel" draggable="false" />
      </ulink>
    </div>
    <div class="gpt-body">
      <div class="gpt-header">
        <div class="left">
          <ulink class="username" :href="getChatGPTShareURL(gptId)" @click="handleLinkClick">ChatGPT</ulink>
          <span class="model" v-if="gptModel">
            <i class="iconfont icon-cpu"></i>
            <span>{{ gptModel }}</span>
          </span>
        </div>
        <div class="right">
          <span class="created" v-if="gptTimestamp">
            <udate :date="Number(gptTimestamp) * 1000" to="ago" />
          </span>
        </div>
      </div>
      <div class="gpt-content">
        <div class="markdown">
          <markdown :markdown="props.gptResponse" :compact="true" :render-options="{ sanitize: true }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .gpt-comment {
    position: relative;
    padding-left: 2rem;
    margin-top: $lg-gap;
    &:hover {
      .gpt-body {
        background-color: $module-bg-hover;
      }
    }

    .gpt-avatar {
      display: block;
      position: absolute;
      left: 0;
      top: $gap * 2;

      .link {
        $size: 4.8rem;
        position: relative;
        display: block;
        width: $size;
        height: $size;
        border: 4px solid $module-bg-lighter;
        border-radius: $sm-radius;
        background-color: $module-bg-darker-2;

        img {
          width: 100%;
          height: 100%;
          border-radius: $xs-radius;
        }
      }
    }

    .gpt-body {
      display: block;
      width: 100%;
      height: 100%;
      padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 3);
      background-color: $module-bg-darker-1;
      border-radius: $xs-radius;
      @include background-transition();

      > .gpt-header {
        position: relative;
        display: flex;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;
        }

        .username {
          font-weight: bold;
          margin-right: $gap;
          &:hover {
            @include text-underline();
          }
        }

        .model {
          display: inline-flex;
          align-items: center;
          font-size: $font-size-small;
          color: $text-divider;

          .iconfont {
            margin-right: $xs-gap;
          }
        }

        .created {
          color: $text-divider;
          font-size: $font-size-small;
          font-weight: bold;
        }
      }

      > .gpt-content {
        padding-right: $xs-gap;
        user-select: text;

        .markdown {
          margin: $sm-gap 0;
        }
      }
    }

    &.hide-avatar {
      padding: 0;
      margin-top: $gap;

      .gpt-body {
        padding: $sm-gap $gap;
      }
    }
  }
</style>
