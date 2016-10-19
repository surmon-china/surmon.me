<template>
  <div class="page">
    <div class="detail">
      <div class="content">
        <div class="guestbook-banner">
          <img src="http://surmon.me/wp-content/themes/Surmon/images/guestbook/guestbook_1.jpg">
          <span>此心光明 亦复何言</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <duoshuo data-thread-key="123" data-title="我是留言板"></duoshuo>
    </div>
  </div>
</template>

<script>
  export default {
    // 模块名称
    name: 'Guestbook'
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/mixins';
  @import '../../sass/variables';
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
            @include css3-prefix(transition, all .5s);

            &:hover {
              margin-top: -6em;
              @include css3-prefix(transform, rotate(3deg) scale(1.1));
              @include css3-prefix(transition, all .5s);
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
