<script lang="ts" setup>
  import { reactive, computed, toRaw } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useStores } from '/@/stores'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LanguageKey } from '/@/language/key'
  import { META } from '/@/config/app.config'

  enum Event {
    Close = 'close'
  }

  const emit = defineEmits<{
    (e: Event.Close): void
  }>()

  const EMOTIONS = [
    { emoji: '😠', value: 1, en: 'Terrible', zh: '差劲' },
    { emoji: '🙁', value: 2, en: 'Bad', zh: '不喜欢' },
    { emoji: '😐', value: 3, en: 'Neutral', zh: '无感' },
    { emoji: '😃', value: 4, en: 'Great', zh: '喜欢' },
    { emoji: '🥰', value: 5, en: 'Amazing', zh: '太棒了' }
  ]

  const { appOption, identity } = useStores()
  const { gtag, isZhLang } = useEnhancer()
  const state = reactive({
    emotion: null as unknown as number,
    content: '',
    submitting: false,
    submitted: false
  })

  const isSubmitable = computed(() => {
    return Number.isInteger(state.emotion) && Boolean(state.content)
  })

  const handleClose = () => emit(Event.Close)
  const handleSubmit = async () => {
    if (!isSubmitable.value) {
      return
    }

    gtag?.event('submit_feedback', {
      event_category: GAEventCategories.Widget
    })

    try {
      state.submitting = true
      const response = await appOption.postFeedback(toRaw(state))
      identity.addFeedback(response.result)
      state.submitted = true
    } catch (error) {
      alert(error)
    } finally {
      state.submitting = false
    }
  }
</script>

<template>
  <div class="feedback">
    <template v-if="state.submitted">
      <div class="submitted">
        <div class="icon">
          <i class="iconfont icon-success"></i>
        </div>
        <div class="text">
          <i18n>
            <template #zh>感谢你的反馈。</template>
            <template #en>Thank U for your feedback.</template>
          </i18n>
        </div>
        <button class="close" @click="handleClose">
          <i18n zh="关闭窗口" en="Close" />
        </button>
      </div>
    </template>
    <template v-else>
      <div class="title">
        <i18n>
          <template #zh>你认为 {{ META.title }} 整体怎么样？</template>
          <template #en>How would you rate {{ META.title }}?</template>
        </i18n>
      </div>
      <div class="emotions">
        <li class="item" :key="emotion.value" v-for="emotion in EMOTIONS">
          <label>
            <input
              class="radio"
              type="radio"
              :value="emotion.value"
              :disabled="state.submitting"
              v-model.number="state.emotion"
            />
            <div class="button" :class="{ activated: state.emotion === emotion.value }">
              <span class="emoji">{{ emotion.emoji }}</span>
              <span class="text"><i18n :zh="emotion.zh" :en="emotion.en" /></span>
            </div>
          </label>
          <transition name="module">
            <div class="arrow" v-if="state.emotion === emotion.value"></div>
          </transition>
        </li>
      </div>
      <div class="input">
        <textarea
          class="textarea"
          name="feedback"
          id="feedback"
          rows="10"
          autofocus
          v-model.trim="state.content"
          :disabled="state.submitting"
          :placeholder="isZhLang ? '你可在此畅所欲言，这将仅对博主可见' : 'Tell me about your opinion...'"
        ></textarea>
        <div class="buttons">
          <button class="item cancel" :disabled="state.submitting" @click="handleClose">
            <span class="text"><i18n zh="取消" en="Cancel" /></span>
          </button>
          <button class="item submit" :disabled="!isSubmitable || state.submitting" @click="handleSubmit">
            <i class="iconfont icon-mail-plane" />
            <span class="text">
              <i18n :k="state.submitting ? LanguageKey.SUBMITTING : LanguageKey.SUBMIT" />
            </span>
          </button>
        </div>
      </div>
    </template>
    <div class="history" v-if="identity.feedbacks.length">
      <i18n>
        <template #zh>你已进行过 {{ identity.feedbacks.length }} 次反馈。</template>
        <template #en>You have {{ identity.feedbacks.length }} feedback history.</template>
      </i18n>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .feedback {
    width: 48rem !important;
    background-color: $module-bg-lighter !important;

    .title {
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-h3;
      font-weight: bold;
      color: $text-secondary;
      border-bottom: 1px solid $module-bg-darker-1;
    }

    .emotions {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      padding: 2rem 0;
      justify-content: space-between;
      border-bottom: 1px dashed $module-bg-darker-1;

      .item {
        width: 20%;
        text-align: center;
        position: relative;

        .radio {
          display: none;
        }

        .button {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          opacity: 0.7;
          filter: grayscale(0.8);
          &.activated,
          &:hover {
            opacity: 1;
            filter: grayscale(0);
          }

          .emoji {
            $size: $font-size-h1 * 2;
            font-size: $size;
            line-height: $size;
            margin-bottom: $gap;
          }
        }

        .arrow {
          $size: 15px;
          position: absolute;
          bottom: -4rem;
          left: 50%;
          margin-bottom: -1px;
          margin-left: -$size;
          width: 0;
          height: 0;
          border-left: $size solid transparent;
          border-right: $size solid transparent;
          border-bottom: $size solid $module-bg-darker-1;
        }
      }
    }

    .input {
      padding: 2rem;

      .textarea {
        width: 100%;
        height: 18rem;
        padding: 1em;
        margin-bottom: 2rem;
        border-radius: $xs-radius;
        background-color: $module-bg-darker-1;
        resize: none;
      }

      .buttons {
        display: flex;
        justify-content: space-between;

        .item {
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: $mini-radius;
          &[disabled] {
            opacity: 0.7;
          }
          &:not([disabled]):hover {
            color: $link-hover;
          }

          &.cancel {
            width: 7rem;
            color: $text-secondary;
            &:not([disabled]):hover {
              color: $link-color;
            }
          }

          &.submit {
            width: 12rem;
            color: $text-secondary;
            background-color: $module-bg-darker-2;
            &:not([disabled]):hover {
              background-color: $module-bg-darker-3;
            }
          }

          .iconfont {
            margin-right: 1em;
          }

          .text {
            font-weight: bold;
          }
        }
      }
    }

    .submitted {
      width: 100%;
      height: 20rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .icon {
        $size: 4rem;
        width: $size;
        height: $size;
        margin-bottom: 2rem;
        border-radius: 100%;
        line-height: $size;
        text-align: center;
        background-color: $primary;
        font-size: $font-size-h3;
        color: $text-reversal;
      }

      .text {
        font-weight: bold;
      }

      .close {
        margin-top: 2rem;
        padding: 0 2em;
        line-height: 2.4em;
        border-radius: $xs-radius;
        background-color: $module-bg-darker-1;
        &:hover {
          color: $link-hover;
          background-color: $module-bg-darker-2;
        }
      }
    }

    .history {
      border-top: 1px solid $module-bg-darker-1;
      height: 2.8em;
      line-height: 2.8em;
      text-align: center;
      font-size: $font-size-small;
      color: $text-disabled;
    }
  }
</style>
