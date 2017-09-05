const path = require('path')
const browserSync = require('browser-sync')
const sequence = require('run-sequence')

const tasks = (gulp, options, plugins) => {

  const watch = plugins.watch
  let bs

  gulp.task('serve:dev', (done) => {
    bs = browserSync.init({
      server: options.dest,
      middleware: options.gulpMem.middleware
    })
    done()
  })

  gulp.task('reload:styles', () => {
    return bs.reload(path.join(options.dest, 'css/main.css'))
  })

  gulp.task('reload:js', () => {
    return bs.reload(path.join(options.dest, 'js/main.js'))
  })

  gulp.task('reload:images', () => {
    return bs.reload(path.join(options.dest, 'img/**/*.*'))
  })

  gulp.task('watch', (done) => {
    watch('js/**/*.js', () => {
      sequence('js:dev', 'reload:js')
    })
    watch('styles/**/*.scss', () => {
      sequence('styles:dev', 'reload:styles')
    })
    watch('img/**/*.*', (file) => {
      sequence('images:dev', 'reload:images')
    })
    done()
  })
}

module.exports = tasks
