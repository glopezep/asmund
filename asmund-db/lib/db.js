const Promise = require('bluebird')
const utils = require('../../asmund-utils')
const setupSequelize = require('./setupSequelize')
const getModels = require('../models/')

class Db {
  constructor (options) {
    this.options = options || {
      database: process.env.DB_NAME || 'asmund',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      }
    }
    this.models = getModels(this.options)
    this.sequelize = setupSequelize(this.options)
  }

  async saveGroup (group, callback) {
    try {
      if (!group) throw new Error('group is not nullable')
      const created = await this.models.Group.create(group)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }
  async getGroup (id, callback) {
    try {
      if (!id) throw new Error('group id is not nullable')
      const group = await this.models.Group.findOne({
        where: { id },
        include: [ { all: true, nested: true } ]
      })
      if (!group) throw new Error('not found')
      return Promise.resolve(group).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getGroups (callback) {
    try {
      const groups = await this.models.Group.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(groups).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateGroup (id, data, callback) {
    try {
      if (!id || !data) throw new Error('group id or data are not nullable')
      const group = await this.getGroup(id)
      await group.update(data, {
        fields: [
          'name',
          'description'
        ]
      })
      return Promise.resolve(group).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteGroup (id, callback) {
    try {
      if (!id) throw new Error('group id is not nullable')
      const group = await this.getGroup(id)
      const deleted = JSON.parse(JSON.stringify(group))
      await group.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveUser (user, callback) {
    try {
      if (!user) throw new Error('user is not nullable')
      user.password = utils.encrypt(user.password)
      const created = await this.models.User.create(user)
      return Promise.resolve(created).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUser (username, callback) {
    try {
      if (!username) throw new Error('username is not nullable')
      const user = await this.models.User.findOne({
        where: { username },
        include: [ { all: true, nested: true } ]
      })
      if (!user) throw new Error('not found')
      return Promise.resolve(user).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getUsers (callback) {
    try {
      const users = await this.models.User.findAll({
        include: [ { all: true, nested: true } ]
      })
      return Promise.resolve(users).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async updateUser (username, data, callback) {
    try {
      if (!username || !data) throw new Error('username or data are not nullable')
      const user = await this.getUser(username)

      if (utils.encrypt(data.password) !== user.get('password')) {
        data.password = utils.encrypt(data.password)
      }

      await user.update(data, {
        fields: [
          'fullname',
          'email',
          'username',
          'password',
          'isActive',
          'groupId'
        ]
      })
      return Promise.resolve(user).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async deleteUser (username, callback) {
    try {
      if (!username) throw new Error('username is not nullable')
      const user = await this.getUser(username)
      const deleted = JSON.parse(JSON.stringify(user))
      await user.destroy()
      return Promise.resolve(deleted).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async setup (callback) {
    try {
      await this.sequelize.sync()
      return Promise.resolve('Setup completed')
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async drop (callback) {
    try {
      await this.sequelize.drop()
      return Promise.resolve('Drop completed')
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  static getSetupSequelize (options) {
    return setupSequelize(options)
  }
}

module.exports = Db
