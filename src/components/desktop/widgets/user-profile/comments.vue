<script lang="ts" setup>
  import { shallowRef, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'
  import { Comment } from '/@/interfaces/comment'
  import nodepress from '/@/services/nodepress'
  import { getMessageFromNormalError } from '/@/transforms/error'
  import { logger } from './state'

  const { identity, i18n: _i18n } = useEnhancer()

  const isFetching = shallowRef(false)
  const isDeleting = shallowRef(false)
  const comments = shallowRef<Comment[]>([])

  const deleteComment = async (index: number) => {
    if (window.confirm(_i18n.t(LocalesKey.COMMENT_DELETE_CONFIRM))) {
      try {
        isDeleting.value = true
        await nodepress.delete(`/account/comments/${comments.value[index].id}`, { token: identity.token })
        comments.value.splice(index, 1)
      } catch (error) {
        logger.failure(`Delete user's commnt failed.`, error)
        alert(getMessageFromNormalError(error))
      } finally {
        isDeleting.value = false
      }
    }
  }

  const fetchComments = async () => {
    try {
      isFetching.value = true
      const response = await nodepress.get('/account/comments', { token: identity.token })
      comments.value = response.result
    } catch (error) {
      logger.failure(`Fetch user's commnts failed.`, error)
      alert(getMessageFromNormalError(error))
    } finally {
      isFetching.value = false
    }
  }

  onMounted(() => fetchComments())
</script>

<template>
  <p class="loading" v-if="isFetching"><i18n :k="LocalesKey.ARTICLE_LIST_LOADING" /></p>
  <p class="empty" v-else-if="!comments.length"><i18n :k="LocalesKey.EMPTY_PLACEHOLDER" /></p>
  <ul class="user-comments">
    <transition-group name="list">
      <li class="item" :key="comment.id" v-for="(comment, index) in comments">
        <p class="context">
          <span class="floor">#{{ comment.id }}</span>
        </p>
        <p class="content">{{ comment.content }}</p>
        <p class="meta">
          <udate to="ago" :date="comment.created_at" />
          <button class="delete" :disabled="isFetching || isDeleting" @click="deleteComment(index)">
            <i18n :k="LocalesKey.COMMENT_DELETE" />
          </button>
        </p>
      </li>
    </transition-group>
  </ul>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .loading,
  .empty {
    color: $color-text-disabled;
  }

  .user-comments {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;

    .item {
      padding-bottom: 1rem;
      margin-bottom: 2rem;
      border-bottom: 1px dashed $module-bg-darker-1;
      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border: none;
      }

      .context {
        display: flex;
        justify-content: space-between;
        color: $color-text-disabled;
      }

      .meta {
        display: flex;
        justify-content: space-between;
        color: $color-text-disabled;
        font-size: $font-size-tertiary;

        .delete:hover {
          color: $color-link-hover;
        }
      }
    }
  }
</style>
