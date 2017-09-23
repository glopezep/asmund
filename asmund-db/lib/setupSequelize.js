const Sequelize = require('sequelize')

let sequelize = null

module.exports = function setupSequelize (options) {
  if (!sequelize) {
    sequelize = new Sequelize(options)
  }
  return sequelize
}
