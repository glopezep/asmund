# asmund
Asmund is an simple user manager.

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
```

Or using callback

```js
db.getUsers((err, users) => {
  if (err) {
    // do something with err
  }
  // do something with users
})
```

### API

#### db#saveUser(user, [callback]): User
- `user` _(Object)_
  - `fullname` _(String)_ user fullname.
  - `email` _(String)_ user email.
  - `username` _(String)_ user username
  - `password` _(String)_ user password

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

const created = db.saveUser(user, (err, user) => {
  // do something with err or user 
})
```

Or using promise

```js
db.saveUser(user).then(created => {
  // do something with created user 
}).catch(err => {
  // do something with err 
})
```

#### db#getUser(username, [callback]): User
- `username` _(String)_ user username

- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any
  - `user` _(Object)_ found user

```js
db.getUser('admin', (err, user) => {
  // do something with err or user 
})
```

Or using promise

```js
db.getUser('admin').then(user => {
  // do something with created user 
}).catch(err => {
  // do something with err 
})
```

#### db#getUsers([callback]): [User]
- `callback`_(Function)_ this argument is optional
  - `err` _(Object)_ if any
  - `users` _(Object)_ user list

```js
db.getUsers((err, users) => {
  // do something with err or users 
})
```

Or using promise

```js
db.getUsers().then(users => {
  // do something with user list
}).catch(err => {
  // do something with err 
})
```