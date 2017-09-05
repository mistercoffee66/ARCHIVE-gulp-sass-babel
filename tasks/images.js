const path = require('path')

const tasks = (gulp, options, plugins) => {
  const dest = path.join(options.dest, 'img')
  gulp.task('images:dev', () => {
    return gulp.src(path.join(options.root, 'img/**/*.{jpg,gif,png,svg}'))
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(dest))
  })

  gulp.task('images:prod', () => {
    return gulp.src(path.join(options.root, 'img/**/*.{jpg,gif,png,svg}'))
      // .pipe(plugins.changed(dest))
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(dest))
  })
}

module.exports = tasks