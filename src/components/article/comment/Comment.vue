<template>
  <div class="comment-box">
    <ul class="comment-list">
      <li class="item">我是评论</li>
    </ul>
  </div>
</template>

<script>

export default {

  name: 'Comment',

  props: {
    // comment: Object
  },

  data () {
    return {
      comments: [
        { content: '12312' },
        { content: '12312' },
        { content: '12312' },
        { content: '12312' },
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
