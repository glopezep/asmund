const Sequelize = require('sequelize')
const setupSequelize = require('../lib/setupSequelize')

module.exports = (options) => {
  const sequelize = setupSequelize(options)

  return sequelize.define('user', {
    id: {
      type: Sequelize.CHAR(36),
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    paranoid: true,
    indexes: [
      { unique: true, fields: ['email'] },
      { unique: true, fields: ['username'] }
    ]
  })
}
