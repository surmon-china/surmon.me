<template>
  <div class="page">
    <div class="detail">
      <div class="content">
        <div class="about">
            <div class="about-all">
              <div class="about-me">
                <div class="gravatar">
                  <img src="/static/images/gravatar.jpg">
                </div>
                <p class="item">
                  <i class="iconfont icon-user"></i>
                  <span>I'm Surmon, a (95后) (小) javascript (鲜) stack (肉) developer.</span>
                </p>
                <p class="item">
                  <i class="iconfont icon-mail"></i>
                  <span><a href="mailto:surmon@foxmail.com" target="_blank" rel="nofollow">Surmon@foxmail.com</a></span>
                </p>
                <p class="item">
                  <i class="iconfont icon-tabcomment"></i>
                  <span>大本营：<a href="http://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4" target="_blank" rel="nofollow">288325802</a></span>
                </p>
                <p class="item">
                  <i class="iconfont icon-qq"></i>
                  <span>欢迎西安的同学请我喝(yue)咖(...)啡</span>
                </p>
                <p class="item">
                  <i class="iconfont icon-github"></i>
                  <span><a href="https://github.com/surmon-china" target="_blank" rel="nofollow">爱我就给我Star</a></span>
                </p>
                <p class="item">
                  <i class="iconfont icon-music"></i>
                  <span>Folk, Jazz-HipHop, EM, Rock, PostRock, New Age</a></span>
                </p>
                <div class="item">
                  <i class="iconfont icon-code"></i>
                  <div class="skills">
                    <p>差不多精通：H5/CSS, JQuery, Ps, Bootstrap</p>
                    <p>基本上擅长：Js, ES6, Angular.js, Ng2, Vue2, Weex, RN, Native Script</p>
                    <p>服务端实践：PHP, Wordpress, Node.js, Express, MongoDB</p>
                    <p>工程实践：Grunt, Gulp, Webpack, npm, babel</p>
                    <p>比较关注：WebVR, WebRTC, WebComponent, Service Worker...</p>
                    <p>平时关注：社工... 偶尔找找漏洞，扒扒别人，写一写小脚本什么的...</p>
                    <div>有一颗环游世界的心</div>
                  </div>
                </div>
              </div>
              <div class="about-map">
                <iframe src="http://localhost:8080/static/partials/map.html" style="width: 100%; height: 236px;"></iframe>
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
    name: 'about'
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/mixins';
  @import '../../sass/variables';
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
