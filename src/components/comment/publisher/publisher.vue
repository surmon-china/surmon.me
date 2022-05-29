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
            :placeholder="t(LanguageKey.COMMENT_POST_NAME) + ' *'"
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
            :placeholder="t(LanguageKey.COMMENT_POST_EMAIL) + ' *'"
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
            :placeholder="t(LanguageKey.COMMENT_POST_SITE)"
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

<script lang="ts">
  import { storeToRefs } from 'pinia'
  import { defineComponent, ref, computed, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { Author } from '/@/stores/comment'
  import { useIdentityStore, UserType } from '/@/stores/identity'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LanguageKey } from '/@/language'
  import {
    getGravatarByHash,
    getDefaultAvatar,
    getDisqusAvatarByUsername
  } from '/@/transforms/avatar'
  import { firstUpperCase } from '/@/transforms/text'
  import { CommentEvents } from '../helper'

  export enum PublisherEvents {
    UpdateProfile = 'update:profile'
  }

  export default defineComponent({
    name: 'CommentPublisher',
    props: {
      id: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      profile: {
        type: Object as PropType<Author>,
        required: true
      },
      total: {
        type: Number,
        default: 0,
        required: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      defaultBlossomed: {
        type: Boolean,
        default: true
      },
      hiddenAvatar: {
        type: Boolean,
        required: false
      },
      fixedAvatar: {
        type: Boolean,
        required: false
      }
    },
    emits: [CommentEvents.Blossom, PublisherEvents.UpdateProfile],
    setup(props, context) {
      const { i18n, gtag } = useEnhancer()
      const { user } = storeToRefs(useIdentityStore())
      const avatar = computed(() => {
        // local user
        if (user.value.type === UserType.Local) {
          return getGravatarByHash(user.value.localProfile?.email_hash)
        }
        // disqus user
        if (user.value.type === UserType.Disqus) {
          return getDisqusAvatarByUsername(user.value.disqusProfile?.username)
        }
        // temp user
        return getDefaultAvatar()
      })

      const handleUpdateProfile = (key: keyof Author, event: any) => {
        context.emit(PublisherEvents.UpdateProfile, {
          ...props.profile,
          [key]: event.target.value
        })
      }

      const blossomed = ref(props.defaultBlossomed)
      const handleBlossom = () => {
        blossomed.value = true
        context.emit(CommentEvents.Blossom)
        gtag?.event('focus_publisher', {
          event_category: GAEventCategories.Comment
        })
      }

      return {
        user,
        avatar,
        blossomed,
        UserType,
        LanguageKey,
        t: i18n.t,
        firstUpperCase,
        handleUpdateProfile,
        handleBlossom
      }
    }
  })
</script>

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
        overflow: hidden;
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
