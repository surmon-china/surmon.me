<template>
  <form
    :id="COMMENT_PUBLISHER_ELEMENT_ID"
    :class="{ mobile: isMobile }"
    class="publisher"
    name="comment"
  >
    <div class="user">
      <!-- profile editor -->
      <template v-if="!cached || editing">
        <div class="name">
          <input
            v-model="profileState.name"
            required
            type="text"
            name="name"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_NAME) + ' *'"
          />
        </div>
        <div class="email">
          <input
            v-model="profileState.email"
            required
            type="email"
            name="email"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_EMAIL) + ' *'"
          />
        </div>
        <div class="site">
          <input
            v-model="profileState.site"
            type="url"
            name="url"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="t(LANGUAGE_KEYS.COMMENT_POST_SITE)"
          />
        </div>
        <div v-if="editing" class="save">
          <button type="submit" :disabled="disabled" @click="saveUserProfile">
            <i class="iconfont icon-success" />
          </button>
        </div>
      </template>
      <!-- profile setting -->
      <template v-else>
        <div class="edit">
          <strong class="name">{{ firstUpperCase(profileState.name) }}</strong>
          <span class="setting">
            <i class="iconfont icon-setting" />
            <span class="account-setting">
              <i18n :lkey="LANGUAGE_KEYS.COMMENT_ACCOUNT_SETTING" />
            </span>
            <ul class="user-tool">
              <li @click.stop.prevent="editUserProfile">
                <i18n :lkey="LANGUAGE_KEYS.COMMENT_ACCOUNT_EDIT" />
              </li>
              <li @click.stop.prevent="clearUserProfile">
                <i18n :lkey="LANGUAGE_KEYS.COMMENT_ACCOUNT_CLEAR" />
              </li>
            </ul>
          </span>
        </div>
      </template>
    </div>
    <div class="postbox">
      <div class="user">
        <desktop-only>
          <div class="gravatar">
            <img
              :alt="profileState.name || t(LANGUAGE_KEYS.COMMENT_ANONYMOUS)"
              :src="humanizeGravatarUrlByEmail(profileState.email)"
              draggable="false"
            />
          </div>
        </desktop-only>
      </div>
      <div class="editor">
        <transition name="module">
          <div v-if="Boolean(replyPid)" class="will-reply">
            <div class="reply-user">
              <span class="reply-text">
                <i18n :lkey="LANGUAGE_KEYS.COMMENT_REPLY" />
                <button
                  class="reply-user-name"
                  @click.prevent="scrollToComment(replyingComment.id)"
                >
                  #{{ replyingComment.id }} @{{ replyingComment.author.name }}：
                </button>
              </span>
              <button class="cancel iconfont icon-cancel" @click.prevent="cancelCommentReply" />
            </div>
            <div
              class="reply-preview markdown-html comment"
              v-html="markdownToHTML(replyingComment.content, { sanitize: true })"
            />
          </div>
        </transition>
        <slot name="pen"></slot>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue'
  import { useCommentStore, Comment } from '/@/store/comment'
  import { useEnhancer } from '/@/app/enhancer'
  import { getCommentItemElementID, COMMENT_PUBLISHER_ELEMENT_ID } from '/@/constants/anchor'
  import { email as emailRegex, url as urlRegex } from '/@/constants/regex'
  import { firstUpperCase } from '/@/transforms/text'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { scrollToElementAnchor } from '/@/utils/scroller'
  import { CommentEvent, humanizeGravatarUrlByEmail } from './helper'

  export default defineComponent({
    name: 'CommentPublisher',
    props: {
      disabled: {
        type: Boolean,
        required: true
      },
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
    emits: [
      CommentEvent.SyncProfile,
      CommentEvent.SaveProfile,
      CommentEvent.EditProfile,
      CommentEvent.ClearProfile,
      CommentEvent.CancelProfile,
      CommentEvent.CancelReply
    ],
    setup(props, context) {
      const { i18n, isMobile } = useEnhancer()
      const commentStore = useCommentStore()

      const profileState = ref(props.profile)
      watch(
        () => props.profile,
        (profile) => (profileState.value = profile),
        { deep: true }
      )

      const replyingComment = computed(
        () => commentStore.comments.find((comment) => comment.id === props.replyPid) as Comment
      )

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
        context.emit(CommentEvent.SaveProfile)
      }

      const editUserProfile = () => {
        if (!props.editing) {
          context.emit(CommentEvent.EditProfile)
        }
      }

      const clearUserProfile = () => {
        if (props.cached) {
          context.emit(CommentEvent.ClearProfile)
        }
      }

      const cancelCommentReply = () => {
        context.emit(CommentEvent.CancelReply)
      }

      const scrollToComment = (commentId: number) => {
        scrollToElementAnchor(getCommentItemElementID(commentId), -300)
      }

      return {
        COMMENT_PUBLISHER_ELEMENT_ID,
        LANGUAGE_KEYS,
        t: i18n.t,
        isMobile,
        firstUpperCase,
        humanizeGravatarUrlByEmail,
        profileState,
        markdownToHTML,
        replyingComment,
        cancelCommentReply,
        scrollToComment,
        editUserProfile,
        saveUserProfile,
        clearUserProfile
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .publisher {
    display: block;
    padding-top: $gap;
    margin-top: $lg-gap;
    border-top: 1px solid $module-bg-darker-1;

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
            .user-tool {
              display: block;
            }
          }

          > .iconfont {
            margin-right: $xs-gap;
          }

          > .account-setting {
            text-transform: capitalize;
          }

          .user-tool {
            display: none;
            position: absolute;
            right: 0;
            top: 2em;
            margin: 0;
            padding: 0;
            padding-top: 0.5rem;
            list-style-type: square;
            z-index: $z-index-normal + 1;
            color: $text-reversal;

            > li {
              padding: 0 $gap;
              cursor: pointer;
              background-color: $primary-translucent;
              &:hover {
                background-color: $primary-lighter;
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
          @include background-transition();
          background-color: $module-bg-hover;
          &:hover {
            background-color: $module-bg-darker-3;
          }
        }
      }

      > .name,
      > .email,
      > .site {
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

        .gravatar {
          display: block;
          margin-bottom: 0.5em;
          width: 4rem;
          height: 4rem;
          background-color: $module-bg-darker-1;

          img {
            width: 100%;
            height: 100%;
            transition: transform 0.5s ease-out;
          }
        }
      }

      .editor {
        flex-grow: 1;
        overflow: hidden;

        .will-reply {
          font-size: $font-size-h6;

          .reply-user,
          .reply-preview {
            margin-bottom: $gap;
            @include radius-box($xs-radius);
            @include background-transition();
          }

          .reply-user {
            display: flex;
            justify-content: space-between;
            padding: 0 $gap;
            line-height: 2.6em;
            background-color: $module-bg-darker-1;
            &:hover {
              background-color: $module-bg-hover;
            }

            .reply-user-name {
              margin-left: $sm-gap;
              display: inline;
              font-weight: bold;
            }

            .reply-user-name,
            .cancel {
              &:hover {
                color: $link-color-hover;
              }
            }
          }

          .reply-preview {
            overflow: auto;
            padding: $sm-gap $gap;
            max-height: 10em;
            background-color: $module-bg-hover;
            &:hover {
              background-color: $module-bg-darker-3;
            }
          }
        }
      }
    }

    &.mobile {
      > .user {
        margin: 0;
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
