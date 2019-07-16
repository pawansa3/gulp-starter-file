"use strict";

var gulp = require("gulp"),
  gulpConcat = require("gulp-concat"),
  gulpUglify = require("gulp-uglify"),
  gulpRename = require("gulp-rename"),
  gulpSass = require("gulp-sass");

// adding gulp simple hello task
gulp.task("hello", function() {
  console.log("hi there!");
});

// scripts to concat all js code into app.js
gulp.task("concatScripts", function() {
  console.log("concating all javascripts file into app.js");
  gulp
    .src(["js/lib/lib1.js", "js/lib/lib2.js", "js/main.js"])
    .pipe(gulpConcat("app.js"))
    .pipe(gulp.dest("js"));
});

// gulp minify the app.js code
// gulp rename the minified app.js into app.min.js
gulp.task("minifyScripts", function() {
  gulp
    .src("js/app.js")
    .pipe(gulpUglify())
    .pipe(gulpRename("app.min.js"))
    .pipe(gulp.dest("js"));
});

// compile sass file to css file
gulp.task("compileSass", function() {
  gulp
    .src(["scss/style1.scss", "scss/style2.scss"])
    .pipe(gulpSass())
    .pipe(gulp.dest("css"));
});

// adding gulp default task in parallel with devs task hello
gulp.task(
  "default",
  gulp.parallel("hello", function() {
    console.log("default task running!");
  })
);
