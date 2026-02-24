<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { UserIdentityProvider } from '/@/interfaces/user'
  import { LocalesKey } from '/@/locales'
  const { identity, theme, globalState } = useEnhancer()

  const openUserProfileModal = () => {
    globalState.toggleSwitcher('userProfileModal', true)
  }
</script>

<template>
  <div class="comment-user">
    <div class="unlogin" v-if="identity.isAnonymous">
      <button
        class="link"
        title="Sign in with Google"
        @click="identity.userLoginWith(UserIdentityProvider.Google)"
      >
        <uimage class="logo google" alt="Google" src="/images/third-party/google-g-icon.svg" />
        <i18n :k="LocalesKey.USER_SIGN_IN" />
      </button>
      <divider type="vertical" />
      <button
        class="link"
        title="Sign in with GitHub"
        @click="identity.userLoginWith(UserIdentityProvider.GitHub)"
      >
        <uimage
          class="logo github"
          alt="GitHub"
          :src="`/images/third-party/github-icon-${theme.isDark.value ? 'white' : 'black'}.svg`"
        />
        <i18n :k="LocalesKey.USER_SIGN_IN" />
      </button>
    </div>
    <div class="logined" v-else>
      <div class="username">
        <i class="icon iconfont icon-user"></i>
        <span class="text">{{ identity.profile?.name }}</span>
        <i class="arrow iconfont icon-down-arrow"></i>
      </div>
      <div class="user-menu">
        <ul class="menus" v-if="identity.isGuest">
          <li class="item">
            <button
              class="button"
              title="Sign in with GitHub"
              @click="identity.userLoginWith(UserIdentityProvider.GitHub)"
            >
              <i18n>
                <!-- prettier-ignore -->
                <template #zh>切换为 <i class="iconfont icon-github"></i> <strong>GitHub</strong> 登录</template>
                <!-- prettier-ignore -->
                <template #en>Sign in with <i class="iconfont icon-github"></i> <strong>GitHub</strong></template>
              </i18n>
            </button>
            <button
              class="button"
              title="Sign in with Google"
              @click="identity.userLoginWith(UserIdentityProvider.Google)"
            >
              <i18n>
                <!-- prettier-ignore -->
                <template #zh>切换为 <i class="iconfont icon-google"></i> <strong>Google</strong> 登录</template>
                <!-- prettier-ignore -->
                <template #en>Sign in with <i class="iconfont icon-google"></i> <strong>Google</strong></template>
              </i18n>
            </button>
          </li>
          <li class="item">
            <button class="button" title="Clean local profile" @click="identity.removeGuestProfile">
              <i18n zh="退出本地访客身份" en="Clean local profile" />
            </button>
          </li>
        </ul>
        <ul class="menus" v-else-if="identity.isUser">
          <li class="item">
            <button class="button" title="Edit profile" @click="openUserProfileModal">
              <i18n zh="管理资料" en="Edit profile" />
            </button>
          </li>
          <li class="item">
            <button class="button" title="Sign Out" @click="identity.userLogout">
              <i18n :k="LocalesKey.USER_SIGN_OUT" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $topbar-size: var(--topbar-size);

  .unlogin {
    display: flex;
    align-items: center;

    .link {
      display: flex;
      align-items: center;
      height: $topbar-size;
      line-height: $topbar-size;
      font-size: $font-size-base + 1;
      font-weight: bold;
      color: $color-text-secondary;
      &:hover {
        color: $color-link;
      }

      .logo {
        margin-right: $gap-xs;
        &.google {
          height: $font-size-base;
        }
        &.github {
          height: $font-size-base + 1;
        }
      }
    }
  }

  .logined {
    position: relative;
    display: inline-block;
    cursor: pointer;
    &:hover {
      .username {
        background-color: $module-bg-darker-2;
      }
      .user-menu {
        display: block;
      }
    }

    .username {
      padding: 0 $gap-sm;
      height: $topbar-size;
      display: flex;
      align-items: center;
      background-color: $module-bg-darker-1;
      @include mix.radius-box($radius-xs);

      .icon {
        margin-right: $gap-tiny;
      }

      .text {
        margin-right: $gap-xs;
        font-weight: bold;
        max-width: 8rem;
        @include mix.text-overflow();
      }

      .arrow {
        color: $color-text-divider;
        font-size: $font-size-tertiary;
      }
    }

    .user-menu {
      display: none;
      position: absolute;
      right: 0;
      padding-top: 0.5em;
      z-index: $z-index-normal + 1;

      .menus {
        margin: 0;
        padding: 0;
        list-style: none;
        @include mix.radius-box($radius-xs);

        .item {
          .button {
            white-space: nowrap;
            display: block;
            width: 100%;
            padding: 0 $gap-sm;
            line-height: 2.3em;
            text-align: right;
            font-size: $font-size-secondary;
            background-color: $module-bg-darker-2;
            &:hover {
              background-color: $module-bg-darker-3;
            }
          }
        }
      }
    }
  }
</style>
