var gulp = require('gulp'),
    webpack = require("webpack"),
    gutil = require("gutil"),
    _ = require("lodash"),
    jade = require("gulp-jade"),
    webpackConf = require("./webpack.config.js");


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