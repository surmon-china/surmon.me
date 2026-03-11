<script lang="ts" setup>
  import { reactive, shallowRef, computed, toRaw, onMounted, nextTick } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useHistoryStore } from '/@/stores/history'
  import { useAppOptionsStore } from '/@/stores/foundation'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { LocalesKey } from '/@/locales/key'
  import { APP_PROFILE } from '/@/configs/app.config'

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

  const { gtag, isZhLang } = useEnhancer()
  const appOptionsStore = useAppOptionsStore()
  const historyStore = useHistoryStore()

  const textareaRef = shallowRef<HTMLTextAreaElement | null>(null)

  const state = reactive({
    emotion: 5 as number,
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
      const response = await appOptionsStore.postFeedback(toRaw(state))
      historyStore.addFeedback(response.result)
      state.submitted = true
    } catch (error) {
      alert(error)
    } finally {
      state.submitting = false
    }
  }

  onMounted(() => {
    nextTick(() => textareaRef.value?.focus())
  })
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
          <template #zh>你认为 {{ APP_PROFILE.title }} 整体怎么样？</template>
          <template #en>How would you rate {{ APP_PROFILE.title }}?</template>
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
          ref="textareaRef"
          class="textarea"
          name="feedback"
          id="feedback"
          rows="10"
          v-model.trim="state.content"
          :disabled="state.submitting"
          :placeholder="
            isZhLang ? '你可在此畅所欲言，这将仅对博主可见' : `Share your thoughts, I'd love to hear them.`
          "
        ></textarea>
        <div class="buttons">
          <button class="item cancel" :disabled="state.submitting" @click="handleClose">
            <span class="text"><i18n zh="取消" en="Cancel" /></span>
          </button>
          <button class="item submit" :disabled="!isSubmitable || state.submitting" @click="handleSubmit">
            <i18n :k="state.submitting ? LocalesKey.SUBMITTING : LocalesKey.SUBMIT" />
          </button>
        </div>
      </div>
    </template>
    <div class="history" v-if="historyStore.feedbacks.length">
      <i18n>
        <template #zh>你已进行过 {{ historyStore.feedbacks.length }} 次反馈。</template>
        <template #en>You have {{ historyStore.feedbacks.length }} feedback history.</template>
      </i18n>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .feedback {
    width: 38rem;
    background-color: $module-bg-opaque;

    .title {
      width: 100%;
      height: 3em;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-h3;
      font-weight: bold;
      color: $color-text-secondary;
      border-bottom: 1px solid $module-bg-darker-1;
    }

    .emotions {
      margin: 0;
      list-style: none;
      display: flex;
      margin-top: 2rem;
      margin-bottom: $gap-xs;
      justify-content: space-between;

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
            margin-bottom: $gap-sm;
          }

          .text {
            font-weight: bold;
          }
        }

        .arrow {
          $size: 15px;
          position: absolute;
          bottom: -2rem;
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
      padding: $gap-lg;

      .textarea {
        width: 100%;
        height: 14rem;
        padding: 1em;
        margin-bottom: $gap-lg;
        border-radius: $radius-sm;
        background-color: $module-bg-darker-1;
        resize: none;
      }

      .buttons {
        display: flex;
        justify-content: space-between;

        .item {
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: $radius-xs;
          &[disabled] {
            opacity: 0.7;
          }

          &.cancel {
            width: 4rem;
            color: $color-text-secondary;
            &:not([disabled]):hover {
              color: $color-link;
            }
          }

          &.submit {
            width: 7rem;
            font-weight: bold;
            background-color: $module-bg-darker-2;
            &:not([disabled]):hover {
              background-color: $module-bg-darker-3;
              color: $color-link;
            }
          }
        }
      }
    }

    .submitted {
      width: 100%;
      height: 16rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .icon {
        $size: 3rem;
        width: $size;
        height: $size;
        margin-bottom: $gap-lg;
        border-radius: 100%;
        line-height: $size;
        text-align: center;
        background-color: $primary;
        font-size: $font-size-h2;
        color: $color-text-reversal;
      }

      .text {
        font-weight: bold;
      }

      .close {
        margin-top: 2rem;
        padding: 0 2em;
        line-height: 2.4;
        border-radius: $radius-xs;
        background-color: $module-bg-darker-1;
        font-weight: bold;
        &:hover {
          color: $color-link-hover;
          background-color: $module-bg-darker-2;
        }
      }
    }

    .history {
      border-top: 1px solid $module-bg-darker-1;
      height: 2.8em;
      line-height: 2.8em;
      text-align: center;
      font-size: $font-size-h6;
      color: $color-text-disabled;
    }
  }
</style>
