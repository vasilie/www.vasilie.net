// /////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    reload = browserSync.reload;

// /////////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////////

gulp.task("scripts",function(){
    gulp.src([
    ])
    .pipe(concat('main.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('/assets/js'))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Styles Task
// /////////////////////////////////////////////////

gulp.task("styles",function(){
    gulp.src("sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      style:"compressed"
    }))
    .pipe(gulp.dest("assets/css/"))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////////

gulp.task("html", function(){
    gulp.src("/**/*.html")
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////////////
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir:"./"
    }
  })
});

// /////////////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////////////

gulp.task("watch",function(){
  gulp.watch("/js/**/*.js",['scripts']);
  gulp.watch("sass/**/*.scss",['styles']);
  gulp.watch("/**/*.html",['html']);
});


// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////
gulp.task("default",[ 'scripts','styles', 'html', 'browser-sync', 'watch']);
