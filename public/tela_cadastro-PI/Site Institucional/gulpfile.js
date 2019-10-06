var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//Compilar Sass
gulp.task('sass', function() {
    
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());

})

// Mover JS para src/js
gulp.task('js', function() {

    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 
    'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());

});

//Servidor para olhar os HTML/SCSS
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['js', 'serve']);

/*
//gulp.task('serve', ['sass'], function() {
gulp.task('serve', gulp.parallel('sass'), function(){

//gulp.task('default', ['js','serve']);
gulp.task('default', gulp.series('js', 'serve'));

Espero ter ajudado! :)

*/