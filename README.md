# asmund
The best groups and users manager database module for microservices

## Usage

### Database Module
The database module contains all the methods for direct communication with postgres or the mysql database

```js
const asmund = require('asmund')

const options = {
  database: 'asmund',
  username: 'root',
  password: 'mypass',
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
}

const db = new asmund.Db(options)

db.getUsers().then(users => {
  // do something with users
}).catch(err => {
  // do something with err
})

Or using callback

db.getUsers((err, users) => {
  if (err) {
    // do something with err
  }
  // do something with users
})
```

### API

#### db#setup([callback]): void
This method setup the database.

- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any

```js
db.setup(err => {
  if (err) {
    // do something with err
  } else {
    // do something after database setup
  }
})
```

#### db#drop([callback]): void
This method setup the database.

- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any

```js
db.drop(err => {
  if (err) {
    // do something with err
  } else {
    // do something after database drop
  }
})
```

#### db#saveUser(user, [callback]): User
This method save an user.

- `user` _(Object)_
  - `fullname` _(String)_ user fullname.
  - `email` _(String)_ user email.
  - `username` _(String)_ user username
  - `password` _(String)_ user password
  - `groupId` _(String)_ group id

- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any
  - `user` _(Object)_ saved user

```js
const user = {
  fullname: 'The administrator',
  email: 'admin@app.com',
  username: 'admin',
  password: 'root'
}

db.saveUser(user, (err, created) => {
  // do something with err or user 
})

Or using promise

db.saveUser(user).then(created => {
  // do something with created user 
}).catch(err => {
  // do something with err 
})
```

#### db#getUser(username, [callback]): User
This method find an user by username.

- `username` _(String)_ user username

- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any
  - `user` _(Object)_ found user

```js
db.getUser('admin', (err, user) => {
  // do something with err or user 
})

Or using promise

db.getUser('admin').then(user => {
  // do something with created user 
}).catch(err => {
  // do something with err 
})
```

#### db#getUsers([callback]): [User]
This method find all users.

- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any
  - `users` _(Object)_ user list

```js
db.getUsers((err, users) => {
  // do something with err or users 
})

Or using promise

db.getUsers().then(users => {
  // do something with user list
}).catch(err => {
  // do something with err 
})
```

#### db#updateUser(username, data, [callback]): User
This method update an user

- `username` _(String)_
- `data` _(Object)_
  - `fullname` _(String)_
  - `email` _(String)_
  - `username` _(String)_
  - `password` _(String)_
- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any
  - `user` _(Object)_ user created

```js
const data = {
  username: 'my_new_username',
}

db.updateUser('guillermo', data, (err, user) => {
  // do something with err or updated user
})

Or using promise

db.updateUser('guillermo', data).then(user => {
  // do something with user
}).catch(err => {
  // do something with error
})
```

#### db#deleteUser(username, [callback]): User
This method delete an user

- `username` _(String)_
- `callback` _(Function)_
  - `err` _(Object)_
  - `user` _(Object)_

```js
db.deleteUser('guillermo', (err, user) => {
  // do something with err or updated user
})

Or using promise

db.deleteUser('guillermo').then(user => {
  // do something with user
}).catch(err => {
  // do something with error
})
```

#### db#saveGroup(group, [callback]): Group
#### db#getGroup(id, [callback]): Group
#### db#getGroups([callback]): [Group]
#### db#updateGroup(id, data, [callback]): Group
#### db#deleteGroup(id, [callback]): Group
