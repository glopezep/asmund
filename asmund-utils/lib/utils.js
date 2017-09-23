const crypto = require('crypto')
const chalk = require('chalk')

exports.encrypt = function encrypt (password) {
  const hash = crypto.createHash('sha256').update(password)
  return hash.digest('hex')
}

exports.handleFatalError = function handleFatalError (err) {
  console.log(`${chalk.red('[fatal error]')} ${err.message}`)
  console.log(err.stack)
  process.exit(1)
}

exports.handleError = function handleError (err) {
  console.log(`${chalk.red('[error]')} ${err.message}`)
  console.log(err.stack)
}
