const path = require('path')

const tasks = (gulp, options, plugins) => {
  const dest = path.join(options.dest, 'static')
  return gulp.task('static', () => {
    gulp.src(path.join(options.root, 'static/**/*.*'))
      // .pipe(plugins.changed(dest))
      .pipe(gulp.dest(path.join(dest)))
  })
}

module.exports = tasks
