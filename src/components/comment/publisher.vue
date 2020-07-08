<template>
  <form id="publisher" class="publisher" name="comment">
    <!-- profile editor -->
    <transition name="module" mode="out-in">
      <div v-if="!cached || editing" key="edit" class="user">
        <div class="name">
          <input
            v-model="userProfile.name"
            required
            type="text"
            name="name"
            autocomplete="on"
            :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_NAME) + ' *'"
          >
        </div>
        <div class="email">
          <input
            v-model="userProfile.email"
            required
            type="email"
            name="email"
            autocomplete="on"
            :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_EMAIL) + ' *'"
            @blur="upadteUserGravatar"
          >
        </div>
        <div class="site">
          <input
            v-model="userProfile.site"
            type="url"
            name="url"
            autocomplete="on"
            :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_SITE)"
          >
        </div>
        <div v-if="editing" class="save">
          <button type="submit" @click="saveUserProfile">
            <i class="iconfont icon-success" />
          </button>
        </div>
      </div>
      <!-- profile setting -->
      <div v-else-if="cached && !editing" key="user" class="user">
        <div class="edit">
          <strong class="name">{{ firstUpperCase(userProfile.name) }}</strong>
          <span class="setting">
            <i class="iconfont icon-setting" />
            <span
              class="account-setting"
              v-i18n="LANGUAGE_KEYS.COMMENT_ACCOUNT_SETTING"
            />
            <ul class="user-tool">
              <li
                @click.stop.prevent="editUserProfile"
                v-i18n="LANGUAGE_KEYS.COMMENT_ACCOUNT_EDIT"
              />
              <li
                @click.stop.prevent="clearUserProfile"
                v-i18n="LANGUAGE_KEYS.COMMENT_ACCOUNT_CLEAR"
              />
            </ul>
          </span>
        </div>
      </div>
    </transition>
    <div class="postbox">
      <div class="user">
        <!-- TODO: 为什么不是 only user 容器 -->
        <desktop-only>
          <div class="gravatar">
            <img
              :alt="userProfile.name || t(LANGUAGE_KEYS.COMMENT_ANONYMOUS)"
              :src="humanizeGravatarUrl(userProfile.gravatar)"
              draggable="false"
            >
          </div>
        </desktop-only>
      </div>
      <div class="editor">
        <transition name="module">
          <div v-if="!!replyPid" key="reply" class="will-reply">
            <div class="reply-user">
              <span>
                <span v-i18n="LANGUAGE_KEYS.COMMENT_REPLY" />
                <!-- TODO: CSS -->
                <span>&nbsp;</span>
                <a href @click.stop.prevent="scrollToComment(replyingComment.id)">
                  <strong>#{{ replyingComment.id }} @{{ replyingComment.author.name }}：</strong>
                </a>
              </span>
              <a href class="cancel iconfont icon-cancel" @click.stop.prevent="cancelCommentReply" />
            </div>
            <div class="reply-preview" v-html="marked(replyingComment.content)" />
          </div>
        </transition>
        <slot name="pen"></slot>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { getGravatarByEmail } from '/@/transforms/thumbnail'
  import { firstUpperCase } from '/@/transforms/text'
  import { email as emailRegex, url as urlRegex } from '/@/constants/regex'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getCommentElementId, humanizeGravatarUrl } from './helper'

  export default defineComponent({
    name: 'CommentPublisher',
    props: {
      replyPid: {
        type: Number,
        required: true
      },
      profile: {
        type: Object,
        required: true
      },
      cached: {
        type: Boolean,
        required: true
      },
      editing: {
        type: Boolean,
        required: true
      }
    },
    setup(props, context) {
      const { i18n, store, isMobile } = useEnhancer()
      const userProfile = computed({
        get() {
          return props.profile
        },
        set(newProfile) {
          context.emit('update:profile', newProfile)
        }
      })

      const replyingComment = computed(() => {
        return store.state.comment.comments.data.find(
          comment => comment.id === props.replyPid
        )
      })

      const saveUserProfile = (event) => {
        event.preventDefault()
        if (!props.profile.name) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_NAME) + '?')
        }
        if (!props.profile.email) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_EMAIL) + '?')
        }
        if (!emailRegex.test(props.profile.email)) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_EMAIL))
        }
        if (props.profile.site && !urlRegex.test(props.profile.site)) {
          return alert(i18n.t(LANGUAGE_KEYS.COMMENT_POST_ERROR_URL))
        }
        context.emit('save-profile')
      }

      const editUserProfile = () => {
        if (!props.editing) {
          context.emit('edit-profile')
        }
      }

      const clearUserProfile = () => {
        if (props.cached) {
          context.emit('clear-profile')
        }
      }

      const cancelCommentReply = () => {
        context.emit('cancel-reply')
      }

      const scrollToComment = (commentId: number) => {
        context.emit('to-comment', getCommentElementId(commentId))
      }

      return {
        t: i18n.t,
        LANGUAGE_KEYS,
        firstUpperCase,
        humanizeGravatarUrl,
        isMobile,
        userProfile,
        replyingComment,
        saveUserProfile,
        clearUserProfile
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

  .publisher {
    display: block;
    padding-top: $gap;
    border-top: 1px dashed $module-hover-bg-darken-20;

    > .user {
      width: 100%;
      height: 2em;
      line-height: 2em;
      display: flex;
      margin-bottom: $gap;
      padding-left: 5.2rem;

      > .edit {
        flex-grow: 1;
        text-align: right;
        line-height: 2em;
        position: relative;

        > .setting {
          font-size: $font-size-h6;
          margin-left: $gap;
          display: inline-block;
          position: relative;

          &:hover {
            > .user-tool {
              display: block;
            }
          }

          > .iconfont {
            margin-right: $xs-gap;
          }

          > .account-setting {
            text-transform: capitalize;
          }

          > .user-tool {
            display: none;
            position: absolute;
            right: 0;
            top: 2em;
            margin: 0;
            padding: 0;
            padding-top: .5rem;
            list-style-type: square;
            z-index: $z-index-normal + 1;
            color: $text-reversal;

            > li {
              padding: 0 $gap;
              background-color: rgba($accent, 0.5);

              &:hover {
                background-color: rgba($accent, 0.8);
              }
            }
          }
        }
      }

      > .save {
        width: 10%;
        margin-left: $gap;
        flex-grow: 1;
        line-height: 2em;
        text-align: center;

        > button {
          width: 100%;
          height: 100%;
          background-color: $module-hover-bg;
          @include background-transition();

          &:hover {
            background-color: $module-hover-bg-darken-10;
          }
        }
      }

      > .name,
      > .email,
      > .site {
        flex-grow: 1;

        > input {
          width: 100%;
          height: 2em;
          line-height: 2em;
          text-indent: 3px;
          background-color: $module-hover-bg;
          @include background-transition();

          &:focus,
          &:hover {
            background-color: $module-hover-bg-darken-10;
          }
        }
      }

      > .name,
      > .email {
        margin-right: $gap;
      }
    }

    > .postbox {
      width: 100%;
      display: flex;

      > .user {
        margin-right: 1em;

        > .gravatar {
          display: block;
          margin-bottom: .5em;
          width: 4rem;
          height: 4rem;
          background-color: $module-hover-bg-darken-20;

          > img {
            width: 100%;
            height: 100%;
            transition: transform .5s ease-out;
          }
        }
      }

      > .editor {
        flex-grow: 1;
        overflow: hidden;

        > .will-reply {
          font-size: $font-size-h6;
          margin-bottom: 1em;

          > .reply-user {
            display: flex;
            justify-content: space-between;
            margin-bottom: $gap;
            padding: 0 $gap;
            height: 2.6em;
            line-height: 2.6em;
            background-color: $module-hover-bg;
            @include background-transition();

              &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }

          > .reply-preview {
            max-height: 10em;
            overflow: auto;
            padding: $gap;
            background-color: $module-hover-bg;
            @include background-transition();

              &:hover {
              background-color: $module-hover-bg-darken-10;
            }
          }
        }
      }
    }

    &.mobile {
      > .user {
        padding: 0;
        height: auto;
        flex-direction: column;

        > .name,
        > .email,
        > .site,
        > .save {
          width: 80%;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: $gap;
        }

        > .save {
          width: 30%;
          margin-bottom: 0;
        }
      }

      > .postbox {
        > .user {
          margin: 0;
        }
      }
    }
  }
</style>
