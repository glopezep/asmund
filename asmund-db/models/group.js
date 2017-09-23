const Sequelize = require('sequelize')
const setupSequelize = require('../lib/setupSequelize')

module.exports = (options) => {
  const sequelize = setupSequelize(options)

  return sequelize.define('group', {
    id: {
      type: Sequelize.CHAR(36),
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    paranoid: true,
    indexes: [
      { unique: true, fields: ['name'] }
    ]
  })
}
