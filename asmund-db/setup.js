const chalk = require('chalk')
const inquirer = require('inquirer')
const hasFlag = require('has-flag')
const Db = require('./')

const db = new Db()
const prompt = inquirer.createPromptModule()

async function setup () {
  if (!hasFlag('force')) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your user and group tables if exist in your database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happened')
    }
  }

  try {
    await db.drop()
    const msg = await db.setup()
    console.log(`${chalk.green('[success]')} ${msg}`)
    process.exit(0)
  } catch (e) {
    console.error(`${chalk.red('[error]')} ${e.message}`)
    console.error(e.stack)
    process.exit(1)
  }
}

setup()
