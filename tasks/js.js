const path = require('path')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')

const tasks = (gulp, options, plugins) => {
  gulp.task('js:dev', () => {
    const b = browserify({
      entries: path.join(options.root, 'js/index.js'),
      debug: true,
      transform: [['babelify', { 'presets': ['es2015'] }]]
    })

    return b.bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(plugins.sourcemaps.init({loadMaps: true}))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(path.join(options.dest, 'js')))
  })

  gulp.task('js:prod', () => {
    const b = browserify({
      entries: path.join(options.root, 'js/index.js'),
      debug: false,
      transform: [['babelify', { 'presets': ['es2015'] }]]
    })

    return b.bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(plugins.uglify())
      .pipe(gulp.dest(path.join(options.dest, 'js')))
  })
}

module.exports = tasks