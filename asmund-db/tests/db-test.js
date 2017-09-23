const test = require('ava')
const debug = require('debug')('asmund:db:test')
const utils = require('asmund-utils')
const Db = require('../')
const fixtures = require('./fixtures')

const options = {
  database: 'asmundb_test',
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

test.serial('db#saveUser', async t => {
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
