<template>
  <form id="publisher" class="publisher" name="comment">
    <!-- 用户编辑部分 -->
    <transition name="module" mode="out-in">
      <div v-if="!userCacheMode || userCacheEditing" key="edit" class="user">
        <div class="name">
          <input
            v-model="user.name"
            required
            type="text"
            name="name"
            autocomplete="on"
            :class="language"
            :placeholder="$i18n.text.comment.profile.name + ' *'"
          >
        </div>
        <div class="email">
          <input
            v-model="user.email"
            required
            type="email"
            name="email"
            autocomplete="on"
            :class="language"
            :placeholder="$i18n.text.comment.profile.email + ' *'"
            @blur="upadteUserGravatar"
          >
        </div>
        <div class="site">
          <input
            v-model="user.site"
            type="url"
            name="url"
            autocomplete="on"
            :class="language"
            :placeholder="$i18n.text.comment.profile.site"
          >
        </div>
        <div v-if="userCacheEditing" class="save">
          <button type="submit" @click="updateUserCache($event)">
            <i class="iconfont icon-success" />
          </button>
        </div>
      </div>
      <!-- 用户设置部分 -->
      <div v-else-if="userCacheMode && !userCacheEditing" key="user" class="user">
        <div class="edit">
          <strong class="name">{{ user.name | firstUpperCase }}</strong>
          <a href class="setting" @click.stop.prevent>
            <i class="iconfont icon-setting" />
            <span
              class="account-setting"
              v-text="$i18n.text.comment.setting.account"
            />
            <ul class="user-tool">
              <li
                @click.stop.prevent="userCacheEditing = true"
                v-text="$i18n.text.comment.setting.edit"
              />
              <li
                @click.stop.prevent="claerUserCache"
                v-text="$i18n.text.comment.setting.clear"
              />
            </ul>
          </a>
        </div>
      </div>
    </transition>
    <div class="postbox">
      <div class="user">
        <div v-if="!isMobile" class="gravatar">
          <img
            :alt="user.name || $i18n.text.comment.anonymous"
            :src="humanizeGravatarUrl(user.gravatar)"
            draggable="false"
          >
        </div>
      </div>
      <div class="editor">
        <transition name="module">
          <div v-if="!!pid" key="reply" class="will-reply">
            <div class="reply-user">
              <span>
                <span v-text="$i18n.text.comment.reply" />
                <span>&nbsp;</span>
                <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${replyCommentSlef.id}`)">
                  <strong>#{{ replyCommentSlef.id }} @{{ replyCommentSlef.author.name }}：</strong>
                </a>
              </span>
              <a href class="cancel iconfont icon-cancel" @click.stop.prevent="cancelCommentReply" />
            </div>
            <div class="reply-preview" v-html="marked(replyCommentSlef.content)" />
          </div>
        </transition>
        <comment-pen
          ref="markdownInput"
          v-model="draftContent"
          :enabled-preview-mode="previewMode"
          :disabled="isPostingComment || isFetching"
          :is-posting="isPostingComment"
          @togglePreviewMode="handleTogglePreviewMode"
          @submit="submitComment"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {

}
</script>

<style lang="scss">
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
