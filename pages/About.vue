<template>
  <div class="page">
    <div class="detail">
      <div class="content">
        <div class="about">
          <div class="about-all">
            <div class="about-me">
              <div class="gravatar">
                <img src="/images/gravatar.jpg">
              </div>
              <p class="item">
                <i class="iconfont icon-user"></i>
                <span>I'm Surmon, a (95后) (小) javascript (鲜) stack (肉) developer.</span>
              </p>
              <p class="item">
                <i class="iconfont icon-mail"></i>
                <a href="mailto:surmon@foxmail.com" target="_blank" rel="nofollow">Surmon@foxmail.com</a>
              </p>
              <p class="item">
                <i class="iconfont icon-comment-discussion"></i>
                <span>国家套路委员会：</span>
                <a target="_blank" 
                   rel="nofollow" 
                   href="http://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4">288325802</a>
              </p>
              <p class="item">
                <i class="iconfont icon-address"></i>
                <span>欢迎西安的同学请我喝(yue)咖(...)啡</span>
              </p>
              <p class="item">
                <i class="iconfont icon-github"></i>
                <a href="https://github.com/surmon-china" target="_blank" rel="nofollow">寂寞交友主页</a>
              </p>
              <p class="item">
                <i class="iconfont icon-music"></i>
                <span>Folk, Jazz-HipHop, EM, Rock, PostRock, New Ag</span>
              </p>
              <div class="item">
                <i class="iconfont icon-code"></i>
                <div class="skills">
                  <p>擅长：H5/C3/4, JQuery, Ps, Bootstrap, Js, ES6, Ng1, Ng2, Vue2, Weex, RN...</p>
                  <p>实践：PHP, Wordpress, Node.js, Express, MongoDB, Mysql, Redis, Linux...</p>
                  <p>工程：Grunt, Gulp, Webpack, Npm, Yarn, Babel...</p>
                  <p>关注：WebVR, WebRTC, WebComponent, Service Worker, AR, VR, AI...</p>
                  <p>技术过<b>硬</b></p>
                </div>
              </div>
            </div>
            <div class="about-map">
              <iframe src="/partials/map.html" style="width: 100%; height: 236px;"></iframe>
            </div>
            <div class="about-project">
              <router-link to="/project" class="project-link">
                <p class="title">To my Project</p>
                <p class="item">前去了解更多关于我的开源项目的进展</p>
                <p class="item">オープンソースプロジェクトの進捗状況を理解するために、</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    head: {
      title: 'About'
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {

    .detail {
      margin-bottom: 1em;

      .content {
        width: 100%;
        overflow:  hidden;

        .about {

          .about-me {
            width: 100%;
            height: auto;
            padding: 2em 3em;
            margin-bottom: 1em;
            background-color: $module-bg;
            overflow: hidden;

            &:before {
              content: "";
              display: block;
              border-width: 0 13em 12em 0;
              border-color: transparent rgba(238,238,238,0.7) transparent transparent;
              background: transparent;
              border-style: solid;
              width: 0;
              position: absolute;
              top: 0;
              right: 0;
              z-index: 2;
              opacity: .6;
            }

            .gravatar {
              position: absolute;
              right: 4em;
              top: 4em;
              width: 14em;
              height: 14em;
              padding: .3em;
              border: 1px dashed #ccc;
              opacity: .8;
              @include css3-prefix(transition, transform .7s);

              img {
                max-width: 100%;
              }

              &:hover {
                @include css3-prefix(transform, rotate(2deg) scale(1.1));
              }
            }

            .item {
              line-height: 2.5em;
              min-height: 2.5em;

              &:last-child {
                margin-bottom: 0;
              }

              .iconfont {
                margin-right: 2em;
                display: inline-block;
                color: #777;
                font-size: 1em;
                float: left;
              }

              .skills {
                float: left;
              }
            }
          }

          .about-map {
            width: 100%;
            padding: .5em;
            margin-bottom: 1em;
            overflow: hidden;
            background-color: $module-bg;
          }

          .about-project {
            width: 100%;
            height: 14em;
            padding: .5em;
            overflow: hidden;
            background-color: $module-bg;

            .project-link {
              height: 13em;
              padding-top: 1.5em;
              display: block;
              text-align: center;

              &:hover {
                background-color: $module-hover-bg;
              }

              .title {
                margin-bottom: .5em;
                font-size: 3em;
                text-transform: uppercase;
              }
            }
          }
        }
      }
    }
  }
</style>
