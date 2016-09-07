'use strict';
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;


const config = {
  'dist': path.join(__dirname, 'dist'),
  'src': path.join(__dirname, 'src'),
  'task': path.join(__dirname, 'task'),
};

gulp.task('server',function () {
  browserSync.init({
    port: 9000,
    startPath: '/?debug',
    server: {
      baseDir: './dist/'
    }
  })
  gulp.watch(path.join(config.dist, '*.html')).on('change',reload);
});
gulp.task('copy_js',function(){
	gulp.src(path.join(config.src,'js/*.js'),{base:config.src})
	.pipe(gulp.dest(config.dist))
});
gulp.task('copy_css',function(){
	gulp.src(path.join(config.src,'css/*.css'),{base:config.src})
	.pipe(gulp.dest(config.dist))
});
gulp.task('copy_font',function(){
	gulp.src(path.join(config.src,'fonts/*'),{base:config.src})
	.pipe(gulp.dest(config.dist))
});
gulp.task('copy_html',function(){
	gulp.src(path.join(__dirname, '*.html'))
	.pipe(gulp.dest(config.dist))
});

gulp.task('copy',['copy_js','copy_css','copy_font','copy_html'],function(){

});
gulp.task('default',['copy','server'],function () {
  gulp.watch('src/**/*', ['copy']);
  gulp.watch('*.html', ['copy_html']);
  //gulp.watch('src/snippets/**/*.html', ['tmpl2js']);
  //gulp.watch(path.join(config.src, 'templates/*.html'),['velocity']);
});
