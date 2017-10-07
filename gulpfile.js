//DEPENDENCIAS
var gulp = require('gulp');
connect = require('gulp-connect-php');
browserSync = require('browser-sync');
sass = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
sourcemaps = require('gulp-sourcemaps');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
pump = require('pump');
phpMinify = require('@aquafadas/gulp-php-minify'); //Out;
phpcs = require('gulp-phpcs'); //Out

// Static Server + watching scss/html files
gulp.task('default', function() {
    connect.server({}, function() {
        browserSync({
            proxy: 'localhost/declima-website/www/'
        });
    });
    gulp.watch('./www/*.php').on('change', browserSync.reload); //OBS PHP FILES
    gulp.watch('./www/js/*.js', ['javascript']).on('change', browserSync.reload); //OBS JAVASCRIPT FILES
    gulp.watch('./scss/**/*.scss', ['sass']); //OBS SASS FILES
});


//Javascript Minify
gulp.task('javascript', function(cb) {
    pump([
            gulp.src('./www/js/*.js'),
            uglify(),
            gulp.dest('./www/js/dist')
        ],
        cb
    );
});

//Sass Compile
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({ outputStyle: ['compact'] }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./www/css'))
        .pipe(browserSync.stream());
});