const path = require('path')
const fs = require('fs-extra')

const tasks = (gulp, options, plugins) => {
  gulp.task('clean', (done) => {
    fs.remove(options.dest)
      .then(() => {
        done()
      })
      .catch(err => {
        console.error(err)
      })
  })
}

module.exports = tasks