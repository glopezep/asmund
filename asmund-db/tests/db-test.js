const test = require('ava')
const debug = require('debug')('asmund:test')
const utils = require('asmund-utils')
const Db = require('../')
const fixtures = require('./fixtures')

const options = {
  database: 'asmund_test',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'sqlite',
  logging: msg => debug(msg)
}

const db = new Db(options)

test.beforeEach(async t => {
  await db.setup()
})

test.afterEach.always(async t => {
  await db.drop()
})

test.serial('db#saveGroup', async t => {
  t.is(typeof db.saveGroup, 'function', 'Shuold be a fuction')

  const group = fixtures.getGroup()

  let created = await db.saveGroup(group)

  created = created.get({ plain: true })

  t.is(created.id, group.id)
  t.is(created.name, group.name)
  t.is(created.description, group.description)
  await t.throws(db.saveGroup(null), /group is not nullable/)
})

test.serial('db#getGroup', async t => {
  t.is(typeof db.getGroup, 'function', 'Shuold be a fuction')

  const group = fixtures.getGroup()
  await db.saveGroup(group)
  let result = await db.getGroup(group.id)

  result = result.get({ plain: true })

  t.is(result.id, group.id)
  t.is(result.name, group.name)
  t.is(result.description, group.description)
  await t.throws(db.getGroup(null), /group id is not nullable/)
})

test.serial('db#getGroups', async t => {
  t.is(typeof db.getGroups, 'function', 'Shuold be a fuction')

  const groups = fixtures.getGroups()
  const saveUsers = []

  groups.forEach(group => {
    saveUsers.push(db.saveGroup(group))
  })

  await Promise.all(saveUsers)

  const result = await db.getGroups()

  t.is(result.length, groups.length)
})

test.serial('db#updateGroup', async t => {
  t.is(typeof db.updateGroup, 'function', 'Shuold be a fuction')

  const group = fixtures.getGroup()
  const newData = fixtures.getGroup()
  await db.saveGroup(group)

  let updated = await db.updateGroup(group.id, newData)
  updated = updated.get({ plain: true })

  t.is(updated.id, group.id)
  t.is(updated.fullname, newData.fullname)
  t.is(updated.email, newData.email)
  t.is(updated.username, newData.username)
  t.is(updated.password, newData.password)
  t.is(updated.isActive, newData.isActive)
  await t.throws(db.updateGroup(null), /group id or data are not nullable/)
  await t.throws(db.updateGroup('foo', newData), /not found/)
})

test.serial('db#deleteGroup', async t => {
  t.is(typeof db.deleteGroup, 'function', 'Shuold be a fuction')

  const group = fixtures.getGroup()
  await db.saveGroup(group)
  const deleted = await db.deleteGroup(group.id)

  t.is(deleted.id, group.id)
  t.is(deleted.name, group.name)
  t.is(deleted.description, group.description)
  await t.throws(db.deleteGroup(null), /group id is not nullable/)
  await t.throws(db.deleteGroup('foo'), /not found/)
})

test.serial('db#saveUser - without group', async t => {
  t.is(typeof db.saveUser, 'function', 'Shuold be a fuction')

  const user = fixtures.getUser()
  const plainPassword = user.password

  let created = await db.saveUser(user)

  created = created.get({ plain: true })

  t.is(created.id, user.id)
  t.is(created.fullname, user.fullname)
  t.is(created.email, user.email)
  t.is(created.password, utils.encrypt(plainPassword))
  t.is(created.isActive, user.isActive)
  await t.throws(db.saveUser(), /user is not nullable/)
})

test.serial('db#getUser', async t => {
  t.is(typeof db.getUser, 'function', 'Shuold be a fuction')

  const user = fixtures.getUser()

  await db.saveUser(user)

  let result = await db.getUser(user.username)

  result = result.get({ plain: true })

  t.is(result.id, user.id)
  t.is(result.fullname, user.fullname)
  t.is(result.email, user.email)
  t.is(result.isActive, user.isActive)
  await t.throws(db.getUser(), /username is not nullable/)
  await t.throws(db.getUser('foo'), /not found/)
})

test.serial('db#getUsers', async t => {
  t.is(typeof db.getUsers, 'function', 'Shuold be a fuction')

  const users = fixtures.getUsers()
  const saveUsers = []

  users.forEach(user => {
    saveUsers.push(db.saveUser(user))
  })

  await Promise.all(saveUsers)

  const result = await db.getUsers()

  t.is(result.length, users.length)
})

test.serial('db#updateUser', async t => {
  t.is(typeof db.updateUser, 'function', 'Shuold be a fuction')

  const user = fixtures.getUser()
  const newData = fixtures.getUser()
  await db.saveUser(user)

  let updated = await db.updateUser(user.username, newData)
  updated = updated.get({ plain: true })

  t.is(updated.id, user.id)
  t.is(updated.fullname, newData.fullname)
  t.is(updated.email, newData.email)
  t.is(updated.username, newData.username)
  t.is(updated.password, newData.password)
  t.is(updated.isActive, newData.isActive)
  await t.throws(db.updateUser(null), /username or data are not nullable/)
  await t.throws(db.updateUser('foo', newData), /not found/)
})

test.serial('db#deleteUser', async t => {
  t.is(typeof db.deleteUser, 'function', 'Shuold be a fuction')

  const user = fixtures.getUser()
  await db.saveUser(user)
  const deleted = await db.deleteUser(user.username)

  t.is(deleted.id, user.id)
  t.is(deleted.fullname, user.fullname)
  t.is(deleted.email, user.email)
  t.is(deleted.username, user.username)
  t.is(deleted.password, user.password)
  t.is(deleted.isActive, user.isActive)
  await t.throws(db.deleteUser(null), /username is not nullable/)
  await t.throws(db.deleteUser('foo'), /not found/)
})
