//package

const gulp = require('gulp');//gulpを入れる
const sass = require('gulp-sass');//sassをコンパイルするパッケージ
const sassLint = require('gulp-sass-lint');//sass-lint
const csso = require('gulp-csso');//cssを少量化,インライン化
const autoprefixer = require('gulp-autoprefixer');//can I useで判断しベンダープレフィックスをつけてくれるパッケージ
const imagemin = require('gulp-imagemin');//画像を圧縮するためのプラグイン
const frontNote = require('gulp-frontnote'); //スタイルガイド作成

//path
const SCSS_SRC = './src/scss/**/*.scss';
const CSS_DIST = '../dist/css';

//task
//default(gulpって打ったときの処理)
gulp.task('default', function(){
  //監視するタスク
  gulp.watch(SCSS_SRC, ['style']);
});

//'gulp style'
//sassを手動でコンパイル
gulp.task('style', function(){
  gulp.src(SCSS_SRC)//コンパイルするファイルを指定
    .pipe(sass())// sassをcssにコンパイル
    .pipe(sassLint({'config': '.scss-lint.yml'}))//lint
    .pipe(sassLint.format()) //sassLintの
    .pipe(sassLint.failOnError()) //sassLintの
    //ベンダープレフィックスをつける
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'], //対応
        cascade: false
    }))
    //cssの最適化
    .pipe(csso())
    .pipe(gulp.dest(CSS_DIST)) //吐き出す場所を指定
});

//'gulp img'
//画像を圧縮する
gulp.task('img', function(){
  //jpg画像の圧縮
  gulp.src('./src/images/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('../dist/images'));
  //png画像の圧縮
  gulp.src('./src/images/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('../dist/images'));
})

//gulp guide
gulp.task('guide',function(){
  gulp.src(SCSS_SRC)
    .pipe(frontNote({
      //どこにかきだすか
      out: '../guide'
    }))
})
　
