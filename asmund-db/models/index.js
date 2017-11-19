const sequelizeImport = require('sequelize-import')

module.exports = function getModels (sequelize) {
  const options = {
    exclude: ['index.js']
  }

  const models = sequelizeImport(__dirname, sequelize, options)

  models.User.belongsTo(models.Group)
  models.Group.hasMany(models.User)

  return models
}
