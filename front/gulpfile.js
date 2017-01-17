//プラグインの読み込み
var gulp = require('gulp'); //gulp
var sass = require('gulp-sass'); //sassをコンパイル
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext'); //ブラウザ対応
var imagemin = require("gulp-imagemin")//画像圧縮

var paths = {
  'scss': 'src/scss/',
  'css': '../dist/css/'
}

//gulpのタスク
gulp.task('default', function () {

  return gulp.watch('*.scss',['css']);
});

gulp.task('css', function () {
    return gulp.src('*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../dest/css'));
});

//まじむり
gulp.task("imageMinTask", function() {
  // imagesフォルダー以下のpng画像を取得
  gulp.src("images/*.png")
    .pipe(imagemin()) // 画像の圧縮処理を実行
    .pipe(gulp.dest("minified_images/")); // minified_imagesフォルダー以下に保存
});
