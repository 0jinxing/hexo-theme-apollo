const path = require("path");
const fs = require("fs");
const sass = require("sass");

function debounce(fn, wait) {
  let timer = 0;
  return () => {
    if (!!timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), wait);
  };
}

const input = path.join(__dirname, "src", "scss", "apollo.scss");
const output = path.join(__dirname, "source", "style", "apollo.css");

function build() {
  sass.render({ file: input, outputStyle: "compressed" }, (error, result) => {
    if (error) throw error;
    fs.writeFile(output, result.css, error => {
      if (error) throw error;
    });
  });
  console.log("build done");
}

function watch() {
  console.log("start watch");
  const debounceBuild = debounce(build, 5000);
  fs.watch("./src", { recursive: true }, (event, file) => {
    debounceBuild();
  });
}

const operate = {
  "--build": build,
  "--watch": watch
};

for (const key of process.argv) {
  if (key in operate) operate[key].call();
}
