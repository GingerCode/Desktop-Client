'use strict';

const gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    debug = require('gulp-debug'),
    exec = require('child_process').exec;

gulp.task("dist", function(){
    return gulp.src("build/**.zip")
        .pipe(debug({title: 'dist (Scope):'}))
        .pipe(gulp.dest('dist'));
})

gulp.task('zip', function (cb) {
    exec("find ./build -type f -name \"*.zip\" -delete && for i in build/*; do zip -r \"${i%/}.zip\" \"$i\"; done", function (err, stdout, stderr) {
        // Long log better to avoid if not needed:
        // if(stdout) console.log("[ZIP TASK stdout]:", stdout);
        if(stderr) console.log("[ZIP TASK stderr]:", stderr);
        cb(err);
    });
})



gulp.task('lint', function() {
    var filesToLint = [
        '**/*.js',
        '!tests/protractor.conf.js',
        '!dist/**/*',
        '!docs/**/*',
        '!node_modules/**/*',
        '!tmp/**/*',
        '!coverage/**/*'
    ];

    return gulp.src(filesToLint)
                .pipe(debug({title: 'eslint (Scope):'}))
                .pipe(eslint())
                .pipe(eslint({fix:true}))
                .pipe(eslint.format())
                .pipe(gulp.dest('.'));
});
