(function() {
  var html = document.querySelector(".jscontent");
  html.append("This is a library. It should be the first file.");
  console.log("This is a library. It should be the first file");
})();

(function() {
  var html = document.querySelector(".jscontent");
  html.append("This is another library. It should be the second file.");
  console.log("This is another library. It should be the second file");
})();

var html = document.querySelector(".jscontent");
html.append("This is the Main.js file. It should be the 3rd and final file.");
console.log("This is the Main.js file. It should be the 3rd and final file");

//# sourceMappingURL=app.js.map
