const path = require('path')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const gulpNotify = require('gulp-notify')
const loadTasks = require('load-gulp-tasks')
const sequence = require('run-sequence')

const root = process.cwd()
const dest = path.join(root, 'build')
const options = {
  dest: dest,
  root: root
}

/**
 * build to in-memory file system for development
 */
if (process.env.NODE_ENV !== 'production') {
  const GulpMem = require('gulp-mem')
  const gulpMem = new GulpMem()
  gulpMem.serveBasePath = dest
  gulpMem.enableLog = false
  options.gulpMem = gulpMem
  gulp.dest = gulpMem.dest

  /**
   * insert plumber into every gulp.src stream for error handling
   */
  const _gulpsrc = gulp.src
  gulp.src = function (...args) {
    return _gulpsrc.apply(gulp, args)
    .pipe(plumber({
      errorHandler: (err) => {
        gulpNotify.onError({
          title: 'Gulp Error',
          message: 'Error: <%= error.message %>'
        })(err)
        this.emit('end')
      }
    }))
  }
}

/**
 * assumes tasks are in './tasks' by default
 */
loadTasks(gulp, options)

gulp.task('default', (done) => {
  sequence(['html', 'js:dev', 'styles:dev', 'images:dev'], 'serve:dev', 'watch')
  done()
})

gulp.task('build', (done) => {
  sequence('clean', ['html', 'js:prod', 'styles:prod','images:prod'])
  done()
})
