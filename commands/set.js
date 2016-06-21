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

  accounts.set(name)
}

module.exports = {
  topic: 'accounts',
  command: 'set',
  args: [{name: 'name'}],
  run: cli.command(co.wrap(run))
}
