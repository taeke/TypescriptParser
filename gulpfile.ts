/// <reference path='typings/tsd.d.ts' />
import * as GulpTypescript from 'gulp-typescript';
var gulp: gulp.Gulp = require('gulp');
var Server = require('karma').Server;

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

gulp.task('test', ['compileSpecs'], (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();    
});

gulp.task('watch', ['test'], () => {
   gulp.watch('specs/ts/**/*.ts', ['test']);
   gulp.watch('src/ts/**/*.ts', ['compileSrc']); 
});

gulp.task('default', ['watch']);