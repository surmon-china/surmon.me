<template>
  <div class="page">
    <div class="service">
      <div class="banner">
        <div class="banner-content container">
          <div class="box"></div>
        </div>
      </div>
      <div class="module">
        <div class="module-content container">
          <ul class="module-list">
            <li class="item">
              <p class="icon">
                <i class="iconfont icon-wordpress"></i>
              </p>
              <p class="name">Wordpress</p>
              <p class="desc">Wordpress 环境基建</p>
              <p class="desc">Wordpress 整站建设</p>
              <p class="desc">Wordpress 调优迭代</p>
            </li>
            <li class="item">
              <p class="icon">
                <i class="iconfont icon-nodejs"></i>
              </p>
              <p class="name">Nodejs</p>
              <p class="desc">Nodejs 整站建设</p>
              <p class="desc">Nodejs Web 服务开发</p>
              <p class="desc">Nodejs 命令行工具开发</p>
            </li>
            <li class="item">
              <p class="icon">
                <i class="iconfont icon-javascript"></i>
              </p>
              <p class="name">Web Client</p>
              <p class="desc">Vue 应用开发</p>
              <p class="desc">React 应用开发</p>
              <p class="desc">Angular 应用开发</p>
             </li>
            <li class="item">
              <p class="icon">
                <i class="iconfont icon-app"></i>
              </p>
              <p class="name">Application</p>
              <p class="desc">Weex 应用开发</p>
              <p class="desc">ReactNative 应用开发</p>
              <p class="desc">Hybird App 应用开发</p>
             </li>
             <li class="item">
              <p class="icon">
                <i class="iconfont icon-wechat"></i>
              </p>
              <p class="name">Wechat</p>
              <p class="desc">H5 开发</p>
              <p class="desc">公众号开发</p>
              <p class="desc">小程序开发</p>
             </li>
          </ul>
        </div>
      </div>
      <div class="step">
        <div class="step-content container">
          <ul class="step-list">
            <li class="item">
              <p class="icon"></p>
              <p class="name">提交需求</p>
              <p class="desc">确定项目要求</p>
            </li>
            <li class="item">
              <p class="icon"></p>
              <p class="name">确认需求</p>
              <p class="desc">确认报价周期</p>
            </li>
            <li class="item">
              <p class="icon"></p>
              <p class="name">预付开发</p>
              <p class="desc">预付50%，开始开发</p>
            </li>
            <li class="item">
              <p class="icon"></p>
              <p class="name">预览反馈</p>
              <p class="desc">提供预览审核，迭代更新</p>
            </li>
            <li class="item">
              <p class="icon"></p>
              <p class="name">交付维护</p>
              <p class="desc">支付尾款，交付项目，持续维护</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'service',
    head: {
      title: 'Service'
    },
    methods: {
      sendMail() {
        console.log('应该有事先的基本模板')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {

    > .service {
      width: 100%;

      > .banner {
        height: 36rem;
        background: $module-bg url('/images/service.jpg');
        background-size: cover;
        background-position: bottom;
        background-attachment: fixed;
      }

      > .module {
        margin: 2em auto;

        > .module-content {

          > .module-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            justify-content: space-between;

            > .item {
              width: 19%;
              height: 23rem;
              padding: 1em;
              text-align: center;
              background-color: $module-bg;

              &:hover {
                background-color: $module-hover-bg;
              }

              > .icon {

                > .iconfont {
                  font-size: 4em;
                }
              }

              > .name {
                font-size: 1.5em;
                font-weight: bold;
              }

              > .desc {
                color: $disabled;
              }
            }
          }
        }
      }

      > .step {
        background-color: $module-bg;

        > .step-content {

          > .step-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            justify-content: space-between;

            > .item {
              width: 19%;
              height: 23rem;
              padding: 1em;
              text-align: center;

              > .icon {

                > .iconfont {
                  font-size: 4em;
                }
              }

              > .name {
                font-size: 1.5em;
                font-weight: bold;
              }

              > .desc {
                color: $disabled;
              }
            }
          }
        }
      }
    }
  }
</style>
