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

#### Saving an user

```js
db#saveUser(user: Object, [callback]): Promise<User>
```

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
const user = {
  fullname: 'The administrator',
  email: 'admin@app.com',
  username: 'admin',
  password: 'root'
}

db.saveUser(user).then(created => {
  // do something with created user 
}).catch(err => {
  // do something with err 
})
```