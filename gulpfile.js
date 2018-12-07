const gulp = require('gulp')  // 引入gulp
const sass = require('gulp-sass') // 编译sass
const rename = require('gulp-rename')  // 用于将scss编译后的.css文件改名成.mxss
const postcss = require('gulp-postcss')  // 处理css                
const pxtorpx = require('postcss-px2rpx') // 再postcss下的将px转为rpx
const sourcemaps = require('gulp-sourcemaps') // 用于开发环境记录生成文件中的每一条语句在源文件中的对应位置，方便调试
const babel = require('gulp-babel')
const hasFlag = require('has-flag') // 获取npm命令执行时的参数，来判断不同环境
const through = require('through2')  // 处理node的stream
const cssnano = require('gulp-cssnano') // 在PostCSS生态系统之上的css压缩工具
const uglify = require('gulp-uglify') // 压缩JS
const del = require('del')  // 删除文件和文件夹
const runSequence = require('run-sequence') // 按指定顺序运行一组gulp任务
const debug = require('gulp-debug') // 显示什么文件正通过管道

const src = './client'
const dist = './dist'

const isProd = hasFlag('ENV=prod')

// 处理sass
gulp.task('wxss', () => gulp.src(`${src}/**/*.{wxss,scss}`)
  .pipe(debug({title: '编译sass:'}))
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([pxtorpx()]))
  .pipe(isProd ? cssnano() : through.obj())
  .pipe(rename({
    extname:'.wxss'
  }))
  .pipe(gulp.dest(`${dist}/miniprogram`))
)

// 处理JS
gulp.task('js', () => gulp.src(`${src}/**/*.js`)
  .pipe(debug({title: '处理js:'}))
  .pipe(isProd ? through.obj() : sourcemaps.init())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(isProd ? uglify() : through.obj())
  .pipe(isProd ? through.obj() : sourcemaps.write())
  .pipe(gulp.dest(`${dist}/miniprogram`))
)

// 处理wxml
gulp.task('wxml', () => gulp.src(`${src}/**/*.wxml`)
  .pipe(debug({title: '处理wxml:'}))
  .pipe(gulp.dest(`${dist}/miniprogram`))
)

// 处理json
gulp.task('json', () => gulp.src(`${src}/**/*.json`)
  .pipe(debug({title: '处理json:'}))
  .pipe(gulp.dest(`${dist}/miniprogram`))
)

// 处理图片
gulp.task('images', () => gulp.src(`${src}/**/.{png,jpg,gif,webp}`)
  .pipe(debug({title: '处理图片:'}))
  .pipe(gulp.dest(`${dist}/miniprogram`))
)

// 删除dist
gulp.task('delete', () => del(['./dist/**']))

gulp.task('watch',() => {
  gulp.watch(`${src}/**/*.{wxss,scss}`,['wxss'])
  gulp.watch(`${src}/**/*.js`,['js'])
  gulp.watch(`${src}/**/*.wxml`,['wxml'])
  gulp.watch(`${src}/**/*.json`,['json'])
  gulp.watch(`${src}/**/.{png,jpg,gif,webp}`,['images'])
})

gulp.task('dev',['delete'],() => {
  runSequence('wxss','js','wxml','json','images','watch')
})
gulp.task('buld',['delete'], () => {
  runSequence('wxss','js','wxml','json','images')
})