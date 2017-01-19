//使うパッケージを管理
var gulp = require('gulp');//gulpを入れる
var sass = require('gulp-sass');//sassをコンパイルするパッケージ
const sassLint = require('gulp-sass-lint');//sass-lint

//task
//default(gulpって打ったときの処理)
gulp.task('default', function(){
  //監視するタスク
  gulp.watch('./src/scss/**/*.scss', ['style']);
});

//sassを手動でコンパイル
gulp.task('style', function(){
  gulp.src(['./src/scss/**/*.scss'])//コンパイルするファイルを指定
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass())// sassをcssにコンパイル
    .pipe(gulp.dest('../dist/css')) //吐き出す場所を指定
});
