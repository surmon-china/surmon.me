// 引入 gulp及组件
const gulp        = require('gulp');                       //基础库
const sass        = require('gulp-sass');                 //sass
const minifycss   = require('gulp-minify-css');          //css压缩
const rename      = require('gulp-rename');           //重命名
const notify      = require("gulp-notify");       //消息提醒
const sourcemaps  = require("gulp-sourcemaps");  //资源地图
const shell       = require('gulp-shell');


gulp.task('Sass', function () {
  var css_src = './sass/bootstrap.scss';
  var css_dst = './static/';
  console.log('开始处理Scss文件编译');
  return gulp.src(css_src)
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(sourcemaps.write())
  .on('error', sass.logError)
  // .pipe(gulp.dest(css_dst))
  .pipe(rename({ basename: 'bootstrap' }))
  .pipe(gulp.dest(css_dst))
  .pipe(minifycss())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(css_dst))
  .pipe(notify({ message: 'Sass文件编译完成' }))
});

// Css合并压缩
// gulp.task('Sass', shell.task(['sass --style compressed sass/bootstrap.scss static/bootstrap.css']));

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

  console.log('开始启用Gulp监听服务');

  // 监听Sass
  gulp.watch('./sass/**/*.scss', function(){
    console.log('监听到Scss文件发生变动');
    gulp.start('Sass');
  });
});

// 默认任务/启动监听
gulp.task('default', ['watch']);