var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

gulp.task('uglify',function() {
    gulp.src("mylogger.js")
        .pipe(uglify({
            mangle:false,//类型：Boolean 默认：true 是否修改变量名
            compress:true//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(rename({suffix: '.min'}))
        .on('error', function(err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(gulp.dest('./dest'));
});

gulp.task('default',['uglify']);