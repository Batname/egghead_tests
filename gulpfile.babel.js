import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import minimist from 'minimist';
import _ from 'lodash';
import gutil from 'gutil';
import jade from 'gulp-jade';
import webpackConf from './webpack.config.js';


gulp.task('templates:index', function() {
  gulp.src("./assets/**/*.jade")
  .pipe(jade({}))
  .pipe(gulp.dest("./dist/"));
});

var customConf = _.create(webpackConf, {
  devtool: "sourcemap",
  dubug: true
});
var devCompiler = webpack(customConf);
gulp.task("webpack:dev", function(callback) {
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:dev", err);
    gutil.log("[webpack:dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("dev", [ 'templates:index', "webpack:dev"]);

gulp.task("default", ["dev"], function(){
  gulp.watch(["assets/**/*"], ["dev"]);
});