# asmund-db

Asmund Database Module

## Usage

```js
const Db = require('asmund-db')

const options = {
  database: 'asmunddb',
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

const db = new Db(options)

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
