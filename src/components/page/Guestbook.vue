<style lang="scss" scoped>
  @import '../../sass/variables';
  .page {

    .detail {
      margin-bottom: 1em;
      background-color: $module-bg;

      .title {
        text-align: center;
        margin: .5em 0 1em 0;
      }

      .content {

        img {
          max-width: 100%;
        }

        p {
          line-height: 1.8em;
          text-indent: 2em;
          margin-bottom: 1em;
        }

        h3 {
          margin: 1em 0;
          padding-left: 0;
          color: #666;
          line-height: 1.8em;
          font-weight: 700;
          text-indent: 0;
        }
      }
    }
  }
</style>

<template>
  <div class="page">
    <div class="detail">
      <div class="content" v-html="page.content"></div>
    </div>
    <div class="comment">
      sfsdf
      <comment></comment>
    </div>
  </div>
</template>

<script>

  import Comment from 'components/article'

  export default {

    // 模块名称
    name: 'guestbook',

    components: {
      Comment
    },

    data() {
      return {
        page: {
          title: 'Guestbook',
          content: `<img src="http://surmon.me/wp-content/themes/Surmon/images/guestbook/guestbook_1.jpg">`
        }
      }
    }
  }
</script>
