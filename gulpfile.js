// var gulp = require ('gulp');
// var browserSync = require('browser-sync').create();
//
// gulp.task('browserSync', function() {
//     browserSync.init ( {
//         server: {
//             baseDir: "./"
//         }
//     });
// });
//
// gulp.task('serve', ['browserSync'], function(){
//     gulp.watch("*.html").on('change', browserSync.reload);
//     gulp.watch("css/*.css").on('change', browserSync.reload);
// });
//
// gulp.task('default', ['serve']);

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init ( {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
  return gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./css/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('serve', ['sass', 'browserSync'], function(){
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("./css/**/*.scss", ['sass']);
    // gulp.watch("css/*.css").on('change', browserSync.reload);
});

// gulp.task('default', ['sass:watch']);
gulp.task('default', ['serve']);
