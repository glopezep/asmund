const Db = require('./asmund-db')

exports.setupDatabase = async function setupDatabase(options) {
  return new Db(options)
}
