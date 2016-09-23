<template>
  <li v-show="comment.text">
    <div class="comhead">
      <a class="toggle" @click="open = !open">{{open ? '[-]' : '[+]'}}</a>
      <a :href="'#/user/' + comment.by">{{comment.by}}</a>
      {{comment.time | fromNow}} ago
    </div>
    <p class="comment-content" v-show="open">
      {{{comment.text}}}
    </p>
    <ul class="child-comments" v-if="comment.kids" v-show="open">
      <comment v-for="comment in childComments" :comment="comment"></comment>
    </ul>
  </li>
</template>

<script>
import store from '../store'

export default {

  name: 'Comment',

  props: {
    comment: Object
  },

  data () {
    return {
      childComments: [],
      open: true
    }
  },

  created () {
    if (this.comment.kids) {
      store.fetchItems(this.comment.kids).then(comments => {
        this.childComments = comments
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
