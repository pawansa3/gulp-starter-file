"use strict";

var gulp = require("gulp"),
  gulpConcat = require("gulp-concat"),
  gulpUglify = require("gulp-uglify");

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
gulp.task("minifyScripts", function() {
  gulp
    .src("js/app.js")
    .pipe(gulpUglify())
    .pipe(gulp.dest("js"));
});

// adding gulp default task in parallel with devs task hello
gulp.task(
  "default",
  gulp.parallel("hello", function() {
    console.log("default task running!");
  })
);
