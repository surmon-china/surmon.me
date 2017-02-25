<template>
  <div class="comment-box">
    <div class="tools">
      <div class="like actived">7人喜欢</div>
      <div class="total">20条评论</div>
      <div class="sort">
        <a href="">最新</a>
        <a href="">最早</a>
        <a href="">最新</a>
      </div>
    </div>
    <ul class="comment-list">
      <li class="comment-item" v-for="comment in 10">
        <span>来自</span>SURMON
        <span>的评论：</span>
        <p class="content">啥都美哦有吗</p>
        <span>发布于</span> 
        <span>2017-12</span>
        <span>发布来自</span>
        <span class="ip">192.168,1.1</span>
        <span class="iplocation">中国西安</span>
      </li>
    </ul>
    <div class="post-box">
      <div class="user">
        <div class="name"></div>
        <div class="email"></div>
        <div class="site"></div>
      </div>
      <div class="gravatar"></div>
      <div class="editor">
        <div class="markdown"></div>
        <div class="editor-tools">
          <span>插入表情</span>
          <span>插入图片</span>
          <span>插入连接</span>
          <span>插入代码</span>
          <button>发布</button>
        </div>
        <div class="preview">预览内容</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vue-comment',
    methods: {
      replaceSSL(html) {
        return !!html ? html.replace(/http:\/\//ig, '/proxy/') : html
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .comment-box {
    background-color: $module-bg;
    padding: 1em;
  }
</style>