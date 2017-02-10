<template>
  <div class="comment-hidden">
    <ul class="comment-list">
      <li class="comment-item"  v-for="(comment, id) in comments.parentPosts">
        <span>来自</span>
        <img :src="comment.author.avatar_url" :alt="comment.author.name" :title="comment.author.name">
        <span class="author">{{ comment.author.name }}</span>
        <span>的评论：</span>
        <p class="content" v-html="comment.message"></p>
        <span>发布于</span> 
        <span>{{ new Date(comment.created_at).toLocaleString() }}</span>
        <span>发布来自</span>
        <span class="ip">{{ comment.ip }}</span>
        <span class="iplocation">{{ comment.iplocation }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'vue-comment-hidden',
    computed: {
      comments() {
        return this.$store.state.comment.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .comment-hidden {
    visibility: hidden;
    opacity: 0;
    height: 0px;
    width: 0px;
    overflow: hidden;
  }
</style>