<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { UserIdentityProvider } from '/@/interfaces/user'
  import { LocalesKey } from '/@/locales'
  import { useEnhancer } from '/@/app/enhancer'
  import { getMessageFromNormalError } from '/@/transforms/error'
  import nodepress from '/@/services/nodepress'
  import { openOAuthPopup } from '/@/utils/oauth'
  import { logger } from './state'

  const isProcessing = ref(false)

  const { identity, i18n: _i18n } = useEnhancer()

  const identityList = computed(() => {
    const ids = identity.userProfile?.identities ?? []
    const googleInfo = ids.find((id) => id.provider === UserIdentityProvider.Google)
    const gitHubInfo = ids.find((id) => id.provider === UserIdentityProvider.GitHub)

    return [
      {
        title: 'Google',
        icon: 'icon-google',
        provider: UserIdentityProvider.Google,
        linked: !!googleInfo,
        displayId: googleInfo?.email || googleInfo?.display_name
      },
      {
        title: 'GitHub',
        icon: 'icon-github',
        provider: UserIdentityProvider.GitHub,
        linked: !!gitHubInfo,
        displayId: gitHubInfo?.username || gitHubInfo?.display_name
      }
    ]
  })

  const link = async (provider: UserIdentityProvider) => {
    let pendingError: string | null = null
    openOAuthPopup({
      provider,
      nodepressApi: `/account/auth/${provider}/link`,
      nodepressToken: identity.token,
      async onSuccess(message) {
        if (message.type === 'link') {
          identity.fetchUserProfile()
        }
      },
      onError(message) {
        pendingError = message.error
      },
      onClose() {
        if (pendingError) {
          alert(pendingError || `Link '${provider}' failed!`)
        }
      }
    })
  }

  const unlink = async (provider: UserIdentityProvider) => {
    if (identity.userProfile && identity.userProfile.identities.length <= 1) {
      alert(_i18n.t(LocalesKey.USER_IDENTITY_UNLINK_LAST_PROVIDER_FORBIDDEN))
      return
    }

    if (!window.confirm(_i18n.t(LocalesKey.USER_IDENTITY_UNLINK_CONFIRM))) {
      return
    }

    try {
      isProcessing.value = true
      await nodepress.delete(`/account/identities/${provider}`, { token: identity.token })
      await identity.fetchUserProfile()
    } catch (error) {
      logger.failure('Unlink user identity failed.', error)
      alert(getMessageFromNormalError(error))
    } finally {
      isProcessing.value = false
    }
  }
</script>

<template>
  <div class="user-connections">
    <div class="item" :key="item.provider" v-for="item in identityList">
      <h5 class="title">
        <i class="iconfont" :class="item.icon"></i>
        <span class="provider">{{ item.title }}</span>
      </h5>
      <div class="info">
        <div v-if="item.linked">
          <p><i18n zh="已绑定：" en="Linked: " />{{ item.displayId }}</p>
          <button class="unlink-btn" :disabled="isProcessing" @click="unlink(item.provider)">
            <i18n :k="LocalesKey.USER_IDENTITY_UNLINK" />
          </button>
        </div>
        <button class="link-btn" :disabled="isProcessing" @click="link(item.provider)" v-else>
          <i18n :k="LocalesKey.USER_IDENTITY_LINK" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .user-connections {
    display: flex;
    flex-direction: column;

    .item {
      margin-bottom: 3rem;

      .title {
        font-size: $font-size-base + 1;
        margin-top: 0;

        .provider {
          font-weight: bold;
          margin-left: $gap-xs;
        }
      }

      .unlink-btn {
        color: $red;
      }

      .link-btn {
        &:hover {
          color: $color-link-hover;
        }
      }
    }
  }
</style>
