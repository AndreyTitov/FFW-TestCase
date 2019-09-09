'use strict';
var gulp 				= require('gulp'),
	sass 				= require('gulp-sass'),
	plumber 			= require('gulp-plumber'),
	autoprefixer 		= require('gulp-autoprefixer'),
	csso 				= require('gulp-csso'),
	rename 				= require('gulp-rename'),
	browserSync 		= require('browser-sync'),
	browserify 			= require('gulp-browserify'),
	uglify 				= require('gulp-uglify-es').default,
	concat 				= require('gulp-concat'), 
	imagemin 			= require('gulp-imagemin');


gulp.task('compress', function () {
	gulp.src('dist/img/**/')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/imgNew/'))
});

gulp.task('browser-sync', function () {

	browserSync({
		server: {
			baseDir: './dist'
		},
		notify: false
	});
});


gulp.task('css', function () {
	return gulp.src('src/scss/main.scss')
		.pipe(plumber())
		.pipe(sass()) 
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(csso())
		.pipe(rename({
			extname: '.css',
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
});

gulp.task('js', function () {
	return gulp.src('src/js/*.js')
		.pipe(plumber())
		.pipe(browserify({
			debug: false
		}))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

gulp.task('reload', function(){
    browserSync.reload()
})

gulp.task('watch', gulp.parallel('css', 'js', 'browser-sync', function () {
	gulp.watch('src/scss/**/*.scss', gulp.series('css'));
	gulp.watch('src/js/*.js', gulp.series('js'));
	gulp.watch('dist/*.html', gulp.series('reload'));
}));