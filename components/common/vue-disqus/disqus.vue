<template>
  <div id="disqus_thread" class="disqus-comment"></div>
</template>

<script>
  export default {
    name: 'vue-disqus',
    props: {
      url: {
        required: true
      },
      identifier: {
        required: true
      }
    },
    mounted() {
      console.log(window.DISQUS)
      if (window.DISQUS) {
        this.reset(window.DISQUS)
        return
      }
      this.init()
    },
    methods: {
      reset(disqus) {
        const self = this
        disqus.reset({
          reload: true,
          config() {
            this.page.url = self.url
            this.page.identifier = self.identifier
          }
        })
      },
      init() {
        const self = this
        window.disqus_config = function() {
          this.page.url = self.url
          this.page.identifier = self.identifier
        }
        setTimeout(() => {
          (function() {
            var d = document, s = d.createElement('script');
            s.src = '//surmon.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            })();
        }, 0)
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .disqus-comment {
    padding: 1em;
    background-color: $module-bg;

    .post-list {

      .post {

        .post-content {
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
