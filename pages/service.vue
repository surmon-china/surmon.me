<template>
  <div class="page">
    <div class="service">
      <div class="banner">
        <div class="banner-content container">
          <h2 class="title">Talk is cheap. Show me the code</h2>
          <div class="submit">
            <button class="submit-btn" @click="submitProject">Fuck me</button>
          </div>
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
              <p class="name">1. 提交需求</p>
              <p class="desc">提供完善成熟的需求文档</p>
              <p class="desc">提供清晰的设计图或目标站</p>
            </li>
            <li class="item">
              <p class="name">2. 确认需求</p>
              <p class="desc">确认报价及开发周期</p>
              <p class="desc">协商开发周期和要点</p>
            </li>
            <li class="item">
              <p class="name">3. 预付开发</p>
              <p class="desc">转账预付50%</p>
              <p class="desc">进入开发流程</p>
            </li>
            <li class="item">
              <p class="name">4. 预收修正</p>
              <p class="desc">提供预览审核</p>
              <p class="desc">根据需求修正</p>
            </li>
            <li class="item">
              <p class="name">5. 交付维护</p>
              <p class="desc">付清尾款，交付项目</p>
              <p class="desc">一定周期内持续维护</p>
            </li>
          </ul>
        </div>
      </div>
      <br>
      <br>
      <div class="rule" v-if="false">
        <div class="rule-content container">
          <p>仅接受 2k + 的项目</p>
          <p>仅接受工期 < 2个月的项目</p>
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
      submitProject() {
        const subject = `嗨！Surmon，久仰大名！`
        const body = `Hi! 我有一个需求：%0D%0A %0D%0A - 需求简述： %0D%0A %0D%0A - 需求文档：%0D%0A %0D%0A - 预算金额：%0D%0A %0D%0A - 预算周期：`
        window.location.href = `mailto:surmon@foxmail.com?subject=${subject}&body=${body}`
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
        height: 30rem;
        background: $module-bg url('/images/service.jpg');
        background-size: cover;
        background-position: center 60%;
        background-attachment: fixed;

        > .banner-content {
          height: 30rem;
          overflow: hidden;
          text-align: center;

          > .title {
            color: $white;
            margin-top: 8rem;
            font-size: $font-size-h1 * 2;
          }

          > .submit {

            > .submit-btn {
              color: $white;
              border: 1px solid;
              border-color: $white;
              width: 10rem;
              height: 3em;
              line-height: 3rem;
              text-align: center;
              letter-spacing: 1px;
              font-weight: bold;

              &:hover {
                color: $primary;
                border-color: $primary;
              }
            }
          }
        }
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
            padding-top: 1rem;
            list-style-type: none;
            display: flex;
            justify-content: space-between;

            > .item {
              width: 20%;
              height: auto;
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

      > .rule {

        > .rule-content {
          margin: 2em auto;
          text-align: center;
          background-color: $module-bg;
        }
      }
    }
  }
</style>
