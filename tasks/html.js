
const tasks = (gulp, options, plugins) => {
  gulp.task('html', () => {
    return gulp.src('**/*.html')
      .pipe(gulp.dest(options.dest))
  })
}

module.exports = tasks
