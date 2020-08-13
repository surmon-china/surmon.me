<template>
  <form :id="ElementID.Publisher" class="publisher" name="comment">
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
          <div v-if="Boolean(replyPid)" class="will-reply">
            <div class="reply-user">
              <span class="reply-text">
                <span v-i18n="LANGUAGE_KEYS.COMMENT_REPLY" />
                <button class="reply-user-name" @click="scrollToComment(replyingComment.id)">
                  #{{ replyingComment.id }} @{{ replyingComment.author.name }}：
                </button>
              </span>
              <button
                class="cancel iconfont icon-cancel"
                @click.prevent="cancelCommentReply"
              />
            </div>
            <div
              class="reply-preview markdown-html comment"
              v-html="parseMarkdown(replyingComment.content)"
            />
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
  import { CommentEvent, ElementID, getCommentElementId, humanizeGravatarUrl, scrollToElementAnchor } from './helper'

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
    emits: [
      CommentEvent.SyncProfile,
      CommentEvent.SaveProfile,
      CommentEvent.EditProfile,
      CommentEvent.ClearProfile,
      CommentEvent.CancelProfile,
      CommentEvent.CancelReply
    ],
    setup(props, context) {
      const { i18n, store, isMobile } = useEnhancer()
      const userProfile = computed({
        get() {
          return props.profile
        },
        set(newProfile) {
          console.log('------set profile', newProfile)
          context.emit(CommentEvent.SyncProfile, newProfile)
        }
      })

      const parseMarkdown = (markdown: string) => {
        return markdown
      }

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
        scrollToElementAnchor(getCommentElementId(commentId), -300)
      }

      return {
        t: i18n.t,
        ElementID,
        LANGUAGE_KEYS,
        firstUpperCase,
        humanizeGravatarUrl,
        isMobile,
        userProfile,
        parseMarkdown,
        replyingComment,
        cancelCommentReply,
        scrollToComment,
        saveUserProfile,
        clearUserProfile
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .publisher {
    display: block;
    padding-top: $gap;
    border-top: 1px dashed $module-bg-darker-1;

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
          background-color: $module-bg-hover;
          @include background-transition();

          &:hover {
            background-color: $module-bg-darker-5;
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

        > .gravatar {
          display: block;
          margin-bottom: .5em;
          width: 4rem;
          height: 4rem;
          background-color: $module-bg-darker-1;

          > img {
            width: 100%;
            height: 100%;
            transition: transform .5s ease-out;
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
