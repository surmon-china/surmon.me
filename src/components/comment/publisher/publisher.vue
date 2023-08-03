<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LanguageKey } from '/@/language'
  import { Author } from '/@/interfaces/comment'
  import { GAEventCategories } from '/@/constants/gtag'
  import { useIdentityStore, UserType } from '/@/stores/identity'
  import { getGravatarByHash, getDisqusAvatarByUsername, DEFAULT_AVATAR } from '/@/transforms/avatar'
  import { getAssetURL, getProxyURL, getOriginalProxyURL } from '/@/transforms/url'
  import { CommentEvents } from '../helper'

  enum PublisherEvents {
    UpdateProfile = 'update:profile'
  }

  interface Props {
    id?: string
    disabled?: boolean
    profile: Author
    total?: number
    bordered?: boolean
    defaultBlossomed?: boolean
    hiddenAvatar?: boolean
    fixedAvatar?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    total: 0,
    defaultBlossomed: true
  })

  const emit = defineEmits<{
    (e: CommentEvents.Blossom): void
    (e: PublisherEvents.UpdateProfile, profile: Author): void
  }>()

  const { i18n: _i18n, gtag, cdnDomain } = useEnhancer()
  const { user } = storeToRefs(useIdentityStore())
  const defaultAvatar = getAssetURL(cdnDomain, DEFAULT_AVATAR)
  const avatar = computed(() => {
    // local user
    if (user.value.type === UserType.Local) {
      const hash = user.value.localProfile?.email_hash
      return hash ? getProxyURL(cdnDomain, getGravatarByHash(hash)) : defaultAvatar
    }
    // disqus user
    if (user.value.type === UserType.Disqus) {
      return getOriginalProxyURL(getDisqusAvatarByUsername(user.value.disqusProfile?.username))
    }
    // temp user
    return defaultAvatar
  })

  const handleUpdateProfile = (key: keyof Author, event: any) => {
    emit(PublisherEvents.UpdateProfile, {
      ...props.profile,
      [key]: event.target.value
    })
  }

  // eslint-disable-next-line vue/no-setup-props-destructure
  const blossomed = ref(props.defaultBlossomed)
  const handleBlossom = () => {
    blossomed.value = true
    emit(CommentEvents.Blossom)
    gtag?.event('focus_publisher', {
      event_category: GAEventCategories.Comment
    })
  }
</script>

<template>
  <form
    key="publisher"
    class="publisher"
    name="comment"
    :id="id"
    :class="{
      'hidden-avatar': hiddenAvatar,
      'fixed-avatar': fixedAvatar,
      blossomed,
      bordered
    }"
  >
    <transition name="module-slow">
      <div class="profile" v-if="user.type === UserType.Null" v-show="blossomed">
        <div class="name">
          <input
            :value="profile.name"
            @input="handleUpdateProfile('name', $event)"
            required
            type="text"
            name="name"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="_i18n.t(LanguageKey.COMMENT_POST_NAME) + ' *'"
          />
        </div>
        <div class="email">
          <input
            :value="profile.email"
            @input="handleUpdateProfile('email', $event)"
            required
            type="email"
            name="email"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="_i18n.t(LanguageKey.COMMENT_POST_EMAIL) + ' *'"
          />
        </div>
        <div class="site">
          <input
            :value="profile.site"
            @input="handleUpdateProfile('site', $event)"
            type="url"
            name="url"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="_i18n.t(LanguageKey.COMMENT_POST_SITE)"
          />
        </div>
      </div>
    </transition>
    <div class="postbox">
      <div class="avatar" v-if="!hiddenAvatar">
        <uimage :alt="profile.name" :src="avatar" />
      </div>
      <transition name="module-slow">
        <div class="editor" v-if="blossomed" key="editor">
          <slot name="pen"></slot>
        </div>
        <div class="placeholder" v-else key="placeholder" @click="handleBlossom">
          <i18n zh="在下有一拙见，不知..." :en="`${total ? 'Join' : 'Start'} the discussion...`" />
        </div>
      </transition>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  $avatar-size: 4rem;

  .publisher-skeleton {
    display: flex;
    height: $avatar-size;

    .avatar {
      width: $avatar-size;
      margin-right: $gap;
    }

    .content {
      flex-grow: 1;
    }
  }

  .publisher {
    display: block;
    padding-left: 5.2rem;
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
      .site {
        flex-grow: 1;

        input {
          width: 100%;
          height: 2em;
          line-height: 2em;
          text-indent: 3px;
          background-color: $module-bg-darker-1;
          @include radius-box($mini-radius);
          @include background-transition();

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
        @include radius-box($xs-radius);

        img {
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease-out;
        }
      }

      .editor {
        flex-grow: 1;
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
        @include radius-box($xs-radius);
        background-color: $module-bg-darker-1;
        &:hover {
          background-color: $module-bg-darker-3;
        }
      }
    }

    &.blossomed {
      .postbox {
        height: auto;
        min-height: 8rem;
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
        .site {
          width: 80%;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: $gap;
        }
      }
    }

    &.fixed-avatar {
      padding-left: 0;
    }
  }
</style>
