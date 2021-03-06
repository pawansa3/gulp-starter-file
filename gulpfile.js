"use strict";

var gulp = require("gulp"),
  gulpConcat = require("gulp-concat"),
  gulpUglify = require("gulp-uglify"),
  gulpRename = require("gulp-rename"),
  gulpSass = require("gulp-sass"),
  gulpMaps = require("gulp-sourcemaps"),
  gulpDel = require("del");

// adding gulp simple hello task
// gulp.task("hello", function() {
//   console.log("hi there!");
// });

// scripts to concat all js code into app.js
//   console.log("concating all javascripts file into app.js");
gulp.task("concatScripts", function() {
  return gulp
    .src(["js/lib/lib1.js", "js/lib/lib2.js", "js/main.js"])
    .pipe(gulpMaps.init())
    .pipe(gulpConcat("app.js"))
    .pipe(gulpMaps.write("./"))
    .pipe(gulp.dest("js"));
});

// gulp minify the app.js code
// gulp rename the minified app.js into app.min.js
gulp.task(
  "minifyScripts",
  gulp.series("concatScripts", function() {
    return gulp
      .src("js/app.js")
      .pipe(gulpUglify())
      .pipe(gulpRename("app.min.js"))
      .pipe(gulp.dest("js"));
  })
);

// compile sass file to css file
gulp.task("compileSass", function() {
  return gulp
    .src(["scss/style1.scss", "scss/style2.scss"])
    .pipe(gulpMaps.init())
    .pipe(gulpSass())
    .pipe(gulpMaps.write("./"))
    .pipe(gulp.dest("css"));
});

// creating watch task to check for file changes
gulp.task("watchFiles", function() {
  gulp.watch(["scss/**/*.scss", "scss/*.scss"], gulp.parallel("compileSass"));
  gulp.watch(["js/**/*.js"], gulp.parallel("concatScripts"));
});

//build pipeline and development build to dist folder

// creating dist folder task
gulp.task("create-dist", function() {
  return gulp
    .src(["index.html", "css/*.css", "js/app*.js", "images/**", "fonts/**"], {
      base: "."
    })
    .pipe(gulp.dest("dist"));
});

// creating build task
gulp.task(
  "build",
  gulp.series(gulp.parallel(["minifyScripts", "compileSass"]), "create-dist")
);

// creating clean task to clean dist folder
gulp.task("clean", function(done) {
  gulpDel(["dist", "css/*.css*", "js/app*.js*"]);
  done();
});

gulp.task("serve", gulp.parallel("watchFiles"));

// adding gulp default task in parallel with devs task hello
gulp.task(
  "default",
  gulp.series("clean", "build", function(done) {
    done();
  })
);

// gulp 4.0 changes in gulp.series() & gulp.parallel() shown eg.

// gulp task
gulp.task("b", function b(done) {
  console.log("task b");
  done();
});

gulp.task("c", function c(done) {
  console.log("task c");
  done();
});

// in gulp 3.0 version
// gulp.task("a", ["b", "c"], function() {
//   console.log("task a");
//   //do something
// });

// in gulp 4.0 version
// here a task is dependent on b & c task so
// a task is in series with the b & c task and
// b & c task are in parallel as they are not dependent to each other
gulp.task(
  "a",
  gulp.series(gulp.parallel("b", "c"), function a(done) {
    console.log("task a");
    done();
  })
);
