/// <reference path='typings/tsd.d.ts' />
import * as GulpTypescript from 'gulp-typescript';
var gulp: gulp.Gulp = require('gulp');

gulp.task('compile', () => {
    var tsResult = gulp.src('specs/ts/**/*.ts')
        .pipe(GulpTypescript({
            noImplicitAny: true,
            module: 'commonjs'
         }));
    return tsResult.js.pipe(gulp.dest('./specs/js/'));
});

gulp.task('watch', ['compile'], () => {
   gulp.watch('specs/ts/**/*.ts', ['compile']); 
});

gulp.task('default', ['watch']);