<template>
  <div class="page">
    <div class="detail">
      <div class="content">
        <div class="guestbook-banner">
          <img src="/images/guestbook.jpg">
          <span>此心光明 亦复何言</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <comment-box post-id="guestbook"></comment-box>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'guestbook',
    head: {
      title: 'Guestbook'
    },
    computed: {
      comments() {
        return this.$store.state.comment.guestbook.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {

    .detail {
      margin-bottom: 1em;
      background-color: $module-bg;

      .content {
        width: 100%;
        height: 17em;
        overflow:  hidden;

        .guestbook-banner {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 17em;
          border: 0;

          img {
            margin-top: -5em;
            @include css3-prefix(transition, all 1s);

            &:hover {
              margin-top: -6em;
              @include css3-prefix(transform, rotate(2deg) scale(1.1));
              @include css3-prefix(transition, all 1s);
            }
          }

          span {
            position: absolute;
            right: 2em;
            bottom: 2em;
            display: block;
            font-weight: 700;
            opacity: .5;
            cursor: pointer;
            padding: 0 1em;
            height: 2em;
            line-height: 2em;
            background-color: $module-bg;
          }
        }
      }
    }
  }
</style>
