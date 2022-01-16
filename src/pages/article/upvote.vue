<template>
  <div class="upvote">
    <div class="wrapper">
      <button
        class="button like"
        :class="{ liked: isLiked, animating }"
        :disabled="isLiked"
        @click="handleLike"
      >
        <i class="icon iconfont icon-like"></i>
        <span class="text">
          <i18n>
            <template #zh>真棒！{{ likes }}</template>
            <template #en>{{ isLiked ? 'Upvoted' : 'Upvote' }} {{ likes }}</template>
          </i18n>
        </span>
        <span class="parkinson-mask">
          <i class="iconfont" :class="animating ? 'icon-like' : 'icon-like-pre'"></i>
        </span>
        <div class="parkinson-likes">+ 1</div>
      </button>
      <button v-if="!hiddenSponsor" class="button sponsor" @click="handleSponsor">
        <i class="icon iconfont icon-heart"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { LANGUAGE_KEYS } from '/@/language/key'

  enum ArticleUpvoteEvents {
    Like = 'like',
    Sponsor = 'sponsor'
  }

  export default defineComponent({
    name: 'ArticleUpvote',
    props: {
      likes: {
        type: Number,
        required: true
      },
      isLiked: {
        type: Boolean,
        required: true
      },
      hiddenSponsor: {
        type: Boolean,
        default: false
      }
    },
    emits: [ArticleUpvoteEvents.Like, ArticleUpvoteEvents.Sponsor],
    setup(props, context) {
      const handleSponsor = () => {
        context.emit(ArticleUpvoteEvents.Sponsor)
      }

      const animating = ref(false)
      const handleLike = () => {
        if (!props.isLiked) {
          context.emit(ArticleUpvoteEvents.Like)
        }
      }

      watch(
        () => props.isLiked,
        (isLiked) => {
          if (isLiked) {
            animating.value = true
          }
        }
      )

      return {
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        handleLike,
        handleSponsor,
        animating
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/init.scss';

  .upvote {
    display: flex;
    justify-content: center;
    $button-size: 3rem;
    $button-radius: $sm-radius;
    $like-icon-size: $font-size-h2;
    /* https://github.com/ant-design/ant-design/blob/master/components/style/themes/variable.less#L121 */
    $lighter-color: mix($white, $red, 10%);

    .wrapper {
      position: relative;

      .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: $button-size;
        line-height: $button-size;
        padding: 0 $gap;
        border-width: 1px 0;
        border-color: $lighter-color;
        color: $lighter-color;
        transition: background-color $transition-time-fast, color $transition-time-fast;
        &[disabled] {
          color: $white;
          background-color: mix($black, $red, 10%);
          &:not(.animating) {
            opacity: 0.8;
          }
        }
        &:first-of-type {
          border-left-width: 1px;
          border-top-left-radius: $button-radius;
          border-bottom-left-radius: $button-radius;
        }
        &:last-of-type {
          border-right-width: 1px;
          border-top-right-radius: $button-radius;
          border-bottom-right-radius: $button-radius;
        }
        & + button {
          border-left-width: 1px;
        }

        &.sponsor {
          font-size: $font-size-h4;
          &:hover {
            color: $white;
            background-color: $lighter-color;
          }
        }

        &.like {
          min-width: 8rem;
          .icon {
            font-size: $like-icon-size;
          }
          .text {
            margin-left: $sm-gap;
            font-weight: bold;
          }
        }
      }

      .button.like {
        .parkinson-mask {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          line-height: $button-size;
          padding: 0 $gap;
          border-radius: $button-radius;
          font-size: $like-icon-size + 1;
          background-color: $red;
          color: $white;
          @include hidden();
        }

        .parkinson-likes {
          position: absolute;
          bottom: 0;
          left: 10%;
          color: $red;
          font-size: 100px;
          font-weight: bold;
          transition: all $transition-time-normal;
          @include hidden();
        }

        &:not([disabled]):hover,
        &.animating {
          /* parkinson animate */
          .parkinson-mask {
            transition: opacity $transition-time-normal, visibility $transition-time-normal;
            transition-delay: $transition-time-fast;
            @include visible();
            @keyframes pre-like-icon {
              0% {
                transform: rotate(6deg) translateY(-2px) translateX(-40%);
              }
              20% {
                transform: rotate(8deg) translateY(0px) translateX(-43%);
              }
              40% {
                transform: rotate(8deg) translateY(-3px) translateX(-48%);
              }
              60% {
                transform: rotate(6deg) translateY(0px) translateX(-43%);
              }
              80% {
                transform: rotate(10deg) translateY(2px) translateX(-50%);
              }
              100% {
                transform: rotate(6deg) translateY(-2px) translateX(-42%);
              }
            }
            .iconfont {
              transition: transform $transition-time-normal, margin $transition-time-normal;
              transition-delay: $transition-time-normal * 2;
              transform: rotate(6deg) translateY(-2px) translateX(-50%);
              animation: pre-like-icon 0.2s infinite;
              animation-delay: $transition-time-normal * 3;
              margin-left: 50%;
            }
          }

          /* liked animate */
          &.animating {
            .parkinson-mask {
              transition-delay: 1s;
              @include hidden();
              /* icon animate */
              @keyframes liked-icon {
                0% {
                  transform: rotate(0deg) translateX(-50%);
                }
                40% {
                  transform: rotate(-5deg) translateX(-50%) translateY(-10%);
                }
                50% {
                  transform: rotate(-8deg) translateX(-50%) translateY(-66%) scale(1.6);
                }
                70%,
                80% {
                  transform: rotate(0deg) translateX(-50%) translateY(-66%) scale(1.3);
                  margin-left: 50%;
                }
                85% {
                  transform: rotate(0deg) translateX(-50%) translateY(0);
                  margin-left: 50%;
                }
                100% {
                  transform: rotate(0deg) translateX(0%);
                  margin-left: 0;
                }
              }
              .iconfont {
                text-stroke: 1px $red;
                -webkit-text-stroke: 1px $red;
                transform-origin: left center;
                transform: rotate(0deg) translateX(-50%);
                animation: liked-icon 1s forwards;
              }
            }
            /* likes animate */
            @keyframes likes-count {
              0% {
                opacity: 0;
                transform: scale(1);
              }
              20% {
                @include visible();
                bottom: 100px;
                transform: scale(1);
              }
              100% {
                opacity: 0;
                bottom: 120px;
                transform: scale(0.8);
              }
            }
            .parkinson-likes {
              animation: likes-count 0.5s forwards;
              animation-delay: 0.5s;
            }
          }
        }
      }
    }
  }
</style>
