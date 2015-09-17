/// <reference path='typings/tsd.d.ts' />
import * as GulpTypescript from 'gulp-typescript';
var gulp: gulp.Gulp = require('gulp');

gulp.task('compileSpecs', ['compileSrc'], () => {
    var tsResult = gulp.src('specs/ts/**/*.ts')
        .pipe(GulpTypescript({
            noImplicitAny: true,
            module: 'commonjs'
         }));
    return tsResult.js.pipe(gulp.dest('./specs/js/'));
});


gulp.task('compileSrc', () => {
    var tsResult = gulp.src('src/ts/**/*.ts')
        .pipe(GulpTypescript({
            noImplicitAny: true,
            module: 'commonjs'
         }));
    return tsResult.js.pipe(gulp.dest('./src/js/'));
});

gulp.task('watch', ['compileSpecs'], () => {
   gulp.watch('specs/ts/**/*.ts', ['compileSpecs']);
   gulp.watch('src/ts/**/*.ts', ['compileSrc']); 
});

gulp.task('default', ['watch']);