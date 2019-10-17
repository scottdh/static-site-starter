const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// compile scss into css
function style() {
  return (
    gulp
      //1. location of scss files
      .src("./scss/**/*.scss")
      //2. pass those files through the sass compiler. If there's an error, log this to the console.
      .pipe(sass().on("error", sass.logError))
      //3. pipe it to location of compiled css
      .pipe(gulp.dest("./src/css"))
      //4. stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

function dev() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./src/**/*.html").on("change", browserSync.reload);
  gulp.watch("./src/**/*.js").on("change", browserSync.reload);
}

function build() {
  return (
    gulp
      //1. location of all source files
      .src("src/**")
      //2. pass those files to the dist folder for production
      .pipe(gulp.dest("dist/"))
  );
}

exports.style = style;
// "gulp dev" during development
exports.dev = dev;
