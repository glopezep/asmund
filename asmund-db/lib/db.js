const Promise = require('bluebird')
const utils = require('asmund-utils')
const setupSequelize = require('./setupSequelize')
const getModels = require('../models/')

class Db {
  constructor (options) {
    this.models = getModels(options)
    this.sequelize = setupSequelize(options)
  }

  async saveUser (user, callback) {
    if (!user) {
      return Promise.reject(new Error('user is not nullable')).asCallback(callback)
    }

    user.password = utils.encrypt(user.password)

    const created = await this.models.User.create(user).catch(utils.handleFatalError)
    return Promise.resolve(created).asCallback(callback)
  }

  async getUser (username, callback) {
    if (!username) {
      return Promise.reject(new Error('username is not nullable')).asCallback(callback)
    }

    const user = await this.models.User.findOne({
      where: { username },
      include: [ { all: true, nested: true } ]
    }).catch(utils.handleFatalError)

    if (!user) {
      return Promise.reject(new Error('not found')).asCallback(callback)
    }

    return Promise.resolve(user).asCallback(callback)
  }

  async setup (callback) {
    await this.sequelize.sync().catch(this.handleFatalError)
    return Promise.resolve('Setup completed').asCallback(callback)
  }

  async drop (callback) {
    await this.sequelize.drop().catch(this.handleFatalError)
    return Promise.resolve('Drop completed')
  }
}

module.exports = Db
