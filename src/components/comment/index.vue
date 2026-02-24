<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, nextTick } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCommentStore } from '/@/stores/comment'
  import * as ANCHORS from '/@/constants/element-anchor'
  import { SortMode } from '/@/constants/sort-param'
  import { CommentTargetType } from '/@/interfaces/comment'
  import { LocalesKey } from '/@/locales'
  import { scrollToAnchor } from '/@/utils/scroller'

  import CommentTopbarWrapper from './topbar/wrapper.vue'
  import CommentTopbarCount from './topbar/count.vue'
  import CommentTopbarSort from './topbar/sort.vue'
  import CommentTopbarUser from './topbar/user.vue'
  import CommentComposerWrapper from './composer/wrapper.vue'
  import CommentComposerForm from './composer/main.vue'
  import CommentListWrapper from './list/wrapper.vue'
  import CommentList from './list/list.vue'
  import CommentLoadmore from './loadmore.vue'

  import { useCommentInteraction } from './interaction'

  export interface Props {
    targetType: CommentTargetType
    targetId: number
    readonly?: boolean
    fetching?: boolean
    plain?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    readonly: false,
    fetching: false,
    plain: false
  })

  const { route } = useEnhancer()
  const commentStore = useCommentStore()
  const commentInteraction = useCommentInteraction({
    targetType: props.targetType,
    targetId: props.targetId
  })

  const commentSort = ref(SortMode.Latest)

  const fetchCommentsWithSort = async (sort: SortMode) => {
    scrollToAnchor(ANCHORS.COMMENT_ELEMENT_ID)
    await commentStore.fetchList({
      target_type: props.targetType,
      target_id: props.targetId,
      sort
    })
  }

  const fetchNextPageComments = async () => {
    const lastComment = commentStore.comments.at(-1)
    const lastCommentId = ANCHORS.getCommentItemElementId(lastComment!.id)
    await commentStore.fetchListNextPage({
      target_type: props.targetType,
      target_id: props.targetId,
      sort: commentSort.value
    })
    await nextTick()
    scrollToAnchor(lastCommentId)
  }

  onBeforeMount(() => {
    watch(commentSort, (sort) => {
      commentInteraction.cancelReply()
      fetchCommentsWithSort(sort)
    })
  })

  onBeforeUnmount(() => {
    commentInteraction.cancelReply()
  })

  onUnmounted(() => {
    commentStore.clearList()
  })

  onMounted(() => {
    const urlHash = route.hash.slice(1)
    if (urlHash.startsWith(ANCHORS.COMMENT_ITEM_URL_HASH_PREFIX)) {
      const commentId = ANCHORS.getCommentIdByUrlHash(urlHash)
      const elementId = ANCHORS.getCommentItemElementId(commentId)
      if (document.getElementById(elementId)) {
        setTimeout(() => scrollToAnchor(elementId), 400)
      }
    }
  })
</script>

<template>
  <div :id="ANCHORS.COMMENT_ELEMENT_ID" class="comment-box" :class="{ plain }">
    <comment-topbar-wrapper :loading="fetching" :plain="plain">
      <template #count>
        <comment-topbar-count :total="commentStore.pagination?.total" />
      </template>
      <template #sort>
        <comment-topbar-sort v-model="commentSort" />
      </template>
      <template #user>
        <client-only>
          <comment-topbar-user />
        </client-only>
      </template>
    </comment-topbar-wrapper>
    <divider class="divider" />
    <div class="readonly" v-if="readonly">
      <i18n :k="LocalesKey.COMMENT_DISABLED" />
    </div>
    <comment-composer-wrapper :loading="fetching" v-else>
      <comment-composer-form
        v-model:profile="commentInteraction.inputProfile"
        v-model:content="commentInteraction.rootEditorState.content"
        v-model:preview="commentInteraction.rootEditorState.preview"
        :posting="commentInteraction.isRootPosting.value"
        :disabled="commentStore.fetching || commentInteraction.isRootPosting.value"
        :has-comments="!!commentStore.pagination?.total"
        :expanded="plain ? true : false"
        :hidden-avatar="plain"
        :hidden-editor-tools="plain"
        :editor-auto-focus="plain ? false : true"
        @submit="commentInteraction.submitRootComment"
      />
    </comment-composer-wrapper>
    <divider class="divider" />
    <comment-list-wrapper
      :loading="fetching || (!commentStore.comments.length && commentStore.fetching)"
      :skeleton-count="plain ? 3 : 5"
      :has-data="!!commentStore.commentTreeList.length"
    >
      <template #extra v-if="!!$slots['list-top-extra']">
        <slot name="list-top-extra"></slot>
        <divider class="divider" />
      </template>
      <template #list>
        <comment-list
          level="root"
          :comments="commentStore.commentTreeList"
          :replying-parent-id="commentInteraction.replyingParentId.value"
          :hidden-reply="readonly"
          :hidden-avatar="plain"
          :hidden-user-agent="plain"
          @like="commentInteraction.likeComment"
          @dislike="commentInteraction.dislikeComment"
          @delete="commentInteraction.deleteComment"
          @reply="commentInteraction.replyTo"
          @cancel-reply="commentInteraction.cancelReply"
        >
          <template #reply="payload">
            <comment-composer-form
              v-model:profile="commentInteraction.inputProfile"
              :posting="commentInteraction.isReplyPosting.value"
              :disabled="commentInteraction.isReplyPosting.value"
              :bordered="true"
              :expanded="true"
              :fixed-avatar="payload.isChild"
              :hidden-avatar="plain"
              :hidden-editor-tools="plain"
              :editor-auto-focus="true"
              @submit="commentInteraction.submitReplyComment"
            />
          </template>
        </comment-list>
      </template>
      <template #pagination>
        <comment-loadmore
          :fetching="commentStore.fetching"
          :pagination="commentStore.pagination"
          :has-more="commentStore.hasMore"
          @loadmore="fetchNextPageComments"
        />
      </template>
    </comment-list-wrapper>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .comment-box {
    padding: $gap-sm;
    @include mix.common-bg-module();
    @include mix.radius-box($radius-sm);
    &.plain {
      border-radius: $radius-sm;
    }

    .divider {
      border-color: $module-bg-darker-1 !important;
    }

    .readonly {
      text-align: center;
      font-weight: bold;
      line-height: $line-height-base * 2;
      color: $color-text-secondary;
    }
  }
</style>
