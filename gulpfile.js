"use strict";

var gulp = require("gulp"),
  gulpConcat = require("gulp-concat"),
  gulpUglify = require("gulp-uglify"),
  gulpRename = require("gulp-rename"),
  gulpSass = require("gulp-sass"),
  gulpMaps = require("gulp-sourcemaps");

// adding gulp simple hello task
gulp.task("hello", function() {
  console.log("hi there!");
});

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
gulp.task("watchSass", function() {
  gulp.watch(["scss/**/*.scss", "scss/*.scss"], gulp.parallel("compileSass"));
});

// creating build task
gulp.task("build", gulp.parallel(["minifyScripts", "compileSass"]));

// adding gulp default task in parallel with devs task hello
gulp.task(
  "default",
  gulp.parallel("build", function() {
    console.log("default task running!");
  })
);
