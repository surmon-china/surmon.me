<template>
  <div id="tools">
    <div class="container">
      <div class="tools-list">
        <button class="to-top">
          <i class="iconfont icon-top"></i>
        </button>
        <button class="feedback">
          <i class="iconfont icon-comment"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../sass/variables';
  #tools {
    position: fixed;

    .container {
      position: relative;

      .tools-list {
        padding: 1em;
        font-size: .9em;
        text-align: center;
        color: #333;
        text-transform: uppercase;
      }
    }
  }
</style>
