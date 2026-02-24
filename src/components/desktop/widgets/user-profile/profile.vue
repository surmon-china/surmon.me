<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'
  import { User } from '/@/interfaces/user'
  import nodepress from '/@/services/nodepress'
  import { getMessageFromNormalError } from '/@/transforms/error'
  import { logger } from './state'

  type UserProfile = Pick<User, 'name' | 'email' | 'website' | 'avatar_url'>

  const { identity, i18n: _i18n } = useEnhancer()

  const isUpdating = ref(false)

  const createProfileState = (profile?: User): UserProfile => ({
    name: profile?.name || '',
    email: profile?.email || '',
    website: profile?.website || '',
    avatar_url: profile?.avatar_url || ''
  })

  const localProfile = reactive<UserProfile>(createProfileState(identity.userProfile!))

  const updateProfile = async () => {
    const body: UserProfile = {
      name: localProfile.name,
      email: localProfile.email,
      website: localProfile.website || null,
      avatar_url: localProfile.avatar_url || null
    }

    try {
      isUpdating.value = true
      await nodepress.patch('/account/profile', body, { token: identity.token })
      await identity.fetchUserProfile()
      // reset profile form
      Object.assign(localProfile, createProfileState(identity.userProfile!))
    } catch (error) {
      logger.failure('Update user profile failed.', error)
      alert(getMessageFromNormalError(error))
    } finally {
      isUpdating.value = false
    }
  }
</script>

<template>
  <form class="user-profile" @submit.prevent="updateProfile">
    <label class="item">
      <h5 class="title"><i18n :k="LocalesKey.COMMENT_AUTHOR_NAME" /> *</h5>
      <input
        v-model.trim="localProfile.name"
        required
        type="text"
        name="name"
        class="input"
        autocomplete="on"
        :disabled="isUpdating"
        :placeholder="_i18n.t(LocalesKey.COMMENT_AUTHOR_NAME) + ' *'"
      />
      <p class="extra">
        <i18n zh="名字将公开显示在评论区" en="Displayed publicly in comments" />
      </p>
    </label>
    <label class="item">
      <h5 class="title"><i18n :k="LocalesKey.COMMENT_AUTHOR_EMAIL" /> *</h5>
      <input
        v-model.trim="localProfile.email"
        required
        type="email"
        name="email"
        class="input"
        autocomplete="on"
        :disabled="isUpdating"
        :placeholder="_i18n.t(LocalesKey.COMMENT_AUTHOR_EMAIL) + ' *'"
      />
      <p class="extra">
        <i18n
          zh="此邮箱不作验证使用，仅用于接收回复通知"
          en="No verification required. Used only for notifications"
        />
      </p>
    </label>
    <label class="item">
      <h5 class="title"><i18n :k="LocalesKey.COMMENT_AUTHOR_WEBSITE" /></h5>
      <input
        v-model.trim="localProfile.website"
        type="url"
        name="website"
        class="input"
        autocomplete="off"
        :disabled="isUpdating"
        :placeholder="_i18n.t(LocalesKey.COMMENT_AUTHOR_WEBSITE)"
      />
    </label>
    <label class="item">
      <h5 class="title"><i18n :k="LocalesKey.COMMENT_AUTHOR_AVATAR" /></h5>
      <input
        v-model.trim="localProfile.avatar_url"
        type="url"
        name="avatar"
        class="input"
        autocomplete="off"
        :disabled="isUpdating"
        :placeholder="_i18n.t(LocalesKey.COMMENT_AUTHOR_AVATAR)"
      />
    </label>
    <button type="submit" class="submit" :disabled="isUpdating">
      <i18n :k="LocalesKey.SUBMITTING" v-if="isUpdating" />
      <i18n :k="LocalesKey.SUBMIT" v-else />
    </button>
  </form>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .user-profile {
    display: flex;
    flex-direction: column;

    .item {
      margin-bottom: $gap-lg;

      .title {
        margin-top: 0;
        margin-bottom: $gap-xs;
        text-transform: capitalize;
      }

      .input {
        width: 100%;
        height: 2.2rem;
        border: 1px solid $module-bg-darker-2;
        border-radius: $radius-xs;
        padding: $gap-tiny $gap-xs;
      }

      .extra {
        margin: 0;
        color: $color-text-disabled;
        font-size: $font-size-tertiary;
      }
    }

    .submit {
      margin-top: $gap-lg;
      width: 7rem;
      height: 2rem;
      border-radius: $radius-xs;
      background-color: $module-bg-darker-1;
      &:not([disabled]):hover {
        background-color: $module-bg-darker-2;
      }
    }
  }
</style>
