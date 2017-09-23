const setupUserModel = require('./user')
const setupGroupModel = require('./group')

module.exports = function getModels (options) {
  const User = setupUserModel(options)
  const Group = setupGroupModel(options)

  User.belongsTo(Group)
  Group.hasMany(User)

  return {
    User,
    Group
  }
}
