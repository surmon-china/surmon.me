import { ref, reactive, toRaw } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { useCommentStore } from '/@/stores/comment'
import { useHistoryStore } from '/@/stores/history'
import { useIdentityStore, IdentityProfile } from '/@/stores/identity'
import { GAEventCategories } from '/@/constants/google-analytics'
import { getMessageFromNormalError } from '/@/transforms/error'
import { LocalesKey } from '/@/locales'
import { createLogger } from '/@/utils/logger'
import { APP_CONFIG } from '/@/configs/app.config'
import { CommentTargetType } from '/@/interfaces/comment'

export const logger = createLogger('APP:Comment')

export function useCommentInteraction(options: { targetType: CommentTargetType; targetId: number }) {
  const { gtag, i18n } = useEnhancer()
  const identityStore = useIdentityStore()
  const historyStore = useHistoryStore()
  const commentStore = useCommentStore()

  const replyingParentId = ref<number | null>(null)
  const isRootPosting = ref<boolean>(false)
  const isReplyPosting = ref<boolean>(false)

  const inputProfile = reactive<IdentityProfile>({
    name: '',
    email: '',
    website: ''
  })

  const rootEditorState = reactive({
    content: '',
    preview: false
  })

  const resetRootEditorState = () => {
    rootEditorState.content = ''
    rootEditorState.preview = false
  }

  const replyTo = (commentId: number) => {
    replyingParentId.value = commentId
  }

  const cancelReply = () => {
    replyingParentId.value = null
  }

  const deleteComment = (commentId: number) => {
    gtag?.event('delete_comment', {
      event_category: GAEventCategories.Comment
    })

    if (window.confirm(i18n.t(LocalesKey.COMMENT_DELETE_CONFIRM))) {
      commentStore.deleteComment(commentId).catch((error) => {
        logger.failure('delete comment failed', error)
        alert(getMessageFromNormalError(error))
      })
    }
  }

  const createComment = async (payload: { content: string; parent_id: number | null }) => {
    if (!payload.content || !payload.content.trim()) {
      throw new Error(`${i18n.t(LocalesKey.COMMENT_POST_CONTENT)} ?`)
    }
    if (payload.content.length > APP_CONFIG.comment_content_max_length) {
      throw new Error(`${i18n.t(LocalesKey.COMMENT_POST_ERROR_CONTENT)} ?`)
    }

    if (identityStore.isAnonymous) {
      if (!inputProfile.name) throw new Error(i18n.t(LocalesKey.COMMENT_AUTHOR_NAME) + '?')
      if (!inputProfile.email) throw new Error(i18n.t(LocalesKey.COMMENT_AUTHOR_EMAIL) + '?')
    }

    const name = identityStore.isAnonymous ? inputProfile.name : identityStore.profile?.name
    const email = identityStore.isAnonymous ? inputProfile.email : identityStore.profile?.email
    const website = identityStore.isAnonymous ? inputProfile.website : identityStore.profile?.website

    await commentStore.postComment({
      target_type: options.targetType,
      target_id: options.targetId,
      parent_id: payload.parent_id,
      content: payload.content,
      author_name: name,
      author_email: email || null,
      author_website: website || null
    })

    // Save guest profile to store
    if (identityStore.isAnonymous) {
      identityStore.saveGuestProfile({ ...toRaw(inputProfile) })
    }
  }

  const submitRootComment = async (content: string) => {
    gtag?.event('submit_comment', {
      event_category: GAEventCategories.Comment,
      event_label: 'comment'
    })
    isRootPosting.value = true
    try {
      await createComment({ content, parent_id: null })
      resetRootEditorState()
    } catch (error: any) {
      logger.failure('submit comment failed:', error)
      alert(getMessageFromNormalError(error))
    } finally {
      isRootPosting.value = false
    }
  }

  const submitReplyComment = async (content: string) => {
    gtag?.event('submit_comment', {
      event_category: GAEventCategories.Comment,
      event_label: 'reply'
    })
    isReplyPosting.value = true
    try {
      await createComment({ content, parent_id: replyingParentId.value })
      cancelReply()
    } catch (error: any) {
      logger.failure('submit comment failed:', error)
      alert(getMessageFromNormalError(error))
    } finally {
      isReplyPosting.value = false
    }
  }

  const likeComment = async (commentId: number) => {
    gtag?.event('vote_comment', {
      event_category: GAEventCategories.Comment,
      event_label: 'like'
    })
    if (historyStore.isLikedComment(commentId)) {
      return false
    }
    try {
      await commentStore.postCommentVote(commentId, 1)
      historyStore.likeComment(commentId)
    } catch (error) {
      const message = i18n.t(LocalesKey.POST_ACTION_ERROR)
      logger.failure(message, error)
      alert(message)
    }
  }

  const dislikeComment = async (commentId: number) => {
    gtag?.event('vote_comment', {
      event_category: GAEventCategories.Comment,
      event_label: 'dislike'
    })
    if (historyStore.isDislikedComment(commentId)) {
      return false
    }
    try {
      await commentStore.postCommentVote(commentId, -1)
      historyStore.dislikeComment(commentId)
    } catch (error) {
      const message = i18n.t(LocalesKey.POST_ACTION_ERROR)
      logger.failure(message, error)
      alert(message)
    }
  }

  return {
    replyingParentId,
    inputProfile,
    rootEditorState,
    isRootPosting,
    isReplyPosting,
    replyTo,
    cancelReply,
    likeComment,
    dislikeComment,
    deleteComment,
    submitRootComment,
    submitReplyComment
  }
}
