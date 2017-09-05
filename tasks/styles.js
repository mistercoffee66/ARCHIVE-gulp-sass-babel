const path = require('path')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const tasks = (gulp, options, plugins) => {

  gulp.task('styles:dev', () => {
    return gulp.src(path.join(options.root, 'styles/main.scss'))
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss([
      autoprefixer({browsers: ['last 1 version','ie 10']})
    ]))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(options.dest, 'styles')))
  })

  gulp.task('styles:prod', () => {
    return gulp.src(path.join(options.root, 'styles/main.scss'))
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.postcss([
      autoprefixer({browsers: ['last 1 version','ie 10']}),
      cssnano({safe: true})
    ]))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(options.dest, 'styles')))
  })
}

module.exports = tasks
