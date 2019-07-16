"use strict";

var gulp = require("gulp");

// adding gulp simple hello task
gulp.task("hello", function() {
  console.log("hi there!");
});

// adding gulp default task in parallel with devs task hello
gulp.task(
  "default",
  gulp.parallel("hello", function() {
    console.log("default task running!");
  })
);
