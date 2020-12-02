<template>
  <div id="test">
    <span class="progress"></span>
  </div>
</template>

<style lang="scss">
  @keyframes default-btn-bg {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  #test {
    position: fixed;
    top: 10%;
    left: 35%;
    z-index: 9999999;
    width: 200px;
    height: 300px;
    overflow: hidden;
    background: green;

    .progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: red;
      transition: transform .1s;
      animation: default-btn-bg 0.56s linear;
    }
  }
</style>
