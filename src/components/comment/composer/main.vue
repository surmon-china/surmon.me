<script lang="ts" setup>
  import { shallowRef, watchEffect, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { APP_CONFIG } from '/@/configs/app.config'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { IdentityProfile } from '/@/stores/identity'
  import { getGravatarByEmail } from '/@/transforms/avatar'
  import { getAssetURL, getOriginalProxyURL } from '/@/transforms/url'
  import { LocalesKey } from '/@/locales'
  import ComposerEditor from './editor.vue'

  const expanded = defineModel<boolean>('expanded', {
    default: false
  })

  const profile = defineModel<IdentityProfile>('profile', {
    required: true
  })

  const editorContent = defineModel<string>('content', {
    required: false,
    default: ''
  })

  const editorPreview = defineModel<boolean>('preview', {
    required: false,
    default: false
  })

  const props = defineProps<{
    posting?: boolean
    disabled?: boolean
    bordered?: boolean
    hasComments?: boolean
    hiddenAvatar?: boolean
    fixedAvatar?: boolean
    editorAutoFocus?: boolean
    hiddenEditorTools?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'submit', content: string): void
  }>()

  const { identity, gtag, cdnDomain, isCNUser, i18n: _i18n } = useEnhancer()
  const formRef = shallowRef<HTMLFormElement>()

  const handleExpand = () => {
    expanded.value = true
    gtag?.event('focus_composer', {
      event_category: GAEventCategories.Comment
    })
  }

  const handleSubmit = () => {
    if (formRef.value) {
      if (formRef.value.checkValidity()) {
        emit('submit', editorContent.value.trim())
      } else {
        formRef.value.reportValidity()
      }
    }
  }

  const defaultAvatar = getAssetURL(cdnDomain, APP_CONFIG.default_comment_avatar)
  const avatarUrl = shallowRef<string>(defaultAvatar)

  onMounted(() => {
    watchEffect(async (onInvalidate) => {
      let cancelled = false
      onInvalidate(() => (cancelled = true))

      const userAvatar = identity.userProfile?.avatar_url
      const guestEmail = identity.guestProfile?.email

      if (userAvatar) {
        avatarUrl.value = isCNUser ? getOriginalProxyURL(userAvatar) : userAvatar
        return
      }

      if (guestEmail) {
        const guestAvatar = await getGravatarByEmail(guestEmail)
        if (!cancelled) {
          avatarUrl.value = isCNUser ? getOriginalProxyURL(guestAvatar) : guestAvatar
          return
        }
      }

      avatarUrl.value = defaultAvatar
    })
  })
</script>

<template>
  <form
    class="comment-composer"
    name="comment"
    ref="formRef"
    :class="{
      'hidden-avatar': hiddenAvatar,
      'fixed-avatar': fixedAvatar,
      expanded,
      bordered
    }"
    @submit.prevent="handleSubmit"
  >
    <transition name="module-slow">
      <div class="profile" v-if="identity.isAnonymous" v-show="expanded">
        <div class="name">
          <input
            v-model.trim="profile.name"
            required
            type="text"
            name="name"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="_i18n.t(LocalesKey.COMMENT_AUTHOR_NAME) + ' *'"
          />
        </div>
        <div class="email">
          <input
            v-model.trim="profile.email"
            required
            type="email"
            name="email"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="_i18n.t(LocalesKey.COMMENT_AUTHOR_EMAIL) + ' *'"
          />
        </div>
        <div class="website">
          <input
            v-model.trim="profile.website"
            type="url"
            name="url"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="_i18n.t(LocalesKey.COMMENT_AUTHOR_WEBSITE)"
          />
        </div>
      </div>
    </transition>
    <div class="postbox">
      <div class="avatar" v-if="!hiddenAvatar">
        <uimage :alt="profile.name" :src="avatarUrl" />
      </div>
      <transition name="module-slow">
        <composer-editor
          v-if="expanded"
          key="editor"
          v-model="editorContent"
          v-model:preview="editorPreview"
          :disabled="disabled"
          :bordered="bordered"
          :auto-focus="editorAutoFocus"
          :hidden-tools="hiddenEditorTools"
        >
          <template #toolbar-right-extra>
            <button class="submit" type="submit" :disabled="disabled || !editorContent.length">
              <i18n zh="发布中..." en="Posting..." v-if="posting" />
              <i18n v-else-if="identity.isGuest || identity.isUser">
                <template #zh>以 {{ identity.profile?.name }} 的身份发布</template>
                <template #en>Post as {{ identity.profile?.name }}</template>
              </i18n>
              <i18n zh="发布" en="Publish" v-else />
            </button>
          </template>
        </composer-editor>
        <div class="placeholder" @click="handleExpand" key="placeholder" v-else>
          <i18n zh="在下有一拙见，不知..." :en="`${hasComments ? 'Join' : 'Start'} the discussion...`" />
        </div>
      </transition>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $avatar-size: 3rem;

  .comment-composer {
    display: block;
    padding-left: 4rem;
    &.bordered {
      input {
        border: 1px solid $module-bg-darker-3;
      }
    }

    .profile {
      width: 100%;
      height: 2em;
      line-height: 2em;
      display: flex;
      margin-bottom: $gap;

      .name,
      .email,
      .website {
        flex-grow: 1;

        input {
          width: 100%;
          height: 2em;
          line-height: 2em;
          text-indent: 3px;
          background-color: $module-bg-darker-1;
          @include mix.radius-box($radius-tiny);
          @include mix.background-transition();

          &:focus,
          &:hover {
            background-color: $module-bg-hover;
          }
        }
      }

      .name,
      .email {
        margin-right: $gap;
      }
    }

    .postbox {
      width: 100%;
      height: $avatar-size;
      display: flex;
      position: relative;

      .avatar {
        position: absolute;
        top: 0;
        left: -($avatar-size + $gap);
        display: block;
        width: $avatar-size;
        height: $avatar-size;
        background-color: $module-bg-darker-1;
        @include mix.radius-box($radius-xs);

        img {
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease-out;
        }
      }

      .editor-wrapper {
        flex-grow: 1;
      }

      .submit {
        min-width: 6rem;
        height: 100%;
        padding: 0 $gap-sm;
        font-weight: bold;
        font-size: $font-size-tertiary;
        color: $color-text-disabled;
        background-color: $module-bg-darker-3;
        @include mix.background-transition();
        &:not([disabled]):hover {
          color: $color-text-secondary;
          background-color: $module-bg-darker-4;
        }
      }

      .placeholder {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0 1em;
        display: flex;
        align-items: center;
        font-size: $font-size-h4;
        cursor: text;
        @include mix.radius-box($radius-xs);
        background-color: $module-bg-darker-1;
        &:hover {
          background-color: $module-bg-darker-3;
        }
      }
    }

    &.expanded {
      .postbox {
        height: auto;
        min-height: 6rem;
      }
    }

    &.hidden-avatar {
      padding-left: 0;

      .profile {
        padding: 0;
        margin: 0;
        height: auto;
        flex-direction: column;

        .name,
        .email,
        .website {
          width: 80%;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: $gap-sm;
        }
      }
    }

    &.fixed-avatar {
      padding-left: 0;
    }
  }
</style>
