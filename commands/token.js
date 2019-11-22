'use strict'

const cli = require('heroku-cli-util')
const co = require('co')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  const {name} = context.args
  if (!accounts.list().find(a => a.name === name)) {
    cli.error(`${name} does not exist`)
    cli.exit(1)
  }

  accounts.token(name, context.flags.bash)
}

module.exports = {
  topic: 'accounts',
  command: 'token',
  args: [{name: 'name'}],
  flags: [{name: 'bash', description: 'shortcut to set HEROKU_API_KEY env variable'}],
  run: cli.command(co.wrap(run))
}
