# asmund

Asmund is an simple user manager.

## Usage

### Database Module

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
