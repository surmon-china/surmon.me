<template>
  <div class="article-lists-header">
    <ul class="tag-list">
      <li class="item" v-for="tag in 5">
        <p class="tag-logo">
          <img src="http://ac-mhke0kuv.clouddn.com/7b5c3eb591b671749fee.png">
        </p>
        <div class="name">Vue.js</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'article-lists-header',
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .article-lists-header {
    background-color: white;
    padding: 1em;
    margin-bottom: 1em;

    .tag-list {
      padding: 0;
      margin: 0;
      overflow: hidden;

      .item {
        display: inline-block;
        float: left;
        width: 20%;
        padding: 1em 0;

        .tag-logo {
          padding: 0 1.5em;
        }

        .name {
          text-align: center;
        }
      }
    }
  }
</style>
