var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade         = require('gulp-jade');
var concat       = require('gulp-concat');
var browserSync  = require('browser-sync').create();

gulp.task('styles', function () {
  return gulp.src('source/sass/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browser: ['last 2 version', '> 5%', 'ie9', 'ie10', 'android']
    }))
    .pipe(gulp.dest('app/css/'))
		.pipe(browserSync.stream());
});

gulp.task('templates', function () {
  return gulp.src('source/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
		.pipe(browserSync.stream());
});

gulp.task('script', function() {
  return gulp.src('source/js/*.js')
		.pipe(concat(
			'scripts.js'
		))
		.pipe(gulp.dest('app/js/'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('source/sass/**/*.scss', ['styles']);
  gulp.watch('source/sass/**/*.sass', ['styles']);
  gulp.watch('source/jade/**/*.jade', ['templates']);
  gulp.watch('source/js/*.js', ['script']);
});

gulp.task('browserSync', ['watch'], function() {
    browserSync.init({
        server: "app/"
    });
    gulp.watch('source/sass/**/*.scss', ['styles']);
    gulp.watch('source/sass/**/*.sass', ['styles']);
    gulp.watch('source/jade/**/*.jade', ['templates']);
    gulp.watch('source/js/*.js', ['script']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/css/*.css').on('change', browserSync.reload);
    gulp.watch('app/js/*.js').on('change', browserSync.reload);
});

gulp.task('default',['templates','styles','script','watch','browserSync'], function() {

});
