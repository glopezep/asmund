const casual = require('casual')

function getGroup () {
  return {
    id: casual.uuid,
    name: casual.word,
    description: casual.sentences(3)
  }
}

function getGroups () {
  return [
    getGroup(),
    getGroup(),
    getGroup()
  ]
}

function getUser () {
  return {
    id: casual.uuid,
    fullname: casual.name,
    username: casual.username,
    password: casual.password,
    email: casual.email,
    isActive: true
  }
}

function getUsers () {
  return [
    getUser(),
    getUser(),
    getUser()
  ]
}

module.exports = {
  getGroup,
  getGroups,
  getUser,
  getUsers
}
